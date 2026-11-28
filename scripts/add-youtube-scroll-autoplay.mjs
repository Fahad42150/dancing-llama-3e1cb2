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

  var observed = new WeakSet();
  var active = null;

  function isYouTube(frame) {
    try {
      var host = new URL(frame.src, location.href).hostname;
      return /(^|\\.)youtube(-nocookie)?\\.com$|(^|\\.)youtube\\.com$/.test(host);
    } catch (_) { return false; }
  }

  function send(frame, func) {
    try {
      frame.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: func,
        args: []
      }), '*');
    } catch (_) {}
  }

  function prepare(frame) {
    if (observed.has(frame) || !isYouTube(frame)) return;
    observed.add(frame);
    var url;
    try { url = new URL(frame.src, location.href); } catch (_) { return; }
    url.searchParams.set('enablejsapi', '1');
    if (location.origin && location.origin !== 'null') url.searchParams.set('origin', location.origin);
    if (frame.src !== url.href) frame.src = url.href;
    var allow = frame.getAttribute('allow') || '';
    if (!/\\bautoplay\\b/i.test(allow)) frame.setAttribute('allow', (allow ? allow + '; ' : '') + 'autoplay');
    observer.observe(frame);
  }

  function preparePoster(button) {
    if (observed.has(button) || !button.matches('[data-fjx-video-id]')) return;
    observed.add(button);
    observer.observe(button);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var el = entry.target;
      if (el.matches && el.matches('iframe')) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          if (active && active !== el) send(active, 'pauseVideo');
          active = el;
          send(el, 'mute');
          send(el, 'playVideo');
        } else if (active === el) {
          send(el, 'pauseVideo');
          active = null;
        }
      } else if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
        // The existing poster click handler creates the YouTube iframe.
        el.click();
      }
    });
  }, { threshold: [0, 0.55, 0.75] });

  function scan(root) {
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    if (root.matches && root.matches('iframe')) prepare(root);
    if (root.matches && root.matches('[data-fjx-video-id]')) preparePoster(root);
    root.querySelectorAll && root.querySelectorAll('iframe').forEach(prepare);
    root.querySelectorAll && root.querySelectorAll('[data-fjx-video-id]').forEach(preparePoster);
  }

  scan(document);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(scan);
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
</script>
`;

const files = [...collectHtml(PUBLIC), path.resolve("index.html")];
let updated = 0;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('id="fjx-youtube-scroll-autoplay"')) continue;
  if (!/<\\/body\\s*>/i.test(html)) continue;
  html = html.replace(/<\\/body\\s*>/i, runtime + "\\n</body>");
  fs.writeFileSync(file, html, "utf8");
  updated++;
}
console.log("Added scroll-triggered, muted YouTube autoplay and out-of-view pause behavior to " + updated + " HTML page(s).");
