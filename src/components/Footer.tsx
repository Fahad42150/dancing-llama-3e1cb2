import { Facebook, Instagram, Linkedin, Twitter, ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/Inksoftproductsuploadstoremanagementfreelancer', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/inksoftonlinestorefreelancer/', label: 'Instagram' },
];

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Insights', href: '/blog/' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-charcoal-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
              className="flex items-center gap-2 text-xl font-display font-extrabold tracking-tight text-charcoal-900"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-parrot-400 font-display text-sm font-extrabold text-charcoal-900">
                FJ
              </span>
              FJX <span className="text-parrot-500">Studio</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal-500">
              We design, build, and manage stunning eCommerce experiences for
              the USA and Canadian markets. Eight years of proven results across
              Shopify, WooCommerce, InkSoft, and more.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-charcoal-100 bg-white text-charcoal-600 transition-all hover:bg-parrot-400 hover:text-charcoal-900 hover:border-parrot-400 hover:-translate-y-0.5"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-charcoal-900">
              Navigation
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-sm text-charcoal-500 transition-colors hover:text-parrot-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-charcoal-900">
              Get In Touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-charcoal-500">
              <li>sales@fjxstudio.com</li>
              <li>USA & Canadian Markets</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-charcoal-100 pt-8 sm:flex-row">
          <p className="text-sm text-charcoal-400">
            {new Date().getFullYear()} FJX Studio. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 rounded-xl border border-charcoal-100 px-4 py-2.5 text-sm font-medium text-charcoal-600 transition-all hover:bg-parrot-50 hover:border-parrot-200 hover:text-charcoal-900"
          >
            Back to Top
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
