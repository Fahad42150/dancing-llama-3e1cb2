import fs from "node:fs";
import path from "node:path";

const SITE = "https://www.fjxstudio.com";
const PUBLIC = path.resolve("public");
const VIDEO_ID = "V-oqL-_U0lo";
const VIDEO_SLUG = "fjx-studio-video-guide";
const VIDEO_TITLE = "FJX Studio Video Guide";
const VIDEO_DESCRIPTION = "Watch the featured FJX Studio video on this dedicated video page.";
const WATCH_URL = SITE + "/watch/" + VIDEO_SLUG + "/";
const PLAYER_URL = "https://www.youtube-nocookie.com/embed/" + VIDEO_ID;
const THUMBNAIL_URL = "https://i.ytimg.com/vi/" + VIDEO_ID + "/hqdefault.jpg";

function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function watchPage() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${VIDEO_TITLE} | FJX Studio</title>
<meta name="description" content="${VIDEO_DESCRIPTION}">
<meta name="robots" content="index,follow,max-video-preview:-1">
<link rel="canonical" href="${WATCH_URL}">
<meta property="og:type" content="video.other">
<meta property="og:title" content="${VIDEO_TITLE} | FJX Studio">
<meta property="og:description" content="${VIDEO_DESCRIPTION}">
<meta property="og:url" content="${WATCH_URL}">
<meta property="og:image" content="${THUMBNAIL_URL}">
<meta property="og:video" content="${PLAYER_URL}">
<meta property="og:video:type" content="text/html">
<style>
*{box-sizing:border-box}body{margin:0;background:#101510;color:#f7faf5;font-family:Arial,Helvetica,sans-serif;line-height:1.6}
main{width:min(1100px,calc(100% - 32px));margin:auto;padding:32px 0 48px}
.brand{display:inline-block;margin-bottom:26px;color:#b4ec7c;font-size:19px;font-weight:800;text-decoration:none}
.eyebrow{color:#b4ec7c;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
h1{font-size:clamp(28px,5vw,46px);line-height:1.15;margin:8px 0 12px}
p{max-width:760px;color:#c7d0c4}
.player{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:16px;background:#000;margin-top:24px}
.player iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
footer{margin-top:24px;padding-top:18px;border-top:1px solid #344034;color:#aeb9aa;font-size:14px}
footer a{color:#b4ec7c}
@media(max-width:600px){main{padding-top:22px}.player{border-radius:10px}}
</style>
</head>
<body><main>
<a class="brand" href="/">FJX Studio</a>
<div class="eyebrow">Featured video</div>
<h1>${VIDEO_TITLE}</h1>
<p>${VIDEO_DESCRIPTION}</p>
<div class="player"><iframe src="${PLAYER_URL}" title="${VIDEO_TITLE}" loading="eager" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
<footer>Video hosted on YouTube. <a href="/">Explore FJX Studio</a></footer>
</main></body></html>`;
}

function eligiblePageUrl(url) {
  const pathname = new URL(url).pathname.replace(/\/+$/, "") || "/";
  if (pathname === "/" || pathname === "/pricing" || pathname === "/services") return false;
  if (/^\/(watch|privacy-policy|terms|cookie-policy)(\/|$)/i.test(pathname)) return false;
  return true;
}

function injectVideo(file) {
  let html = fs.readFileSync(file, "utf8");
  const sectionId = "fjx-featured-video-" + VIDEO_ID;
  const existing = new RegExp("<section\\b[^>]*id=[\"']" + sectionId + "[\"'][\\s\\S]*?<\\/section>", "i");
  html = html.replace(existing, "");
  html = html.replace(/<style>\s*\.fjx-featured-video[\s\S]*?<\/style>/i, "");
  const block = `
<section id="${sectionId}" class="fjx-featured-video" aria-labelledby="fjx-featured-video-title">
  <div class="fjx-featured-video-inner">
    <p class="fjx-featured-video-label">Featured video</p>
    <h2 id="fjx-featured-video-title">Watch the FJX Studio video</h2>
    <div class="fjx-featured-video-player">
      <iframe src="${PLAYER_URL}" title="${VIDEO_TITLE}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <p class="fjx-featured-video-link"><a href="/watch/${VIDEO_SLUG}/">Open this video on FJX Studio</a></p>
  </div>
</section>
<style>
.fjx-featured-video{width:100%;padding:42px 20px;margin:32px 0;background:#f6f9f1;color:#202820}
.fjx-featured-video-inner{width:min(100%,1000px);margin:0 auto}
.fjx-featured-video-label{margin:0 0 6px;color:#5b7d25;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
.fjx-featured-video h2{margin:0 0 18px;font-size:clamp(22px,3vw,30px);line-height:1.2}
.fjx-featured-video-player{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:14px;background:#111;box-shadow:0 12px 34px rgba(0,0,0,.12)}
.fjx-featured-video-player iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.fjx-featured-video-link{margin:14px 0 0}
.fjx-featured-video-link a{color:#426d20;font-weight:700;text-underline-offset:3px}
@media(max-width:640px){.fjx-featured-video{padding:30px 14px;margin:22px 0}.fjx-featured-video-player{border-radius:9px}}
</style>`;
  if (/<\/main>/i.test(html)) html = html.replace(/<\/main>/i, block + "\n</main>");
  else if (/<\/body>/i.test(html)) html = html.replace(/<\/body>/i, block + "\n</body>");
  else return false;
  fs.writeFileSync(file, html);
  return true;
}

const sitemapPath = path.join(PUBLIC, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) throw new Error("public/sitemap.xml is required before adding the featured video.");
const sitemap = fs.readFileSync(sitemapPath, "utf8");
const locs = [...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map(match => match[1].trim());
const targetFiles = new Set();
for (const url of locs) {
  if (!eligiblePageUrl(url)) continue;
  const pathname = new URL(url).pathname;
  const directory = path.join(PUBLIC, decodeURIComponent(pathname).replace(/^\/+|\/+$/g, ""));
  const file = path.join(directory, "index.html");
  if (fs.existsSync(file)) targetFiles.add(file);
}
if (!targetFiles.size) throw new Error("No eligible service, blog or article pages were found in sitemap.xml.");

const watchDirectory = path.join(PUBLIC, "watch", VIDEO_SLUG);
fs.mkdirSync(watchDirectory, { recursive: true });
fs.writeFileSync(path.join(watchDirectory, "index.html"), watchPage());

let injected = 0;
for (const file of targetFiles) if (injectVideo(file)) injected++;

let updatedSitemap = fs.readFileSync(sitemapPath, "utf8");
if (!updatedSitemap.includes(WATCH_URL)) {
  updatedSitemap = updatedSitemap.replace(/<\/urlset>/i, "<url><loc>" + WATCH_URL + "</loc></url>\n</urlset>");
  fs.writeFileSync(sitemapPath, updatedSitemap);
}

const videoSitemapPath = path.join(PUBLIC, "video-sitemap.xml");
const videoEntry = "<url><loc>" + WATCH_URL + "</loc><video:video><video:thumbnail_loc>" + THUMBNAIL_URL +
  "</video:thumbnail_loc><video:title><![CDATA[" + VIDEO_TITLE + "]]></video:title><video:description><![CDATA[" +
  VIDEO_DESCRIPTION + "]]></video:description><video:player_loc>" + PLAYER_URL + "</video:player_loc></video:video></url>";
if (fs.existsSync(videoSitemapPath)) {
  let videoSitemap = fs.readFileSync(videoSitemapPath, "utf8");
  if (!videoSitemap.includes(WATCH_URL)) {
    videoSitemap = videoSitemap.replace(/<\/urlset>/i, videoEntry + "\n</urlset>");
    fs.writeFileSync(videoSitemapPath, videoSitemap);
  }
} else {
  fs.writeFileSync(videoSitemapPath, "<?xml version='1.0' encoding='UTF-8'?>\n<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9' xmlns:video='http://www.google.com/schemas/sitemap-video/1.1'>\n" + videoEntry + "\n</urlset>\n");
}

const robotsPath = path.join(PUBLIC, "robots.txt");
let robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, "utf8") : "User-agent: *\nAllow: /\n";
if (!robots.includes(SITE + "/video-sitemap.xml")) robots = robots.trim() + "\nSitemap: " + SITE + "/video-sitemap.xml\n";
fs.writeFileSync(robotsPath, robots);

console.log("Added featured video to " + injected + " service/blog/article pages and generated " + WATCH_URL);
