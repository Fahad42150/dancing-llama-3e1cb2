import fs from "node:fs";
import path from "node:path";

const publicDir = path.resolve("public");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const siteOrigin = "https://www.fjxstudio.com";

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (entry.isFile() && entry.name.toLowerCase() === "index.html") files.push(fullPath);
  }
  return files;
}

const htmlFiles = walk(publicDir);
const canonicalPages = [];
let restoredBestPages = 0;

for (const file of htmlFiles) {
  const relative = path.relative(publicDir, file);
  const segments = relative.split(path.sep);
  const isBestLandingPage = segments.some((segment) => segment.startsWith("best-"));
  let html = fs.readFileSync(file, "utf8");

  if (isBestLandingPage) {
    const robotsPattern = /<meta\b[^>]*name=["']robots["'][^>]*>/i;
    const robotsTag = html.match(robotsPattern)?.[0] || "";
    if (/noindex/i.test(robotsTag)) {
      html = html.replace(robotsPattern, '<meta name="robots" content="index,follow">');
      fs.writeFileSync(file, html, "utf8");
      restoredBestPages += 1;
    } else if (!robotsTag) {
      html = html.replace(/<\/head>/i, '<meta name="robots" content="index,follow">\n</head>');
      fs.writeFileSync(file, html, "utf8");
      restoredBestPages += 1;
    }
  }

  const robotsTag = html.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i)?.[0] || "";
  if (/noindex/i.test(robotsTag)) continue;

  const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1]
    || html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i)?.[1];
  if (!canonical) continue;

  try {
    const parsed = new URL(canonical, siteOrigin);
    if (parsed.origin !== siteOrigin) continue;
    canonicalPages.push(parsed.href);
  } catch {
    // Ignore malformed canonical URLs rather than adding invalid sitemap entries.
  }
}

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const seen = new Set();
  const blocks = sitemap.match(/<url\b[^>]*>[\s\S]*?<\/url>/gi) || [];
  const kept = [];

  for (const block of blocks) {
    const loc = (block.match(/<loc>([\s\S]*?)<\/loc>/i) || [])[1]?.trim();
    if (loc && seen.has(loc)) continue;
    if (loc) seen.add(loc);
    kept.push(block);
  }

  let added = 0;
  for (const url of canonicalPages) {
    if (seen.has(url)) continue;
    seen.add(url);
    kept.push("  <url><loc>" + url.replaceAll("&", "&amp;") + "</loc></url>");
    added += 1;
  }

  const rootOpen = sitemap.indexOf("<urlset");
  const rootClose = sitemap.indexOf(">", rootOpen);
  const header = rootOpen >= 0 && rootClose >= 0
    ? sitemap.slice(0, rootClose + 1)
    : '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  fs.writeFileSync(sitemapPath, header + "\n" + kept.join("\n") + "\n</urlset>\n", "utf8");
  console.log("[seo-curation] sitemap kept " + kept.length + " unique existing/generated URL(s) and added " + added + " canonical page(s)");
}

console.log("[seo-curation] scanned " + htmlFiles.length + " HTML pages; restored indexability on " + restoredBestPages + " best-* page(s)");
