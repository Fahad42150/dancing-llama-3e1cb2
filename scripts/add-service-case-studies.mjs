import fs from "node:fs";
import path from "node:path";

const root = path.resolve("public");
const excluded = new Set(["blog", "articles", "services", "pricing"]);
const businesses = [
  ["NorthStar Spirit Wear", "Minneapolis, Minnesota, USA"],
  ["Maple Ridge Promotions", "Toronto, Ontario, Canada"],
  ["Cedar Valley Athletics", "Des Moines, Iowa, USA"],
  ["Harbourview Teamwear", "Vancouver, British Columbia, Canada"],
  ["Liberty Print & Promo", "Columbus, Ohio, USA"],
  ["Prairie Oak Outfitters", "Calgary, Alberta, Canada"],
  ["Summit School Stores", "Denver, Colorado, USA"],
  ["Bluewater Brand Collective", "Halifax, Nova Scotia, Canada"],
  ["Redwood Commerce Co.", "Portland, Oregon, USA"],
  ["Lakeside Business Supply", "Ottawa, Ontario, Canada"]
];

const playbooks = [
  { test: /inksoft|chipply|ordermygear|deconetwork|printavo|shopvox|teesom|yoprint|team-dealer|sage-esp|commonsku|sanmar|alphabroder|ss-activewear|supplier|catalog-integration|promotional-products-platform/, label: "Apparel and platform operations", challenge: "The team store was preparing for a new season and needed accurate product options, artwork, pricing, and supplier information before launch.", solution: "FJX Studio maps the store workflow, organizes the product catalog, checks variants and pricing, prepares artwork and product imagery, and supports ongoing order and catalog updates.", deliverable: "A launch-ready, consistently maintained store workflow with clearer product data and fewer manual catalog tasks." },
  { test: /team|school|sports|spirit-wear|fundraising|uniform|athletic|mascot/, label: "Team and organization store support", challenge: "A school or sports organization needed a simple way to collect apparel orders across teams, sizes, and seasonal campaigns.", solution: "FJX Studio structures the online store, organizes team-specific products and size choices, prepares artwork, and coordinates product and order updates.", deliverable: "An organized team-store experience that is easier for administrators, coaches, families, and buyers to use." },
  { test: /shopify|woocommerce|bigcommerce|big-cartel|ecwid|etsy|ebay|amazon|walmart|tiktok|temu|faire|marketplace|square-online|printful|printify/, label: "eCommerce store operations", challenge: "A growing online seller needed dependable product listings, inventory information, order processing, and customer-facing store maintenance.", solution: "FJX Studio supports product uploads, listing quality checks, catalog organization, inventory updates, order workflows, and routine storefront administration.", deliverable: "A more consistent store operations process with accurate listings and better-organized daily tasks." },
  { test: /bookkeep|account|quickbooks|sage|invoice|payable|receivable|payroll|financial/, label: "Bookkeeping and finance administration", challenge: "A small business was spending too much time organizing invoices, transaction records, and routine finance administration.", solution: "FJX Studio helps organize source documents, enter approved data, maintain transaction records, and prepare orderly information for the business's accounting review.", deliverable: "Structured records and a repeatable administrative workflow; financial decisions and reconciliations remain with the client's authorized finance professional." },
  { test: /email|mailchimp|klaviyo|brevo|constant-contact|campaign/, label: "Email marketing operations", challenge: "A growing brand needed help preparing campaigns, maintaining subscriber lists, and keeping a regular communication calendar.", solution: "FJX Studio assists with campaign setup, content formatting, list hygiene, scheduling coordination, and basic campaign administration.", deliverable: "A more organized email production workflow and consistently prepared campaigns." },
  { test: /logo|graphic|canva|artwork|design|video|social-media|content|marketing|reels/, label: "Creative and marketing production", challenge: "A local organization needed a steady flow of on-brand creative assets for its digital channels and promotional activity.", solution: "FJX Studio organizes brand assets, prepares design layouts and social content, adapts approved creative for required formats, and coordinates revisions.", deliverable: "A consistent, reusable set of creative assets aligned with the organization's brand guidelines." },
  { test: /crm|lead-generation|sales|research|marketplace-management/, label: "Sales and CRM administration", challenge: "A small sales team needed cleaner contact records, better lead visibility, and consistent follow-up administration.", solution: "FJX Studio supports CRM data cleanup, contact and pipeline updates, lead research, and task tracking based on the team's process.", deliverable: "A better-organized CRM and clearer handoff information for sales follow-up." },
  { test: /customer|support|chat|email-support|order-management|order-processing/, label: "Customer and order support", challenge: "A busy business needed a reliable process for tracking customer questions, order status requests, and routine service tasks.", solution: "FJX Studio helps organize support queues, prepare response drafts from approved guidance, track order inquiries, and escalate exceptions to the client.", deliverable: "A structured customer-support workflow with clearer ownership and escalation." },
  { test: /appointment|calendar|executive|administrative|virtual-assistant|data-entry|document|project-management|property|real-estate|medical|healthcare|insurance|recruit|hr|administration|website-content|website-update/, label: "Virtual assistant and administration", challenge: "A growing organization needed dependable help coordinating routine admin, documents, calendars, and follow-up tasks.", solution: "FJX Studio organizes inbox and calendar tasks, updates records, processes documents, tracks action items, and follows the client's documented procedures.", deliverable: "A repeatable administrative support workflow that gives the internal team clearer task visibility." },
  { test: /inventory|shipping|veeqo|zoho/, label: "Inventory and fulfillment support", challenge: "An online retailer needed more consistent inventory records and clearer coordination between orders, stock, and shipping updates.", solution: "FJX Studio helps maintain product and stock records, monitor order information, update fulfillment details, and flag discrepancies for review.", deliverable: "Better-organized inventory and fulfillment administration with clear exception handoffs." }
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "videos") continue;
      if (dir === root && excluded.has(entry.name)) continue;
      walk(full);
    } else if (entry.isFile() && entry.name === "index.html") {
      addCaseStudy(full);
    }
  }
}

function addCaseStudy(file) {
  let html = fs.readFileSync(file, "utf8");
  if (/id=["']fjx-service-case-study["']/.test(html)) return;
  const slug = path.basename(path.dirname(file));
  const titleMatch = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const title = (titleMatch?.[1] || slug.replace(/-/g, " "))
    .replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  const playbook = playbooks.find(item => item.test.test(slug)) || playbooks[playbooks.length - 1];
  const [business, location] = businesses[hash(slug) % businesses.length];
  const cta = slug.match(/inksoft|chipply|ordermygear|deconetwork|printavo|team-store|spirit-wear/) ? "Plan Your Store Setup" : /logo|graphic|design|video/.test(slug) ? "Discuss Your Design Project" : /email|mailchimp|klaviyo|brevo/.test(slug) ? "Plan Your Email Support" : /customer|support|chat/.test(slug) ? "Improve Your Customer Support" : "Discuss Your Project";
  const section = `
<section id="fjx-service-case-study" class="fjx-case-study" aria-labelledby="fjx-case-title">
  <div class="fjx-case-wrap">
    <p class="fjx-case-eyebrow">ILLUSTRATIVE SERVICE CASE STUDY · ${escapeHtml(playbook.label)}</p>
    <h2 id="fjx-case-title">How ${escapeHtml(title)} Can Support a Growing Business</h2>
    <p class="fjx-case-intro">A sample project scenario showing how this service could support a business in the USA or Canada.</p>
    <div class="fjx-case-meta"><strong>Example business:</strong> ${escapeHtml(business)} <span aria-hidden="true">·</span> ${escapeHtml(location)}</div>
    <div class="fjx-case-grid">
      <article><h3>Business challenge</h3><p>${escapeHtml(playbook.challenge)}</p></article>
      <article><h3>FJX Studio approach</h3><p>${escapeHtml(playbook.solution)}</p></article>
      <article><h3>Potential handoff</h3><p>${escapeHtml(playbook.deliverable)}</p></article>
    </div>
    <a class="fjx-case-cta" href="#contact">${escapeHtml(cta)} <span aria-hidden="true">→</span></a>
    <p class="fjx-case-disclaimer">This is a fictional, illustrative example for service explanation. The business name and scenario are not actual clients, completed engagements, testimonials, or measured results.</p>
  </div>
</section>
<style>
.fjx-case-study{padding:64px 20px;background:#f5f8ef;color:#202326}.fjx-case-wrap{max-width:1080px;margin:0 auto}.fjx-case-eyebrow{font-size:12px;letter-spacing:.09em;font-weight:800;color:#5b7d2d}.fjx-case-study h2{font-size:clamp(26px,4vw,36px);line-height:1.2;margin:10px 0 12px}.fjx-case-intro{font-size:17px;color:#626b70;max-width:760px}.fjx-case-meta{margin:22px 0;padding:14px 18px;background:#fff;border:1px solid #e1e8d8;border-radius:12px}.fjx-case-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin:18px 0 24px}.fjx-case-grid article{background:#fff;border:1px solid #e1e8d8;border-radius:14px;padding:20px}.fjx-case-grid h3{font-size:17px;margin:0 0 8px}.fjx-case-grid p{margin:0;color:#626b70;line-height:1.65}.fjx-case-cta{display:inline-flex;gap:12px;align-items:center;background:#a6df65;color:#17210f;text-decoration:none;font-weight:800;padding:14px 21px;border-radius:10px}.fjx-case-cta:hover{background:#95d34e}.fjx-case-disclaimer{font-size:12px;color:#68716a;margin:18px 0 0;max-width:850px}@media(max-width:600px){.fjx-case-study{padding:46px 18px}}
</style>`;
  const contact = /<section\b[^>]*id=["']contact["'][^>]*>/i;
  const mainClose = /<\/main>/i;
  if (contact.test(html)) html = html.replace(contact, section + "\n$&");
  else if (mainClose.test(html)) html = html.replace(mainClose, section + "\n</main>");
  else html = html.replace(/<\/body>/i, section + "\n</body>");
  fs.writeFileSync(file, html);
}

function hash(value) { let n = 0; for (const c of value) n = (n * 31 + c.charCodeAt(0)) >>> 0; return n; }
function escapeHtml(value) { return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }


const footerStyle = '<style id="fjx-site-footer-style">.fjx-site-footer{border-top:1px solid #e8e9e7;background:#fff;color:#687078;font-family:inherit}.fjx-site-footer *{box-sizing:border-box}.fjx-footer-wrap{max-width:1280px;margin:0 auto;padding:56px 24px 28px}.fjx-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:40px}.fjx-footer-brand{max-width:440px}.fjx-footer-logo{display:inline-flex;align-items:center;gap:9px;color:#202522;text-decoration:none;font-size:22px;font-weight:800}.fjx-footer-mark{display:inline-flex;width:38px;height:38px;align-items:center;justify-content:center;border-radius:12px;background:#9fe870;color:#202522;font-size:14px;font-weight:900}.fjx-footer-logo span:last-child{color:#78bd43}.fjx-footer-copy{margin:16px 0 0;max-width:420px;font-size:14px;line-height:1.8;color:#687078}.fjx-footer-social{display:flex;gap:10px;margin-top:22px}.fjx-footer-social a{display:inline-flex;width:40px;height:40px;align-items:center;justify-content:center;border:1px solid #e8e9e7;border-radius:12px;color:#333;text-decoration:none;font-size:12px;font-weight:700}.fjx-footer-social a:hover{background:#9fe870;border-color:#9fe870}.fjx-footer-heading{margin:4px 0 16px;color:#202522;font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.fjx-footer-links{display:grid;gap:12px;margin:0;padding:0;list-style:none}.fjx-footer-links a,.fjx-footer-contact a{color:#687078;text-decoration:none;font-size:14px}.fjx-footer-links a:hover,.fjx-footer-contact a:hover{color:#5b9c2e}.fjx-footer-contact{display:grid;gap:12px;margin:0;padding:0;list-style:none;font-size:14px;line-height:1.6}.fjx-footer-bottom{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:44px;padding-top:24px;border-top:1px solid #e8e9e7}.fjx-footer-bottom p{margin:0;color:#92999e;font-size:13px}.fjx-footer-top{display:inline-flex;align-items:center;gap:8px;padding:10px 15px;border:1px solid #e8e9e7;border-radius:12px;color:#424a45;text-decoration:none;font-size:13px;font-weight:600}.fjx-footer-top:hover{background:#f3faee;border-color:#ccebb7}@media(max-width:760px){.fjx-footer-wrap{padding:42px 20px 24px}.fjx-footer-grid{grid-template-columns:1fr 1fr;gap:30px}.fjx-footer-brand{grid-column:1/-1}}@media(max-width:480px){.fjx-footer-grid{grid-template-columns:1fr;gap:26px}.fjx-footer-brand{grid-column:auto}.fjx-footer-bottom{align-items:flex-start;flex-direction:column;margin-top:32px}}</style>';

function ensureFooterStyles(file) {
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes('class="fjx-site-footer"') || html.includes('id="fjx-site-footer-style"')) return;
  html = html.replace(/<\/head>/i, footerStyle + "\n</head>");
  fs.writeFileSync(file, html);
}


const inksoftVideos = [
  { id: "UNZnBJAXynU", title: "InkSoft Video Guide 1" },
  { id: "pdkPa9gzAVw", title: "InkSoft Video Guide 2" }
];

const videoTargetSlugs = new Set([
  "sanmar-integration-ecommerce",
  "ss-activewear-store-integration",
  "alphabroder-catalog-integration",
  "inksoft-support",
  "inksoft-help",
  "screen-printing-shop-management-software",
  "embroidery-order-management-system",
  "print-shop-quoting-software",
  "promotional-products-ecommerce-platform",
  "merch-store-design-develop-managment-update-virtual-assistant",
  "inksoft-store-management",
  "inksoft-product-catalog-management",
  "inksoft-team-fundraising-store-setup",
  "inksoft-bulk-product-upload-supplier-sync",
  "hire-inksoft-virtual-assistant-product-upload",
  "seasonal-peak-season-store-support",
  "inksoft-store-setup",
  "apparel-store-management",
  "custom-apparel-store-management",
  "team-store-management",
  "inksoft-product-artwork-setup-services",
  "inksoft-pricing-matrix-setup",
  "inksoft-storefront-design-customization",
  "inksoft-order-management-support",
  "inksoft-inventory-management-support",
  "school-spirit-wear-fundraising-store-setup",
  "team-dealer-ecommerce-support",
  "embroidery-business-virtual-assistant",
  "promotional-products-store-management",
  "screen-printing-shop-virtual-assistant",
  "chipply-store-management",
  "deconetwork-store-setup-management",
  "ordermygear-store-management",
  "custom-apparel-quoting-customer-support",
  "promotional-products-order-management",
  "corporate-company-store-management",
  "print-shop-quoting-estimating-support",
  "school-spirit-wear-store-management",
  "sports-team-club-store-management",
  "fundraising-group-order-store-management",
  "custom-merchandise-store-setup-management",
  "custom-apparel-artwork-mascot-design",
  "screen-printing-embroidery-artwork-preparation",
  "usa-canada-team-store-setup-management"
]);

function ensureInksoftVideos(file) {
  if (path.relative(root, file).split(path.sep)[0] === "videos") return;
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('id="fjx-inksoft-videos"')) return;
  const slug = path.basename(path.dirname(file));
  const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "";
  const pageTitle = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "";
  if (!videoTargetSlugs.has(slug) && !/inksoft/i.test(slug + " " + heading + " " + pageTitle)) return;

  const players = inksoftVideos.map(video =>
    '<article class="fjx-inksoft-video-card">' +
    '<h3>' + video.title + '</h3>' +
    '<div class="fjx-inksoft-video-frame">' +
    '<iframe src="https://www.youtube-nocookie.com/embed/' + video.id + '" title="' + video.title + '" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
    '</div><a href="https://youtu.be/' + video.id + '" target="_blank" rel="noopener noreferrer">Watch on YouTube</a></article>'
  ).join("");

  const section = '<section id="fjx-inksoft-videos" class="fjx-inksoft-videos" aria-labelledby="fjx-inksoft-videos-title">' +
    '<div class="fjx-inksoft-videos-inner"><p class="fjx-inksoft-videos-eyebrow">INKSOFT VIDEO RESOURCES</p>' +
    '<h2 id="fjx-inksoft-videos-title">InkSoft Video Guides</h2>' +
    '<p>Watch these video resources for additional visual guidance related to InkSoft and online store workflows.</p>' +
    '<div class="fjx-inksoft-video-grid">' + players + '</div></div></section>' +
    '<style>.fjx-inksoft-videos{padding:48px 20px;background:#f5f8ef;color:#202326}.fjx-inksoft-videos-inner{max-width:1100px;margin:0 auto}.fjx-inksoft-videos-eyebrow{margin:0 0 8px;color:#64812a;font-size:12px;font-weight:800;letter-spacing:.1em}.fjx-inksoft-videos h2{margin:0 0 10px;font-size:clamp(25px,4vw,34px);line-height:1.2}.fjx-inksoft-videos-inner>p:not(.fjx-inksoft-videos-eyebrow){color:#5c6569}.fjx-inksoft-video-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;margin-top:22px}.fjx-inksoft-video-card{min-width:0;padding:16px;background:#fff;border:1px solid #e4e9dd;border-radius:14px}.fjx-inksoft-video-card h3{margin:0 0 12px;font-size:17px}.fjx-inksoft-video-frame{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:10px;background:#111}.fjx-inksoft-video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.fjx-inksoft-video-card>a{display:inline-block;margin-top:12px;color:#426d20;font-weight:700}@media(max-width:680px){.fjx-inksoft-video-grid{grid-template-columns:1fr}}</style>';

  if (/<footer\b/i.test(html)) html = html.replace(/<footer\b/i, section + "\n<footer");
  else if (/<\/main>/i.test(html)) html = html.replace(/<\/main>/i, section + "\n</main>");
  else html = html.replace(/<\/body>/i, section + "\n</body>");
  fs.writeFileSync(file, html);
}

function walkAll(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "videos") continue;
      walkAll(full);
    }
    else if (entry.isFile() && entry.name === "index.html") { ensureFooterStyles(full); ensureInksoftVideos(full); }
  }
}

walkAll(root);
walk(root);
