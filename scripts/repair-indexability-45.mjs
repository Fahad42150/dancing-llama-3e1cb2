import fs from "node:fs";
import path from "node:path";

// Conservative technical remediation for the 45 Search Console URLs.
// Page copy is deliberately not rewritten automatically: thin/duplicate content
// requires editorial review, not generated filler.
const root = path.resolve("public");
const origin = "https://www.fjxstudio.com";
const slugs = [
  "print-shop-quoting-estimating-support",
  "inksoft-storefront-design-customization",
  "inksoft-order-management-support",
  "inksoft-pricing-matrix-setup",
  "fundraising-group-order-store-management",
  "inksoft-inventory-management-support",
  "custom-apparel-quoting-customer-support",
  "canva-graphic-design-services",
  "ecommerce-graphic-design-services",
  "remote-ecommerce-store-support-assistant",
  "ecommerce-order-processing-virtual-assistant",
  "team-store-management",
  "inksoft-team-fundraising-store-setup",
  "hire-inksoft-virtual-assistant-product-upload",
  "inksoft-bulk-product-upload-supplier-sync",
  "email-management-virtual-assistant",
  "ecommerce-outsourcing-company-usa-canada",
  "canva-social-media-design",
  "seasonal-peak-season-store-support",
  "ecommerce-operations-consulting-usa-canada",
  "blog",
  "services",
  "ecommerce-business-process-outsourcing",
  "blog/printful-printify-print-on-demand-supplier-comparison",
  "blog/inksoft-chipply-apparel-team-store-management-guide",
  "blog/customer-service-outsourcing-small-business-usa-canada",
  "blog/2026-canada-small-business-hiring-retention-and-workforce-pressure",
  "blog/2026-usa-small-business-cost-tariff-and-ecommerce-operations",
  "blog/reduce-business-operating-costs-small-business-usa-canada",
  "blog/2026-ecommerce-customer-support-order-management",
  "blog/remote-administrative-support-usa-canada",
  "blog/cost-of-hiring-employees-usa-canada",
  "blog/outsourcing-administrative-work-canada-usa",
  "blog/2026-ecommerce-trends-usa",
  "ecommerce-order-management",
  "blog/2026-ecommerce-trends-canada",
  "articles",
  "blog/virtual-assistant-vs-employee-small-business-usa-canada-2026",
  "ecommerce-customer-support-services",
  "printify-pod-store-setup-product-upload-usa",
  "etsy-shop-setup-product-upload-usa-canada",
  "blog/small-business-owners-overwhelmed-daily-tasks-usa-canada",
  "blog/2026-us-ecommerce-printing-industry-news-operations-trends",
  "blog/printavo-screen-printing-shop-workflow-management",
  "blog/2026-usa-canada-company-operations-trade-uncertainty-and-customer-service"
];
const titleSeen = new Set();
const descSeen = new Set();
const changes = [];
const missing = [];
const decode = s => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const esc = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const plain = s => decode(s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
const pretty = s => s.split("/").pop().split("-").map(w => w.length <= 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)).join(" ");
function meta(html, key, value, attr) {
  const a = attr || "name";
  const re = new RegExp("<meta\s+[^>]*" + a + "=[\"']" + key + "[\"'][^>]*>", "i");
  const tag = "<meta " + a + "=\"" + key + "\" content=\"" + esc(value) + "\">";
  return re.test(html) ? html.replace(re, tag) : html.replace(/<head([^>]*)>/i, "<head$1>\n  " + tag);
}
function canonical(html, url) {
  const tag = '<link rel="canonical" href="' + url + '">';
  const re = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
  return re.test(html) ? html.replace(re, tag) : html.replace(/<head([^>]*)>/i, "<head$1>\n  " + tag);
}
function fixJsonLd(html, url) {
  return html.replace(/<script\b([^>]*type=["']application\/ld\+json["'][^>]*)>([\s\S]*?)<\/script>/gi, (whole, attrs, raw) => {
    try {
      const data = JSON.parse(raw.trim());
      let changed = false;
      const walk = node => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) { node.forEach(walk); return; }
        const types = [].concat(node["@type"] || []).map(v => String(v).toLowerCase());
        if (types.some(v => ["webpage","collectionpage","service","article","blogposting","newsarticle"].includes(v))) {
          if (node.url !== url) { node.url = url; changed = true; }
          if (typeof node.mainEntityOfPage === "string" && node.mainEntityOfPage !== url) { node.mainEntityOfPage = url; changed = true; }
          if (node.mainEntityOfPage && typeof node.mainEntityOfPage === "object" && node.mainEntityOfPage["@id"] && node.mainEntityOfPage["@id"] !== url) { node.mainEntityOfPage["@id"] = url; changed = true; }
        }
        Object.values(node).forEach(walk);
      };
      walk(data);
      return changed ? "<script" + attrs + ">\n" + JSON.stringify(data, null, 2) + "\n</script>" : whole;
    } catch {
      changes.push({ url, issue: "Unparseable JSON-LD left unchanged for manual review" });
      return whole;
    }
  });
}
for (const slug of slugs) {
  const file = path.join(root, slug, "index.html");
  const url = origin + "/" + slug + "/";
  if (!fs.existsSync(file)) { missing.push(slug); continue; }
  const before = fs.readFileSync(file, "utf8");
  let html = before;
  const h1 = plain((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [,""])[1] || "");
  const fallbackTitle = (h1 || pretty(slug)) + " | FJX Studio";
  const tm = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  let title = tm ? plain(tm[1]) : "";
  if (!title || titleSeen.has(title.toLowerCase())) {
    title = fallbackTitle;
    if (titleSeen.has(title.toLowerCase())) title = pretty(slug) + " Support | FJX Studio";
    html = tm ? html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, "<title>" + esc(title) + "</title>") : html.replace(/<head([^>]*)>/i, "<head$1>\n<title>" + esc(title) + "</title>");
  }
  titleSeen.add(title.toLowerCase());
  const dm = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i);
  let description = dm ? decode(dm[1]).trim() : "";
  if (!description || descSeen.has(description.toLowerCase())) {
    description = (h1 || pretty(slug)) + ": practical remote support from FJX Studio for eCommerce and business teams in the USA and Canada. Explore the scope, workflow and ways to get help.";
    html = meta(html, "description", description);
  }
  descSeen.add(description.toLowerCase());
  html = canonical(html, url);
  const robots = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["'][^>]*>/i);
  if (!robots || /noindex/i.test(robots[1])) html = meta(html, "robots", "index,follow,max-image-preview:large");
  html = meta(html, "og:url", url, "property");
  html = html.replace(/<meta\s+name=["']twitter:url["'][^>]*>/i, '<meta name="twitter:url" content="' + url + '">');
  html = fixJsonLd(html, url);
  if (html !== before) {
    fs.writeFileSync(file, html);
    changes.push({ url, issue: "Normalized canonical, indexability, social URL and page-level JSON-LD signals where required" });
  }
}
const sitemap = path.join(root, "sitemap.xml");
if (fs.existsSync(sitemap)) {
  let xml = fs.readFileSync(sitemap, "utf8");
  let added = 0;
  for (const slug of slugs) {
    const url = origin + "/" + slug + "/";
    if (!xml.includes(url)) {
      xml = xml.replace(/<\/urlset>\s*$/i, "  <url><loc>" + url + "</loc></url>\n</urlset>");
      added++;
    }
  }
  if (added) { fs.writeFileSync(sitemap, xml); changes.push({ issue: "Added " + added + " missing canonical URL(s) to sitemap.xml" }); }
} else changes.push({ issue: "public/sitemap.xml missing; sitemap reconciliation skipped" });
console.log("[SEO] Audited " + slugs.length + " target URLs; changed " + changes.length + " item(s); missing source pages: " + missing.length + ".");
for (const item of changes) console.log("[SEO]", JSON.stringify(item));
if (missing.length) console.warn("[SEO] Missing source pages:", missing.join(", "));
