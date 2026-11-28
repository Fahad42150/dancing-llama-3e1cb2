import fs from "node:fs";
import path from "node:path";

const PUBLIC = path.resolve("public");

function collectHtml(directory, files = []) {
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) collectHtml(file, files);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) files.push(file);
  }
  return files;
}

const runtime = `
<script id="fjx-youtube-scroll-autoplay">
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var seen = new WeakSet();
  var active = null;
  var timers = new WeakMap();

  function isYouTube(frame) {
    try {
      var host = new URL(frame.src, location.href).hostname;
      return host === 'youtu.be' || host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com');
    } catch (_) { return false; }
  }
  function command(frame, func) {
    try { frame.contentWindow.postMessage(JSON.stringify({event:'command',func:func,args:[]}), '*'); } catch (_) {}
  }
  function prepare(frame) {
    if (seen.has(frame) || !isYouTube(frame)) return;
    seen.add(frame);
    var url;
    try { url = new URL(frame.src, location.href); } catch (_) { return; }
    url.searchParams.set('enablejsapi', '1');
    if (location.origin && location.origin !== 'null') url.searchParams.set('origin', location.origin);
    if (frame.src !== url.href) frame.src = url.href;
    var allow = frame.getAttribute('allow') || '';
    if (!allow.toLowerCase().includes('autoplay')) frame.setAttribute('allow', (allow ? allow + '; ' : '') + 'autoplay');
    observer.observe(frame);
  }
  function preparePoster(button) {
    if (seen.has(button) || !button.matches('[data-fjx-video-id]')) return;
    seen.add(button);
    observer.observe(button);
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var el = entry.target;
      var visible = entry.isIntersecting && entry.intersectionRatio >= 0.55;
      if (el.tagName === 'IFRAME') {
        if (visible) {
          if (active && active !== el) command(active, 'pauseVideo');
          active = el;
          command(el, 'mute');
          command(el, 'playVideo');
          if (timers.has(el)) clearTimeout(timers.get(el));
          timers.set(el, setTimeout(function () {
            if (active === el) { command(el, 'mute'); command(el, 'playVideo'); }
          }, 900));
        } else if (active === el) {
          command(el, 'pauseVideo');
          active = null;
        }
      } else if (visible) {
        el.click();
      }
    });
  }, {threshold:[0,0.55,0.75]});

  function scan(root) {
    if (!root || (root.nodeType !== 1 && root.nodeType !== 9)) return;
    if (root.tagName === 'IFRAME') prepare(root);
    if (root.matches && root.matches('[data-fjx-video-id]')) preparePoster(root);
    if (root.querySelectorAll) {
      root.querySelectorAll('iframe').forEach(prepare);
      root.querySelectorAll('[data-fjx-video-id]').forEach(preparePoster);
    }
  }
  scan(document);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) { mutation.addedNodes.forEach(scan); });
  }).observe(document.documentElement, {childList:true,subtree:true});
})();
</script>
`;

const files = [...collectHtml(PUBLIC), path.resolve("index.html")];
let updated = 0;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('id="fjx-youtube-scroll-autoplay"')) continue;
  const bodyEnd = html.toLowerCase().lastIndexOf("</body>");
  if (bodyEnd < 0) continue;
  html = html.slice(0, bodyEnd) + runtime + "\n" + html.slice(bodyEnd);
  fs.writeFileSync(file, html, "utf8");
  updated++;
}
console.log("Added scroll-triggered muted YouTube autoplay and pause-on-scroll-away behavior to " + updated + " HTML page(s).");
