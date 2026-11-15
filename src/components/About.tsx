import { Award, Globe, Users, TrendingUp } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const stats = [
  { icon: Award, value: '8+', label: 'Years in eCommerce' },
  { icon: Users, value: '200+', label: 'Happy Clients' },
  { icon: Globe, value: '2', label: 'Countries Served' },
  { icon: TrendingUp, value: '40%', label: 'Avg. Sales Growth' },
];

export default function About() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-3xl border border-charcoal-100 shadow-card">
              <img
                src="https://images.pexels.com/photos/7792836/pexels-photo-7792836.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="FJX Studio team at work"
                className="h-[420px] w-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-5 -right-5 hidden h-32 w-32 rounded-2xl bg-parrot-400/20 backdrop-blur-sm sm:block" />
            <div className="absolute -top-5 -left-5 hidden h-24 w-24 rounded-full border-4 border-parrot-200 sm:block" />
          </div>

          {/* Text */}
          <div
            ref={ref}
            className={`reveal order-1 lg:order-2 ${isVisible ? 'is-visible' : ''}`}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-parrot-50 px-4 py-2 text-sm font-medium text-parrot-700">
              About FJX Studio
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-4xl">
              Your Trusted eCommerce Partner
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal-500">
              For over 8 years, FJX Studio has specialized in online store design, development, and management across the USA and Canada. We work with InkSoft, Shopify, WooCommerce, and all major eCommerce platforms, providing custom online store solutions.

We support sports teams, schools, fundraising organizations, apparel companies, and screen printers with custom online stores, sports graphics design, fundraising solutions, and apparel eCommerce services.

From store setup and product catalog management to customization and ongoing support, we build high-performing online stores that help businesses grow and turn visitors into loyal customer.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal-500">
              Our mission is simple: to build visually stunning, user-friendly, and high-converting online stores while managing every detail with care. Whether you're a sports team raising funds, a nonprofit organization running a fundraising campaign, or an apparel and screen-printing company looking for a reliable online store builder, FJX Studio is your trusted eCommerce partner.
            </p>

            {/* Stats grid */}
            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-charcoal-100 bg-white p-5 text-center shadow-soft transition-all hover:shadow-card hover:-translate-y-0.5"
                  >
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-parrot-100">
                      <Icon size={20} className="text-parrot-600" />
                    </div>
                    <div className="font-display text-2xl font-extrabold text-charcoal-900">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-charcoal-500">{stat.label}</div>
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
