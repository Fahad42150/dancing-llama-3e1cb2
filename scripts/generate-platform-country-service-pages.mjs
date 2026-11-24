import fs from "node:fs";
import path from "node:path";

const publicDir = path.resolve("public");
const referencePath = path.join(publicDir, "inksoft-store-management", "index.html");
const servicesPath = path.join(publicDir, "services", "index.html");
const sitemapPath = path.join(publicDir, "sitemap.xml");

if (!fs.existsSync(referencePath)) {
  throw new Error("FJX Studio service-page reference not found: " + referencePath);
}

const reference = fs.readFileSync(referencePath, "utf8");
const baseUrl = "https://www.fjxstudio.com";
const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const platforms = [
  {
    key: "inksoft",
    name: "InkSoft",
    slugBase: "build-inksoft-pop-up-merch-store-setup-catalog-products-upload-update",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Pop-Up Merch Store Setup, Catalog & Product Management",
    shortDescription: "Independent InkSoft support for pop-up merch store setup, catalog organization, product uploads, product updates, artwork coordination and storefront maintenance.",
    audience: "apparel decorators, screen printers, promotional product businesses, schools, teams and organizations",
    cards: [
      ["Pop-up merch store setup", "Prepare an InkSoft pop-up merch store with organized store content, product categories, launch details and client-approved settings."],
      ["Catalog and product uploads", "Organize product titles, descriptions, images, sizes, colors, variants and other supplied catalog information for accurate listings."],
      ["Product and artwork updates", "Coordinate product edits, artwork placement, print locations, pricing details and storefront content using your approved instructions."],
      ["Store launch and maintenance", "Review key store pages, check product presentation and assist with agreed updates before launch and during the selling period."]
    ],
    steps: [
      ["Review the merch-store brief", "Confirm the audience, store purpose, products, artwork, dates, platform access and required customer-facing information."],
      ["Build and organize the catalog", "Prepare the supplied product data, images, options and categories, then apply approved store content and settings."],
      ["Check and maintain the store", "Review the agreed pages and listings, record requested changes and coordinate updates during the store period."]
    ],
    faqs: [
      ["Can you set up an InkSoft pop-up merch store?", "FJX Studio can assist with the agreed setup and administration tasks for an InkSoft pop-up merch store, subject to client access, supplied assets and platform permissions."],
      ["Can you upload products and update the InkSoft catalog?", "Yes. Support can include product titles, descriptions, images, sizes, colors, variants, categories and other catalog fields supplied or approved by the client."],
      ["Can you support a store serving customers in this country?", "Yes. FJX Studio provides remote InkSoft store support for businesses serving customers in the selected market. Project scope, time zone and approvals are agreed in advance."]
    ]
  },
  {
    key: "chipply",
    name: "Chipply",
    slugBase: "build-chipply-team-store-setup-catalog-products-upload-update",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Team Store Setup, Catalog & Product Management",
    shortDescription: "Independent Chipply support for team-store setup, product catalog organization, product uploads, artwork and option updates, and ongoing store administration.",
    audience: "team dealers, schools, sports clubs, leagues, apparel decorators and organizations",
    cards: [
      ["Team store setup assistance", "Organize team or group store requirements, store content, product categories, dates and supplied team information."],
      ["Product catalog uploads", "Prepare product titles, descriptions, images, sizes, colors, product options and other supplied catalog details."],
      ["Artwork and product updates", "Coordinate team logos, artwork files, product imagery, variants and approved listing changes across the store catalog."],
      ["Store review and administration", "Check product presentation, review store content and assist with agreed updates during team or seasonal store campaigns."]
    ],
    steps: [
      ["Review team and store details", "Confirm the organization, team requirements, products, artwork, store dates, access and approval contacts."],
      ["Organize products and content", "Prepare catalog information, images, variants and store content using the details approved by your team."],
      ["Review and support the launch", "Check agreed listings and store pages, track requested edits and coordinate ongoing updates."]
    ],
    faqs: [
      ["Can you help build a Chipply team store?", "FJX Studio can provide independent administrative assistance for Chipply team-store setup tasks, based on the client's platform access, requirements and approval process."],
      ["Can you upload team apparel products and artwork?", "Support can include supplied product information, images, sizes, colors, options, team artwork and catalog updates, subject to the platform's available features."],
      ["Do you work with teams and dealers in this country?", "Yes. Remote support is available for team dealers, schools, clubs and organizations serving customers in the selected market."]
    ]
  },
  {
    key: "ordermygear",
    name: "OrderMyGear (OMG)",
    slugBase: "build-ordermygear-omg-team-store-setup-catalog-products-upload-update",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear (OMG) Team Store Setup, Catalog & Product Management",
    shortDescription: "Independent OrderMyGear (OMG) support for team-store setup assistance, product catalog uploads, product and variant updates, store content and order administration workflows.",
    audience: "team dealers, schools, sports organizations, apparel businesses and group-order program operators",
    cards: [
      ["Team and group store setup", "Organize store requirements, group-order details, store content, product categories and client-supplied launch information."],
      ["Product and catalog uploads", "Prepare product names, descriptions, images, sizes, colors, variants and other catalog data provided by your team."],
      ["Store content and product updates", "Coordinate approved changes to product details, artwork, images, pricing information and store content."],
      ["Order workflow administration", "Assist with agreed order-status checks, information organization and routine administrative handoffs."]
    ],
    steps: [
      ["Scope the group-order project", "Confirm the organization, store purpose, products, order dates, supplied assets, platform permissions and approvals."],
      ["Prepare the store catalog", "Organize product data, imagery, variants and store content according to the approved project brief."],
      ["Review updates and handoffs", "Check the agreed store details, record requested changes and support routine administrative follow-up."]
    ],
    faqs: [
      ["Can you help set up an OrderMyGear team store?", "FJX Studio can provide independent administrative support for agreed OrderMyGear store setup tasks, subject to client access and platform capabilities."],
      ["Can you manage product uploads and catalog updates?", "Yes. Assistance can include product data, descriptions, images, options, variants and approved catalog changes."],
      ["Is FJX Studio affiliated with OrderMyGear?", "No. FJX Studio is an independent service provider and is not affiliated with, endorsed by or acting on behalf of OrderMyGear."]
    ]
  },
  {
    key: "printavo",
    name: "Printavo",
    slugBase: "printavo-print-shop-order-setup-quoting-production-management",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Print Shop Order, Quote & Production Workflow Support",
    shortDescription: "Independent Printavo administrative support for print-shop job setup, quote and order data, customer and product records, production tracking and workflow updates.",
    audience: "screen printers, embroidery shops, apparel decorators and custom print businesses",
    cards: [
      ["Job and order data entry", "Organize customer details, job information, garment or product data, quantities, due dates and supplied production notes."],
      ["Quote and estimate administration", "Prepare quote information, line-item details and supporting records for review and approval by your print-shop team."],
      ["Production workflow updates", "Maintain agreed job statuses, due-date information, production notes and administrative handoffs across active work."],
      ["Customer and order records", "Assist with customer records, order details, documentation and routine data checks to keep shop information organized."]
    ],
    steps: [
      ["Review your shop workflow", "Understand the job stages, information fields, quote process, production handoffs and staff approval responsibilities."],
      ["Organize job and customer data", "Enter or update supplied information, maintain agreed records and flag missing details for your team's review."],
      ["Track updates and exceptions", "Record approved status changes, organize follow-up items and report data issues or workflow exceptions."]
    ],
    faqs: [
      ["Can you assist with Printavo job setup and order data?", "FJX Studio can provide administrative assistance with supplied job details, customer records, order information and agreed workflow updates."],
      ["Can you prepare quote and production information?", "We can organize quote inputs, line-item details and production notes for review. Your print-shop team retains responsibility for pricing decisions, approvals and production commitments."],
      ["Is FJX Studio affiliated with Printavo?", "No. FJX Studio is an independent service provider and is not affiliated with, endorsed by or acting on behalf of Printavo."]
    ]
  }
  ,
  {
    key: "inksoft-catalog",
    name: "InkSoft",
    slugBase: "inksoft-product-catalog-management-product-data-artwork-usa-canada",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Product Catalog, Data & Artwork Management",
    shortDescription: "Dedicated InkSoft catalog support for product data entry, SKU and variant organization, pricing updates, image and artwork coordination, and ongoing listing quality checks.",
    audience: "screen printers, apparel decorators, promotional product companies, schools, teams and branded merchandise businesses",
    cards: [
      ["Product data entry and cleanup", "Enter and standardize product names, descriptions, SKUs, categories and supplied product attributes across your InkSoft catalog."],
      ["Sizes, colors and variants", "Organize size and color options, variant details and product-level information to make listings consistent and easier to maintain."],
      ["Images and artwork coordination", "Upload and organize supplied product images and artwork, and coordinate placement or replacement according to approved instructions."],
      ["Pricing and catalog maintenance", "Apply client-approved pricing and listing changes, review affected products and keep catalog information aligned with current offerings."]
    ],
    steps: [
      ["Audit the catalog requirements", "Review the product list, source spreadsheets, image files, SKU conventions, variants and required approval rules."],
      ["Prepare and update listings", "Organize supplied data and assets, enter approved product details and flag missing or conflicting information for review."],
      ["Quality-check catalog changes", "Check agreed fields, options, images and product presentation, then provide a concise update summary."]
    ],
    faqs: [
      ["Can you upload a large number of InkSoft products?", "FJX Studio can assist with catalog projects of an agreed size using client-provided product data and assets. The workflow and delivery schedule are confirmed after reviewing the source files."],
      ["Can you update SKUs, sizes, colors and pricing?", "Yes. Catalog support can include SKUs, product descriptions, sizes, colors, variants and client-approved pricing updates, subject to available platform fields and permissions."],
      ["Do you create product artwork or photography?", "This service focuses on organizing and uploading supplied assets and coordinating approved listing updates. New design or photography work would be scoped separately."]
    ]
  },
  {
    key: "inksoft-operations",
    name: "InkSoft",
    slugBase: "inksoft-store-operations-order-admin-maintenance-support",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Store Operations, Order Administration & Maintenance",
    shortDescription: "Ongoing InkSoft operations assistance for storefront content maintenance, order-information checks, customer and product data updates, campaign changes and routine administrative follow-through.",
    audience: "apparel decorators, screen printers, promotional product businesses, schools, teams and organizations running InkSoft stores",
    cards: [
      ["Storefront content maintenance", "Update approved banners, store text, product visibility and key storefront information as campaigns and requirements change."],
      ["Order information administration", "Assist with agreed order-information checks, data organization and administrative handoffs without taking over payment or fulfillment decisions."],
      ["Campaign and store updates", "Coordinate scheduled store changes, product availability information and client-approved updates around launches and closing dates."],
      ["Routine checks and reporting", "Review agreed store areas, document exceptions and provide clear summaries of completed work and items needing client input."]
    ],
    steps: [
      ["Map the operating workflow", "Confirm store access, recurring tasks, order touchpoints, campaign dates, escalation contacts and approval responsibilities."],
      ["Complete scheduled administration", "Handle agreed content and data updates using the client's instructions, access permissions and documented process."],
      ["Report exceptions and next steps", "Summarize completed tasks, flag incomplete information and route decisions or fulfillment issues to the client's team."]
    ],
    faqs: [
      ["Can you provide ongoing InkSoft store maintenance?", "Yes. Recurring support can be arranged for agreed storefront, product and administrative tasks, with frequency and responsibilities documented in advance."],
      ["Do you process payments or fulfill orders?", "No. FJX Studio's support is administrative. Payment handling, production, shipping, refunds and final fulfillment decisions remain with the client and its authorized providers."],
      ["Can you work with seasonal or pop-up stores?", "Yes. Support can be scoped around launches, closing dates and seasonal campaigns, subject to platform access and the client's approval workflow."]
    ]
  },
  {
    key: "ordermygear-admin",
    name: "OrderMyGear (OMG)",
    slugBase: "ordermygear-team-store-administration-campaign-maintenance",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Team Store Administration & Campaign Maintenance",
    shortDescription: "Dedicated OrderMyGear administrative support for team-store content, group-order campaign updates, product listing maintenance, deadline coordination and routine store checks.",
    audience: "team dealers, schools, sports organizations, apparel businesses and group-order program operators",
    cards: [
      ["Team store content updates", "Maintain approved store descriptions, team details, campaign information, banners and customer-facing content."],
      ["Campaign and deadline coordination", "Organize store launch and closing dates, requested changes and information needed from team or organization contacts."],
      ["Product listing maintenance", "Coordinate approved edits to product descriptions, images, options and availability information across active stores."],
      ["Store checks and issue tracking", "Review agreed store details, record content or data issues and route decisions to the appropriate client contact."]
    ],
    steps: [
      ["Review stores and stakeholders", "Confirm active stores, team contacts, campaign dates, platform permissions and the client's approval process."],
      ["Maintain campaign information", "Apply approved content and product changes and keep requested updates organized by store or campaign."],
      ["Check and communicate status", "Review the agreed items, document outstanding questions and provide a clear handoff to the client team."]
    ],
    faqs: [
      ["Can you maintain multiple OrderMyGear team stores?", "FJX Studio can support multiple stores when the scope, access and update process are agreed. Workload and turnaround depend on store count and the complexity of requested changes."],
      ["Can you coordinate store opening and closing updates?", "Yes. We can organize approved campaign information and scheduled content updates around the dates provided by your team."],
      ["Does FJX Studio represent or partner with OrderMyGear?", "No. FJX Studio is an independent service provider and is not affiliated with, endorsed by or acting on behalf of OrderMyGear."]
    ]
  },
  {
    key: "ordermygear-catalog",
    name: "OrderMyGear (OMG)",
    slugBase: "ordermygear-product-catalog-upload-variant-data-management",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Product Catalog, Uploads & Variant Data Management",
    shortDescription: "OrderMyGear catalog assistance for product uploads, descriptions, SKU and variant data, size and color options, supplied images, and approved product updates for team and group stores.",
    audience: "team dealers, schools, sports clubs, apparel decorators and organizations managing team or group-order catalogs",
    cards: [
      ["Product uploads and listing setup", "Prepare product names, descriptions, categories and supplied attributes for accurate team-store listings."],
      ["Size, color and option data", "Organize product options and variant information from approved spreadsheets or product specifications."],
      ["Product images and artwork", "Upload and organize supplied images and artwork, coordinating product presentation with the client's instructions."],
      ["Catalog revisions and checks", "Apply approved changes to product details and review affected listings for consistency and missing information."]
    ],
    steps: [
      ["Collect source product information", "Review spreadsheets, product specifications, image assets, option matrices and required listing conventions."],
      ["Upload and organize catalog data", "Prepare approved product information and assets, then update listings within the available platform workflow."],
      ["Validate and report", "Check agreed product fields and variants, flag gaps and share a summary of completed uploads and follow-up items."]
    ],
    faqs: [
      ["Can you upload products to OrderMyGear stores?", "Yes. FJX Studio can assist with product uploads using client-approved descriptions, images, options and product data, subject to platform permissions."],
      ["Can you manage size and color variants?", "Support can include organizing and entering supplied size, color and other option information where those fields are supported by the store setup."],
      ["Can you create product descriptions from scratch?", "We can format or refine supplied product information as part of an agreed scope. Product specifications, claims and final approvals must be provided or confirmed by the client."]
    ]
  }
];

const countries = [
  { code: "usa", name: "United States", label: "USA", hreflang: "en-US" },
  { code: "canada", name: "Canada", label: "Canada", hreflang: "en-CA" }
];

function replaceMeta(html, regex, value) {
  return html.replace(regex, value);
}

function buildPage(platform, country) {
  const slug = platform.slugBase + "-" + country.code;
  const url = baseUrl + "/" + slug + "/";
  const pageTitle = platform.name + " " + (platform.key === "printavo" ? "Print Shop Management" : "Store Setup & Product Management") + " " + country.label + " | FJX Studio";
  const description = platform.shortDescription + " Remote service for businesses serving customers in " + country.name + ".";
  const title = platform.serviceName + " in " + country.name;
  const lead = "FJX Studio provides independent, remote " + platform.name + " support for " + platform.audience + " serving customers in " + country.name + ". We can assist with " + platform.cards.map((card) => card[0].toLowerCase()).join(", ") + ", with scope and approvals agreed before work begins.";
  const otherCountry = countries.find((item) => item.code !== country.code);
  const otherUrl = baseUrl + "/" + platform.slugBase + "-" + otherCountry.code + "/";
  const serviceCards = platform.cards.map(([heading, copy]) =>
    '<article class="item"><h3>' + escapeHtml(heading) + '</h3><p class="muted">' + escapeHtml(copy) + '</p></article>'
  ).join("\n");
  const steps = platform.steps.map(([heading, copy], index) =>
    '<div class="item"><h3>' + (index + 1) + '. ' + escapeHtml(heading) + '</h3><p class="muted">' + escapeHtml(copy) + '</p></div>'
  ).join("\n");
  const faqCards = platform.faqs.map(([question, answer]) =>
    '<div class="item"><h3>' + escapeHtml(question) + '</h3><p class="muted">' + escapeHtml(answer) + '</p></div>'
  ).join("\n");
  const related = [
    '<a href="' + otherUrl + '">' + escapeHtml(platform.name + " services — " + otherCountry.label) + '</a>',
    '<a href="' + platform.generalUrl + '">' + escapeHtml(platform.name + " general services") + '</a>',
    '<a href="/services/">All FJX Studio services</a>'
  ].join("");
  const mediaMatch = reference.match(/<div class="hero-media-grid">[\s\S]*?<\/div><\/div>/);
  if (!mediaMatch) throw new Error("Could not find the reference page hero media block.");

  const main = [
    '<main>',
    '<section class="hero"><div class="wrap">',
    '<div class="eyebrow">' + escapeHtml(platform.name + " service support · " + country.label) + '</div>',
    '<h1>' + escapeHtml(title) + '</h1>',
    '<p class="lead">' + escapeHtml(lead) + '</p>',
    '<a class="cta" href="#contact">Discuss Your Requirements</a>',
    mediaMatch[0],
    '</div></section>',
    '<section class="section"><div class="wrap">',
    '<h2>' + escapeHtml(platform.serviceName) + '</h2>',
    '<p class="lead">' + escapeHtml(description) + '</p>',
    '<div class="grid">' + serviceCards + '</div>',
    '</div></section>',
    '<section class="section band"><div class="wrap">',
    '<h2>How FJX Studio supports your workflow</h2>',
    '<div class="grid">' + steps + '</div>',
    '</div></section>',
    '<section class="section"><div class="wrap">',
    '<h2>Frequently asked questions</h2>',
    '<div class="grid">' + faqCards + '</div>',
    '<p class="muted">FJX Studio is an independent service provider. Platform names are used only to identify the tools relevant to the requested services. We are not affiliated with or endorsed by third-party platform providers. Service scope, access permissions and approvals are agreed for each project.</p>',
    '<a class="cta" href="#contact">Request a Consultation</a>',
    '</div></section>',
    '<section class="section band"><div class="wrap">',
    '<h2>Explore related services</h2><div class="links">' + related + '</div>',
    '</div></section>',
    '<section aria-label="About FJX Studio" style="padding:44px 0;border-top:1px solid #e6e9e2;background:#fff"><div style="width:min(1100px,calc(100% - 40px));margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:28px;align-items:center"><div><p style="margin:0 0 8px;color:#63831e;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase">About FJX Studio</p><h2 style="margin:0 0 12px;color:#202326;font-size:clamp(24px,3vw,32px);line-height:1.2">Practical eCommerce and business support</h2><p style="margin:0;color:#626b70;line-height:1.75">FJX Studio provides remote platform administration, catalog and product data support, and ongoing business operations assistance for businesses serving customers in the United States and Canada. Platform-specific tasks are scoped to the client’s tools, access and approval process.</p></div><div style="display:flex;justify-content:center;align-items:center;min-width:0;padding:12px;border:1px solid #e6e9e2;border-radius:18px;background:#fff;box-shadow:0 12px 32px rgba(32,35,38,.07)"><img src="https://images.pexels.com/photos/41108027/pexels-photo-41108027.jpeg?auto=compress&cs=tinysrgb&w=1000&q=75" alt="FJX Studio eCommerce support" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;max-height:420px;object-fit:contain;object-position:center"></div></div></section>',
    '</main>'
  ].join("\n");

  const faqSchema = platform.faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer }
  }));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: title,
        serviceType: platform.serviceName,
        description,
        url,
        provider: { "@type": "ProfessionalService", name: "FJX Studio", url: baseUrl + "/" },
        areaServed: { "@type": "Country", name: country.name }
      },
      {
        "@type": "FAQPage",
        mainEntity: faqSchema
      }
    ]
  };

  let html = reference;
  html = replaceMeta(html, /<title>[\s\S]*?<\/title>/, "<title>" + escapeHtml(pageTitle) + "</title>");
  html = replaceMeta(html, /<meta name="description"[^>]*>/, '<meta name="description" content="' + escapeHtml(description.slice(0, 158)) + '">');
  html = replaceMeta(html, /<link rel="canonical"[^>]*>/, '<link rel="canonical" href="' + url + '">');
  html = replaceMeta(html, /<meta property="og:title"[^>]*>/, '<meta property="og:title" content="' + escapeHtml(pageTitle) + '">');
  html = replaceMeta(html, /<meta property="og:description"[^>]*>/, '<meta property="og:description" content="' + escapeHtml(description.slice(0, 158)) + '">');
  html = replaceMeta(html, /<meta property="og:url"[^>]*>/, '<meta property="og:url" content="' + url + '">');
  html = replaceMeta(html, /<meta name="twitter:title"[^>]*>/, '<meta name="twitter:title" content="' + escapeHtml(pageTitle) + '">');
  html = replaceMeta(html, /<meta name="twitter:description"[^>]*>/, '<meta name="twitter:description" content="' + escapeHtml(description.slice(0, 158)) + '">');
  html = replaceMeta(html, /<meta property="og:locale"[^>]*>/, '<meta property="og:locale" content="' + (country.code === "canada" ? "en_CA" : "en_US") + '">');
  html = html.replace("</head>", '<link rel="alternate" hreflang="' + country.hreflang + '" href="' + url + '">' +
    '<link rel="alternate" hreflang="' + otherCountry.hreflang + '" href="' + otherUrl + '">' +
    '<link rel="alternate" hreflang="x-default" href="' + url + '">\n</head>');
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(schema) + '</script>');
  html = html.replace(/<main>[\s\S]*?<\/main>/, main);
  html = html.replace(
    /<p class="fjx-reviews-intro">[\s\S]*?<\/p>/,
    '<p class="fjx-reviews-intro">Selected public client feedback for FJX Studio’s online store setup, product catalog and apparel eCommerce support.</p>'
  );
  return { slug, url, title, html, pageTitle, description };
}

const pages = [];
for (const platform of platforms) {
  for (const country of countries) {
    const page = buildPage(platform, country);
    const pageDir = path.join(publicDir, page.slug);
    fs.mkdirSync(pageDir, { recursive: true });
    fs.writeFileSync(path.join(pageDir, "index.html"), page.html, "utf8");
    pages.push(page);
  }
}

if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const page of pages) {
    const loc = "<loc>" + page.url + "</loc>";
    if (!sitemap.includes(loc)) {
      sitemap = sitemap.replace("</urlset>", "  <url><loc>" + page.url + "</loc><lastmod>2026-11-24</lastmod><changefreq>monthly</changefreq><priority>0.85</priority></url>\n</urlset>");
    }
  }
  fs.writeFileSync(sitemapPath, sitemap, "utf8");
}

if (fs.existsSync(servicesPath)) {
  let services = fs.readFileSync(servicesPath, "utf8");
  const marker = "<!-- fjx-platform-country-service-pages -->";
  const cards = pages.map((page) =>
    '<a class="service-card" href="/' + page.slug + '/"><span><strong>' + escapeHtml(page.title) + '</strong></span><span class="arrow" aria-hidden="true">→</span></a>'
  ).join("");
  const section = marker +
    '<section class="section"><div class="wrap"><h2>Platform Store and Print-Shop Services — USA &amp; Canada</h2>' +
    '<p class="lead">Explore dedicated platform setup, catalog, store operations and administration services for InkSoft, Chipply, OrderMyGear (OMG) and Printavo, with country-specific pages for the United States and Canada.</p>' +
    '<div class="grid">' + cards + '</div></div></section>';
  const markerIndex = services.indexOf(marker);
  if (markerIndex >= 0) {
    const sectionStart = services.indexOf("<section", markerIndex);
    const sectionEnd = services.indexOf("</section>", sectionStart);
    if (sectionStart >= 0 && sectionEnd >= 0) {
      services = services.slice(0, markerIndex) + section + services.slice(sectionEnd + "</section>".length);
    }
  } else {
    services = services.replace("</main>", section + "</main>");
  }
  fs.writeFileSync(servicesPath, services, "utf8");
}

console.log("Generated " + pages.length + " platform-specific USA and Canada service pages.");
