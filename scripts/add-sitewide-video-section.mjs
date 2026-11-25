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
      <iframe
        src="${embedUrl}"
        title="FJX Studio video"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</section>
<style>
  .fjx-sitewide-video{width:100%;padding:clamp(42px,7vw,76px) 20px;background:#f7faf3;color:#202820}
  .fjx-sitewide-video__inner{width:min(100%,1000px);margin:0 auto;text-align:center}
  .fjx-sitewide-video__eyebrow{margin:0 0 10px;color:#638d2d;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
  .fjx-sitewide-video h2{margin:0;font-size:clamp(25px,4vw,38px);font-weight:800;line-height:1.2}
  .fjx-sitewide-video__intro{max-width:650px;margin:14px auto 26px;color:#596458;font-size:clamp(14px,2vw,17px);line-height:1.65}
  .fjx-sitewide-video__frame{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:16px;background:#101510;box-shadow:0 14px 38px rgba(25,40,20,.14)}
  .fjx-sitewide-video__frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
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
  html = html.replace(/<\/body\s*>/i, section + "\\n</body>");
  fs.writeFileSync(file, html, "utf8");
  updated += 1;
}

console.log(`Added the responsive FJX Studio video section to ${updated} HTML pages.`);
