import fs from "node:fs";
import path from "node:path";

const videoId = "V-oqL-_U0lo";
const marker = 'id="fjx-sitewide-video"';
const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

function collectHtml(directory, files = []) {
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) collectHtml(file, files);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) files.push(file);
  }
  return files;
}

const section = `
<section id="fjx-sitewide-video" class="fjx-sitewide-video" aria-labelledby="fjx-sitewide-video-title">
  <div class="fjx-sitewide-video__inner">
    <p class="fjx-sitewide-video__eyebrow">FJX Studio</p>
    <h2 id="fjx-sitewide-video-title">See FJX Studio in Action</h2>
    <p class="fjx-sitewide-video__intro">Watch our video to learn more about FJX Studio and the support we provide.</p>
    <div class="fjx-sitewide-video__frame">
      <button class="fjx-sitewide-video__poster" type="button" data-fjx-video-id="${videoId}" aria-label="Play FJX Studio video">
        <img src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" alt="" width="480" height="360" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&amp;fit=crop&amp;w=1200&amp;q=80'">
        <span class="fjx-sitewide-video__play" aria-hidden="true"><svg viewBox="0 0 68 48" width="68" height="48"><path d="M66.52 7.74a8 8 0 0 0-5.64-5.66C55.9.72 34 .72 34 .72S12.1.72 7.12 2.08a8 8 0 0 0-5.64 5.66C.12 12.73.12 24 .12 24s0 11.27 1.36 16.26a8 8 0 0 0 5.64 5.66C12.1 47.28 34 47.28 34 47.28s21.9 0 26.88-1.36a8 8 0 0 0 5.64-5.66C67.88 35.27 67.88 24 67.88 24s0-11.27-1.36-16.26Z" fill="#e62117"/><path d="m27 34 18-10-18-10z" fill="#fff"/></svg></span>
      </button>
    </div>
    <script>
      (function () {
        var section = document.getElementById('fjx-sitewide-video');
        if (!section) return;

        // Place the shared video immediately after the About section.
        // Static pages are positioned at build time; the React homepage is
        // repositioned once its About component has mounted.
        function placeAfterAbout() {
          var about = document.getElementById('about') ||
            document.querySelector('section[aria-label="About FJX Studio"]');
          if (!about) return false;
          if (about.nextElementSibling !== section) {
            about.insertAdjacentElement('afterend', section);
          }
          section.style.visibility = 'visible';
          return true;
        }

        var root = document.getElementById('root');
        if (root) {
          if (!placeAfterAbout()) {
            section.style.visibility = 'hidden';
            var revealAfterAbout = new MutationObserver(function () {
              if (placeAfterAbout()) revealAfterAbout.disconnect();
            });
            revealAfterAbout.observe(root, { childList: true, subtree: true });
          }
        } else {
          placeAfterAbout();
        }

        var poster = section.querySelector('[data-fjx-video-id]');
        if (!poster) return;
        poster.addEventListener('click', function () {
          var id = poster.getAttribute('data-fjx-video-id');
          if (!id) return;
          var frame = document.createElement('iframe');
          frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&mute=1&enablejsapi=1';
          frame.title = 'FJX Studio video';
          frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
          frame.allowFullscreen = true;
          frame.referrerPolicy = 'strict-origin-when-cross-origin';
          frame.loading = 'eager';
          frame.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
          poster.replaceWith(frame);
        }, { once: true });
      })();
    </script>
  </div>
</section>
<style>
  .fjx-sitewide-video{width:100%;padding:clamp(42px,7vw,76px) 20px;background:#f7faf3;color:#202820}
  .fjx-sitewide-video__inner{width:min(100%,1000px);margin:0 auto;text-align:center}
  .fjx-sitewide-video__eyebrow{margin:0 0 10px;color:#3a701f;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
  .fjx-sitewide-video h2{margin:0;font-size:clamp(25px,4vw,38px);font-weight:800;line-height:1.2}
  .fjx-sitewide-video__intro{max-width:650px;margin:14px auto 26px;color:#596458;font-size:clamp(14px,2vw,17px);line-height:1.65}
  .fjx-sitewide-video__frame{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:16px;background:linear-gradient(135deg,#dfe9d8 0%,#b9cdb0 100%);box-shadow:0 14px 38px rgba(25,40,20,.14)}
  .fjx-sitewide-video__frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.fjx-sitewide-video__poster{position:absolute;inset:0;width:100%;height:100%;padding:0;border:0;background:linear-gradient(135deg,#dfe9d8 0%,#b9cdb0 100%);cursor:pointer}.fjx-sitewide-video__poster img{width:100%;height:100%;object-fit:cover;display:block}.fjx-sitewide-video__play{position:absolute;inset:0;display:grid;place-items:center;background:rgba(0,0,0,.12);transition:background .2s}.fjx-sitewide-video__poster:hover .fjx-sitewide-video__play{background:rgba(0,0,0,.28)}.fjx-sitewide-video__play svg{filter:drop-shadow(0 2px 8px rgba(0,0,0,.3))}
  @media(max-width:600px){.fjx-sitewide-video{padding:38px 14px}.fjx-sitewide-video__frame{border-radius:10px}}
</style>
`;

function findAboutSectionEnd(html) {
  const about = /<section\b(?=[^>]*(?:aria-label\s*=\s*["']About FJX Studio["']|id\s*=\s*["']about["']))[^>]*>/i.exec(html);
  if (!about) return -1;
  const tags = /<\/?section\b[^>]*>/gi;
  tags.lastIndex = about.index;
  let depth = 0;
  let tag;
  while ((tag = tags.exec(html))) {
    if (/^<section\b/i.test(tag[0])) depth += 1;
    else depth -= 1;
    if (depth === 0) return tags.lastIndex;
  }
  return -1;
}

const files = [...collectHtml(path.resolve("public")), path.resolve("index.html")];
let updated = 0;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  let videoBlock = section;
  const existingStart = html.indexOf('<section id="fjx-sitewide-video"');
  if (existingStart >= 0) {
    const sectionClose = html.indexOf("</section>", existingStart);
    if (sectionClose < 0) continue;
    let blockEnd = sectionClose + "</section>".length;
    const styleMatch = /^\s*<style>[\s\S]*?<\/style>/i.exec(html.slice(blockEnd));
    if (styleMatch) blockEnd += styleMatch[0].length;
    videoBlock = html.slice(existingStart, blockEnd);
    html = html.slice(0, existingStart) + html.slice(blockEnd);
  }
  if (!/<\/body\s*>/i.test(html)) continue;

  const aboutEnd = findAboutSectionEnd(html);
  if (aboutEnd >= 0) {
    html = html.slice(0, aboutEnd) + "\n" + videoBlock + html.slice(aboutEnd);
  } else {
    html = html.replace(/<\/body\s*>/i, videoBlock + "\n</body>");
  }
  fs.writeFileSync(file, html, "utf8");
  updated += 1;
}

console.log(`Placed the responsive FJX Studio video section immediately after About on ${updated} HTML page(s); the homepage is positioned after React renders its About section.`);
