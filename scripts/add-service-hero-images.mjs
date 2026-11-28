import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const imageTopics = [
  { test: /bookkeep|account|invoice|payable|receivable|quickbooks|finance/i, url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=82", label: "Bookkeeping and financial administration" },
  { test: /shopify|ecommerce|e-commerce|amazon|ebay|walmart|marketplace|online store|product catalog/i, url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=82", label: "Ecommerce store management" },
  { test: /social media|instagram|facebook|content marketing/i, url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=82", label: "Social media management" },
  { test: /real estate|property|realtor|transaction coordinator/i, url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=82", label: "Real estate administration" },
  { test: /medical|healthcare|clinic|patient/i, url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=82", label: "Healthcare administrative support" },
  { test: /data entry|data management|research|analytics/i, url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=82", label: "Data and research support" },
  { test: /executive|administrative|freelance|virtual assistant|personal assistant|customer service|project management/i, url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=82", label: "Remote virtual assistant working at a laptop" }
];
const fallback = { url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=82", label: "Professional business support workspace" };

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) out.push(full);
  }
  return out;
}
function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function matchingClose(html, openIndex, tagName) {
  const re = new RegExp("<\\/?"+tagName+"\\b[^>]*>", "gi");
  re.lastIndex = openIndex;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    if (m[0].startsWith("</")) depth--;
    else if (!/\/\s*>$/.test(m[0])) depth++;
    if (depth === 0) return { start: m.index, end: re.lastIndex };
  }
  return null;
}
function addVisual(html, file) {
  const heroOpen = /<section\b[^>]*class=["'][^"']*\bhero\b[^"']*["'][^>]*>/i.exec(html);
  if (!heroOpen) return null;
  const heroClose = matchingClose(html, heroOpen.index, "section");
  if (!heroClose) return null;
  const hero = html.slice(heroOpen.index, heroClose.end);
  if (/<img\b/i.test(hero)) return null;
  const h1 = (hero.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [,""])[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const title = (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [,""])[1].replace(/<[^>]+>/g, " ").trim();
  const context = file + " " + title + " " + h1;
  if (!/(service|virtual assistant|ecommerce|e-commerce|bookkeep|administrative|customer support|real estate|data entry)/i.test(context)) return null;
  const wrapOpen = /<div\b[^>]*class=["'][^"']*\bwrap\b[^"']*["'][^>]*>/i.exec(hero);
  if (!wrapOpen) return null;
  const absoluteWrapOpen = heroOpen.index + wrapOpen.index;
  const wrapClose = matchingClose(html, absoluteWrapOpen, "div");
  if (!wrapClose || wrapClose.start > heroClose.start) return null;
  const topic = imageTopics.find(item => item.test.test(context)) || fallback;
  const alt = escapeAttr("FJX Studio " + topic.label + " — " + (h1 || title));
  const visual = '<figure class="fjx-service-hero-visual"><img src="' + topic.url + '" alt="' + alt + '" width="1400" height="1050" loading="eager" fetchpriority="high" decoding="async"></figure>';
  const wrapTag = html.slice(absoluteWrapOpen, html.indexOf(">", absoluteWrapOpen) + 1);
  const updatedWrapTag = wrapTag.replace(/class=(["'])([^"']*)\1/i, (all, quote, classes) => 'class=' + quote + classes + ' fjx-hero-grid' + quote);
  let result = html.slice(0, absoluteWrapOpen) + updatedWrapTag + '<div class="fjx-hero-copy">' +
    html.slice(absoluteWrapOpen + wrapTag.length, wrapClose.start) +
    '</div>' + visual + html.slice(wrapClose.start);
  if (!/id=["']fjx-service-hero-visual-styles["']/.test(result)) {
    const styles = '<style id="fjx-service-hero-visual-styles">.fjx-hero-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(280px,.92fr);gap:clamp(28px,5vw,64px);align-items:center}.fjx-hero-copy{min-width:0}.fjx-service-hero-visual{margin:0;min-width:0;overflow:hidden;border:1px solid rgba(32,35,38,.08);border-radius:22px;background:#f3f5f1;box-shadow:0 18px 48px rgba(32,35,38,.12);aspect-ratio:4/3}.fjx-service-hero-visual img{display:block;width:100%;height:100%;object-fit:cover;object-position:center}.hero .fjx-hero-grid{max-width:1120px}@media(max-width:760px){.fjx-hero-grid{grid-template-columns:1fr;gap:24px}.fjx-service-hero-visual{max-height:340px;aspect-ratio:16/10}}</style>';
    result = result.replace(/<\/head>/i, styles + "</head>");
  }
  return result;
}
let updated = 0;
const files = [...walk(publicDir), path.join(root, "index.html")].filter(file => fs.existsSync(file));
for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const result = addVisual(original, path.relative(root, file).replace(/\\/g, "/"));
  if (result && result !== original) {
    fs.writeFileSync(file, result, "utf8");
    updated++;
  }
}
console.log("[service-hero-images] Added relevant responsive hero images to " + updated + " service page(s); existing hero images and all video embeds were preserved.");
