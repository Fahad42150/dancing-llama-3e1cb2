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


const keywordExpansion = [
  {
    key: "inksoft-build-store",
    name: "InkSoft",
    prefix: "inksoft",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Online Store Build, Setup & Creation",
    shortDescription: "InkSoft online store build and creation support, including new storefront setup, pop-up store configuration, product organization, content entry and launch preparation.",
    audience: "screen printers, apparel decorators, promotional product businesses, schools, teams and branded merchandise sellers",
    cards: [["New InkSoft store creation", "Plan and assemble a new InkSoft storefront using your approved store brief, audience, products and launch requirements."],["Pop-up and team store setup", "Organize store structure, categories, product collections, content and key dates for team, event and campaign stores."],["Product setup and uploads", "Prepare supplied product names, descriptions, images, sizes, colors and options for accurate store listings."],["Pre-launch review", "Check agreed pages, product presentation, navigation and supplied store information before the planned launch."]]
  },
  {
    key: "inksoft-upload-products",
    name: "InkSoft",
    prefix: "inksoft",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Product Upload, Catalog Update & Listing Management",
    shortDescription: "InkSoft product upload and catalog update services for product data, images, SKUs, pricing, sizes, colors, variants and listing maintenance.",
    audience: "apparel decorators, screen printers, promotional product suppliers, schools and team dealers",
    cards: [["Bulk product uploads", "Organize client-provided spreadsheets and product assets for efficient listing creation, subject to the available platform workflow."],["Product detail updates", "Update approved product names, descriptions, SKUs, categories and specifications across existing listings."],["Images, sizes and variants", "Upload supplied product images and coordinate size, color and option information for each applicable product."],["Pricing and listing checks", "Apply client-approved pricing changes and review updated listings for missing or inconsistent information."]]
  },
  {
    key: "inksoft-redesign-store",
    name: "InkSoft",
    prefix: "inksoft",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Store Redesign, Refresh & Optimization",
    shortDescription: "InkSoft store redesign and storefront refresh assistance for layout updates, product presentation, navigation, content, images and mobile-friendly store organization.",
    audience: "screen printers, apparel brands, team dealers, schools and businesses refreshing an existing InkSoft store",
    cards: [["Storefront redesign planning", "Review the current store and organize a practical refresh plan around your brand assets, products and customer journey."],["Content and visual refresh", "Update approved banners, headings, descriptions, imagery and store content using assets supplied or approved by the client."],["Product presentation improvements", "Improve catalog organization, product titles, categories and listing consistency to make products easier to browse."],["Responsive store review", "Review agreed storefront pages on common screen sizes and document issues or changes requiring client approval."]]
  },
  {
    key: "ordermygear-build-store",
    name: "OrderMyGear (OMG)",
    prefix: "ordermygear",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Team Store Build, Creation & Setup",
    shortDescription: "OrderMyGear team store build and creation assistance for new group-order storefronts, team information, product setup, store content and launch readiness.",
    audience: "team dealers, schools, sports clubs, leagues, apparel businesses and group-order operators",
    cards: [["New team store creation", "Organize the store brief, team identity, product range, ordering requirements and customer-facing information."],["Store setup and content", "Prepare approved store text, team details, product categories, campaign information and key dates."],["Product listing preparation", "Organize supplied product data, images, sizes, colors and options for upload to the store."],["Launch-readiness checks", "Review agreed content and product listings and flag missing details before the store is opened."]]
  },
  {
    key: "ordermygear-upload-products",
    name: "OrderMyGear (OMG)",
    prefix: "ordermygear",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Product Upload, Catalog Update & Management",
    shortDescription: "OrderMyGear product upload and catalog update support for team apparel, product descriptions, SKU data, images, size and color options, and approved listing revisions.",
    audience: "team dealers, schools, sports organizations, apparel decorators and group-order businesses",
    cards: [["Product uploads", "Prepare supplied product information and assets for new listings across agreed team and group stores."],["Catalog updates", "Update approved titles, descriptions, SKUs, categories and product specifications."],["Images and product options", "Organize supplied product images and enter size, color and other supported product options."],["Listing quality review", "Check agreed catalog fields and identify missing images, inconsistent details or incomplete variants."]]
  },
  {
    key: "ordermygear-redesign-store",
    name: "OrderMyGear (OMG)",
    prefix: "ordermygear",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Team Store Redesign & Storefront Refresh",
    shortDescription: "OrderMyGear store redesign and refresh assistance for team-store content, product presentation, campaign details, images and customer-facing information.",
    audience: "team dealers, schools, sports clubs, apparel businesses and organizations updating existing group stores",
    cards: [["Store review and redesign plan", "Review the existing store and define practical content and presentation updates based on the client's goals."],["Team and campaign content", "Refresh approved team details, store descriptions, banners, dates and customer-facing instructions."],["Product display updates", "Improve product descriptions, imagery, categories and option information using client-approved assets."],["Final content checks", "Review the agreed pages and product listings and report any remaining content or data issues."]]
  },
  {
    key: "chipply-build-store",
    name: "Chipply",
    prefix: "chipply",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Team Store Build, Creation & Setup",
    shortDescription: "Chipply team store build and creation assistance for team apparel stores, school spiritwear shops, group stores, product setup and launch preparation.",
    audience: "team dealers, schools, sports clubs, leagues, apparel decorators and organizations",
    cards: [["Team store creation", "Organize the store brief, team details, products, ordering dates and customer-facing information."],["Store content setup", "Prepare approved descriptions, banners, categories and campaign details for the new store."],["Product setup and uploads", "Organize supplied apparel data, images, sizes, colors, variants and product options."],["Pre-launch review", "Check agreed store pages and listings and flag incomplete information for approval."]]
  },
  {
    key: "chipply-upload-products",
    name: "Chipply",
    prefix: "chipply",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Product Upload, Catalog Update & Management",
    shortDescription: "Chipply product upload and catalog management for apparel listings, team products, descriptions, images, sizes, colors, variants and approved updates.",
    audience: "team dealers, schools, sports organizations, apparel decorators and spiritwear providers",
    cards: [["Product catalog uploads", "Prepare supplied product data and images for new listings in team and group stores."],["Product detail updates", "Maintain approved titles, descriptions, SKUs, categories and product information."],["Size and color variants", "Organize size, color and option details to keep product listings clear and consistent."],["Catalog quality checks", "Review updated listings for missing details, inconsistent options and image issues."]]
  },
  {
    key: "chipply-redesign-store",
    name: "Chipply",
    prefix: "chipply",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Team Store Redesign & Storefront Refresh",
    shortDescription: "Chipply team store redesign and refresh support for school spiritwear, team apparel, storefront content, product presentation and campaign updates.",
    audience: "schools, team dealers, sports clubs, leagues and organizations refreshing existing Chipply stores",
    cards: [["Storefront review", "Review current store structure, content and product presentation and identify agreed refresh priorities."],["Brand and content refresh", "Update approved team information, store copy, banners and campaign details."],["Product presentation", "Refresh supplied product images, descriptions, categories and option details."],["Store review and handoff", "Check agreed changes and provide a list of completed updates and remaining items."]]
  },
  {
    key: "printavo-build-workflow",
    name: "Printavo",
    prefix: "printavo",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Setup, Shop Workflow Build & Configuration Support",
    shortDescription: "Printavo setup and workflow build assistance for print-shop job stages, customer records, order data, quote information and production administration.",
    audience: "screen printers, embroidery shops, apparel decorators and custom print businesses",
    cards: [["Workflow setup planning", "Map current job stages, required data, handoffs and approval responsibilities before changes are made."],["Customer and product records", "Organize supplied customer details, product information and reusable administrative records."],["Job and order setup", "Prepare job information, quantities, due dates and production notes for review by your shop team."],["Workflow checks", "Review agreed records and handoffs and flag missing or inconsistent information."]]
  },
  {
    key: "printavo-update-orders",
    name: "Printavo",
    prefix: "printavo",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Order Updates, Job Data Entry & Production Tracking",
    shortDescription: "Printavo order update and job administration support for customer records, job details, due dates, production notes, status information and data maintenance.",
    audience: "screen printing companies, embroidery shops, apparel decorators and print production teams",
    cards: [["Order and job data entry", "Enter or update client-provided job details, quantities, due dates and production notes."],["Customer record updates", "Maintain supplied customer information and related administrative records."],["Production status administration", "Record status changes authorized by your team and organize production handoff information."],["Data review and exception reporting", "Check agreed records and flag missing specifications, unclear instructions or overdue information."]]
  },
  {
    key: "printavo-redesign-workflow",
    name: "Printavo",
    prefix: "printavo",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Workflow Review, Process Refresh & Optimization",
    shortDescription: "Printavo workflow review and process refresh assistance for print-shop order administration, quote data, job stages, production handoffs and record consistency.",
    audience: "screen printers, embroidery businesses, garment decorators and growing print shops",
    cards: [["Current workflow review", "Document existing job stages, information requirements and common administrative bottlenecks."],["Process and data cleanup", "Organize agreed customer, order and job information and identify inconsistent records."],["Production handoff improvements", "Clarify required job notes, status fields and information passed between shop roles."],["Updated workflow guide", "Summarize the agreed administrative process and outstanding items for your team's approval."]]
  },
  {
    key: "inksoft-store-setup",
    name: "InkSoft",
    prefix: "inksoft",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Store Setup & Configuration",
    shortDescription: "Store setup assistance for storefront structure, store details, settings, navigation and launch preparation.",
    audience: "apparel decorators, screen printers, promotional product businesses and organizations",
    cards: [["Store structure", "Organize the requested storefront sections, navigation and customer-facing information."], ["Store details", "Prepare approved store names, descriptions, contact details and campaign information."], ["Settings review", "Check available settings against the project brief and flag decisions that require the store owner."], ["Launch checklist", "Review agreed pages and settings before the planned opening."]]
  },
  {
    key: "inksoft-product-catalog-upload",
    name: "InkSoft",
    prefix: "inksoft",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Product Catalog Upload",
    shortDescription: "Product catalog upload support for supplied product records, descriptions, images, categories and product options.",
    audience: "screen printers, apparel decorators and branded merchandise businesses",
    cards: [["Product records", "Prepare product names, descriptions, SKUs and supplied attributes for entry."], ["Catalog organization", "Group listings into client-approved categories and catalog sections."], ["Images and options", "Upload supplied images and organize supported size and color options."], ["Listing review", "Check required fields and flag missing or inconsistent product information."]]
  },
  {
    key: "inksoft-product-updates",
    name: "InkSoft",
    prefix: "inksoft",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Store Product Updates",
    shortDescription: "Ongoing product listing updates for descriptions, images, options, pricing information and approved catalog changes.",
    audience: "apparel decorators, schools, teams and promotional product providers",
    cards: [["Listing edits", "Apply approved changes to product titles, descriptions and specifications."], ["Option maintenance", "Update supplied size, color and variant information where supported."], ["Image replacement", "Replace or reorganize supplied product images and artwork files."], ["Change verification", "Review updated listings and summarize outstanding information."]]
  },
  {
    key: "inksoft-store-design",
    name: "InkSoft",
    prefix: "inksoft",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Store Design & Customization",
    shortDescription: "Storefront presentation support for approved branding, page content, product presentation and visual updates.",
    audience: "screen printers, apparel decorators and organizations operating branded merch stores",
    cards: [["Design brief", "Collect approved brand assets, page priorities and content requirements."], ["Store presentation", "Organize supplied banners, copy and product imagery for the storefront."], ["Content refinement", "Apply approved text and presentation changes within available platform controls."], ["Visual review", "Check agreed pages across common screen sizes and flag layout issues."]]
  },
  {
    key: "inksoft-navigation-categories",
    name: "InkSoft",
    prefix: "inksoft",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Store Navigation & Categories",
    shortDescription: "Navigation and category organization for clearer product discovery across InkSoft storefronts.",
    audience: "apparel decorators, schools, teams and merchandise businesses",
    cards: [["Category plan", "Group products according to the client's product range and customer journeys."], ["Navigation labels", "Prepare concise category and menu labels using approved terminology."], ["Catalog mapping", "Map supplied products to the agreed category structure."], ["Navigation check", "Review links, category placement and product discoverability."]]
  },
  {
    key: "inksoft-artwork-management",
    name: "InkSoft",
    prefix: "inksoft",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Artwork Upload & Management",
    shortDescription: "Artwork file organization and upload assistance for supplied logos, designs, product imagery and approved storefront assets.",
    audience: "screen printers, apparel decorators, teams and promotional product businesses",
    cards: [["Asset collection", "Collect approved artwork, logos and image files with clear naming."], ["File organization", "Sort assets by store, product, team or campaign for easier administration."], ["Artwork placement", "Coordinate uploads and placement according to client instructions and platform controls."], ["Asset review", "Check assigned files and flag format, resolution or version questions."]]
  },
  {
    key: "inksoft-featured-products",
    name: "InkSoft",
    prefix: "inksoft",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Featured Product Setup",
    shortDescription: "Featured product setup assistance to organize priority listings and approved storefront merchandising.",
    audience: "merchandise businesses, apparel decorators, schools and team stores",
    cards: [["Merchandising brief", "Confirm priority products, campaign goals and approved placement."], ["Product selection", "Prepare the supplied product list and verify listing details."], ["Featured placement", "Apply approved featured-product selections where the platform supports them."], ["Display review", "Check featured listings and confirm the intended products appear."]]
  },
  {
    key: "inksoft-pop-up-store",
    name: "InkSoft",
    prefix: "inksoft",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Pop-Up Store Creation",
    shortDescription: "Pop-up store creation support for campaigns, teams, schools, events and limited-period merchandise programs.",
    audience: "screen printers, schools, sports teams, event organizers and apparel decorators",
    cards: [["Campaign requirements", "Confirm audience, dates, products, artwork and ordering instructions."], ["Store content", "Prepare approved campaign copy, banners and customer information."], ["Product setup", "Organize supplied products, options and images for the pop-up store."], ["Pre-launch review", "Check store details and outstanding approvals before opening."]]
  },
  {
    key: "inksoft-store-maintenance",
    name: "InkSoft",
    prefix: "inksoft",
    generalUrl: "/inksoft-store-management/",
    serviceName: "InkSoft Store Maintenance",
    shortDescription: "Recurring storefront maintenance for approved content, product information, catalog checks and routine administration.",
    audience: "apparel decorators, screen printers and businesses operating ongoing InkSoft stores",
    cards: [["Maintenance schedule", "Agree recurring checks, update windows and escalation contacts."], ["Content updates", "Maintain approved store text, banners and campaign details."], ["Catalog checks", "Review selected product data, images and options for requested changes."], ["Activity summary", "Report completed tasks, exceptions and items awaiting client decisions."]]
  },
  {
    key: "ordermygear-team-store-creation",
    name: "OrderMyGear (OMG)",
    prefix: "ordermygear",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Team Store Creation",
    shortDescription: "Team store creation assistance for organization details, store content, products, ordering dates and launch preparation.",
    audience: "team dealers, schools, sports clubs and group-order operators",
    cards: [["Store brief", "Confirm organization, audience, products, ordering dates and required information."], ["Store configuration", "Prepare approved store details, customer fields and content for setup."], ["Product preparation", "Organize supplied product data, images and supported options."], ["Launch review", "Check the store brief against the configured content and flag open items."]]
  },
  {
    key: "ordermygear-group-store-setup",
    name: "OrderMyGear (OMG)",
    prefix: "ordermygear",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Group Store Setup",
    shortDescription: "Group store setup support for multi-team programs, group ordering details, store content and product organization.",
    audience: "team dealers, schools, leagues and organizations managing group orders",
    cards: [["Group requirements", "Map participating groups, contacts, dates and ordering requirements."], ["Store content", "Prepare approved group descriptions, instructions and customer-facing details."], ["Product organization", "Arrange supplied products and options for the intended group audience."], ["Setup checks", "Review agreed store details and record items requiring administrator approval."]]
  },
  {
    key: "ordermygear-catalog-store",
    name: "OrderMyGear (OMG)",
    prefix: "ordermygear",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Catalog Store Creation",
    shortDescription: "Catalog-style store creation assistance for product assortment planning, listing organization and customer-facing store content.",
    audience: "team dealers, apparel businesses and organizations with ongoing merchandise catalogs",
    cards: [["Catalog scope", "Confirm product range, categories, audiences and store purpose."], ["Store structure", "Organize approved navigation, categories and store information."], ["Listing preparation", "Prepare product descriptions, images and options supplied by the client."], ["Catalog review", "Check listing consistency and identify missing product information."]]
  },
  {
    key: "ordermygear-product-upload",
    name: "OrderMyGear (OMG)",
    prefix: "ordermygear",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Product Upload Services",
    shortDescription: "Product upload assistance for team and group stores, including supplied product details, imagery, sizes, colors and options.",
    audience: "team dealers, schools, sports organizations and apparel decorators",
    cards: [["Source data review", "Review product spreadsheets, images, identifiers and required fields."], ["Product entry", "Prepare and enter approved product information for selected stores."], ["Options and imagery", "Organize supported sizes, colors, variants and supplied product images."], ["Upload quality check", "Check selected listings and flag incomplete or conflicting data."]]
  },
  {
    key: "ordermygear-product-variants",
    name: "OrderMyGear (OMG)",
    prefix: "ordermygear",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Product Variant Updates",
    shortDescription: "Product variant maintenance for sizes, colors, options and approved listing changes across OrderMyGear stores.",
    audience: "team dealers, apparel providers and group-order businesses",
    cards: [["Variant audit", "Review supplied variant matrices and existing listing details."], ["Option updates", "Organize approved size, color and product option information."], ["Listing alignment", "Check product descriptions and images against the approved variant data."], ["Exception report", "Flag unavailable options, missing data and inconsistencies for client review."]]
  },
  {
    key: "ordermygear-store-template",
    name: "OrderMyGear (OMG)",
    prefix: "ordermygear",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Store Template Setup",
    shortDescription: "Store template setup assistance for repeatable team-store content, layout requirements and consistent campaign information.",
    audience: "team dealers, schools and organizations creating recurring group stores",
    cards: [["Template requirements", "Identify reusable content, store fields and brand assets."], ["Content framework", "Prepare approved descriptions, instructions and standard store information."], ["Reusable product structure", "Organize common products and options for the intended store workflow."], ["Template review", "Check the prepared structure with the client's store administrator."]]
  },
  {
    key: "ordermygear-artwork-logo-upload",
    name: "OrderMyGear (OMG)",
    prefix: "ordermygear",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Artwork & Logo Upload",
    shortDescription: "Artwork and logo upload assistance for team identity assets, product images and approved store graphics.",
    audience: "team dealers, schools, sports clubs and apparel businesses",
    cards: [["Asset intake", "Collect current logos, artwork versions and approved image files."], ["File preparation", "Organize assets by organization, team, product or campaign."], ["Store asset upload", "Coordinate uploads and placement using available platform controls."], ["Artwork verification", "Check selected store pages and flag asset quality or version issues."]]
  },
  {
    key: "ordermygear-store-redesign",
    name: "OrderMyGear (OMG)",
    prefix: "ordermygear",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Store Redesign",
    shortDescription: "Storefront refresh assistance for team information, product presentation, campaign details and customer-facing content.",
    audience: "team dealers, schools, sports clubs and group-order operators",
    cards: [["Current store review", "Review existing content, products and the client's redesign priorities."], ["Content refresh", "Update approved team details, banners, instructions and campaign dates."], ["Product presentation", "Refresh supplied descriptions, images and option information."], ["Redesign handoff", "Review agreed changes and list remaining approvals or content gaps."]]
  },
  {
    key: "ordermygear-shipping-settings",
    name: "OrderMyGear (OMG)",
    prefix: "ordermygear",
    generalUrl: "/ordermy-gear-website-develop-design/",
    serviceName: "OrderMyGear Shipping & Store Settings Setup",
    shortDescription: "Administrative setup assistance for shipping methods and store settings based on client-approved requirements and platform options.",
    audience: "team dealers, schools and organizations operating online group stores",
    cards: [["Requirements capture", "Document client shipping rules, store settings and applicable exceptions."], ["Settings preparation", "Translate approved requirements into a setup checklist for the authorized administrator."], ["Configuration assistance", "Assist with permitted setting updates under client direction and access."], ["Validation", "Review displayed options and route tax, shipping or policy decisions to the client."]]
  },
  {
    key: "chipply-store-creation",
    name: "Chipply",
    prefix: "chipply",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Online Store Creation",
    shortDescription: "Online store creation support for team apparel, school spiritwear, product setup and campaign launch preparation.",
    audience: "team dealers, schools, sports clubs, leagues and apparel decorators",
    cards: [["Store planning", "Confirm store audience, products, team details, dates and ordering instructions."], ["Content preparation", "Organize approved store copy, banners and customer information."], ["Product setup", "Prepare supplied product details, images and available options."], ["Launch checks", "Review agreed pages and listings before the store opens."]]
  },
  {
    key: "chipply-team-store-setup",
    name: "Chipply",
    prefix: "chipply",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Team Store Setup",
    shortDescription: "Team store setup assistance for team identity, product selection, artwork, store information and ordering periods.",
    audience: "team dealers, schools, sports clubs and league organizations",
    cards: [["Team requirements", "Collect team names, approved logos, product range and ordering details."], ["Store content", "Prepare team-specific copy, campaign dates and customer instructions."], ["Product organization", "Arrange supplied apparel listings, sizes, colors and options."], ["Store review", "Check team information and product presentation for completeness."]]
  },
  {
    key: "chipply-catalog-upload",
    name: "Chipply",
    prefix: "chipply",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Product Catalog Upload",
    shortDescription: "Product catalog upload support for apparel listings, descriptions, images, options and organized product information.",
    audience: "team dealers, apparel decorators, schools and spiritwear providers",
    cards: [["Catalog intake", "Review product data, images, identifiers and required listing fields."], ["Product listing setup", "Prepare approved titles, descriptions and product attributes."], ["Images and options", "Organize supplied images and supported size, color and option details."], ["Catalog review", "Check updated listings and identify missing or inconsistent information."]]
  },
  {
    key: "chipply-artwork-placement",
    name: "Chipply",
    prefix: "chipply",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Artwork Placement Setup",
    shortDescription: "Artwork placement coordination for supplied team logos, decoration files and approved product presentation.",
    audience: "team dealers, schools, sports clubs and apparel decorators",
    cards: [["Artwork requirements", "Confirm logo versions, decoration locations and product assignments."], ["File organization", "Prepare supplied artwork files and product references for the setup."], ["Placement coordination", "Apply or coordinate approved artwork placement within available platform controls."], ["Placement checks", "Review selected product displays and report any file or positioning concerns."]]
  },
  {
    key: "chipply-product-customization",
    name: "Chipply",
    prefix: "chipply",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Product Customization Setup",
    shortDescription: "Product customization setup assistance for supported product options, decoration details and customer-facing instructions.",
    audience: "team dealers, schools, clubs and apparel businesses",
    cards: [["Customization brief", "Document required options, decoration choices and customer instructions."], ["Option organization", "Prepare supported selections and product-specific details."], ["Listing updates", "Add approved descriptions and supplied visual assets to relevant products."], ["Customer-view review", "Check product option presentation and flag unclear selections."]]
  },
  {
    key: "chipply-inventory-updates",
    name: "Chipply",
    prefix: "chipply",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Inventory & Product Updates",
    shortDescription: "Product and inventory information maintenance using client-approved data, supplied availability updates and catalog changes.",
    audience: "team dealers, apparel providers, schools and sports organizations",
    cards: [["Data reconciliation", "Review client-supplied product and availability information."], ["Product updates", "Apply approved changes to listing details and supported inventory fields."], ["Option checks", "Review sizes, colors and product options against supplied source data."], ["Update summary", "Record completed changes and flag stock decisions requiring client approval."]]
  },
  {
    key: "chipply-store-template",
    name: "Chipply",
    prefix: "chipply",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Store Template Creation",
    shortDescription: "Reusable store template preparation for recurring team, school and group merchandise campaigns.",
    audience: "team dealers, schools, leagues and organizations running repeat stores",
    cards: [["Reusable requirements", "Identify recurring store content, brand assets and product groups."], ["Template content", "Prepare approved standard descriptions, instructions and campaign fields."], ["Product framework", "Organize common product information and supplied artwork references."], ["Template handoff", "Review the prepared framework with the client's authorized Chipply user."]]
  },
  {
    key: "chipply-store-cloning",
    name: "Chipply",
    prefix: "chipply",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Store Cloning & Reordering Support",
    shortDescription: "Store cloning and repeat-order administration assistance for recurring campaigns and similar team merchandise programs.",
    audience: "team dealers, schools, sports clubs and apparel decorators",
    cards: [["Source store review", "Identify the approved source store and details to carry forward."], ["Repeat campaign setup", "Organize updated dates, team details and requested content changes."], ["Product and artwork check", "Verify carried-over listings and supplied assets against the new brief."], ["Pre-launch review", "Check the new store for outdated information and missing approvals."]]
  },
  {
    key: "chipply-production-workflow",
    name: "Chipply",
    prefix: "chipply",
    generalUrl: "/chipply-store-management/",
    serviceName: "Chipply Production Workflow Setup",
    shortDescription: "Administrative workflow setup assistance for order-to-production information, status handoffs and team store operations.",
    audience: "team dealers, apparel decorators and organizations coordinating team merchandise",
    cards: [["Workflow mapping", "Document agreed steps from store close through internal production handoff."], ["Information checklist", "Organize required product, decoration and order details for handoff."], ["Status coordination", "Prepare tracking fields and update procedures approved by the client."], ["Process review", "Identify missing handoff information and summarize workflow responsibilities."]]
  },
  {
    key: "printavo-account-setup",
    name: "Printavo",
    prefix: "printavo",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Account Setup & Configuration",
    shortDescription: "Printavo account setup assistance for shop information, user workflows, records and agreed administrative configuration.",
    audience: "screen printers, embroidery shops, apparel decorators and custom print businesses",
    cards: [["Setup requirements", "Document shop structure, roles, data needs and current processes."], ["Account information", "Organize approved shop details and reference information."], ["Workflow configuration", "Assist with agreed administrative setup within assigned permissions."], ["Configuration review", "Check the agreed setup checklist with the shop administrator."]]
  },
  {
    key: "printavo-quote-invoice",
    name: "Printavo",
    prefix: "printavo",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Quote & Invoice Setup",
    shortDescription: "Quote and invoice workflow setup assistance for line-item information, customer records, templates and approval steps.",
    audience: "screen printers, embroidery shops and custom apparel businesses",
    cards: [["Quote process review", "Map how quote requests, revisions and approvals move through the shop."], ["Record preparation", "Organize customer, product, quantity and pricing inputs supplied by the shop."], ["Template administration", "Prepare approved reusable wording and record structures where supported."], ["Approval checks", "Verify required information and leave pricing and financial approvals to the client."]]
  },
  {
    key: "printavo-artwork-approval",
    name: "Printavo",
    prefix: "printavo",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Artwork Approval Workflow Setup",
    shortDescription: "Artwork approval workflow assistance for proof status, customer review steps, job notes and production readiness handoffs.",
    audience: "screen printers, embroidery shops and apparel decorators",
    cards: [["Approval stages", "Define proof preparation, customer review and approval responsibilities."], ["Job record fields", "Organize artwork references, revision notes and required job details."], ["Status tracking", "Prepare agreed status labels and administrative follow-up procedures."], ["Workflow validation", "Check that approval records and production handoffs are clear."]]
  },
  {
    key: "printavo-production-scheduling",
    name: "Printavo",
    prefix: "printavo",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Production Scheduling Setup",
    shortDescription: "Production scheduling setup support for job stages, due-date information, assignments and shop-floor handoffs.",
    audience: "screen printers, embroidery businesses and custom print shops",
    cards: [["Scheduling review", "Map production stages, capacity inputs and scheduling responsibilities."], ["Job information", "Organize supplied due dates, quantities and production requirements."], ["Schedule administration", "Assist with approved schedule and job record updates."], ["Schedule checks", "Flag missing dates, conflicting information and jobs needing shop review."]]
  },
  {
    key: "printavo-order-management",
    name: "Printavo",
    prefix: "printavo",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Order Management & Updates",
    shortDescription: "Order management support for job records, customer information, order changes, status tracking and production notes.",
    audience: "screen printers, embroidery shops and apparel decorators",
    cards: [["Order intake", "Review supplied order details, specifications and customer references."], ["Order record updates", "Enter approved quantities, due dates, notes and related job information."], ["Change tracking", "Record authorized changes and organize the relevant handoffs."], ["Order review", "Check record completeness and flag unclear specifications."]]
  },
  {
    key: "printavo-workflow-automation",
    name: "Printavo",
    prefix: "printavo",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Workflow Automation Setup",
    shortDescription: "Workflow automation planning and configuration assistance for repeatable job tasks, reminders and administrative process consistency.",
    audience: "growing screen printing, embroidery and custom print businesses",
    cards: [["Process mapping", "Identify repetitive tasks, trigger points and approval requirements."], ["Automation requirements", "Document desired actions, exceptions and responsible team members."], ["Configuration support", "Assist with approved workflow settings where supported by the account."], ["Test and document", "Review expected behavior with the shop team and document the process."]]
  },
  {
    key: "printavo-customer-data",
    name: "Printavo",
    prefix: "printavo",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Customer Data Management",
    shortDescription: "Customer data organization and maintenance for contact records, account details, job history references and administrative consistency.",
    audience: "screen printers, embroidery shops and custom merchandise providers",
    cards: [["Data review", "Review client-supplied customer records and agreed data standards."], ["Record cleanup", "Standardize approved names, contact fields and account information."], ["Ongoing updates", "Apply authorized customer record changes and organize supporting notes."], ["Data quality summary", "Flag duplicates, missing fields and records requiring client confirmation."]]
  },
  {
    key: "printavo-task-job-tracking",
    name: "Printavo",
    prefix: "printavo",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Task & Job Tracking Setup",
    shortDescription: "Task and job tracking setup assistance for assignments, job stages, due dates, notes and administrative visibility.",
    audience: "screen printers, embroidery shops and production teams",
    cards: [["Tracking requirements", "Define job stages, task ownership and information needed by each role."], ["Task structure", "Organize agreed task names, job notes and due-date conventions."], ["Status administration", "Assist with approved assignment and status updates."], ["Tracking review", "Check open tasks and flag overdue or incomplete information."]]
  },
  {
    key: "printavo-reporting-dashboard",
    name: "Printavo",
    prefix: "printavo",
    generalUrl: "/print-shop-quoting-software/",
    serviceName: "Printavo Reporting & Dashboard Setup",
    shortDescription: "Reporting and dashboard setup assistance for operational data organization, recurring views and management reporting requirements.",
    audience: "print shops, screen printers, embroidery businesses and apparel decorators",
    cards: [["Reporting goals", "Confirm the shop questions, metrics and review cadence."], ["Data requirements", "Identify source fields and consistent definitions for requested reports."], ["View preparation", "Assist with available saved views or report setup under client direction."], ["Report review", "Check outputs for completeness and identify data-quality limitations."]]
  }
];

for (const item of keywordExpansion) {
  platforms.push({
    key: item.key,
    name: item.name,
    slugBase: item.prefix + "-" + item.key.replace(item.prefix + "-", ""),
    generalUrl: item.generalUrl,
    serviceName: item.serviceName,
    shortDescription: item.shortDescription,
    audience: item.audience,
    cards: item.cards,
    steps: [
      ["Review your requirements", "Confirm the platform workflow, store or shop goals, supplied information, access permissions and approval contacts."],
      ["Build or update the platform records", "Complete the agreed setup, upload, content or workflow tasks using client-approved data and assets."],
      ["Review and hand over", "Check the agreed changes, document exceptions and provide a clear summary for your team."]
    ],
    faqs: [
      ["Can you provide " + item.name + " setup and update support?", "Yes. FJX Studio provides independent administrative assistance for the agreed " + item.name + " tasks, subject to client access, platform permissions and approval."],
      ["Can you upload products and update existing stores?", "Support can include supplied product data, images, options, content and approved listing changes. Exact scope depends on the platform features and project requirements."],
      ["Is FJX Studio affiliated with " + item.name + "?", "No. FJX Studio is an independent service provider and is not affiliated with, endorsed by or acting on behalf of " + item.name + "."]
    ]
  });
}

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
  const pageTitle = platform.serviceName + " in " + country.name + " | FJX Studio";
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
