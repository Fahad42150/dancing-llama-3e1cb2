import fs from "node:fs";
import path from "node:path";

const publicDir = path.resolve("public");
const referencePath = path.join(publicDir, "ecommerce-store-management", "index.html");
if (!fs.existsSync(referencePath)) throw new Error("eCommerce reference page not found: " + referencePath);
const reference = fs.readFileSync(referencePath, "utf8");

const topics = [
["online-store-manager","Online Store Manager Services","Remote online store management support for product updates, order coordination, merchandising checks and routine storefront administration."],
["online-store-inventory-management","Online Store Inventory Management","Inventory administration for online shops, including SKU records, stock updates, variant checks, reconciliation and low-stock reporting."],
["shopping-feed-management","Shopping Feed Management Services","Product feed administration for shopping channels, including product attributes, identifiers, availability, price checks and feed issue coordination."],
["ecommerce-website-management","eCommerce Website Management Services","Ongoing eCommerce website administration covering content updates, product pages, storefront checks, catalog hygiene and operational coordination."],
["woocommerce-google-feed-manager","WooCommerce Google Feed Manager Services","WooCommerce product feed support for Google Merchant Center workflows, product data checks, feed diagnostics and issue tracking."],
["ecommerce-store-management","eCommerce Store Management Services","Practical eCommerce store management for catalog maintenance, order administration, inventory coordination and routine online store operations."],
["shopify-multi-store-inventory","Shopify Multi-Store Inventory Management","Multi-store Shopify inventory administration for SKU consistency, stock updates, location records and cross-store reconciliation."],
["ecommerce-store-manager","eCommerce Store Manager Services","Dedicated remote store management support for product listings, order workflows, content updates and day-to-day operational tasks."],
["best-inventory-management-for-ecommerce","eCommerce Inventory Management Services","Inventory operations support for eCommerce businesses, including stock record maintenance, product data checks and inventory reporting."],
["online-shop-inventory-management","Online Shop Inventory Management","Online shop inventory support for product quantities, variants, stock adjustments, replenishment records and inventory accuracy checks."],
["ecommerce-website-manager","eCommerce Website Manager Services","Website manager support for eCommerce content, product page updates, storefront quality checks and task coordination."],
["multi-store-inventory-management-shopify","Multi-Store Inventory Management for Shopify","Shopify multi-store inventory support focused on shared SKU structures, location-level stock updates and reconciliation workflows."],
["online-shop-management","Online Shop Management Services","Remote online shop management covering storefront administration, catalog updates, order follow-up and routine operational coordination."],
["shopify-multi-store-management","Shopify Multi-Store Management Services","Shopify multi-store administration for product consistency, storefront updates, order coordination and recurring store maintenance."],
["walmart-marketplace-management","Walmart Marketplace Management Services","Walmart Marketplace operational support for listing maintenance, catalog data, order administration and marketplace account task coordination."],
["best-ecommerce-inventory-management","eCommerce Inventory Management Support","Inventory management support for online retailers that need organized product records, stock visibility and repeatable reconciliation processes."],
["e-commerce-website-management","E-Commerce Website Management Services","E-commerce website support for content maintenance, product data updates, storefront reviews and ongoing administration."],
["3dcart-online-store-manager","3dcart Online Store Manager Services","Online store administration support for 3dcart and Shift4Shop workflows, subject to platform access and the specific tasks required."],
["coles-online-manager","Coles Online Manager Role and Store Operations Support","An overview of online grocery store management tasks and operational workflows associated with Coles Online. FJX Studio is independent and is not affiliated with Coles."],
["e-store-management","E-Store Management Services","Remote e-store management for product catalog updates, order processing administration, inventory records and storefront maintenance."],
["ecommerce-warehouse-management-inventory-control-online-store","eCommerce Warehouse Management and Inventory Control","Administrative support for online store warehouse workflows, inventory control records, stock reconciliation and fulfillment coordination."],
["magento-multi-store-inventory","Magento Multi-Store Inventory Management","Magento and Adobe Commerce multi-store inventory administration for product records, stock coordination, catalog consistency and operational reporting."],
["online-retail-manager","Online Retail Manager Services","Remote online retail management support for store operations, merchandising administration, inventory coordination and order workflow oversight."],
["online-retail-manager-jobs","Online Retail Manager Jobs and Role Responsibilities","A practical guide to online retail manager responsibilities, skills and workflows. This page explains the role and does not advertise job vacancies or recruitment."],
["online-shopping-management","Online Shopping Management Services","Online shopping operations support for catalog administration, product information, order status coordination and customer-facing store updates."],
["online-shopping-manager","Online Shopping Manager Services","Online shopping manager support for storefront administration, merchandising tasks, product data checks and order workflow coordination."],
["online-store-manager-jobs","Online Store Manager Jobs and Role Responsibilities","An overview of online store manager duties, common skills and day-to-day eCommerce workflows. This informational page does not represent a job opening."],
["smanager-online-store","Online Store Management Support and SManager Overview","Guidance on online store management workflows and the tasks often handled through store management tools. FJX Studio is independent of third-party providers."],
["virtual-store-manager","Virtual Store Manager Services","Remote virtual store management for product updates, online merchandising, order coordination and recurring storefront administration."],
["web-store-manager","Web Store Manager Services","Web store manager support for website content, catalog maintenance, product page checks and routine online retail operations."],
["woocommerce-frontend-shop-manager","WooCommerce Frontend Shop Manager Services","WooCommerce shop administration support for frontend product updates, catalog organization, pricing checks and store content maintenance."],
["woolworths-online-manager","Woolworths Online Manager Role and Store Operations Support","An overview of online grocery retail management workflows associated with Woolworths Online. FJX Studio is independent and is not affiliated with Woolworths."]
];

const extract = (regex, label) => {
  const match = reference.match(regex);
  if (!match) throw new Error("Could not extract " + label + " from eCommerce reference page");
  return match[0];
};
const styles = (reference.match(/<style\b[^>]*>[\s\S]*?<\/style>/gi) || []).join("\n");
const header = extract(/<header class="top">[\s\S]*?<\/header>/, "header");
const footer = extract(/<footer class="fjx-site-footer">[\s\S]*?<\/footer>/, "footer")
  .replaceAll('href="/#contact"', 'href="#contact"');
const floating = extract(/<a id="fjx-book-now-sitewide"[\s\S]*?<\/a>/, "floating Book Now CTA");
const chat = extract(/<!--Start of Tawk\.to Script-->[\s\S]*?<!--End of Tawk\.to Script-->/, "Tawk.to live chat");
const media = extract(/<div class="hero-media-grid">[\s\S]*?<\/div>\s*<\/div>/, "hero image and video");
if (!styles) throw new Error("Reference page CSS was not found");

const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const baseUrl = "https://www.fjxstudio.com";
const pages = topics.map(([tail, title, description]) => {
  const slug = "best-" + tail.replace(/^best-/, "") + "-services-usa-canada";
  const url = baseUrl + "/" + slug + "/";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {"@type":"Service","name":title,"serviceType":title,"description":description,"url":url,"provider":{"@type":"Organization","name":"FJX Studio","url":baseUrl+"/"},"areaServed":[{"@type":"Country","name":"United States"},{"@type":"Country","name":"Canada"}]},
      {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":baseUrl+"/"},{"@type":"ListItem","position":2,"name":"Services","item":baseUrl+"/services/"},{"@type":"ListItem","position":3,"name":title,"item":url}]}
    ]
  };
  const pageTitle = "Best " + title + " in the USA and Canada | FJX Studio";
  const safeTitle = escapeHtml(pageTitle);
  const safeDescription = escapeHtml(description);
  const intro = "FJX Studio provides scoped remote support for businesses serving the United States and Canada. Tasks, platform access, approval boundaries and turnaround expectations are agreed before work begins.";
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>${safeTitle}</title>
<meta name="description" content="${safeDescription.slice(0,158)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${url}">
<meta property="og:site_name" content="FJX Studio">
<meta property="og:type" content="website">
<meta property="og:title" content="${safeTitle}">
<meta property="og:description" content="${safeDescription.slice(0,158)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${safeTitle}">
<meta name="twitter:description" content="${safeDescription.slice(0,158)}">
${styles}
<style>
#contact{scroll-margin-top:110px}html{scroll-behavior:smooth}
.service-detail-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.service-detail-card{height:100%;padding:24px;border:1px solid var(--line,#e5e7eb);border-radius:18px;background:#fff;box-sizing:border-box}
.service-detail-card h3{margin:0 0 10px}.service-detail-card p{line-height:1.75;color:var(--muted,#687078)}
.service-cta-row{display:flex;flex-wrap:wrap;gap:14px;margin-top:24px}
@media(max-width:800px){.service-detail-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:600px){.service-detail-grid{grid-template-columns:1fr}.hero{padding-top:44px}.hero h1{font-size:clamp(30px,8vw,42px)}.service-detail-card{padding:20px}}
</style>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
${header}
<main>
<section class="hero"><div class="wrap">
<div class="eyebrow">eCommerce Store Operations · USA &amp; Canada</div>
<h1>${escapeHtml(title)} in the USA &amp; Canada</h1>
<p class="lead">${safeDescription}</p>
<p class="muted">${escapeHtml(intro)}</p>
<div class="service-cta-row"><a class="cta" href="#contact">Discuss Your Store</a><a class="cta" href="#services">Explore Services</a></div>
${media}
</div></section>
<section id="services" class="section"><div class="wrap">
<h2>${escapeHtml(title)}: what support can include</h2>
<p class="lead">${safeDescription} The exact scope is tailored to your store platform, channels, task volume and internal approval process.</p>
<div class="service-detail-grid">
<article class="service-detail-card"><h3>Store and catalog administration</h3><p>Maintain product information, categories, variants, images and storefront content using your approved instructions and quality checklist.</p></article>
<article class="service-detail-card"><h3>Inventory and order workflows</h3><p>Update stock records, review order status, coordinate routine handoffs and flag discrepancies or exceptions for approval.</p></article>
<article class="service-detail-card"><h3>Reporting and quality checks</h3><p>Keep task records organized, review completed updates and share concise progress reports against agreed service expectations.</p></article>
</div>
</div></section>
<section class="section band"><div class="wrap">
<h2>A clear, repeatable operating process</h2>
<div class="service-detail-grid">
<article class="service-detail-card"><h3>1. Review requirements</h3><p>Confirm your platform, store count, product volume, sales channels, current tools and the tasks that need support.</p></article>
<article class="service-detail-card"><h3>2. Agree access and scope</h3><p>Document user permissions, approval limits, communication channels, turnaround expectations and escalation procedures.</p></article>
<article class="service-detail-card"><h3>3. Deliver and review</h3><p>Complete agreed tasks, record changes, raise exceptions and refine the workflow through regular feedback.</p></article>
</div>
</div></section>
<section class="section"><div class="wrap">
<h2>Frequently asked questions</h2>
<div class="service-detail-grid">
<article class="service-detail-card"><h3>Can you support stores in the USA and Canada?</h3><p>FJX Studio offers remote support for businesses serving both markets. Working hours, platform access and scope are confirmed before a project starts.</p></article>
<article class="service-detail-card"><h3>Which eCommerce platforms can you work with?</h3><p>Platform support is assessed against your tools, permissions and required tasks. Specific integrations or technical implementations are confirmed separately.</p></article>
<article class="service-detail-card"><h3>How is pricing determined?</h3><p>Pricing depends on task complexity, workload, store count, coverage and required tools. A scope and estimate are agreed before work begins.</p></article>
</div>
<p class="muted">FJX Studio is an independent service provider and is not affiliated with third-party marketplaces or retailers mentioned in search terms. We do not guarantee sales, rankings or other commercial outcomes.</p>
<div class="service-cta-row"><a class="cta" href="#contact">Request a Consultation</a></div>
</div></section>
<section class="section band"><div class="wrap">
<h2>Need help with your online store?</h2>
<p class="lead">Tell us about your storefront, inventory workflow and operational priorities. We will review the requirements and confirm whether the requested support is a fit.</p>
<a class="cta" href="#contact">Discuss Your Requirements</a>
</div></section>
</main>
<section id="contact" class="contact-section"><div class="wrap">
<div class="contact-intro"><div class="contact-kicker">Get In Touch</div><h2>Let's Discuss Your Store Operations</h2><p>Share your platform, store count, catalog size and the tasks you would like to delegate.</p></div>
<div class="contact-grid">
<a class="contact-card" href="mailto:sales@fjxstudio.com?subject=Online%20Store%20Management%20Inquiry"><span class="contact-icon contact-icon-dark">@</span><h3>Email Us</h3><p>Send your requirements to our team.</p><span class="contact-action">sales@fjxstudio.com</span></a>
<div class="contact-card contact-details"><span class="contact-icon">i</span><h3>Service Coverage</h3><p><strong>Markets:</strong> United States and Canada</p><p><strong>Service:</strong> Remote eCommerce operations support</p></div>
</div>
</div></section>
${footer}
${floating}
${chat}
</body></html>`;
  return {slug,url,title,html};
});

for (const page of pages) {
  const dir = path.join(publicDir, page.slug);
  fs.mkdirSync(dir, {recursive:true});
  fs.writeFileSync(path.join(dir,"index.html"), page.html, "utf8");
}

const sitemapPath = path.join(publicDir,"sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath,"utf8");
  for (const page of pages) {
    if (!sitemap.includes("<loc>"+page.url+"</loc>")) {
      sitemap = sitemap.replace("</urlset>", "  <url><loc>"+page.url+"</loc><lastmod>2026-11-23</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n</urlset>");
    }
  }
  fs.writeFileSync(sitemapPath,sitemap,"utf8");
}

const servicesPath = path.join(publicDir,"services","index.html");
if (fs.existsSync(servicesPath)) {
  let services = fs.readFileSync(servicesPath,"utf8");
  const marker = "<!-- online-store-manager-keyword-services -->";
  const cards = pages.map(page => '<article class="item"><h3><a href="/'+page.slug+'/">'+escapeHtml(page.title)+'</a></h3><p>'+escapeHtml(topics.find(t => "best-"+t[0]+"-services-usa-canada" === page.slug)[2])+'</p></article>').join("");
  const section = marker+'<section class="section"><div class="wrap"><h2>Online Store Management Services for the USA &amp; Canada</h2><p class="lead">Explore focused eCommerce store, inventory and marketplace operations support.</p><div class="grid">'+cards+'</div></div></section>';
  const markerIndex = services.indexOf(marker);
  if (markerIndex >= 0) {
    const end = services.indexOf("</section>", markerIndex);
    services = services.slice(0, markerIndex) + section + services.slice(end >= 0 ? end + 10 : markerIndex + marker.length);
  } else {
    services = services.replace("</main>", section + "</main>");
  }
  fs.writeFileSync(servicesPath,services,"utf8");
}
console.log("Generated "+pages.length+" online store management service pages.");
