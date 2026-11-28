import fs from "node:fs";
import path from "node:path";

const PUBLIC = path.resolve("public");
const SITE = "https://www.fjxstudio.com";
const MARKER = 'id="fjx-topic-video"';

const categories = [
  {
    key: "bookkeeping",
    id: "n79G91ZHaaQ",
    title: "Bookkeeping and Accounting Services",
    description: "A video overview related to FJX Studio bookkeeping and accounting support for eCommerce businesses.",
    test: /bookkeep|accounting|accounts-payable|accounts-receivable|financial-record|reconciliation|ecommerce-finance/i
  },
  {
    key: "shopify",
    id: "iEaOxDyePso",
    title: "Shopify Store Management",
    description: "A video overview related to Shopify store management, product administration and eCommerce operations support.",
    test: /shopify/i
  },
  {
    key: "inksoft",
    id: "kiAg30RYmDs",
    title: "InkSoft Store Management",
    description: "A video overview related to InkSoft store setup, product catalog administration and team-store operations.",
    test: /inksoft/i
  },
  {
    key: "social-media",
    id: "2QzCZ3on6aI",
    title: "Social Media Management",
    description: "A video overview related to social media management, content coordination and eCommerce social support.",
    test: /social[- ]media|instagram-management|facebook-management|social-content/i
  },
  {
    key: "virtual-assistant",
    id: "U_7eHW9nd8w",
    title: "Virtual Assistant Services",
    description: "A video overview related to virtual assistant support for online stores and business operations.",
    test: /virtual[- ]assistant|virtual-assistant|remote-assistant|administrative-assistant/i
  },
  {
    key: "ecommerce",
    id: "U_7eHW9nd8w",
    title: "eCommerce Management Services",
    description: "A video overview related to eCommerce store management, product operations and online-store support.",
    test: /ecommerce|e-commerce|online-store|marketplace-management|product-upload|order-management|inventory-management/i
  }
];

function collect(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (file !== path.join(PUBLIC, "watch")) collect(file, out);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) out.push(file);
  }
  return out;
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function meta(html, key) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const name = (tag.match(/\bname=["']([^"']+)/i) || tag.match(/\bproperty=["']([^"']+)/i) || [])[1];
    if (name?.toLowerCase() === key.toLowerCase()) {
      return (tag.match(/\bcontent=["']([^"']*)/i) || [])[1] || "";
    }
  }
  return "";
}

const style = `
<style id="fjx-topic-video-styles">
.fjx-topic-video{width:100%;padding:clamp(38px,6vw,72px) 20px;background:linear-gradient(135deg,#f7faf3 0%,#eef4e8 100%);color:#202820;box-sizing:border-box}
.fjx-topic-video__inner{width:min(100%,1080px);margin:0 auto;text-align:center}
.fjx-topic-video__eyebrow{margin:0 0 9px;color:#638d2d;font-size:12px;font-weight:800;letter-spacing:.15em;text-transform:uppercase}
.fjx-topic-video__title{margin:0 auto;font-size:clamp(24px,3.8vw,36px);font-weight:800;line-height:1.2;letter-spacing:-.025em}
.fjx-topic-video__description{max-width:720px;margin:13px auto 25px;color:#586456;font-size:clamp(14px,1.8vw,17px);line-height:1.7}
.fjx-topic-video__frame{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:clamp(10px,1.6vw,18px);background:#101510;box-shadow:0 18px 48px rgba(25,40,20,.16)}
.fjx-topic-video__frame iframe{position:absolute;inset:0;width:100%;height:100%;display:block;border:0}
@media(max-width:600px){.fjx-topic-video{padding:36px 14px}.fjx-topic-video__description{margin-bottom:19px}}
@media(prefers-reduced-motion:reduce){.fjx-topic-video *{scroll-behavior:auto}}
</style>`;

let pagesUpdated = 0;
const videosAdded = new Set();

for (const file of collect(PUBLIC)) {
  let html = fs.readFileSync(file, "utf8");
  const relative = path.relative(PUBLIC, file).split(path.sep).join("/");
  const pageTitle = (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "";
  const haystack = (relative + " " + pageTitle).toLowerCase();
  const category = categories.find(item => item.test.test(haystack));
  if (!category) continue;

  const description = meta(html, "description") || category.description;
  const pageUrl = SITE + "/" + path.dirname(relative).split("/").filter(Boolean).join("/") + "/";
  const canonical = relative === "index.html" ? SITE + "/" : pageUrl;
  const embed = "https://www.youtube-nocookie.com/embed/" + category.id;
  const section = `
<section id="fjx-topic-video" class="fjx-topic-video" aria-labelledby="fjx-topic-video-title" data-video-category="${category.key}">
  <div class="fjx-topic-video__inner">
    <p class="fjx-topic-video__eyebrow">FJX Studio · Video Guide</p>
    <h2 class="fjx-topic-video__title" id="fjx-topic-video-title">${esc(category.title)}</h2>
    <p class="fjx-topic-video__description">${esc(description)}</p>
    <div class="fjx-topic-video__frame">
      <iframe src="${embed}" title="${esc(category.title)} | FJX Studio" width="1280" height="720" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  </div>
</section>
`;

  // Remove previously generated VideoObject markup until verified YouTube upload dates are available.
  html = html.replace(/<script\b[^>]*data-fjx-topic-video-schema[^>]*>[\s\S]*?<\/script>/i, "");
  // Replace any previous generated block, including a stale/empty video container.
  html = html.replace(/<section\b[^>]*id=["']fjx-topic-video["'][\s\S]*?<\/section>/i, "");
  html = html.replace(/<style\b[^>]*id=["']fjx-topic-video-styles["'][\s\S]*?<\/style>/i, "");
  const insertion = section + style;
  if (/<\/main>/i.test(html)) html = html.replace(/<\/main>/i, insertion + "\n</main>");
  else if (/<\/body>/i.test(html)) html = html.replace(/<\/body>/i, insertion + "\n</body>");
  else continue;

  fs.writeFileSync(file, html, "utf8");
  pagesUpdated++;
  videosAdded.add(category.id);
}

console.log("Added category-specific responsive video sections to " + pagesUpdated + " service pages (" + videosAdded.size + " distinct videos).");
