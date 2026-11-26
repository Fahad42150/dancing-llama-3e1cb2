import fs from "node:fs";
import path from "node:path";

const SITE = "https://www.fjxstudio.com";
const PUBLIC = path.resolve("public");
const WATCH = path.join(PUBLIC, "watch");

// Keep hand-written metadata where it has already been reviewed.
const curated = [
  { id: "Vj_BSX5GKJo", slug: "inksoft-updated-add-product-workflow", title: "InkSoft Updated Add Product Workflow", description: "An InkSoft tutorial demonstrating the updated add-product workflow for preparing and maintaining products in an InkSoft store catalog." },
  { id: "0PNYIQFbWEo", slug: "inksoft-store-setup-and-configuration", title: "Setting Up and Configuring an InkSoft Store", description: "An InkSoft walkthrough focused on setting up and configuring an online store, with an overview of the storefront setup workflow." },
  { id: "_Eva3P9yD_s", slug: "inksoft-get-started-guide", title: "InkSoft Get Started Guide", description: "An introductory InkSoft guide covering the platform's getting-started workflow for businesses setting up and managing an online store." },
  { id: "SjJHmcJUK7c", slug: "ecommerce-inventory-management-overview", title: "eCommerce Inventory Management Services | FJX Studio", description: "An overview of FJX Studio eCommerce inventory management support, including SKU records, stock data updates, product availability, and inventory administration." },
  { id: "uSNRXjJ4TN4", slug: "inksoft-product-pricing-guide", title: "InkSoft Product Pricing Guide", description: "An InkSoft tutorial about product pricing setup and pricing-grid workflows for online apparel and merchandise stores." },
  { id: "UNZnBJAXynU", slug: "promotional-products-store-management-overview", title: "Promotional Products Store Management | FJX Studio", description: "An overview of FJX Studio promotional products store management, including branded merchandise catalogs, product uploads, artwork coordination, pricing updates, and store administration." },
  { id: "bErj1J7rQvc", slug: "canva-graphic-design-services-overview", title: "Canva Graphic Design Services | FJX Studio", description: "An overview of FJX Studio Canva graphic design services for branded marketing graphics, business visuals, promotional designs, and editable Canva assets." },
  { id: "Byk9Qkxuk4s", slug: "email-management-virtual-assistant-overview", title: "Email Management Virtual Assistant | FJX Studio", description: "An overview of FJX Studio email management virtual assistant support, including inbox organization, customer email handling, follow-ups, and routine communication administration." },
  { id: "kiAg30RYmDs", slug: "fjx-studio-bookkeeping-administrative-support", title: "FJX Studio Bookkeeping Administrative Support", description: "A video overview of FJX Studio bookkeeping administrative support, including receipt organization, invoice administration, record preparation and routine financial workflow assistance for small businesses." },
  { id: "U_7eHW9nd8w", slug: "virtual-assistant-services", title: "Virtual Assistant Services | FJX Studio", description: "A video overview related to virtual assistant support for online stores and business operations." }
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function cdata(value) {
  return String(value).replace(/]]>/g, "]]]]><![CDATA[>");
}
function slugify(value) {
  return String(value).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72);
}
function attr(tag, name) {
  const attributes = [...tag.matchAll(/([^\s=]+)\s*=\s*(["'])(.*?)\2/gi)];
  const match = attributes.find(item => item[1].toLowerCase() === name.toLowerCase());
  return match ? match[3].trim() : "";
}
function metaContent(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const key = attr(tag, "name") || attr(tag, "property");
    if (key.toLowerCase() === name.toLowerCase()) return attr(tag, "content");
  }
  return "";
}
function plain(value) {
  return String(value || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&").replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ").trim();
}
function collect(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (file !== WATCH) collect(file, out);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      out.push(file);
    }
  }
  return out;
}
function discoverVideos(files) {
  const found = new Map();
  const missingMetadata = new Set();
  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const pageTitle = plain((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1]);
    const pageDescription = plain(metaContent(html, "description") || metaContent(html, "og:description") || metaContent(html, "twitter:description"));
    const relativeDirectory = path.relative(PUBLIC, path.dirname(file));
    const pageUrl = file === rootIndex || relativeDirectory === "." ? SITE + "/" : SITE + "/" + relativeDirectory.split(path.sep).filter(Boolean).join("/") + "/";
    const frames = html.match(/<iframe\b[^>]*>/gi) || [];
    let frameIndex = 0;
    for (const frame of frames) {
      const src = attr(frame, "src");
      const match = src.match(/(?:youtube(?:-nocookie)?\.com\/(?:embed|shorts)\/|youtu\.be\/)([A-Za-z0-9_-]{11})/i);
      if (!match) continue;
      const id = match[1];
      frameIndex += 1;
      if (found.has(id)) continue;
      const frameTitle = plain(attr(frame, "title"));
      const usefulFrameTitle = frameTitle && !/youtube|video player|embedded content|^player$/i.test(frameTitle);
      const title = (usefulFrameTitle ? frameTitle : pageTitle).slice(0, 100);
      const description = pageDescription.slice(0, 2048);
      if (!title || !description) {
        missingMetadata.add(id);
        continue;
      }
      const baseSlug = slugify(title) || "video";
      const slug = baseSlug + "-" + id.toLowerCase();
      found.set(id, { id, slug, title, description, sourceUrl: pageUrl });
    }
  }
  return { videos: [...found.values()], missingMetadata };
}
async function resolveUploadDate(videoId) {
  try {
    const response = await fetch("https://www.youtube.com/feeds/videos.xml?video_id=" + encodeURIComponent(videoId));
    if (!response.ok) return "";
    const xml = await response.text();
    const startTag = "<published>";
    const endTag = "</published>";
    const start = xml.indexOf(startTag);
    if (start === -1) return "";
    const end = xml.indexOf(endTag, start + startTag.length);
    if (end === -1) return "";
    const published = xml.slice(start + startTag.length, end).trim();
    if (!published) return "";
    const date = new Date(published);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  } catch {
    return "";
  }
}

function page(video) {
  const url = SITE + "/watch/" + video.slug + "/";
  const player = "https://www.youtube-nocookie.com/embed/" + video.id;
  const thumbnail = "https://i.ytimg.com/vi/" + video.id + "/hqdefault.jpg";
  const title = esc(video.title);
  const description = esc(video.description);
  const videoSchema = video.uploadDate ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [thumbnail],
    embedUrl: player,
    contentUrl: "https://www.youtube.com/watch?v=" + video.id,
    uploadDate: video.uploadDate,
    publisher: { "@type": "Organization", name: "FJX Studio", url: SITE + "/" }
  }) : "";
  const sourceLink = video.sourceUrl
    ? "<p class='watch-source'>Related FJX Studio page: <a href='" + esc(video.sourceUrl) + "'>View the related guide or service page</a></p>"
    : "";
  return [
    "<!doctype html>", "<html lang='en'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'>",
    "<title>" + title + " | FJX Studio</title><meta name='description' content='" + description + "'><meta name='robots' content='index,follow,max-video-preview:-1'>",
    "<link rel='canonical' href='" + url + "'><meta property='og:type' content='video.other'><meta property='og:title' content='" + title + " | FJX Studio'>",
    videoSchema ? "<script type='application/ld+json'>" + videoSchema + "</script>" : "",
    "<meta property='og:description' content='" + description + "'><meta property='og:url' content='" + url + "'><meta property='og:image' content='" + thumbnail + "'><meta property='og:video' content='" + player + "'><meta property='og:video:type' content='text/html'>",
    "<meta name='twitter:card' content='player'><meta name='twitter:title' content='" + title + " | FJX Studio'><meta name='twitter:description' content='" + description + "'><meta name='twitter:image' content='" + thumbnail + "'><meta name='twitter:player' content='" + player + "'><meta name='twitter:player:width' content='1280'><meta name='twitter:player:height' content='720'>",
    "<style>*{box-sizing:border-box}html{background:#101510}body{margin:0;min-width:320px;background:#101510;color:#f7faf5;font-family:Arial,Helvetica,sans-serif}.watch-shell{width:min(1100px,calc(100% - 40px));margin:0 auto;padding:36px 0 52px}.watch-brand{display:inline-block;margin-bottom:28px;color:#b4ec7c;text-decoration:none;font-size:18px;font-weight:800}.watch-label{margin:0 0 10px;color:#b4ec7c;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}h1{max-width:900px;margin:0 0 14px;font-size:clamp(27px,5vw,44px);line-height:1.15}.watch-description{max-width:820px;margin:0 0 24px;color:#c7d0c4;font-size:17px;line-height:1.65}.watch-player{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:16px;background:#000;box-shadow:0 18px 54px rgba(0,0,0,.35)}.watch-player iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.watch-source{margin-top:22px;color:#c7d0c4;font-size:14px}.watch-source a,.watch-footer a{color:#b4ec7c}.watch-footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px;margin-top:24px;padding-top:20px;border-top:1px solid #344034;color:#aeb9aa;font-size:14px}@media(max-width:600px){.watch-shell{width:calc(100% - 28px);padding:24px 0 36px}.watch-player{border-radius:10px}.watch-description{font-size:15px}}</style>",
    "</head><body><main class='watch-shell'><a class='watch-brand' href='" + SITE + "/' aria-label='FJX Studio home'>FJX Studio</a><p class='watch-label'>Video</p><h1>" + title + "</h1><p class='watch-description'>" + description + "</p>",
    "<div class='watch-player'><iframe src='" + player + "' title='" + title + "' width='1280' height='720' loading='eager' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe></div>",
    sourceLink, "<div class='watch-footer'><span>Video hosted on YouTube and presented by FJX Studio.</span><a href='" + SITE + "/'>Explore FJX Studio</a></div></main></body></html>"
  ].join("\n");
}
function addWatchLinks(file, videos) {
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<section\b[^>]*id=['"]fjx-video-watch-links['"][\s\S]*?<\/section>/i, "");
  const ids = new Set();
  const frames = html.match(/<iframe\b[^>]*>/gi) || [];
  for (const frame of frames) {
    const src = attr(frame, "src");
    const match = src.match(/(?:youtube(?:-nocookie)?\.com\/(?:embed|shorts)\/|youtu\.be\/)([A-Za-z0-9_-]{11})/i);
    if (match) ids.add(match[1]);
  }
  const linked = videos.filter(video => ids.has(video.id));
  if (!linked.length) return;
  const links = linked.map(video => "<li><a href='/watch/" + video.slug + "/'>" + esc(video.title) + " — watch on FJX Studio</a></li>").join("");
  const block = "<section id='fjx-video-watch-links' class='fjx-video-watch-links' aria-label='Watch video on FJX Studio'><h2>Watch this video on FJX Studio</h2><ul>" + links + "</ul></section><style>.fjx-video-watch-links{max-width:1100px;margin:24px auto;padding:18px 20px;border:1px solid #e5eadf;border-radius:12px;background:#f7faf3;color:#263126}.fjx-video-watch-links h2{margin:0 0 10px;font-size:16px;line-height:1.35}.fjx-video-watch-links ul{margin:0;padding-left:20px}.fjx-video-watch-links li+li{margin-top:7px}.fjx-video-watch-links a{color:#426d20;font-weight:700;text-decoration:underline;text-underline-offset:3px}@media(max-width:640px){.fjx-video-watch-links{margin:18px 14px;padding:16px}}</style>";
  if (/<\/main>/i.test(html)) html = html.replace(/<\/main>/i, block + "\n</main>");
  else html = html.replace(/<\/body>/i, block + "\n</body>");
  fs.writeFileSync(file, html);
}

const htmlFiles = collect(PUBLIC);
const rootIndex = path.resolve("index.html");
if (fs.existsSync(rootIndex)) htmlFiles.push(rootIndex);

const discovered = discoverVideos(htmlFiles);
const all = new Map(discovered.videos.map(video => [video.id, video]));
for (const video of curated) all.set(video.id, { ...video, sourceUrl: all.get(video.id)?.sourceUrl || "" });
const videos = await Promise.all([...all.values()].map(async video => ({
  ...video,
  uploadDate: await resolveUploadDate(video.id)
})));
const videosWithoutUploadDate = videos.filter(video => !video.uploadDate);
if (videosWithoutUploadDate.length) {
  console.warn("VideoObject structured data was omitted for " + videosWithoutUploadDate.length +
    " video(s) because YouTube did not provide a publication date. No placeholder dates were added.");
}

fs.mkdirSync(WATCH, { recursive: true });
for (const video of videos) {
  const directory = path.join(WATCH, video.slug);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), page(video));
}
htmlFiles.forEach(file => addWatchLinks(file, videos));

const entries = videos.map(video => {
  const thumbnail = "https://i.ytimg.com/vi/" + video.id + "/hqdefault.jpg";
  const player = "https://www.youtube-nocookie.com/embed/" + video.id;
  return "<url><loc>" + SITE + "/watch/" + video.slug + "/</loc><video:video><video:thumbnail_loc>" + thumbnail + "</video:thumbnail_loc><video:title><![CDATA[" + cdata(video.title) + "]]></video:title><video:description><![CDATA[" + cdata(video.description) + "]]></video:description><video:player_loc>" + player + "</video:player_loc></video:video></url>";
}).join("\n");
fs.writeFileSync(path.join(PUBLIC, "video-sitemap.xml"), "<?xml version='1.0' encoding='UTF-8'?>\n<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9' xmlns:video='http://www.google.com/schemas/sitemap-video/1.1'>\n" + entries + "\n</urlset>\n");

const sitemapPath = path.join(PUBLIC, "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  const missing = videos.filter(video => !sitemap.includes(SITE + "/watch/" + video.slug + "/"));
  if (missing.length) {
    const urls = missing.map(video => "<url><loc>" + SITE + "/watch/" + video.slug + "/</loc></url>").join("\n");
    sitemap = sitemap.replace(/<\/urlset>/i, urls + "\n</urlset>");
    fs.writeFileSync(sitemapPath, sitemap);
  }
}
const robotsPath = path.join(PUBLIC, "robots.txt");
let robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, "utf8") : "User-agent: *\nAllow: /\n";
if (!robots.includes(SITE + "/video-sitemap.xml")) robots = robots.trim() + "\nSitemap: " + SITE + "/video-sitemap.xml\n";
fs.writeFileSync(robotsPath, robots);

console.log("Generated " + videos.length + " dedicated video watch pages and video sitemap entries. " +
  discovered.missingMetadata.size + " discovered video(s) were skipped because their source pages lack a title or meta description.");
