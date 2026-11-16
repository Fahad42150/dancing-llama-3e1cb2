import { CheckCircle2, ArrowRight } from 'lucide-react';
import { services } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

const servicePages = [
  { label: 'InkSoft Store Management', href: '/inksoft-store-management/' },
  { label: 'InkSoft Product Catalog Management', href: '/inksoft-product-catalog-management/' },
  { label: 'InkSoft Store Setup', href: '/inksoft-store-setup/' },
  { label: 'eCommerce Store Management', href: '/ecommerce-store-management/' },
  { label: 'eCommerce Virtual Assistant', href: '/ecommerce-virtual-assistant/' },
  { label: 'eCommerce Product Upload Services', href: '/ecommerce-product-upload-services/' },
  { label: 'eCommerce Order Management', href: '/ecommerce-order-management/' },
  { label: 'Apparel Store Management', href: '/apparel-store-management/' },
  { label: 'Custom Apparel Store Management', href: '/custom-apparel-store-management/' },
  { label: 'Team Store Management', href: '/team-store-management/' },
  { label: 'eCommerce Social Media Management', href: '/ecommerce-social-media-management/' },
  { label: 'eCommerce Bookkeeping & Accounting Support', href: '/ecommerce-bookkeeping-accounting/' },
  { label: 'eCommerce Business Process Outsourcing', href: '/ecommerce-business-process-outsourcing/' },
  { label: 'Cost-Effective eCommerce Store Support', href: '/cost-effective-ecommerce-store-support/' },
  { label: 'Remote eCommerce Store Support Assistant', href: '/remote-ecommerce-store-support-assistant/' },
  { label: 'Shopify Store Management', href: '/shopify-store-management/' },
  { label: 'WooCommerce & WordPress Store Management', href: '/woocommerce-wordpress-store-management/' },
  { label: 'Chipply Store Management', href: '/chipply-store-management/' },
  { label: 'InkSoft Product and Artwork Setup Services', href: '/inksoft-product-artwork-setup-services/' },
  { label: 'School Spirit Wear and Fundraising Store Setup', href: '/school-spirit-wear-fundraising-store-setup/' },
  { label: 'Team Dealer eCommerce Support', href: '/team-dealer-ecommerce-support/' },
  { label: 'Embroidery Business Virtual Assistant', href: '/embroidery-business-virtual-assistant/' },
  { label: 'Promotional Products Store Management', href: '/promotional-products-store-management/' },
  { label: 'Screen Printing Shop Virtual Assistant', href: '/screen-printing-shop-virtual-assistant/' },
  { label: 'eCommerce Data Entry Services', href: '/ecommerce-data-entry-services/' },
  { label: 'Marketplace Management Services', href: '/marketplace-management-services/' },
  { label: 'Dedicated eCommerce Virtual Assistant', href: '/dedicated-ecommerce-virtual-assistant/' },
  { label: 'eCommerce Order Processing Virtual Assistant', href: '/ecommerce-order-processing-virtual-assistant/' },
  { label: 'eCommerce Inventory Management Services', href: '/ecommerce-inventory-management/' },
  { label: 'eCommerce Customer Support Virtual Assistant', href: '/ecommerce-customer-support-virtual-assistant/' },
  { label: 'eCommerce Product Listing Management', href: '/ecommerce-product-listing-management/' },
  { label: 'eCommerce Customer Support Services', href: '/ecommerce-customer-support-services/' },
  { label: 'Live Chat Support Services', href: '/live-chat-support-services/' },
  { label: 'Email Support Services', href: '/email-support-services/' },
  { label: 'Outsourced Customer Support', href: '/outsourced-customer-support/' },
  { label: 'Email Management Virtual Assistant', href: '/email-management-virtual-assistant/' },
  { label: 'Canva Graphic Design Services', href: '/canva-graphic-design-services/' },
  { label: 'Canva Social Media Design Services', href: '/canva-social-media-design/' },
  { label: 'Custom Canva Templates for Businesses', href: '/custom-canva-templates-design/' },
  { label: 'eCommerce Graphic Design Services', href: '/ecommerce-graphic-design-services/' },
  { label: 'Canva Presentation and Marketing Design', href: '/canva-presentation-marketing-design/' },
  { label: 'Canva Virtual Assistant Services', href: '/canva-virtual-assistant/' },
];

export default function Services() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="services" className="bg-charcoal-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className={`reveal mb-16 max-w-2xl ${isVisible ? 'is-visible' : ''}`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-parrot-100 px-4 py-2 text-sm font-medium text-parrot-700">
            What We Do
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-charcoal-500">
            Remote eCommerce operations support including product catalog management,
            product data entry, order processing, inventory updates and daily store
            administration. InkSoft is our primary specialty for apparel businesses,
            alongside general platform-independent eCommerce support for online
            retailers in the USA and Canada.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-charcoal-100 bg-white px-8 py-10">
          <h3 className="font-display text-2xl font-bold text-charcoal-900">
            Explore More Services
          </h3>
          <p className="mt-2 max-w-3xl text-charcoal-500">
            Choose the service that matches your platform and the work your
            team needs to delegate.
          </p>
          <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((page) => (
              <a
                key={page.href}
                href={page.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal-700 underline decoration-parrot-400 underline-offset-4 transition-colors hover:text-parrot-700"
              >
                {page.label}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-charcoal-900 px-8 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">
              Need reliable help with your online store?
            </h3>
            <p className="mt-2 text-charcoal-300">
              Share your platform, catalog requirements and recurring tasks to
              discuss a practical support plan.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-parrot-400 px-7 py-4 text-base font-semibold text-charcoal-900 transition-all hover:bg-parrot-300 hover:-translate-y-0.5"
          >
            Discuss Your Project
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const { ref, isVisible } = useReveal();
  const Icon = service.icon;

  return (
    <article
      ref={ref}
      className={`reveal group rounded-2xl border border-charcoal-100 bg-white p-7 shadow-soft transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 hover:border-parrot-200 ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-parrot-50 transition-colors group-hover:bg-parrot-400">
        <Icon size={26} className="text-parrot-600 transition-colors group-hover:text-charcoal-900" />
      </div>
      <h3 className="font-display text-xl font-bold text-charcoal-900">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-charcoal-500">
        {service.description}
      </p>
      <ul className="mt-5 space-y-2.5">
        {service.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2.5 text-sm text-charcoal-700"
          >
            <CheckCircle2 size={17} className="shrink-0 text-parrot-500" />
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}
