import fs from "node:fs";
import path from "node:path";

const SITE = "https://www.fjxstudio.com";
const PUBLIC = path.resolve("public");
const TEMPLATE = path.join(PUBLIC, "inksoft-store-management", "index.html");

const videoLibrary = {
  product: { id: "Vj_BSX5GKJo", title: "InkSoft Updated Add Product Workflow" },
  setup: { id: "0PNYIQFbWEo", title: "Setting Up and Configuring an InkSoft Store" },
  pricing: { id: "uSNRXjJ4TN4", title: "InkSoft Product Pricing Guide" },
  design: { id: "bErj1J7rQvc", title: "Canva Graphic Design Services Overview" }
};

const pages = [
  {
    slug: "inksoft-seo-for-online-store",
    title: "InkSoft SEO for Online Stores & Product Catalogs | FJX Studio",
    description: "Improve InkSoft store visibility with useful product titles, descriptions, category structure, image optimization, metadata and ongoing catalog updates.",
    h1: "InkSoft SEO for Online Stores & Product Catalog Management",
    lead: "Make your InkSoft storefront easier to understand and navigate with practical on-page SEO, organized product information, image optimization and consistent catalog maintenance.",
    focus: "InkSoft SEO and product catalog optimization",
    services: [
      ["Product title and description optimization", "Write clear, customer-focused product titles and descriptions that accurately describe apparel, decoration options, sizes, colors and intended use."],
      ["Category and collection structure", "Organize products into logical categories and collections so shoppers can find teamwear, spirit wear, uniforms and promotional merchandise."],
      ["Image and media optimization", "Prepare descriptive image file names and alt text, use suitable image dimensions and keep product imagery consistent across listings."],
      ["Metadata and page structure", "Review page titles, meta descriptions, headings, canonical URLs and internal links where the website platform provides access."],
      ["Catalog maintenance", "Keep product details, variants, pricing and availability information current as catalogs and campaigns change."]
    ],
    steps: [
      ["Review search intent", "Identify the services, products and customer questions each page should address. Map one primary topic to each page to reduce keyword overlap."],
      ["Improve on-page content", "Update titles, headings, descriptions, image text and relevant internal links without repeating exact-match phrases unnaturally."],
      ["Maintain and measure", "Keep product information accurate and review Search Console performance, indexing and engagement data when access is provided."]
    ],
    faqs: [
      ["Can you optimize product pages in an InkSoft store?", "Yes. We can help improve product titles, descriptions, category organization, image details and other on-page elements available in your store workflow."],
      ["Can you guarantee first-page Google rankings?", "No provider can guarantee a specific Google position or a rapid ranking date. SEO improvements strengthen relevance and usability, while results depend on competition, site quality, indexing and ongoing performance."],
      ["Do you also upload and update products?", "Yes. Product uploads, variants, pricing details, catalog organization and ongoing updates can be included in the agreed scope."]
    ],
    videos: [videoLibrary.product, videoLibrary.setup, videoLibrary.pricing],
    related: [
      ["/inksoft-product-catalog-management/", "InkSoft Product Catalog Management"],
      ["/inksoft-store-management/", "InkSoft Store Management"],
      ["/inksoft-store-setup/", "InkSoft Online Store Setup"]
    ]
  },
  {
    slug: "inksoft-online-store-examples",
    title: "InkSoft Online Store Examples & Product Catalog Setup | FJX Studio",
    description: "Explore illustrative InkSoft online store layouts for team shops, spirit wear, fundraising and branded merchandise, plus product catalog setup support.",
    h1: "InkSoft Online Store Examples & Product Catalog Setup",
    lead: "See how an InkSoft online store can be organized for team apparel, school spirit wear, fundraising campaigns and branded merchandise, with clear product categories and shopper-friendly listings.",
    focus: "InkSoft online store examples and catalog planning",
    services: [
      ["Team and club store layout", "Group products by team, season or program, with clear navigation for apparel, uniforms, accessories and approved decoration choices."],
      ["School spirit wear storefront", "Present school-branded apparel and accessories in a straightforward catalog that helps families browse products and select the right options."],
      ["Fundraising and campaign store", "Organize campaign products, order windows, product details and calls to action so supporters can understand what is available."],
      ["Company merchandise store", "Structure branded apparel and promotional items by product type, department or audience, while keeping product details consistent."],
      ["Product catalog preparation", "Upload product images and information, configure available variants and organize listings before a store or campaign launches."]
    ],
    steps: [
      ["Choose the store purpose", "Define the audience, products, campaign dates and the actions shoppers need to complete."],
      ["Plan categories and products", "Build a simple category structure, prepare product data and confirm sizes, colors, pricing and artwork."],
      ["Review the shopping journey", "Check navigation, product details and mobile presentation before sharing the storefront."]
    ],
    faqs: [
      ["Are the store examples on this page actual client websites?", "The examples described here are illustrative layout concepts, not claims about specific completed client projects. A suitable structure depends on each organization's products and requirements."],
      ["Can you set up a team or school store in InkSoft?", "We can assist with store planning, product catalog preparation, product uploads, artwork coordination and launch checks based on your access and workflow."],
      ["Can existing InkSoft stores be reorganized?", "Yes. We can review the current catalog and propose clearer categories, product groupings and content updates."]
    ],
    videos: [videoLibrary.setup, videoLibrary.product, videoLibrary.pricing],
    related: [
      ["/inksoft-store-setup/", "InkSoft Online Store Setup"],
      ["/inksoft-team-fundraising-store-setup/", "InkSoft Team & Fundraising Store Setup"],
      ["/build-inksoft-online-merch-store/", "Build an InkSoft Online Merch Store"]
    ]
  },
  {
    slug: "image-design-services-usa",
    title: "Image Design Services USA for Apparel & Online Stores | FJX Studio",
    description: "Image design services in the USA for apparel and eCommerce stores, including product images, mockups, promotional graphics, listing visuals and catalog-ready artwork.",
    h1: "Image Design Services USA for Apparel & eCommerce Stores",
    lead: "Create clear, consistent product visuals for apparel decorators, screen printers, team dealers and online sellers. FJX Studio supports product images, apparel mockups and promotional graphics for stores serving customers in the USA.",
    focus: "Image design and product visual preparation",
    services: [
      ["Apparel product mockups", "Prepare clean apparel mockups that help shoppers understand garment styles, decoration placement and available color options."],
      ["Product image preparation", "Resize, crop and organize product images for consistent catalog presentation and practical storefront use."],
      ["Artwork and design placement", "Coordinate approved logos, team artwork and promotional graphics with the relevant product listings and mockups."],
      ["Promotional and campaign graphics", "Create or adapt banners and supporting visuals for seasonal launches, team stores, fundraising campaigns and merchandise promotions."],
      ["Catalog image organization", "Use consistent file naming and image organization so product visuals are easier to maintain during catalog updates."]
    ],
    steps: [
      ["Collect brand assets", "Gather approved logos, artwork, product references, brand colors and required image dimensions."],
      ["Prepare design assets", "Create or adapt visuals to the agreed product formats and review placement, readability and consistency."],
      ["Deliver organized files", "Provide approved images in the requested formats and coordinate their upload to the relevant store listings."]
    ],
    faqs: [
      ["Do you provide image design services for USA-based businesses?", "Yes. FJX Studio provides remote image and product-visual support for businesses serving customers in the United States."],
      ["Can you create apparel mockups for InkSoft products?", "We can prepare product mockups and organize approved artwork for use in an InkSoft catalog, subject to the supplied assets and platform requirements."],
      ["Can you also upload the finished images?", "Yes. Image preparation can be combined with product uploads, catalog organization and ongoing store updates."]
    ],
    videos: [videoLibrary.design, videoLibrary.product, videoLibrary.setup],
    related: [
      ["/inksoft-product-artwork-setup-services/", "InkSoft Product Artwork Setup"],
      ["/inksoft-products-upload/", "InkSoft Product Upload"],
      ["/merch-store-design-develop-managment-update-virtual-assistant/", "Merch Store Design & Management"]
    ]
  }
];

const existingPages = [
  {
    slug: "design-develop-and-update-inksoft-store-website",
    title: "InkSoft Website Builder & Website Design | FJX Studio",
    description: "InkSoft website builder and design support for storefront setup, product uploads, catalog presentation, website updates and ongoing store management.",
    h1: "InkSoft Website Builder, Design & Product Upload Management"
  },
  {
    slug: "inksoft-product-catalog-management",
    title: "InkSoft Designer & Product Catalog Upload Management | FJX Studio",
    description: "InkSoft designer and product catalog management, including product uploads, artwork, variants, pricing, supplier information and catalog updates.",
    h1: "InkSoft Designer & Product Catalog Upload Management"
  },
  {
    slug: "inksoft-webstore-creation-services",
    title: "InkSoft Webstore Builder & Product Upload Management | FJX Studio",
    description: "InkSoft webstore builder support for online store creation, product catalog uploads, product details, artwork coordination and launch preparation.",
    h1: "InkSoft Webstore Builder & Product Upload Management"
  },
  {
    slug: "inksoft-store-setup",
    title: "InkSoft Online Store Setup & Product Upload Management | FJX Studio",
    description: "InkSoft online store setup and creation with product uploads, catalog organization, variants, pricing, artwork coordination and launch support.",
    h1: "InkSoft Online Store Setup, Creation & Product Management"
  },
  {
    slug: "merch-store-design-develop-managment-update-virtual-assistant",
    title: "Merch Store Setup, Product Uploads & Updates | FJX Studio",
    description: "Merch store setup and management with product uploads, catalog updates, product images, pricing changes and ongoing storefront maintenance.",
    h1: "Merch Store Setup, Product Uploads & Store Updates"
  },
  {
    slug: "apparel-store-management",
    title: "InkSoft Apparel Store Website Setup & Management | FJX Studio",
    description: "Apparel store website build, setup and management for InkSoft catalogs, product uploads, artwork, pricing, team stores and ongoing updates.",
    h1: "InkSoft Apparel Store Website Build, Setup & Management"
  },
  {
    slug: "build-inksoft-online-merch-store",
    title: "InkSoft Store Build, Setup & Product Management | FJX Studio",
    description: "Build and set up an InkSoft online merch store with organized product uploads, catalog details, artwork, variants and ongoing management.",
    h1: "InkSoft Store Build, Setup & Product Management"
  },
  {
    slug: "inksoft-store-management",
    title: "InkSoft Store Setup, Product Uploads & Management | FJX Studio",
    description: "InkSoft store setup and management for apparel decorators and print businesses, including product uploads, pricing, artwork and storefront updates.",
    h1: "InkSoft Store Setup, Product Uploads & Management"
  },
  {
    slug: "inksoft-products-upload",
    title: "InkSoft Product Upload & Catalog Management | FJX Studio",
    description: "InkSoft product upload and catalog management with accurate product descriptions, images, sizes, colors, pricing and listing updates.",
    h1: "InkSoft Product Upload & Catalog Management"
  }
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function setMeta(html, pattern, replacement) {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace("</head>", replacement + "\n</head>");
}

function renderCards(items) {
  return items.map(([heading, body]) =>
    '<article class="item"><h3>' + esc(heading) + '</h3><p class="muted">' + esc(body) + '</p></article>'
  ).join("\n");
}

function renderPage(template, page) {
  let html = template;
  const canonical = SITE + "/" + page.slug + "/";
  const title = esc(page.title);
  const description = esc(page.description);

  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, "<title>" + title + "</title>");
  html = setMeta(html, /<meta name="description"[^>]*>/i, '<meta name="description" content="' + description + '">');
  html = setMeta(html, /<link rel="canonical"[^>]*>/i, '<link rel="canonical" href="' + canonical + '">');
  html = setMeta(html, /<meta property="og:title"[^>]*>/i, '<meta property="og:title" content="' + title + '">');
  html = setMeta(html, /<meta property="og:description"[^>]*>/i, '<meta property="og:description" content="' + description + '">');
  html = setMeta(html, /<meta property="og:url"[^>]*>/i, '<meta property="og:url" content="' + canonical + '">');
  html = setMeta(html, /<meta name="twitter:title"[^>]*>/i, '<meta name="twitter:title" content="' + title + '">');
  html = setMeta(html, /<meta name="twitter:description"[^>]*>/i, '<meta name="twitter:description" content="' + description + '">');

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": page.title.replace(" | FJX Studio", ""),
        "serviceType": page.focus,
        "description": page.description,
        "url": canonical,
        "provider": { "@type": "ProfessionalService", "name": "FJX Studio", "url": SITE + "/" },
        "areaServed": [
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "Canada" }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": SITE + "/services/" },
          { "@type": "ListItem", "position": 3, "name": page.title.replace(" | FJX Studio", ""), "item": canonical }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": page.faqs.map(([q, a]) => ({
          "@type": "Question", "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a }
        }))
      }
    ]
  };
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
    '<script type="application/ld+json">' + JSON.stringify(schema) + '</script>');

  const serviceSection =
    '<section class="section"><div class="wrap"><h2>' + esc(page.focus) + '</h2><p class="lead">' + esc(page.description) + '</p><div class="grid">' +
    renderCards(page.services) + '</div></div></section>';

  const workflowSection =
    '<section class="section band"><div class="wrap"><h2>How FJX Studio supports your workflow</h2><div class="grid">' +
    renderCards(page.steps.map(([h, b], i) => [(i + 1) + ". " + h, b])) + '</div></div></section>';

  const videoSection =
    '<section class="section fjx-video-library"><div class="wrap"><h2>InkSoft &amp; product workflow video guides</h2><p class="muted">These third-party video resources provide additional visual context. Platform interfaces and workflows may change over time.</p><div class="fjx-video-grid">' +
    page.videos.map(v =>
      '<article class="item"><h3>' + esc(v.title) + '</h3><div class="fjx-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/' + v.id + '" title="' + esc(v.title) + '" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><p><a href="https://youtu.be/' + v.id + '" target="_blank" rel="noopener noreferrer">Watch on YouTube</a></p></article>'
    ).join("") + '</div></div></section>';

  const faqSection =
    '<section class="section"><div class="wrap"><h2>Frequently asked questions</h2><div class="grid">' +
    renderCards(page.faqs) + '</div><a class="cta" href="#contact">Request a Consultation</a></div></section>';

  const relatedSection =
    '<section class="section band"><div class="wrap"><h2>Explore related services</h2><div class="links">' +
    page.related.map(([url, label]) => '<a href="' + url + '">' + esc(label) + '</a>').join("") +
    '</div></div></section>';

  const aboutSection =
    '<section aria-label="About FJX Studio" style="padding:44px 0;border-top:1px solid #e6e9e2;background:#fff"><div style="width:min(1100px,calc(100% - 40px));margin:0 auto"><p style="margin:0 0 8px;color:#63831e;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase">About FJX Studio</p><h2 style="margin:0 0 12px;color:#202326;font-size:clamp(24px,3vw,32px);line-height:1.2">Practical InkSoft and eCommerce support</h2><p style="margin:0;color:#626b70;line-height:1.75">FJX Studio provides remote InkSoft store setup, product catalog management, product image preparation and ongoing eCommerce support for businesses serving the United States and Canada. Service scope is agreed for each project and carried out using client-approved access and instructions.</p></div></section>';

  const main =
    '<main><section class="hero"><div class="wrap"><div class="eyebrow">' + esc(page.focus) + ' · USA &amp; Canada</div><h1>' + esc(page.h1) + '</h1><p class="lead">' + esc(page.lead) + '</p><a class="cta" href="#contact">Discuss Your Project</a><div class="hero-media-grid"><figure class="hero-image"><img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&amp;fit=crop&amp;w=1400&amp;q=80" alt="eCommerce team planning product catalog and online store updates" width="1400" height="800" loading="eager" fetchpriority="high" decoding="async"></figure><div class="hero-video-card"><iframe src="https://www.youtube-nocookie.com/embed/' + page.videos[0].id + '" title="' + esc(page.videos[0].title) + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div></div></div></section>' +
    serviceSection + workflowSection + videoSection + faqSection + relatedSection + aboutSection + '</main>';

  html = html.replace(/<main>[\s\S]*?<\/main>/i, main);
  html = html.replace(/<h2>Let's Build Your Store Together<\/h2>/, "<h2>Let's Discuss Your Project</h2>");
  html = html.replace(/Tell us which platform you use,[\s\S]*?USA and Canada\./, "Tell us about your store, product catalog, design or SEO requirements. FJX Studio can review the requested work and confirm a suitable scope for businesses serving the USA and Canada.");
  html = html.replace("</head>", '<style id="fjx-seo-video-layout">.fjx-video-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:20px}.fjx-video-frame{position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:10px;background:#111}.fjx-video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.fjx-video-library .item p{margin:12px 0 0}.fjx-video-library .item a{font-weight:700;color:#547d2b}@media(max-width:760px){.fjx-video-grid{grid-template-columns:1fr}}</style>\n</head>");
  return html;
}

function updateExistingMetadata(page) {
  const file = path.join(PUBLIC, page.slug, "index.html");
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, "utf8");
  const title = esc(page.title), description = esc(page.description);
  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, "<title>" + title + "</title>");
  html = html.replace(/<meta name="description"[^>]*>/i, '<meta name="description" content="' + description + '">');
  html = html.replace(/<meta property="og:title"[^>]*>/i, '<meta property="og:title" content="' + title + '">');
  html = html.replace(/<meta property="og:description"[^>]*>/i, '<meta property="og:description" content="' + description + '">');
  html = html.replace(/<meta name="twitter:title"[^>]*>/i, '<meta name="twitter:title" content="' + title + '">');
  html = html.replace(/<meta name="twitter:description"[^>]*>/i, '<meta name="twitter:description" content="' + description + '">');
  html = html.replace(/(<h1\\b[^>]*>)[\\s\\S]*?(<\\/h1>)/i, "$1" + esc(page.h1) + "$2");
  fs.writeFileSync(file, html);
}

if (!fs.existsSync(TEMPLATE)) throw new Error("InkSoft page template not found: " + TEMPLATE);
const template = fs.readFileSync(TEMPLATE, "utf8");
for (const page of pages) {
  const dir = path.join(PUBLIC, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderPage(template, page));
}
for (const page of existingPages) updateExistingMetadata(page);

const servicesFile = path.join(PUBLIC, "services", "index.html");
if (fs.existsSync(servicesFile)) {
  let services = fs.readFileSync(servicesFile, "utf8");
  if (!services.includes('id="fjx-inksoft-service-directory"')) {
    const links = [
      ["design-develop-and-update-inksoft-store-website", "InkSoft Website Builder & Design"],
      ["inksoft-product-catalog-management", "InkSoft Designer & Product Catalog Uploads"],
      ["inksoft-webstore-creation-services", "InkSoft Webstore Builder & Product Uploads"],
      ["inksoft-seo-for-online-store", "InkSoft SEO for Online Stores"],
      ["inksoft-store-setup", "InkSoft Online Store Setup & Creation"],
      ["inksoft-online-store-examples", "InkSoft Online Store Examples"],
      ["merch-store-design-develop-managment-update-virtual-assistant", "Merch Store Setup & Product Updates"],
      ["apparel-store-management", "InkSoft Apparel Store Build & Management"],
      ["image-design-services-usa", "Image Design Services USA"],
      ["build-inksoft-online-merch-store", "InkSoft Store Build & Setup"],
      ["inksoft-store-management", "InkSoft Store Product Management"],
      ["inksoft-products-upload", "InkSoft Product Upload Management"]
    ];
    const block = '<section id="fjx-inksoft-service-directory" class="section"><div class="wrap"><h2>InkSoft Website, Webstore &amp; Product Management Services</h2><p class="lead">Explore focused support for InkSoft website design, webstore setup, product catalog uploads, apparel merch stores, image design and ongoing store management.</p><div class="grid">' +
      links.map(([slug, label]) => '<a class="service-card" href="/' + slug + '/"><span>' + esc(label) + '</span><span class="arrow" aria-hidden="true">→</span></a>').join("") +
      '</div></div></section>';
    services = services.replace(/<\/main>/i, block + "\n</main>");
    fs.writeFileSync(servicesFile, services);
  }
}

const sitemapFile = path.join(PUBLIC, "sitemap.xml");
if (fs.existsSync(sitemapFile)) {
  let sitemap = fs.readFileSync(sitemapFile, "utf8");
  const missing = pages.filter(page => !sitemap.includes(SITE + "/" + page.slug + "/"));
  if (missing.length) {
    const entries = missing.map(page => "  <url><loc>" + SITE + "/" + page.slug + "/</loc></url>").join("\n");
    sitemap = sitemap.replace(/<\/urlset>/i, entries + "\n</urlset>");
    fs.writeFileSync(sitemapFile, sitemap);
  }
}
console.log("Generated " + pages.length + " InkSoft and image-design SEO pages, refreshed " + existingPages.length + " related page titles, descriptions and H1s, and updated the services directory and sitemap.");
