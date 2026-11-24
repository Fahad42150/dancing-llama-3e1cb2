import fs from "node:fs";
import path from "node:path";

const root = path.resolve("public");
const excluded = new Set(["blog", "articles", "services", "pricing"]);
const playbooks = [
  { test: /quickbooks-cleanup|bookkeeping-cleanup|catch-up-bookkeeping/, label: "Bookkeeping cleanup", challenge: "A small business has months of uncategorized transactions, missing receipts and unreconciled account activity ahead of its reporting deadline.", solution: "FJX Studio organizes source statements and receipts, enters client-approved transaction details, flags duplicates and missing documentation, and prepares an exception list for the client's bookkeeper or accountant.", deliverable: "An organized review pack with categorized source data and clearly flagged items; accounting judgments, tax treatment and final reconciliation approval stay with the client's qualified professional." },
  { test: /quickbooks|xero|bookkeeping|monthly-bookkeeping|month-end|bank-reconciliation|accounts-payable|accounts-receivable|invoice-processing|payroll/, label: "Bookkeeping administration", challenge: "A growing business needs a dependable monthly routine for source documents, transaction records, invoices and reconciliation follow-up.", solution: "FJX Studio organizes receipts and statements, maintains approved bookkeeping records, tracks invoice status and prepares unresolved items for review in the client's accounting workflow.", deliverable: "A repeatable month-end administration checklist and well-organized records ready for review by the client's bookkeeper or accountant." },
  { test: /instagram|facebook|tiktok|linkedin|pinterest|youtube|social-media|reels|community-management|content-calendar|social-post/, label: "Social media channel operations", challenge: "A business is publishing inconsistently across social channels and needs a practical workflow for assets, captions, approvals and scheduled posts.", solution: "FJX Studio organizes a channel-specific content calendar, formats approved creative to each platform's requirements, prepares captions and publishing details, and routes comments or sensitive messages through the client's response rules.", deliverable: "A documented publishing queue, organized creative assets and a clear moderation escalation process; audience growth or engagement outcomes are not guaranteed." },
  { test: /google-ads|ppc|paid-search|facebook-ads|meta-ads|advertising-campaign/, label: "Paid advertising operations", challenge: "A business needs campaign assets, tracking details and optimization tasks organized before and during a paid media campaign.", solution: "FJX Studio helps structure campaign briefs, organize approved copy and creative, check landing-page links and maintain a reporting task list for the client's advertising lead.", deliverable: "A campaign readiness checklist and consistent reporting inputs; budget decisions, claims and live campaign changes require client authorization." },
  { test: /seo|search-engine-optimization|local-seo/, label: "Search optimization project", challenge: "A service business has pages with overlapping topics, incomplete metadata and unclear internal navigation.", solution: "FJX Studio reviews page intent, maps one primary topic to each URL, prepares unique title and description drafts, checks headings and internal links, and records technical issues for developer review.", deliverable: "A page-level SEO action sheet and revised on-page elements; search rankings and indexing timelines cannot be guaranteed." },
  { test: /wordpress|woocommerce|website-design|website-development|website-maintenance|website-migration/, label: "Website delivery and maintenance", challenge: "A business needs a website update or migration completed without losing track of content, media, redirects and acceptance checks.", solution: "FJX Studio inventories agreed pages and assets, prepares content and media mappings, coordinates approved updates, and checks key navigation and forms in a staging workflow before client sign-off.", deliverable: "A documented change list and acceptance checklist covering the agreed pages and functions." },
  { test: /data-entry|data-cleanup|spreadsheet|crm-data|lead-research|web-research/, label: "Data and research operations", challenge: "A team is working from inconsistent spreadsheets and CRM records with missing fields, duplicates and unclear source notes.", solution: "FJX Studio follows a field map, standardizes supplied records, checks duplicates and required values, captures source references where requested, and returns exceptions for review.", deliverable: "A structured dataset with documented fields, source notes and an exception log; no unverified contact details are invented." },
  { test: /customer-service|customer-support|live-chat|outsourced-customer-support|phone-answering|call-center/, label: "Customer support operations", challenge: "A service team needs consistent handling of incoming questions, order-status requests and unresolved customer issues across its agreed support channels.", solution: "FJX Studio organizes the approved response library, categorizes incoming requests, records order or account context supplied by the client and escalates refunds, complaints or policy decisions to the designated owner.", deliverable: "A categorized support queue, documented handoff notes and an escalation workflow; response coverage and service levels are confirmed before work begins." },
  { test: /email-marketing|mailchimp|klaviyo|brevo|constant-contact|campaign-administration/, label: "Email campaign administration", challenge: "A marketing team needs its subscriber data, campaign assets, links and scheduled sends organized for review.", solution: "FJX Studio prepares approved campaign content, checks supplied links and audience segments, organizes send details and records test and approval status before the client authorizes delivery.", deliverable: "A campaign checklist, organized content and a review-ready send record; deliverability and campaign performance are not guaranteed." },
  { test: /real-estate|property-management|airbnb|rental-management|transaction-coordinator/, label: "Property and real-estate administration", challenge: "A property or real-estate team needs reliable coordination of listing details, inquiry follow-up, appointment records and transaction documents.", solution: "FJX Studio maintains client-approved listing information, organizes inquiry and viewing records, tracks document status and routes negotiations, legal questions and regulated decisions to the responsible professional.", deliverable: "An organized property task tracker, listing update log and transaction handoff; licensed advice and final transaction decisions remain with the client." },
  { test: /recruiting|human-resources|hr-administrative|payroll-administrative/, label: "HR and recruiting administration", challenge: "A people team needs candidate records, interview schedules, onboarding checklists and employee documents kept organized.", solution: "FJX Studio updates approved tracking records, coordinates interview calendars, prepares onboarding task lists and flags missing documents for the client's HR owner.", deliverable: "An organized candidate or onboarding tracker and outstanding-item list; hiring, employment and payroll decisions remain with the client." },
  { test: /medical|healthcare|clinic|dental|patient/, label: "Healthcare administrative support", challenge: "A practice needs non-clinical appointment, document and administrative workflows organized with appropriate access controls.", solution: "FJX Studio can assist with non-clinical task coordination using client-approved procedures and only where the required privacy, security and contractual safeguards are in place; clinical questions are escalated to qualified staff.", deliverable: "A non-clinical administrative task log and exception handoff; no clinical advice, triage or treatment is provided." },
  { test: /virtual-assistant|administrative-assistant|executive-assistant|email-management|calendar-management|appointment-setting/, label: "Remote administrative support", challenge: "A small team needs reliable handling of recurring inbox, calendar, document and follow-up tasks without losing approval control.", solution: "FJX Studio works from a documented task list, organizes incoming requests, drafts routine responses from approved guidance, maintains calendar details and escalates decisions that require the client's authority.", deliverable: "A clear task tracker, organized records and an escalation trail for decisions reserved to the client." },
  { test: /shopify|ecommerce|product-catalog|product-listing|bulk-product|inventory|order-management|marketplace/, label: "eCommerce catalog and operations", challenge: "An online seller has inconsistent product attributes, outdated imagery and a backlog of listing or inventory updates across its store.", solution: "FJX Studio maps source data to the store fields, standardizes titles and attributes, organizes supplied images, checks variants and flags stock or order discrepancies for the client's approval.", deliverable: "A reviewed product-data batch, listing exception log and repeatable update checklist; stock, refund and fulfillment decisions remain with the client." },
  { test: /branding|logo|graphic-design|video-edit|content-creation/, label: "Creative production workflow", challenge: "A business needs a consistent set of campaign assets but its source files, brand rules and revision feedback are scattered.", solution: "FJX Studio organizes approved brand assets, prepares scoped design or editing tasks, checks required dimensions and formats, and tracks review comments through client approval.", deliverable: "An organized asset handoff with file formats and revision status recorded." },
  { test: /lead-generation|sales-support|crm-management/, label: "Lead and CRM administration", challenge: "A sales team needs cleaner prospect records and a consistent way to track research, qualification notes and follow-up ownership.", solution: "FJX Studio applies the client's CRM field definitions, records source-backed research, removes confirmed duplicates and assigns follow-up tasks according to the team's rules.", deliverable: "A structured CRM update and handoff list; lead quality and sales conversion are not guaranteed." }
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (dir === root && excluded.has(entry.name)) continue;
      walk(full);
    } else if (entry.isFile() && entry.name === "index.html") {
      addCaseStudy(full);
    }
  }
}

function addCaseStudy(file) {
  let html = fs.readFileSync(file, "utf8");
  if (/id=["']fjx-service-case-study["']/.test(html)) {
    // Rebuild existing case studies from the page's own slug/title so stale generic
    // scenarios are not preserved when the service taxonomy is improved.
    html = html.replace(/<section id=["']fjx-service-case-study["'][\s\S]*?<\/section>\s*<style>[\s\S]*?<\/style>/i, "");
  }
  const slug = path.basename(path.dirname(file));
  const titleMatch = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const title = (titleMatch?.[1] || slug.replace(/-/g, " "))
    .replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  const playbook = playbooks.find(item => item.test.test(slug)) || {
    label: "Service-specific operations",
    challenge: "A business needs a clear, repeatable workflow for " + title.toLowerCase() + ", with accurate source information and dependable follow-through.",
    solution: "FJX Studio confirms the required inputs, documents the steps for " + title.toLowerCase() + ", completes agreed administrative tasks and routes exceptions or decisions to the client for approval.",
    deliverable: "A documented task workflow, organized handoff and exception list for " + title.toLowerCase() + "; final business decisions remain with the client."
  };
  const cta = slug.match(/inksoft|chipply|ordermygear|deconetwork|printavo|team-store|spirit-wear/) ? "Plan Your Store Setup" : /logo|graphic|design|video/.test(slug) ? "Discuss Your Design Project" : /email|mailchimp|klaviyo|brevo/.test(slug) ? "Plan Your Email Support" : /customer|support|chat/.test(slug) ? "Improve Your Customer Support" : "Discuss Your Project";
  const section = `
<section id="fjx-service-case-study" class="fjx-case-study" aria-labelledby="fjx-case-title">
  <div class="fjx-case-wrap">
    <p class="fjx-case-eyebrow">ILLUSTRATIVE SERVICE</p>
    <h2 id="fjx-case-title">Illustrative workflow for ${escapeHtml(title)}</h2>
    <p class="fjx-case-intro">A service-specific example of the tasks, review steps and handoff this engagement could involve.</p>
    <div class="fjx-case-meta"><strong>Service focus</strong>: ${escapeHtml(title)}</div>
    <div class="fjx-case-grid">
      <article><h3>Business challenge</h3><p>${escapeHtml(playbook.challenge)}</p></article>
      <article><h3>FJX Studio approach</h3><p>${escapeHtml(playbook.solution)}</p></article>
      <article><h3>Potential handoff</h3><p>${escapeHtml(playbook.deliverable)}</p></article>
    </div>
    <a class="fjx-case-cta" href="#contact">${escapeHtml(cta)} <span aria-hidden="true">→</span></a>
    <p class="fjx-case-disclaimer">Illustrative workflow only. This is not a client case study, testimonial, completed engagement or measured result.</p>
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


const responsiveStyle = `<style id="fjx-responsive-layout">
/* Shared responsive safeguards for the standalone service, article and blog pages. */
html { -webkit-text-size-adjust: 100%; }
body { min-width: 320px; max-width: 100%; overflow-x: clip; }
img, picture, video, canvas, svg { max-width: 100%; }
iframe { max-width: 100%; }
pre { max-width: 100%; overflow-x: auto; }
.hero-media-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
}
.hero-media-grid > .hero-image,
.hero-media-grid > .hero-video-card {
  position: relative;
  display: block;
  width: 100%;
  min-width: 0;
  max-width: none;
  height: auto;
  aspect-ratio: 16 / 9;
}
.hero-media-grid > .hero-image img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: cover;
}
.hero-media-grid > .hero-video-card iframe,
.video iframe,
.video-frame iframe {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
.video, .video-frame {
  position: relative;
  max-width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.table-wrap { max-width: 100%; overflow-x: auto; }
/* Global layout normalization for generated service pages at every viewport. */
:root { overflow-x: clip; }
*, *::before, *::after { box-sizing: border-box; }
html, body { width: 100%; max-width: 100%; overflow-x: clip; }
body { min-width: 320px; }
main, header, footer, section, nav, article, aside { min-width: 0; max-width: 100%; }
h1, h2, h3, h4, p, li, a, button, label { overflow-wrap: anywhere; }
p { max-width: 100%; }
button, input, select, textarea { max-width: 100%; font: inherit; }
table { width: 100%; border-collapse: collapse; }
.table-wrap, pre { max-width: 100%; overflow-x: auto; }
iframe, video { display: block; max-width: 100%; }
img { height: auto; }
.hero, .section, .wrap, .container, .content, .main-content { min-width: 0; }
.hero-media-grid, .fjx-service-hero-media, .hero-grid, .about-grid, .contact-grid, .fjx-price-wrap, .fjx-service-price-wrap { min-width: 0; }
.hero-media-grid > *, .fjx-service-hero-media > *, .hero-grid > *, .about-grid > *, .contact-grid > * { min-width: 0; max-width: 100%; }
.fjx-site-footer, .fjx-site-footer * { min-width: 0; }
a, button, .cta, .btn, .button { min-height: 42px; }
@media (max-width: 900px) {
  .fjx-footer-grid, .fjx-service-footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .fjx-price-wrap, .fjx-service-price-wrap { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 640px) {
  .hero-media-grid, .fjx-service-hero-media, .hero-grid, .about-grid,
  .contact-grid, .fjx-service-contact-grid, .fjx-price-wrap,
  .fjx-service-price-wrap, .fjx-service-footer-grid {
    grid-template-columns: minmax(0, 1fr) !important;
  }
  .hero-media-grid { width: 100%; gap: 16px; }
  .hero, .section { padding-top: clamp(30px, 8vw, 48px); padding-bottom: clamp(30px, 8vw, 48px); }
  .hero h1, h1 { font-size: clamp(30px, 8vw, 42px); line-height: 1.12; }
  h2 { font-size: clamp(24px, 6vw, 32px); line-height: 1.2; }
  .wrap, .fjx-case-wrap, .fjx-reviews-wrap, .fjx-price-wrap { width: min(100% - 32px, 1100px); }
  .fjx-footer-wrap { padding: 36px 18px 22px; }
  .fjx-footer-grid { grid-template-columns: minmax(0, 1fr); gap: 24px; }
  .fjx-footer-brand { grid-column: auto; }
  .fjx-footer-bottom { align-items: flex-start; flex-direction: column; }
  .cta, .button, .btn { max-width: 100%; white-space: normal; text-align: center; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto !important; }
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
</style>`;

function ensureResponsiveLayout(file) {
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes('id="fjx-responsive-layout"')) {
    html = html.replace(/<\/head>/i, responsiveStyle + "\n</head>");
  }
  if (!/<meta[^>]+name=["']viewport["']/i.test(html)) {
    html = html.replace(/<head([^>]*)>/i, '<head$1><meta name="viewport" content="width=device-width, initial-scale=1">');
  }
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  if (canonical) {
    const canonicalUrl = canonical[1];
    html = html.replace(/<meta property=["']og:url["'] content=["'][^"']*["']\s*\/?\s*>/i,
      '<meta property="og:url" content="' + canonicalUrl + '">');
  }
  fs.writeFileSync(file, html);
}

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
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('id="fjx-inksoft-videos"')) return;
  const slug = path.basename(path.dirname(file));
  const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "";
  const pageTitle = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "";
  if (!/inksoft/i.test(slug + " " + heading + " " + pageTitle)) return;

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
    if (entry.isDirectory()) walkAll(full);
    else if (entry.isFile() && entry.name === "index.html") { ensureResponsiveLayout(full); ensureFooterStyles(full); ensureInksoftVideos(full); }
  }
}

function ensureServicePageRelevance(file) {
  let html = fs.readFileSync(file, "utf8");
  const slug = path.basename(path.dirname(file));
  const title = (html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || slug.replace(/-/g, " "))
    .replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  const original = html;

  // Remove the repeated generic stock image and unverified, generic InkSoft video block.
  html = html.replace(/<div class="(?:fjx-service-about-image|about-image)">\s*<img[^>]*41108027[^>]*>\s*<\/div>/gi, "");
  html = html.replace(/<section id="fjx-inksoft-videos"[\s\S]*?<\/section>\s*<style>[\s\S]*?<\/style>/gi, "");

  // Remove the repeated generic virtual-assistant overview video, but retain other embeds.
  html = html.replace(/<div class="(?:hero-video-card|fjx-service-video)">[\s\S]*?<\/div>/gi,
    block => block.includes("kiAg30RYmDs") ? "" : block);
  html = html.replace(/<iframe\b(?=[^>]*kiAg30RYmDs)[^>]*>\s*<\/iframe>/gi, "");

  // Replace boilerplate eCommerce "about" copy with wording that reflects this URL.
  html = html.replace(/Practical eCommerce and business support/g, "Practical " + escapeHtml(title) + " support");
  html = html.replace(/FJX Studio provides remote eCommerce store setup, product catalog management and administrative support for businesses in the United States and Canada\. We focus on clear workflows, careful execution and reliable communication\./g,
    "FJX Studio provides remote support related to " + escapeHtml(title.toLowerCase()) + " for businesses in the United States and Canada. Tasks, tools, quality checks and approval responsibilities are agreed before work begins.");

  // Replace a stale design-only CTA on unrelated service pages.
  if (!/design|logo|graphic|creative|branding/i.test(slug + " " + title)) {
    html = html.replace(/Let's Discuss Your Design Project/g, "Let's Discuss Your " + escapeHtml(title) + " Project");
  }
  if (html !== original) fs.writeFileSync(file, html);
}

function walkAll(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkAll(full);
    else if (entry.isFile() && entry.name === "index.html") {
      ensureResponsiveLayout(full);
      ensureFooterStyles(full);
      ensureServicePageRelevance(full);
    }
  }
}

// Apply the cleanup after every generator, because later generators can replace pages.
walk(root);
walkAll(root);
ensureResponsiveLayout(path.resolve("index.html"));
