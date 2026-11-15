import { useState } from 'react';
import { ExternalLink, FolderGit2, ShoppingBag } from 'lucide-react';
import { stores } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function Portfolio() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="portfolio" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div
          ref={ref}
          className={`reveal mb-16 max-w-2xl ${isVisible ? 'is-visible' : ''}`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-parrot-50 px-4 py-2 text-sm font-medium text-parrot-700">
            <FolderGit2 size={16} />
            Our Portfolio
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-4xl">
            Inksoft Stores We've Built & Managed
          </h2>
          <p className="mt-4 text-lg text-charcoal-500">
            A selection of eCommerce stores we've designed, developed, and
            managed across Shopify, WooCommerce, and InkSoft platforms. Click
            through to explore each live store.
          </p>
        </div>

        {/* Store grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store, idx) => (
            <StoreCard key={store.id} store={store} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoreCard({
  store,
  index,
}: {
  store: (typeof stores)[number];
  index: number;
}) {
  const { ref, isVisible } = useReveal();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      ref={ref}
      className={`group reveal flex flex-col overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 ${
        isVisible ? 'is-visible' : ''
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Screenshot */}
      <div className="relative h-56 overflow-hidden">
        {store.image && !imageFailed ? (
          <img
            src={store.image}
            alt={`${store.name} store homepage screenshot`}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-charcoal-900 px-6 text-center">
            <ShoppingBag size={36} className="text-parrot-400" aria-hidden="true" />
            <span className="font-display text-2xl font-extrabold tracking-tight text-white">
              {store.name}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-charcoal-800 backdrop-blur-sm">
          {store.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-charcoal-900">
          {store.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">
          {store.description}
        </p>
        <a
          href={store.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-charcoal-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-parrot-400 hover:text-charcoal-900"
        >
          View Live Store
          <ExternalLink size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  );
}
