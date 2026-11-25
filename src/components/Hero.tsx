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
              <span className="relative z-10 text-parrot-800">eCommerce</span>
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

        <div className="relative mx-auto w-full max-w-xl lg:block">
          <div className="pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-parrot-100/70 blur-2xl" />
          <div className="absolute -inset-x-3 inset-y-5 -rotate-3 rounded-[2rem] bg-gradient-to-br from-[#9FE870] via-[#c9f5a9] to-[#f5fbeF] opacity-90" />
          <div className="group relative animate-float overflow-hidden rounded-[2rem] border border-white/80 bg-white p-2 shadow-[0_28px_80px_rgba(45,70,25,0.18)] ring-1 ring-[#9FE870]/30">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.55rem] bg-parrot-50">
              <img
                src="https://images.pexels.com/photos/41045670/pexels-photo-41045670.jpeg?auto=compress&cs=tinysrgb&w=720&q=75"
                srcSet="https://images.pexels.com/photos/41045670/pexels-photo-41045670.jpeg?auto=compress&cs=tinysrgb&w=480&q=70 480w, https://images.pexels.com/photos/41045670/pexels-photo-41045670.jpeg?auto=compress&cs=tinysrgb&w=720&q=75 720w, https://images.pexels.com/photos/41045670/pexels-photo-41045670.jpeg?auto=compress&cs=tinysrgb&w=960&q=78 960w"
                sizes="(max-width: 768px) 100vw, 646px"
                width="720"
                height="576"
                alt="Online store management workspace and eCommerce dashboard"
                className="h-full min-h-[300px] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900/25 via-transparent to-white/10" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-charcoal-800 shadow-lg backdrop-blur-md">
                eCommerce operations, organized
              </div>
            </div>
          </div>
          <div className="absolute -left-5 top-10 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-[0_14px_40px_rgba(35,55,20,0.14)] backdrop-blur-md sm:-left-8 sm:p-4">
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
          <div className="absolute -bottom-5 right-0 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-[0_14px_40px_rgba(35,55,20,0.14)] backdrop-blur-md sm:-right-5 sm:p-4">
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
    </section>
  );
}
