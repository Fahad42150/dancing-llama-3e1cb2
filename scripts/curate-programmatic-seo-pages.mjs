import fs from "node:fs";
import path from "node:path";

const publicDir = path.resolve("public");
const sitemapPath = path.join(publicDir, "sitemap.xml");

// Preserve all generated landing pages. Keep them indexable unless a page has
// a deliberate, individually reviewed SEO directive elsewhere in its source.
let restored = 0;
const pageDirs = fs.readdirSync(publicDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name.startsWith("best-"))
  .map((entry) => path.join(publicDir, entry.name));

for (const dir of pageDirs) {
  const file = path.join(dir, "index.html");
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  const robotsTag = /<meta\b[^>]*name=["']robots["'][^>]*>/i;
  if (robotsTag.test(html)) {
    html = html.replace(robotsTag, '<meta name="robots" content="index,follow">');
    fs.writeFileSync(file, html, "utf8");
    restored += 1;
  }
}

// Remove duplicate sitemap entries only. Do not remove pages based on their
// URL pattern; all existing landing-page URLs remain eligible for indexing.
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

  const rootOpen = sitemap.indexOf("<urlset");
  const rootClose = sitemap.indexOf(">", rootOpen);
  const header = rootOpen >= 0 && rootClose >= 0
    ? sitemap.slice(0, rootClose + 1)
    : '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  fs.writeFileSync(sitemapPath, header + "\n" + kept.join("\n") + "\n</urlset>\n", "utf8");
}

console.log("[seo-curation] preserved landing pages; restored index,follow on " + restored + " best-* page(s)");
