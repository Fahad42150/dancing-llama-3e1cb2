import { Award, Globe, Package, ClipboardCheck } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const strengths = [
  { icon: Award, value: 'InkSoft', label: 'Primary platform focus' },
  { icon: Globe, value: 'USA + Canada', label: 'Markets supported' },
  { icon: Package, value: 'Catalogs', label: 'Products, variants & listings' },
  { icon: ClipboardCheck, value: 'Daily', label: 'Store operations support' },
];

export default function About() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 lg:order-1">
            <div className="flex w-full items-center justify-center overflow-hidden rounded-3xl border border-charcoal-100 bg-white p-3 shadow-card">
              <img
                src="https://images.pexels.com/photos/41108027/pexels-photo-41108027.jpeg"
                alt="FJX Studio supporting eCommerce store operations"
                className="block h-auto max-h-[520px] w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 hidden h-32 w-32 rounded-2xl bg-parrot-400/20 backdrop-blur-sm sm:block" />
            <div className="absolute -top-5 -left-5 hidden h-24 w-24 rounded-full border-4 border-parrot-200 sm:block" />
          </div>

          <div
            ref={ref}
            className={`reveal order-1 lg:order-2 ${isVisible ? 'is-visible' : ''}`}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-parrot-50 px-4 py-2 text-sm font-medium text-parrot-700">
              About FJX Studio
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-4xl">
              InkSoft-Focused eCommerce Store Support
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal-500">
              FJX Studio provides remote eCommerce store setup, product catalog
              management and ongoing store administration for businesses
              serving customers in the United States and Canada. Our primary
              specialty is InkSoft, supporting apparel decorators, screen
              printers, team dealers, schools, clubs and promotional product
              businesses.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal-500">
              Depending on the project, we also assist with Shopify,
              WooCommerce on WordPress and Chipply workflows. Typical tasks
              include product uploads, SKU and variant updates, listing
              maintenance, artwork coordination, approved inventory changes
              and administrative order support. Work is completed against an
              agreed task list, access level and approval process.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {strengths.map((strength) => {
                const Icon = strength.icon;
                return (
                  <div
                    key={strength.label}
                    className="rounded-2xl border border-charcoal-100 bg-white p-5 text-center shadow-soft transition-all hover:shadow-card hover:-translate-y-0.5"
                  >
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-parrot-100">
                      <Icon size={20} className="text-parrot-600" />
                    </div>
                    <div className="font-display text-lg font-extrabold text-charcoal-900">
                      {strength.value}
                    </div>
                    <div className="mt-1 text-xs text-charcoal-500">{strength.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
