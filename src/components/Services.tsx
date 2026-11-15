import { CheckCircle2, ArrowRight } from 'lucide-react';
import { services } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

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
            Services Built for eCommerce Growth
          </h2>
          <p className="mt-4 text-lg text-charcoal-500">
            Everything you need to launch, manage, and scale your online store —
            all under one roof. From store setup to bookkeeping and social media,
            we've got you covered.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-charcoal-900 px-8 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">
              Ready to grow your store?
            </h3>
            <p className="mt-2 text-charcoal-300">
              Get a free consultation and discover how we can scale your eCommerce business.
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
            Start Your Project
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
    <div
      ref={ref}
      className={`reveal group rounded-2xl border border-charcoal-100 bg-white p-7 shadow-soft transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 hover:border-parrot-200 ${
        isVisible ? 'is-visible' : ''
      }`}
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
    </div>
  );
}
