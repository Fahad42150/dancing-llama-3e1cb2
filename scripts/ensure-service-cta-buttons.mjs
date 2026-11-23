import fs from "node:fs";
import path from "node:path";

const root = path.resolve("public");
const excluded = new Set(["blog", "articles", "pricing", "services", "portfolio", "contact"]);
const STYLE = `
<style id="fjx-service-primary-cta-style">
.fjx-service-primary-cta{padding:30px 20px;margin:28px auto;max-width:1120px;border:1px solid #e2ebd9;border-radius:18px;background:#f5f8ef;display:flex;align-items:center;justify-content:space-between;gap:22px}
.fjx-service-primary-cta h2{margin:0 0 7px;color:#202326;font-size:clamp(21px,3vw,27px);line-height:1.25}
.fjx-service-primary-cta p{margin:0;color:#626b70;max-width:680px}
.fjx-service-primary-cta a{display:inline-flex;align-items:center;justify-content:center;gap:10px;flex:0 0 auto;padding:14px 21px;border-radius:10px;background:#9fe870;color:#17210f!important;text-decoration:none!important;font-weight:800;line-height:1.2;transition:background-color .18s ease,transform .18s ease}
.fjx-service-primary-cta a:hover{background:#8fd75b;transform:translateY(-2px)}
.fjx-service-primary-cta a:focus-visible{outline:3px solid #679d37;outline-offset:3px}
@media(max-width:650px){.fjx-service-primary-cta{align-items:flex-start;flex-direction:column;padding:24px 20px;margin:22px auto}.fjx-service-primary-cta a{width:100%}}
@media(prefers-reduced-motion:reduce){.fjx-service-primary-cta a{transition:none}.fjx-service-primary-cta a:hover{transform:none}}
</style>`;

let updated = 0;
let alreadyHasCta = 0;
let skipped = 0;

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || excluded.has(entry.name)) continue;
  const file = path.join(root, entry.name, "index.html");
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, "utf8");
  if (!/<main\b/i.test(html)) { skipped++; continue; }
  if (/id=["']fjx-service-primary-cta["']/.test(html)) { alreadyHasCta++; continue; }

  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) { skipped++; continue; }
  const main = mainMatch[1];

  const hasPrimaryCta =
    /<a\b[^>]*class=["'][^"']*(?:\bcta\b|\bbtn\b|\bbutton\b|fjx-price-cta)[^"']*["'][^>]*>/i.test(main) ||
    /<a\b[^>]*href=["'](?:#contact|\/contact\/?)(?:["'])[^>]*>[^<]*(?:request|contact|discuss|get started|book|start|talk|quote|consult)/i.test(main);

  if (hasPrimaryCta) { alreadyHasCta++; continue; }

  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const pageTitle = (h1?.[1] || entry.name.replace(/-/g, " "))
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

  const contactAnchor = /<section\b[^>]*id=["']contact["'][^>]*>/i.test(main);
  const destination = contactAnchor ? "#contact" : "/contact/";
  const cta = `
<section id="fjx-service-primary-cta" class="fjx-service-primary-cta" aria-label="Discuss this service">
  <div>
    <h2>Ready to get started with ${escapeHtml(pageTitle)}?</h2>
    <p>Tell FJX Studio about your requirements and we'll discuss the right support for your business.</p>
  </div>
  <a href="${destination}">Discuss This Service <span aria-hidden="true">→</span></a>
</section>`;

  let updatedMain;
  if (contactAnchor) {
    updatedMain = main.replace(/<section\b[^>]*id=["']contact["'][^>]*>/i, cta + "\n$&");
  } else {
    updatedMain = main + "\n" + cta + "\n";
  }
  html = html.replace(mainMatch[0], mainMatch[0].replace(main, updatedMain));

  if (!/id=["']fjx-service-primary-cta-style["']/.test(html)) {
    html = html.replace(/<\/head>/i, STYLE + "\n</head>");
  }

  fs.writeFileSync(file, html);
  updated++;
}

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

console.log(`Added consistent primary CTA buttons to ${updated} service pages; ${alreadyHasCta} already had a primary CTA; skipped ${skipped} pages without a main content area.`);
