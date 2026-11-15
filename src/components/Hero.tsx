import { ArrowRight, Star, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-white pt-24"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-20 h-96 w-96 rounded-full bg-parrot-100 opacity-50 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-parrot-50 opacity-60 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-8">
        {/* Left content */}
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-parrot-200 bg-parrot-50 px-4 py-2 text-sm font-medium text-charcoal-700">
            <Zap size={16} className="text-parrot-500" />
            8 Years of eCommerce Excellence Inksoft Stores Setup and Catalog management for USA and Candian Markets
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-charcoal-900 text-balance sm:text-5xl lg:text-6xl">
            We Build{' '}
            <span className="relative">
              <span className="relative z-10 text-parrot-500">Stunning</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 -skew-y-1 bg-parrot-100" />
            </span>{' '}
            eCommerce Experiences.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal-500">
            From InkSoft online store design and development to Shopify, WooCommerce, and beyond — we specialize in building, customizing, and managing high-performing InkSoft eCommerce stores for the USA and Canadian markets. With 8 years of experience, we help apparel brands, custom printing businesses, and promotional product companies transform visitors into loyal, repeat customers.
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
              Get a Free Quote
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <div>
              <div className="font-display text-3xl font-extrabold text-charcoal-900">8+</div>
              <div className="text-sm text-charcoal-500">Years Experience</div>
            </div>
            <div className="h-10 w-px bg-charcoal-100" />
            <div>
              <div className="font-display text-3xl font-extrabold text-charcoal-900">2000+</div>
              <div className="text-sm text-charcoal-500">Stores Managed</div>
            </div>
            <div className="h-10 w-px bg-charcoal-100" />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display text-3xl font-extrabold text-charcoal-900">5.0</span>
                <Star size={20} className="fill-parrot-400 text-parrot-400" />
              </div>
              <div className="text-sm text-charcoal-500">Client Rating</div>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="relative hidden lg:block">
          <div className="relative animate-float">
            <div className="overflow-hidden rounded-3xl border border-charcoal-100 shadow-card-hover">
              <img
                src="https://images.pexels.com/photos/6214474/pexels-photo-6214474.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="eCommerce store dashboard"
                className="h-[460px] w-full object-cover"
                loading="eager"
              />
            </div>
            {/* Floating cards */}
            <div className="absolute -left-6 top-12 rounded-2xl border border-charcoal-100 bg-white p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-parrot-100">
                  <Zap size={20} className="text-parrot-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-charcoal-900">Ecommerce Online store Expert</div>
                  <div className="text-xs text-charcoal-500">Certified Partner</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 bottom-10 rounded-2xl border border-charcoal-100 bg-white p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-parrot-100">
                  <Star size={20} className="fill-parrot-400 text-parrot-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-charcoal-900">5-Star Reviews</div>
                  <div className="text-xs text-charcoal-500">From happy clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
