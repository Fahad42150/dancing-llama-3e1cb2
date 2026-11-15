import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  { label: 'InkSoft Store Management', href: '/inksoft-store-management/' },
  { label: 'Product Catalog Management', href: '/inksoft-product-catalog-management/' },
  { label: 'InkSoft Store Setup', href: '/inksoft-store-setup/' },
  { label: 'eCommerce Store Management', href: '/ecommerce-store-management/' },
  { label: 'eCommerce Virtual Assistant', href: '/ecommerce-virtual-assistant/' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeAndNavigate = (href: string) => {
    setMobileOpen(false);
    if (!href.startsWith('#')) {
      window.location.href = href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 py-3 shadow-soft backdrop-blur-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6" aria-label="Main navigation">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            closeAndNavigate('#home');
          }}
          className="flex items-center gap-2 text-xl font-display font-extrabold tracking-tight text-charcoal-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-parrot-400 font-display text-charcoal-900 text-sm font-extrabold">
            FJ
          </span>
          FJX <span className="text-parrot-500">Studio</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                closeAndNavigate(link.href);
              }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal-600 transition-colors hover:bg-parrot-50 hover:text-charcoal-900"
            >
              {link.label}
            </a>
          ))}
          <div className="group relative">
            <button type="button" className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal-600 transition-colors hover:bg-parrot-50 hover:text-charcoal-900" aria-haspopup="true">
              Services
            </button>
            <div className="invisible absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-charcoal-100 bg-white p-2 opacity-0 shadow-card transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {serviceLinks.map((link) => (
                <a key={link.href} href={link.href} className="block rounded-lg px-3 py-2 text-sm text-charcoal-700 hover:bg-parrot-50">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              closeAndNavigate('#contact');
            }}
            className="ml-2 rounded-xl bg-parrot-400 px-5 py-2.5 text-sm font-semibold text-charcoal-900 shadow-parrot transition-all hover:bg-parrot-500 hover:shadow-lg hover:-translate-y-0.5"
          >
            Get a Quote
          </a>
        </div>

        <button
          className="flex items-center justify-center rounded-lg p-2 text-charcoal-700 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div id="mobile-navigation" className="mx-4 mt-3 rounded-2xl border border-charcoal-100 bg-white p-4 shadow-card md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  closeAndNavigate(link.href);
                }}
                className="rounded-lg px-4 py-3 text-sm font-medium text-charcoal-700 transition-colors hover:bg-parrot-50"
              >
                {link.label}
              </a>
            ))}
            <div className="my-2 border-t border-charcoal-100 pt-2">
              <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-charcoal-400">Service pages</p>
              {serviceLinks.map((link) => (
                <a key={link.href} href={link.href} className="block rounded-lg px-4 py-3 text-sm font-medium text-charcoal-700 transition-colors hover:bg-parrot-50">
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                closeAndNavigate('#contact');
              }}
              className="mt-2 rounded-xl bg-parrot-400 px-4 py-3 text-center text-sm font-semibold text-charcoal-900"
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
