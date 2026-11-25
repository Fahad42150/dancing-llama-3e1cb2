import { ArrowRight } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="bg-parrot-50 py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.35fr_.8fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-parrot-800">
            Straightforward hourly support
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-4xl">
            Clear Pricing for Reliable Store Support
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-charcoal-600">
            Get flexible eCommerce and virtual assistant support with a clear hourly starting rate.
            We confirm the project scope, workload and required access before work begins.
          </p>
        </div>
        <div className="rounded-3xl border border-parrot-200 bg-white p-8 shadow-soft">
          <div className="text-sm font-semibold text-charcoal-500">Starting at</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-5xl font-extrabold tracking-tight text-charcoal-900">$30</span>
            <span className="text-sm font-semibold text-charcoal-500">USD / hour</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-charcoal-500">
            Final scope and estimated hours are agreed in advance.
          </p>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-parrot-400 px-6 py-3.5 font-semibold text-charcoal-900 transition-colors hover:bg-parrot-300">
            Discuss Your Requirements <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
