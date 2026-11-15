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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-soft py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
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
              className="rounded-lg px-4 py-2 text-sm font-medium text-charcoal-600 transition-colors hover:bg-parrot-50 hover:text-charcoal-900"
            >
              {link.label}
            </a>
          ))}
          <a href="/inksoft-store-management/" className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal-600 transition-colors hover:bg-parrot-50 hover:text-charcoal-900">InkSoft</a>
          <a href="/inksoft-product-catalog-management/" className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal-600 transition-colors hover:bg-parrot-50 hover:text-charcoal-900">Catalog</a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              closeAndNavigate('#contact');
            }}
            className="ml-3 rounded-xl bg-parrot-400 px-5 py-2.5 text-sm font-semibold text-charcoal-900 shadow-parrot transition-all hover:bg-parrot-500 hover:shadow-lg hover:-translate-y-0.5"
          >
            Get a Quote
          </a>
        </div>

        <button
          className="flex items-center justify-center rounded-lg p-2 text-charcoal-700 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="mx-4 mt-3 rounded-2xl border border-charcoal-100 bg-white p-4 shadow-card md:hidden">
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
            <a href="/inksoft-store-management/" className="rounded-lg px-4 py-3 text-sm font-medium text-charcoal-700 transition-colors hover:bg-parrot-50">InkSoft Store Management</a>
            <a href="/inksoft-product-catalog-management/" className="rounded-lg px-4 py-3 text-sm font-medium text-charcoal-700 transition-colors hover:bg-parrot-50">Product Catalog Management</a>
            <a href="/inksoft-store-setup/" className="rounded-lg px-4 py-3 text-sm font-medium text-charcoal-700 transition-colors hover:bg-parrot-50">InkSoft Store Setup</a>
            <a href="/ecommerce-store-management/" className="rounded-lg px-4 py-3 text-sm font-medium text-charcoal-700 transition-colors hover:bg-parrot-50">eCommerce Store Management</a>
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
