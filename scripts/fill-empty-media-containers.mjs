import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const imageByTopic = [
  { test: /bookkeep|account|invoice|payable|receivable|quickbooks|finance|tax/i, url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=82", label: "bookkeeping and financial records" },
  { test: /shopify|ecommerce|e-commerce|amazon|ebay|walmart|marketplace|store|product|order|inventory/i, url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=82", label: "ecommerce store operations" },
  { test: /social|instagram|facebook|content|marketing/i, url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=82", label: "social media content planning" },
  { test: /real-estate|property|realtor|transaction/i, url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=82", label: "real estate administration" },
  { test: /medical|health|clinic|patient/i, url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=82", label: "healthcare administration" },
  { test: /design|graphic|creative|apparel|inksoft|print/i, url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=82", label: "creative production workflow" },
  { test: /data|research|analytics|technology|ai|automation/i, url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=82", label: "data and technology workflow" }
];
const defaultImage = { url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=82", label: "professional virtual assistant workspace" };

function collect(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) collect(file, out);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) out.push(file);
  }
  return out;
}
function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function titleFor(html, file) {
  const title = (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || path.basename(path.dirname(file)).replace(/[-_]+/g, " ");
  return title.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
let containersFilled = 0;
let pagesUpdated = 0;
for (const file of [...collect(publicDir), path.join(root, "index.html")]) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  const pageTitle = titleFor(html, file);
  const relative = path.relative(root, file).replace(/\\/g, "/");
  const topic = imageByTopic.find(item => item.test.test(relative + " " + pageTitle)) || defaultImage;
  const alt = escapeAttr("FJX Studio " + topic.label + " — " + pageTitle);
  const image = '<img src="' + topic.url + '" alt="' + alt + '" width="1400" height="788" loading="lazy" decoding="async" style="display:block;width:100%;height:100%;object-fit:cover">';
  const emptyDiv = /<div\b(?=[^>]*\bclass=["'][^"']*(?:video|media|embed)[^"']*["'])[^>]*>\s*<\/div>/gi;
  const matches = [...html.matchAll(emptyDiv)];
  if (!matches.length) continue;
  html = html.replace(emptyDiv, match => {
    containersFilled += 1;
    return match.replace(/>\s*<\/div>$/, ">" + image + "</div>");
  });
  fs.writeFileSync(file, html, "utf8");
  pagesUpdated += 1;
}
console.log("[empty-media-images] Populated " + containersFilled + " empty media container(s) across " + pagesUpdated + " page(s); existing media and container markup were preserved.");
