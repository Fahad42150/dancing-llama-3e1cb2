import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const styleId = "fjx-sitewide-responsive-css";
const css = String.raw`
/* FJX Studio site-wide alignment and responsive layout layer */
:root { color-scheme: light; }
*, *::before, *::after { box-sizing: border-box; }
html { width: 100%; max-width: 100%; scroll-padding-top: 24px; -webkit-text-size-adjust: 100%; }
body { width: 100%; max-width: 100%; min-width: 320px; margin-inline: auto; overflow-x: clip; }
img, picture, video, canvas, svg { max-width: 100%; }
img, video { height: auto; }
iframe { max-width: 100%; }
main, header, footer, section, article, aside, nav, figure { min-width: 0; }
:where(.wrap, .container, .content, .page-content, .fjx-reviews-wrap, .fjx-price-wrap) {
  width: min(100% - 40px, 1120px);
  max-width: 1120px;
  margin-inline: auto;
}
:where(h1, h2, h3, h4, p, li, a, button, label, figcaption) { overflow-wrap: anywhere; }
h1 { max-width: 100%; text-wrap: balance; }
h2, h3 { text-wrap: balance; }
p { text-wrap: pretty; }
:where(.grid, .contact-grid, .fjx-review-grid, .fjx-card-grid, .cards, .services-grid, .features-grid) {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 245px), 1fr));
}
:where(.grid, .contact-grid, .fjx-review-grid, .fjx-card-grid, .cards, .services-grid, .features-grid) > * { min-width: 0; }
:where(input, select, textarea, button) { max-width: 100%; font: inherit; }
textarea { width: 100%; }
table { width: 100%; border-collapse: collapse; }
:where(.table-wrap, .table-responsive, pre) { max-width: 100%; overflow-x: auto; }
:where(.video, .hero-video-card, .video-container, .video-wrapper, .embed-container) {
  max-width: 100%;
}
:where(.video iframe, .hero-video-card iframe, .video-container iframe, .video-wrapper iframe, .embed-container iframe) {
  display: block; width: 100%; max-width: 100%;
}
:where(.hero, .section, .contact-section, .fjx-reviews-section, .fjx-price-section) { min-width: 0; }
:where(.hero, .section) > .wrap { min-width: 0; }
:where(.hero img, .section img, .item img, .contact-card img) { max-width: 100%; }
:where(.cta, .button, .btn, .contact-action, a[role="button"], button) { min-height: 42px; }
:where(.links, .hero-actions, .cta-row, .button-row) { display: flex; flex-wrap: wrap; gap: 12px; }
:where(.links, .hero-actions, .cta-row, .button-row) > * { min-width: 0; }
#fjx-book-now-nav { max-width: calc(100vw - 32px); }
@media (min-width: 1440px) {
  :where(.wrap, .container, .content, .page-content, .fjx-reviews-wrap, .fjx-price-wrap) { width: min(100% - 64px, 1200px); max-width: 1200px; }
}
@media (max-width: 900px) {
  :where(.fjx-price-wrap, .hero-grid, .two-column, .split-layout, .content-grid) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  :where(.hero, .section, .contact-section, .fjx-reviews-section) { scroll-margin-top: 16px; }
}
@media (max-width: 720px) {
  :where(.wrap, .container, .content, .page-content, .fjx-reviews-wrap, .fjx-price-wrap) {
    width: calc(100% - 32px);
  }
  :where(.hero, .section, .contact-section, .fjx-reviews-section, .fjx-price-section) { padding-block: 42px; }
  :where(.fjx-price-wrap, .hero-grid, .two-column, .split-layout, .content-grid, .hero-media-grid) {
    grid-template-columns: minmax(0, 1fr);
  }
  :where(.contact-grid) { grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }
  :where(.hero h1, h1) { font-size: clamp(2rem, 8vw, 3.25rem); line-height: 1.12; }
  :where(.lead) { font-size: clamp(1rem, 3.8vw, 1.125rem); }
  :where(.hero-media-grid) { width: 100%; }
  :where(.hero-media-grid > *, .fjx-service-hero-visual) { min-width: 0; }
  #fjx-book-now-nav { top: 10px !important; right: 16px !important; padding: 9px 12px !important; font-size: 12px !important; }
  header:has(#fjx-book-now-nav) > :first-child { padding-right: 112px; }
}
@media (max-width: 420px) {
  :where(.wrap, .container, .content, .page-content, .fjx-reviews-wrap, .fjx-price-wrap) { width: calc(100% - 28px); }
  :where(.grid, .contact-grid, .fjx-review-grid, .fjx-card-grid, .cards, .services-grid, .features-grid) {
    grid-template-columns: minmax(0, 1fr);
  }
  :where(.item, .contact-card, .fjx-review-card, .fjx-price-card) { padding: 18px; }
  :where(.cta, .button, .btn, .contact-action) { max-width: 100%; white-space: normal; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) out.push(full);
  }
  return out;
}
const files = [...walk(publicDir), path.join(root, "index.html")].filter(fs.existsSync);
let updated = 0;
for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  if (!/<head\b/i.test(original) || !/<\/head>/i.test(original)) continue;
  const style = '<style id="' + styleId + '">' + css + '</style>';
  const existing = new RegExp('<style\\b(?=[^>]*\\bid=["\\']' + styleId + '["\\'])[^>]*>[\\s\\S]*?<\\/style>', "i");
  const next = existing.test(original)
    ? original.replace(existing, style)
    : original.replace(/<\/head>/i, style + "\\n</head>");
  if (next !== original) { fs.writeFileSync(file, next, "utf8"); updated++; }
}
console.log("[responsive-css] Applied shared responsive alignment styles to " + updated + " HTML page(s).");
