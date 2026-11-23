import fs from "node:fs";
import path from "node:path";

const publicDir = path.resolve("public");
const referencePath = path.join(publicDir, "inksoft-store-management", "index.html");
if (!fs.existsSync(referencePath)) throw new Error("InkSoft reference page not found: " + referencePath);
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
["woolworths-online-manager","Woolworths Online Manager Role and Store Operations Support","An overview of online grocery retail management workflows associated with Woolworths Online. FJX Studio is independent and is not affiliated with Woolworths."],
["inventory-management-assistant","Inventory Management Assistant Services","Remote inventory management assistant support for stock records, SKU maintenance, inventory reporting, discrepancy checks and routine replenishment coordination."],
["inventory-control-assistant","Inventory Control Assistant Services","Inventory control assistant support for stock accuracy, cycle-count records, inventory adjustments, variance tracking and escalation of stock discrepancies."],
["inventory-assistant","Inventory Assistant Services","Inventory assistant services for product data updates, stock monitoring, purchase order administration and inventory record maintenance."],
["assistant-inventory","Assistant Inventory Management Services","Administrative inventory support for stock records, item data, receiving logs, inventory reconciliation and routine reporting."],
["assistant-inventory-controller","Assistant Inventory Controller Services","Inventory controller assistant support for stock movement records, control checks, cycle counts and inventory variance reporting."],
["assistant-inventory-manager","Assistant Inventory Manager Services","Assistant inventory manager support for inventory planning administration, stock monitoring, supplier coordination and performance reporting."],
["assistant-inventory-manager-job-description","Assistant Inventory Manager Job Description and Role Support","A practical overview of assistant inventory manager responsibilities, qualifications and daily workflows, with guidance on how FJX Studio can support related administrative tasks."],
["assistant-manager-inventory","Assistant Manager Inventory Services","Inventory assistant manager support for stock control routines, team task coordination, replenishment tracking and operational reporting."],
["assistant-stock-manager","Assistant Stock Manager Services","Stock manager assistant support for stock level monitoring, product records, goods-received logs and stocktake administration."],
["assistant-stock-manager-job-description","Assistant Stock Manager Job Description and Role Support","An overview of assistant stock manager duties, common skills and inventory workflows, alongside optional administrative support for stock operations."],
["inventory-assistant-manager","Inventory Assistant Manager Services","Inventory assistant manager support for stock accuracy, inventory records, reorder administration, cycle counts and exception reporting."],
["inventory-control-assistant-job-description","Inventory Control Assistant Job Description and Role Support","A clear guide to inventory control assistant responsibilities, required skills and stock control processes, with examples of administrative tasks."],
["stock-control-assistant","Stock Control Assistant Services","Stock control assistant support for stock movement logs, stocktake preparation, inventory adjustments and discrepancy follow-up."],
["stock-management-assistant","Stock Management Assistant Services","Stock management assistant services for product and SKU records, stock level checks, replenishment administration and inventory reports."],
["warehouse-inventory-control-assistant","Warehouse Inventory Control Assistant Services","Warehouse inventory control support for receiving records, put-away logs, stock counts, location accuracy and warehouse inventory reconciliation."],
["shopify-assistant","Shopify Assistant Services","Shopify assistant support for product uploads, collections, order administration, customer support workflows and routine storefront maintenance."],
["shopify-virtual-assistant","Shopify Virtual Assistant Services","Shopify virtual assistant support for catalog updates, product listings, order processing administration, store maintenance and reporting."],
["shopify-va","Shopify VA Services","Shopify VA support for product data, collections, inventory updates, order workflows and day-to-day Shopify store administration."],
["hire-shopify-virtual-assistant","Hire a Shopify Virtual Assistant","Hire Shopify virtual assistant support for recurring store tasks, product uploads, order administration, inventory records and customer service coordination."],
["virtual-assistant-for-shopify","Virtual Assistant for Shopify Services","Virtual assistant services for Shopify stores, including product listing maintenance, collections, inventory updates, order follow-up and store content administration."],
["shopify-store-assistant","Shopify Store Assistant Services","Shopify store assistant support for product pages, pricing and inventory checks, order status coordination and storefront quality reviews."],
["virtual-assistant-for-shopify-store","Virtual Assistant for Shopify Store Services","Dedicated virtual assistant support for Shopify store operations, including catalog maintenance, product data, order workflows and routine reporting."],
["shopify-va-hiring","Shopify VA Hiring and Staffing Support","Support for businesses planning Shopify VA hiring, including task scoping, role responsibilities and operational workflow planning. This page does not claim to provide recruitment placements."],
["shopify-virtual-assistant-hiring","Shopify Virtual Assistant Hiring Support","Guidance for hiring Shopify virtual assistant support, defining responsibilities, evaluating platform skills and setting clear access and approval processes."],
["ordermygear-assistant","OrderMyGear Assistant Services","Independent OrderMyGear assistant support for store administration, catalog coordination, product data maintenance and routine company-store tasks. FJX Studio is not affiliated with or endorsed by OrderMyGear."],
["ordermygear-store-setup-catalog-management","OrderMyGear Store Setup and Catalog Management Services","Independent setup and catalog administration support for OrderMyGear company stores, including category planning, product data organization and storefront quality checks. Not an official OrderMyGear service."],
["ordermygear-products-upload","OrderMyGear Product Upload Services","Product upload assistance for OrderMyGear stores, including product titles, descriptions, images, variants, attributes and catalog quality checks. FJX Studio is an independent provider."],
["ordermygear-pricing-setup","OrderMyGear Pricing Setup Services","Independent assistance organizing product pricing, price lists, variant pricing and review workflows for OrderMyGear company stores. Pricing changes should be approved by the store owner."],
["ordermygear-store-management-product-upload-services","OrderMyGear Store Management and Product Upload Services","Ongoing independent OrderMyGear store administration covering catalog updates, product uploads, data checks and operational task coordination."],
["ordermygear-store-setup-service","OrderMyGear Store Setup Services","Store setup assistance for businesses configuring an OrderMyGear company store, including catalog structure, product information and launch-readiness checks. Not affiliated with OrderMyGear."],
["omg-store-builder","OMG Store Builder Services","Independent planning and setup support for OMG company-store builder workflows, including product catalog preparation, store configuration and launch checklists. Confirm the relevant OMG platform with your team before implementation."],
["ordermygear-virtual-assistant","OrderMyGear Virtual Assistant Services","Virtual assistant support for OrderMyGear store operations, including catalog maintenance, product uploads, pricing administration and routine store coordination."],
["outsource-ordermygear-store-creation","Outsource OrderMyGear Store Creation Services","Independent support to plan and prepare an OrderMyGear company store, organize product data and coordinate setup tasks. Platform access and final approvals remain with the client."],
["omg-pop-up-store-setup","OMG Pop-Up Store Setup Services","Independent pop-up store setup assistance for OMG company-store workflows, including temporary catalog preparation, product data checks and launch coordination. Confirm the specific OMG platform before work begins."],
["ordermygear-company-store-builder","OrderMyGear Company Store Builder Services","Company-store planning and configuration assistance for OrderMyGear, including store structure, catalog organization, product uploads and pre-launch checks. FJX Studio is not an official OrderMyGear partner."],
["omg-store-configuration","OMG Store Configuration Services","Independent store configuration support for OMG company-store workflows, covering catalog settings, product organization, storefront checks and launch preparation. Confirm the platform and configuration scope before engagement."],
["ordermygear-store-management","OrderMyGear Store Management Services","Ongoing independent OrderMyGear store management support for catalog upkeep, product data updates, pricing administration, content checks and operational coordination."],
["ordermygear-product-upload-service","OrderMyGear Product Upload Services","Product upload service support for OrderMyGear stores, including product details, images, variants, categories and quality assurance before publishing."],
["spirit-wear-online-store-setup","Spirit Wear Online Store Setup Services","Setup support for spirit wear webstores, including product and decoration options, school or team collections, store navigation, launch checks and order workflow coordination."],
["athletic-team-store-builder","Athletic Team Store Builder Services","Athletic team store setup support for uniforms, fanwear and spirit wear catalogs, team-specific collections, product options, store branding and launch readiness."],
["school-fundraising-webstore-setup","School Fundraising Webstore Setup Services","Fundraising webstore setup for schools and groups, including campaign collections, product data, store configuration, order windows and fundraiser launch coordination."],
["youth-sports-uniform-store-management","Youth Sports Uniform Store Management Services","Ongoing youth sports uniform store support covering team and player options, product uploads, size and variant data, order tracking and seasonal catalog updates."],
["company-swag-store-setup-service","Company Swag Store Setup Services","Company swag store setup for branded merchandise programs, including product catalog preparation, employee-facing collections, decoration details and launch coordination."],
["corporate-merch-store-builder","Corporate Merch Store Builder Services","Corporate merchandise store setup support for branded apparel and promotional products, with catalog organization, product variants, store configuration and operational workflows."],
["employee-uniform-webstore-management","Employee Uniform Webstore Management Services","Employee uniform webstore management covering product and size updates, department-specific collections, reorder workflows, catalog accuracy and routine store administration."],
["b2b-redemption-store-setup","B2B Redemption Store Setup Services","B2B redemption store setup support for approved merchandise programs, including product selection, redemption catalog structure, access workflows and fulfillment coordination."],
["inksoft-store-setup-service","InkSoft Store Setup Services","Independent InkSoft store setup assistance for print shops and decorators, including store structure, product catalog preparation, design options, configuration checks and launch support."],
["inksoft-virtual-assistant","InkSoft Virtual Assistant Services","Virtual assistant support for InkSoft-powered stores, including product uploads, catalog maintenance, pricing updates, store content administration and routine operational coordination."],
["inksoft-webstore-builder","InkSoft Webstore Builder Services","Independent setup support for InkSoft webstores, including branded storefront configuration, product organization, decoration options and pre-launch quality checks."],
["inksoft-fundraising-store-setup","InkSoft Fundraising Store Setup Services","Fundraising store setup support using InkSoft workflows, including campaign catalog preparation, product options, store configuration and fundraiser launch coordination."],
["inksoft-designer-setup","InkSoft Designer Setup Services","InkSoft designer setup support covering product artwork preparation, design templates, decoration option organization and customer-facing design workflow checks."],
["outsource-inksoft-store-creation","Outsource InkSoft Store Creation Services","Outsource store creation support for print shops using InkSoft, from storefront planning and catalog organization to configuration checks and launch coordination."],
["inksoft-store-management","InkSoft Store Management Services","Ongoing independent InkSoft store management support for product uploads, catalog updates, pricing administration, storefront checks and order workflow coordination."],
["inksoft-rapid-product-creator-service","InkSoft Rapid Product Creator Services","Product setup assistance for InkSoft Rapid Product Creator workflows, including product information, variants, images, pricing fields and catalog quality assurance."],
["peak-season-support-for-print-shops","Peak Season Support for Print Shops","Seasonal operational support for print shops handling peak order volume, including overflow catalog updates, product setup, store checks and workflow coordination."],
["overflow-webstore-setup-service","Overflow Webstore Setup Services","Overflow webstore setup assistance for decorators and print shops managing multiple launches, including product catalog preparation, storefront configuration and pre-launch checks."],
["back-to-school-spirit-wear-store-support","Back-to-School Spirit Wear Store Support Services","Seasonal support for back-to-school spirit wear stores, including school collections, apparel options, product updates, store checks and launch coordination."],
["q4-holiday-merch-store-builder","Q4 Holiday Merch Store Builder Services","Q4 holiday merchandise store setup support for corporate gifting and seasonal campaigns, including product catalog preparation, branded collections and launch readiness."],
["dedicated-ecommerce-store-manager-for-decorators","Dedicated eCommerce Store Manager for Decorators Services","Dedicated remote store management support for decorators, covering product uploads, catalog maintenance, pricing and decoration option updates, storefront checks and routine reporting."],
["shopify-setup-for-screen-printers","Shopify Setup for Screen Printers Services","Shopify store setup support for screen printers, including storefront structure, apparel product options, decoration details, shipping settings, product data and pre-launch quality checks."],
["custom-apparel-webstore-development","Custom Apparel Webstore Development Services","Custom apparel webstore development support for decorators, covering store planning, product catalogs, garment variants, artwork presentation, customer ordering workflows and launch coordination."],
["woocommerce-store-setup-for-print-shops","WooCommerce Store Setup for Print Shops Services","WooCommerce setup support for print shops, including product and variation configuration, decoration options, payment and shipping settings, catalog organization and storefront testing."],
["print-on-demand-store-setup-service","Print-on-Demand Store Setup Services","Print-on-demand store setup support, including product catalog preparation, design placement, garment variants, pricing structure, fulfillment settings and test-order workflows."],
["merch-store-builder-for-decorators","Merch Store Builder for Decorators Services","Merchandise store setup support for apparel decorators, including branded storefronts, product catalogs, garment options, artwork placement and customer ordering flows."],
["apparel-product-catalog-management","Apparel Product Catalog Management Services","Apparel catalog management for print shops and distributors, including product titles, descriptions, images, sizes, colors, SKUs, pricing fields and ongoing catalog quality checks."],
["sanmar-product-upload-service","SanMar Product Upload Services","SanMar product upload assistance for approved customer catalogs, including garment data, color and size variants, product images, SKU mapping and listing quality checks. Product data and brand assets are used subject to applicable permissions."],
["ss-activewear-catalog-sync","S&S Activewear Catalog Sync Services","Catalog synchronization support for S&S Activewear product data, including SKU matching, garment attributes, size and color variants, image updates and exception reporting."],
["alphabroder-product-upload","alphabroder Product Upload Services","alphabroder product upload assistance covering product information, apparel variants, images, SKU records, pricing fields and catalog validation for decorators and distributors."],
["bulk-product-upload-for-print-shops","Bulk Product Upload for Print Shops Services","Bulk product upload support for print shops, including spreadsheet preparation, SKU mapping, image organization, variant setup, data validation and staged publishing."],
["sku-and-size-chart-setup","SKU and Size Chart Setup Services","SKU and size chart setup for apparel catalogs, including consistent product identifiers, size mapping, garment measurements, variant naming and customer-facing chart checks."],
["embroidery-sku-management","Embroidery SKU Management Services","Embroidery SKU management support for decorated apparel catalogs, including garment identifiers, color and size variants, decoration-specific product records and stock data coordination."],
["custom-apparel-mockup-setup-service","Custom Apparel Mockup Setup Services","Custom apparel mockup setup support, including garment imagery, artwork placement, colorway previews, product option presentation and storefront image quality checks."],
["svg-colorway-setup","SVG Colorway Setup Services","SVG colorway setup assistance for apparel and promotional product workflows, including artwork file organization, color variant mapping, preview checks and consistent naming conventions."],
["virtual-sample-creation-for-promo-distributors","Virtual Sample Creation for Promo Distributors Services","Virtual sample preparation support for promotional product distributors, including artwork placement previews, product color options, presentation files and review-ready mockups."],
["webstore-logo-placement-setup","Webstore Logo Placement Setup Services","Webstore logo placement setup for apparel decorators, including logo asset preparation, placement options, product previews, decoration notes and customer-facing configuration checks."],
["garment-colorway-configuration","Garment Colorway Configuration Services","Garment colorway configuration support for apparel stores, including color variant setup, SKU alignment, image matching, product option naming and listing validation."],
["virtual-assistant-for-screen-printing-shops","Virtual Assistant for Screen Printing Shops Services","Virtual assistant support for screen printing shops, including product uploads, webstore maintenance, customer and order administration, catalog updates and production handoff coordination."],
["printavo-virtual-assistant","Printavo Virtual Assistant Services","Administrative support for print shops using Printavo, including approved data entry, job and order record updates, customer information maintenance and workflow coordination. Access and permissions remain controlled by the client."],
["apparel-decorator-back-office-support","Apparel Decorator Back-Office Support Services","Back-office support for apparel decorators, including order administration, product data maintenance, purchase order coordination, webstore updates and routine operational reporting."],
["purchase-order-and-packing-slip-management","Purchase Order and Packing Slip Management Services","Administrative support for purchase orders and packing slips, including document preparation, item and quantity checks, supplier record updates and exception escalation for approval."],
["promo-distributor-virtual-assistant","Promo Distributor Virtual Assistant Services","Virtual assistant support for promotional product distributors, including product research administration, catalog updates, virtual samples, quote follow-up and order documentation."],
["shopvox-admin-support","shopVOX Admin Support Services","Administrative support for businesses using shopVOX, including approved customer and job record updates, product data maintenance, order administration and workflow documentation."],
["yoprint-virtual-assistant","YoPrint Virtual Assistant Services","Virtual assistant support for print shops using YoPrint, including approved order record maintenance, customer data updates, product and catalog administration and task coordination."],
["hire-someone-to-build-ordermygear-stores","Hire Someone to Build OrderMyGear Stores","Independent OrderMyGear store build support, including store structure, catalog preparation, product uploads, configuration checks and launch coordination. FJX Studio is not affiliated with OrderMyGear."],
["freelance-inksoft-store-builder-usa","Freelance InkSoft Store Builder in the USA","Freelance InkSoft webstore setup support for US print shops, including storefront configuration, product catalog setup, decoration options and pre-launch checks. Independent service provider."],
["outsourced-webstore-team-for-screen-printers","Outsourced Webstore Team for Screen Printers","Outsourced webstore operations support for screen printers, including store builds, catalog updates, product uploads, pricing administration and seasonal maintenance."],
["same-day-online-store-setup-for-print-shops","Same-Day Online Store Setup for Print Shops","Expedited online store setup support for print shops, subject to scope, asset readiness, platform access and approval timelines. Work may include storefront configuration, product setup and launch checks."],
["white-label-webstore-setup-for-promo-agencies","White-Label Webstore Setup for Promo Agencies","Behind-the-scenes webstore setup support for promotional product agencies, including branded store configuration, catalog preparation, product data and launch coordination. White-label arrangements are subject to agreed scope."],
["dedicated-webstore-specialist-for-apparel-decorators","Dedicated Webstore Specialist for Apparel Decorators","Dedicated operational support for apparel decorators, including product catalog maintenance, garment variants, decoration options, store updates and routine quality checks."],
["part-time-virtual-assistant-for-embroidery-shop","Part-Time Virtual Assistant for Embroidery Shops","Part-time virtual assistant support for embroidery businesses, including product uploads, customer and order administration, design file organization and store maintenance."],
["online-store-audit-for-print-shops","Online Store Audit for Print Shops","A structured review of a print shop's online store covering navigation, product data, variants, decoration options, pricing presentation, mobile usability and conversion friction."],
["webstore-pricing-matrix-and-markup-setup","Webstore Pricing Matrix and Markup Setup","Setup assistance for webstore pricing matrices, markup rules, product variants and decoration charges, with documented assumptions and client approval before publishing."],
["custom-personalization-and-roster-setup","Custom Personalization and Roster Setup","Webstore personalization and roster configuration support for names, numbers, team lists, player details and custom product fields, with validation and test-order checks."],
["shipping-tax-and-fulfillment-rules-setup","Shipping, Tax and Fulfillment Rules Setup","Configuration assistance for shipping methods, tax settings and fulfillment workflows, coordinated with the client's policies, platform capabilities and tax or logistics advisers."],
["webstore-migration-for-apparel-decorators","Webstore Migration for Apparel Decorators","Webstore migration support for apparel decorators, including product and variant mapping, catalog cleanup, image transfer, redirects planning and post-migration quality checks."],
["seasonal-store-reopening-and-refresh-service","Seasonal Store Reopening and Refresh Services","Seasonal webstore reopening and refresh support, including catalog updates, pricing reviews, banners, product availability checks and launch readiness for new ordering windows."],
["custom-webstore-banner-and-landing-page-design","Custom Webstore Banner and Landing Page Design","Custom banner and landing page design support for branded webstores, including campaign messaging, product highlights, responsive layout and visual asset preparation."],
["school-uniform-online-store-setup","School Uniform Online Store Setup Services","School uniform store setup support, including grade or campus collections, size variants, product catalog preparation, ordering windows and parent-friendly store navigation."],
["healthcare-and-scrubs-store-builder","Healthcare and Scrubs Store Builder Services","Online store setup support for healthcare apparel and scrubs programs, including garment catalogs, size and color variants, department collections and reorder workflows."],
["construction-and-workwear-store-setup","Construction and Workwear Store Setup Services","Construction and workwear store setup support, including safety apparel catalogs, size variants, employee collections, decoration options and replenishment workflows."],
["golf-tournament-merch-store-builder","Golf Tournament Merch Store Builder Services","Golf tournament merchandise store setup support, including event-branded apparel, product options, order deadlines, sponsor merchandise and tournament collection pages."],
["marathon-and-race-swag-store-setup","Marathon and Race Swag Store Setup Services","Marathon and race merchandise store setup support, including event apparel, participant merchandise, size options, campaign banners and fulfillment coordination."],
["non-profit-fundraising-store-builder","Non-Profit Fundraising Store Builder Services","Fundraising store setup support for nonprofit organizations, including campaign collections, branded merchandise, product catalog setup, order windows and launch coordination."],
["municipal-and-first-responder-uniform-store","Municipal and First Responder Uniform Store Services","Uniform store setup and management support for municipal teams and first responders, including role-based collections, approved product catalogs, size variants and controlled ordering workflows."],
["university-and-greek-life-merch-store-setup","University and Greek Life Merch Store Setup Services","University and Greek life merchandise store setup support, including organization-branded collections, apparel variants, campaign pages, product uploads and ordering window configuration."],
["printful-store-setup-for-apparel-brands","Printful Store Setup for Apparel Brands","Independent Printful store setup support for apparel brands, including product catalog planning, product variants, mockup preparation, pricing review, storefront configuration and test-order checks. FJX Studio is not affiliated with or endorsed by Printful."],
["printify-bulk-product-upload-service","Printify Bulk Product Upload Services","Bulk product upload assistance for Printify catalogs, including product titles, descriptions, mockups, variants, SKU mapping and listing quality checks. Platform access and publishing remain under the client's control; this is an independent service."],
["gelato-webstore-integration","Gelato Webstore Integration Services","Independent setup and workflow assistance for Gelato-connected webstores, including product data mapping, catalog organization, variant checks, order-flow testing and storefront QA. Integration scope depends on the client's platform and available Gelato features."],
["fulfill-engine-setup-service","Fulfill Engine Setup Services","Fulfill Engine setup assistance for print and fulfillment operations, including workflow mapping, product and order data preparation, configuration checklists and test transactions. FJX Studio is an independent provider, not an official platform representative."],
["customcat-store-setup","CustomCat Store Setup Services","Independent CustomCat store setup support, including product selection, listing preparation, mockup checks, pricing fields, storefront organization and test-order workflows."],
["dtf-transfer-webstore-setup","DTF Transfer Webstore Setup Services","Webstore setup assistance for direct-to-film (DTF) transfer businesses, including transfer product catalogs, size and gang-sheet options, artwork upload guidance, pricing structure and checkout testing."],
["automated-print-on-demand-store-builder","Automated Print-on-Demand Store Builder Services","Print-on-demand store setup support focused on efficient catalog and order workflows, product data organization, platform configuration, fulfillment handoffs and automation-readiness checks. Automation availability depends on the connected services."],
["sage-website-setup-service","SAGE Website Setup Services","Independent SAGE website and product-catalog setup assistance for promotional product distributors, including catalog organization, product data, branded presentation and inquiry workflow checks. Scope depends on the client's SAGE access and subscription."],
["esp-webstore-setup-service","ESP Webstore Setup Services","Independent ESP webstore setup support for promotional product distributors, including catalog preparation, product data organization, storefront presentation and order or inquiry workflow checks. Not an official ESP service."],
["asi-distributor-virtual-assistant","ASI Distributor Virtual Assistant Services","Virtual assistant support for ASI promotional product distributors, including supplier and product research administration, catalog updates, quote follow-up, order documentation and client-approved data entry."],
["commonsku-virtual-assistant","CommonSku Virtual Assistant Services","Independent virtual assistant support for CommonSku users, including approved CRM record updates, supplier and product data, quote administration, order status coordination and workflow documentation."],
["facilisgroup-store-setup","Facilisgroup Store Setup Services","Independent store setup and catalog administration support for promotional product distributors using Facilisgroup tools, including product data preparation, store content and workflow checks. Specific capabilities depend on the client's Facilisgroup environment."],
["brightstores-setup-service","BrightStores Setup Services","Independent BrightStores setup assistance for promotional product and branded merchandise stores, including storefront configuration, catalog preparation, product options, pricing review and launch checks."],
["company-casuals-store-builder","Company Casuals Store Builder Services","Company Casuals store setup support for corporate apparel and branded merchandise programs, including product catalog preparation, employee collections, garment variants and ordering workflows."],
["promotional-product-store-management","Promotional Product Store Management Services","Ongoing promotional product store management support, including catalog updates, product data, pricing administration, storefront content, order coordination and routine quality checks."],
["promo-distributor-order-processing-va","Promo Distributor Order Processing Virtual Assistant Services","Order processing virtual assistant support for promotional product distributors, including order entry, supplier follow-up, proof and approval tracking, documentation and status updates under client-defined controls."],
["affordable-ordermygear-store-setup-packages","Affordable OrderMyGear Store Setup Packages","Clearly scoped OrderMyGear store setup packages covering catalog preparation, product uploads, store configuration and launch checks. Final pricing depends on store count, catalog size and complexity; FJX Studio is independent of OrderMyGear."],
["monthly-webstore-management-retainer","Monthly Webstore Management Retainer Services","Monthly webstore management support with an agreed task scope for catalog maintenance, product uploads, pricing updates, content refreshes, quality checks and reporting. Retainer deliverables and service levels are defined before onboarding."],
["pay-per-store-webstore-setup-service","Pay-Per-Store Webstore Setup Services","Per-store setup support for businesses launching multiple branded or campaign webstores, including store configuration, catalog preparation, product options and launch QA. Scope and fees are agreed for each store."],
["bulk-team-store-creation-pricing","Bulk Team Store Creation Pricing and Services","Bulk team store creation support with pricing scoped by store count, catalog complexity, product variants, personalization requirements and launch timelines. Request a tailored quote for your program."],
["white-label-ecommerce-support-for-print-shops","White-Label eCommerce Support for Print Shops","White-label eCommerce operations support for print shops, including webstore setup, catalog uploads, product data maintenance, order administration and seasonal store updates under an agreed partner arrangement."]
];

const extractBetween = (startMarker, endMarker, label, from = 0) => {
  const start = reference.indexOf(startMarker, from);
  if (start < 0) throw new Error("Could not find " + label + " start in InkSoft reference page");
  const end = reference.indexOf(endMarker, start);
  if (end < 0) throw new Error("Could not find " + label + " end in InkSoft reference page");
  return reference.slice(start, end + endMarker.length);
};
const styleBlocks = [];
let styleCursor = 0;
while (true) {
  const styleStart = reference.indexOf("<style", styleCursor);
  if (styleStart < 0) break;
  const styleOpenEnd = reference.indexOf(">", styleStart);
  const styleEnd = reference.indexOf("</style>", styleOpenEnd);
  if (styleOpenEnd < 0 || styleEnd < 0) throw new Error("Malformed style block in InkSoft reference page");
  styleBlocks.push(reference.slice(styleStart, styleEnd + "</style>".length));
  styleCursor = styleEnd + "</style>".length;
}
const styles = styleBlocks.join("\n");
const header = extractBetween('<header class="top">', "</header>", "header");
const footer = extractBetween('<footer class="fjx-site-footer">', "</footer>", "footer")
  .replaceAll('href="/#contact"', 'href="#contact"');
const floating = extractBetween('<a id="fjx-book-now-sitewide"', "</a>", "floating Book Now CTA");
const chat = extractBetween("<!--Start of Tawk.to Script-->", "<!--End of Tawk.to Script-->", "Tawk.to live chat");
const media = extractBetween('<div class="hero-media-grid">', "</div>", "hero image and video");
if (!styles) throw new Error("Reference page CSS was not found");

const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const baseUrl = "https://www.fjxstudio.com";
const pages = topics.map(([tail, title, description]) => {
  const slug = "best-" + (tail.startsWith("best-") ? tail.slice(5) : tail) + "-services-usa-canada";
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
<div class="eyebrow">Spirit Wear, Team Stores and Print-Shop eCommerce · USA &amp; Canada</div>
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
<div class="contact-card contact-details"><span class="contact-icon">i</span><h3>Service Coverage</h3><p><strong>Markets:</strong> United States and Canada</p><p><strong>Service:</strong> Remote store setup and eCommerce operations support</p></div>
</div>
</div></section>
${footer}
${floating}
${chat}
</body></html>`;
  return {slug,url,title,description,html};
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
  const cards = pages.map(page => '<article class="item"><h3><a href="/'+page.slug+'/">'+escapeHtml(page.title)+'</a></h3><p>'+escapeHtml(page.description)+'</p></article>').join("");
  const section = marker+'<section class="section"><div class="wrap"><h2>InkSoft and Team Store Services for the USA &amp; Canada</h2><p class="lead">Explore spirit wear, team stores, company stores, InkSoft setup and print-shop eCommerce operations support.</p><div class="grid">'+cards+'</div></div></section>';
  const markerIndex = services.indexOf(marker);
  if (markerIndex >= 0) {
    const end = services.indexOf("</section>", markerIndex);
    services = services.slice(0, markerIndex) + section + services.slice(end >= 0 ? end + 10 : markerIndex + marker.length);
  } else {
    services = services.replace("</main>", section + "</main>");
  }
  fs.writeFileSync(servicesPath,services,"utf8");
}
console.log("Generated "+pages.length+" InkSoft and team store service pages.");
