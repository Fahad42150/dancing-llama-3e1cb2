import { ArrowRight, Zap, PackageCheck, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-white pt-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-20 h-96 w-96 rounded-full bg-parrot-100 opacity-50 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-parrot-50 opacity-60 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-8">
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-parrot-200 bg-parrot-50 px-4 py-2 text-sm font-medium text-charcoal-700">
            <Zap size={16} className="text-parrot-500" />
            InkSoft-focused eCommerce support for the USA & Canada
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-charcoal-900 text-balance sm:text-5xl lg:text-6xl">
            InkSoft Store Management &{' '}
            <span className="relative">
              <span className="relative z-10 text-parrot-500">eCommerce</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 -skew-y-1 bg-parrot-100" />
            </span>{' '}
            Operations Support
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal-500">
            FJX Studio helps apparel decorators, screen printers, team dealers
            and promotional product businesses manage InkSoft stores, product
            catalogs and daily online store tasks. We support product uploads,
            listing updates, store setup and order administration, with
            additional project support for Shopify, WooCommerce and Chipply.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-parrot-400 px-7 py-4 text-base font-semibold text-charcoal-900 shadow-parrot transition-all hover:bg-parrot-500 hover:shadow-lg hover:-translate-y-0.5"
            >
              View Our Work
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center rounded-xl border border-charcoal-200 bg-white px-7 py-4 text-base font-semibold text-charcoal-800 transition-all hover:border-charcoal-300 hover:bg-charcoal-50"
            >
              Request a Quote
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Zap size={22} className="shrink-0 text-parrot-600" />
              <div>
                <div className="font-semibold text-charcoal-900">InkSoft first</div>
                <div className="text-sm text-charcoal-500">Specialist platform focus</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={22} className="shrink-0 text-parrot-600" />
              <div>
                <div className="font-semibold text-charcoal-900">USA & Canada</div>
                <div className="text-sm text-charcoal-500">Remote business support</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PackageCheck size={22} className="shrink-0 text-parrot-600" />
              <div>
                <div className="font-semibold text-charcoal-900">Daily operations</div>
                <div className="text-sm text-charcoal-500">Catalogs, listings & orders</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative animate-float">
            <div className="overflow-hidden rounded-3xl border border-charcoal-100 shadow-card-hover">
              <img
                src="https://images.pexels.com/photos/41045670/pexels-photo-41045670.jpeg"
                alt="Online store management workspace and eCommerce dashboard"
                className="h-[460px] w-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="absolute -left-6 top-12 rounded-2xl border border-charcoal-100 bg-white p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-parrot-100">
                  <Zap size={20} className="text-parrot-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-charcoal-900">InkSoft Store Support</div>
                  <div className="text-xs text-charcoal-500">Setup & ongoing maintenance</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 bottom-10 rounded-2xl border border-charcoal-100 bg-white p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-parrot-100">
                  <PackageCheck size={20} className="text-parrot-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-charcoal-900">Product Catalog Care</div>
                  <div className="text-xs text-charcoal-500">Listings, variants & updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
