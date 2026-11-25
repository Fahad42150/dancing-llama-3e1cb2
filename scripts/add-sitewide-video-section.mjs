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
        <img src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" alt="" width="480" height="360" loading="lazy" decoding="async">
        <span class="fjx-sitewide-video__play" aria-hidden="true"><svg viewBox="0 0 68 48" width="68" height="48"><path d="M66.52 7.74a8 8 0 0 0-5.64-5.66C55.9.72 34 .72 34 .72S12.1.72 7.12 2.08a8 8 0 0 0-5.64 5.66C.12 12.73.12 24 .12 24s0 11.27 1.36 16.26a8 8 0 0 0 5.64 5.66C12.1 47.28 34 47.28 34 47.28s21.9 0 26.88-1.36a8 8 0 0 0 5.64-5.66C67.88 35.27 67.88 24 67.88 24s0-11.27-1.36-16.26Z" fill="#e62117"/><path d="m27 34 18-10-18-10z" fill="#fff"/></svg></span>
      </button>
    </div>
    <script>
      (function () {
        var section = document.getElementById('fjx-sitewide-video');
        if (!section) return;

        // On the React homepage, #root starts empty and is populated by the
        // deferred module script. Keep this below-root section invisible while
        // the root's initial render establishes its final document position.
        // Visibility does not remove its reserved layout space.
        var root = document.getElementById('root');
        if (root && !root.firstElementChild) {
          section.style.visibility = 'hidden';
          var revealAfterRootRender = new MutationObserver(function () {
            if (root.firstElementChild) {
              section.style.visibility = 'visible';
              revealAfterRootRender.disconnect();
            }
          });
          revealAfterRootRender.observe(root, { childList: true });
        }

        var poster = section.querySelector('[data-fjx-video-id]');
        if (!poster) return;
        poster.addEventListener('click', function () {
          var id = poster.getAttribute('data-fjx-video-id');
          if (!id) return;
          var frame = document.createElement('iframe');
          frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1';
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
  .fjx-sitewide-video__frame{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:16px;background:#101510;box-shadow:0 14px 38px rgba(25,40,20,.14)}
  .fjx-sitewide-video__frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.fjx-sitewide-video__poster{position:absolute;inset:0;width:100%;height:100%;padding:0;border:0;background:#101510;cursor:pointer}.fjx-sitewide-video__poster img{width:100%;height:100%;object-fit:cover;display:block}.fjx-sitewide-video__play{position:absolute;inset:0;display:grid;place-items:center;background:rgba(0,0,0,.12);transition:background .2s}.fjx-sitewide-video__poster:hover .fjx-sitewide-video__play{background:rgba(0,0,0,.28)}.fjx-sitewide-video__play svg{filter:drop-shadow(0 2px 8px rgba(0,0,0,.3))}
  @media(max-width:600px){.fjx-sitewide-video{padding:38px 14px}.fjx-sitewide-video__frame{border-radius:10px}}
</style>
`;

const files = [...collectHtml(path.resolve("public")), path.resolve("index.html")];
let updated = 0;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  if (html.includes(marker)) continue;
  if (!/<\/body\s*>/i.test(html)) continue;
  html = html.replace(/<\/body\s*>/i, section + "\n</body>");
  fs.writeFileSync(file, html, "utf8");
  updated += 1;
}

console.log(`Added the responsive FJX Studio video section to ${updated} HTML pages.`);
