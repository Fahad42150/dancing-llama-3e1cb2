import fs from "node:fs";
import path from "node:path";

const publicDir = path.resolve("public");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const servicesPath = path.join(publicDir, "services", "index.html");

let noindexed = 0;
const curatedDirs = fs.readdirSync(publicDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name.startsWith("best-"))
  .map((entry) => path.join(publicDir, entry.name));

for (const dir of curatedDirs) {
  const file = path.join(dir, "index.html");
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  const robotsTag = /<meta\b[^>]*name=["']robots["'][^>]*>/i;
  if (robotsTag.test(html)) {
    html = html.replace(robotsTag, '<meta name="robots" content="noindex,follow">');
  } else {
    html = html.replace(/<\/head>/i, '<meta name="robots" content="noindex,follow">\n</head>');
  }
  fs.writeFileSync(file, html, "utf8");
  noindexed += 1;
}

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const seen = new Set();
  const blocks = sitemap.match(/<url\b[^>]*>[\s\S]*?<\/url>/gi) || [];
  const kept = [];
  let removedNoindex = 0;
  let removedDuplicates = 0;

  for (const block of blocks) {
    const loc = (block.match(/<loc>([\s\S]*?)<\/loc>/i) || [])[1]?.trim();
    if (!loc) {
      kept.push(block);
      continue;
    }
    const pathname = (() => {
      try { return new URL(loc).pathname; } catch { return ""; }
    })();
    if (pathname.split("/").filter(Boolean).some((part) => part.startsWith("best-"))) {
      removedNoindex += 1;
      continue;
    }
    if (seen.has(loc)) {
      removedDuplicates += 1;
      continue;
    }
    seen.add(loc);
    kept.push(block);
  }

  const rootOpen = sitemap.indexOf("<urlset");
  const rootClose = sitemap.indexOf(">", rootOpen);
  const header = rootOpen >= 0 && rootClose >= 0 ? sitemap.slice(0, rootClose + 1) : '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  fs.writeFileSync(sitemapPath, header + "\n" + kept.join("\n") + "\n</urlset>\n", "utf8");
  console.log("[seo-curation] sitemap removed " + removedNoindex + " noindex URL(s) and " + removedDuplicates + " duplicate URL(s)");
}

if (fs.existsSync(servicesPath)) {
  let html = fs.readFileSync(servicesPath, "utf8");
  html = html.replace(/<!-- virtual-assistant-keyword-pages -->[\s\S]*?<\/section>/i, "");
  fs.writeFileSync(servicesPath, html, "utf8");
}

console.log("[seo-curation] applied noindex to " + noindexed + " broad 'best-*' programmatic page(s)");
