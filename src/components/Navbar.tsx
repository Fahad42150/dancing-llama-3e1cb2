import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const BOOK_NOW_URL = 'https://calendar.app.google/S23mhjJCcXo7M2HE7';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '/services/' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Articles', href: '/articles/' },
  { label: 'Blogs', href: '/blog/' },
  { label: 'Pricing', href: '#pricing' },
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

  const navigate = (href: string) => {
    setMobileOpen(false);
    if (!href.startsWith('#')) {
      window.location.href = href;
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 py-3 shadow-soft backdrop-blur-lg' : 'bg-white/80 py-5 backdrop-blur-sm'
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6" aria-label="Main navigation">
        <a href="#home" onClick={(e) => { e.preventDefault(); navigate('#home'); }} className="flex items-center gap-2 text-xl font-display font-extrabold tracking-tight text-charcoal-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-parrot-400 font-display text-sm font-extrabold text-charcoal-900">FJ</span>
          FJX <span className="text-parrot-500">Studio</span>
        </a>
        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={(e) => { e.preventDefault(); navigate(link.href); }} className="rounded-lg px-3 py-2 text-sm font-medium text-charcoal-600 transition-colors hover:bg-parrot-50 hover:text-charcoal-900">
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => { e.preventDefault(); navigate('#contact'); }} className="ml-2 rounded-xl border border-charcoal-300 px-4 py-2.5 text-sm font-semibold text-charcoal-800 transition-colors hover:border-parrot-500 hover:bg-parrot-50">
            Get a Quote
          </a>
          <a href={BOOK_NOW_URL} target="_blank" rel="noopener noreferrer" className="ml-2 rounded-xl bg-parrot-400 px-5 py-2.5 text-sm font-semibold text-charcoal-900 shadow-parrot transition-all hover:-translate-y-0.5 hover:bg-parrot-500">
            Book Now
          </a>
        </div>
        <button className="flex items-center justify-center rounded-lg p-2 text-charcoal-700 xl:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {mobileOpen && (
        <div id="mobile-navigation" className="mx-4 mt-3 rounded-2xl border border-charcoal-100 bg-white p-4 shadow-card xl:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => { e.preventDefault(); navigate(link.href); }} className="rounded-lg px-4 py-3 text-sm font-medium text-charcoal-700 transition-colors hover:bg-parrot-50">
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={(e) => { e.preventDefault(); navigate('#contact'); }} className="mt-2 rounded-xl border border-charcoal-300 px-4 py-3 text-center text-sm font-semibold text-charcoal-800 transition-colors hover:border-parrot-500 hover:bg-parrot-50">
              Get a Quote
            </a>
            <a href={BOOK_NOW_URL} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-parrot-400 px-4 py-3 text-center text-sm font-semibold text-charcoal-900">
              Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
