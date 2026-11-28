import { Mail, MapPin } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const EMAIL_ADDRESS = 'sales@fjxstudio.com';
const EMAIL_HREF = 'mailto:sales@fjxstudio.com?subject=Project%20Inquiry%20-%20FJX%20Studio';

export default function Contact() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="contact" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className={`reveal mb-14 max-w-2xl ${isVisible ? 'is-visible' : ''}`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-parrot-50 px-4 py-2 text-sm font-medium text-parrot-700">
            Get In Touch
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-4xl">
            Let's Build Your Store Together
          </h2>
          <p className="mt-4 text-lg text-charcoal-500">
            Tell us which platform you use, the store tasks you want to delegate and
            your expected workflow. Contact FJX Studio about InkSoft store
            management, product catalog updates or eCommerce operations support
            for businesses serving the USA and Canada.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Email CTA */}
          <a
            href={EMAIL_HREF}
            aria-label="Email FJX Studio sales at sales@fjxstudio.com"
            className="group flex flex-col items-start rounded-3xl border border-charcoal-100 bg-white p-8 shadow-soft transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-parrot-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-parrot-600"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-charcoal-900 transition-transform group-hover:scale-110">
              <Mail size={26} className="text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-charcoal-900">
              Email Us
            </h3>
            <p className="mt-2 text-sm text-charcoal-500">
              Prefer email? Send us your project details and we'll get back to
              you within 24 hours.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-charcoal-50 px-5 py-3 text-sm font-semibold text-charcoal-800 transition-colors group-hover:bg-charcoal-900 group-hover:text-white">
              {EMAIL_ADDRESS}
            </span>
          </a>

          {/* Business details */}
          <div className="flex flex-col items-start rounded-3xl border border-charcoal-100 bg-charcoal-50 p-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-parrot-100">
              <MapPin size={26} className="text-parrot-600" />
            </div>
            <h3 className="font-display text-xl font-bold text-charcoal-900">
              Business Details
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-charcoal-600">
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-parrot-500" />
                <a
                  href={EMAIL_HREF}
                  aria-label="Email FJX Studio sales at sales@fjxstudio.com"
                  className="break-all underline decoration-charcoal-300 underline-offset-4 transition-colors hover:text-parrot-700 hover:decoration-parrot-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-parrot-600"
                >
                  {EMAIL_ADDRESS}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0 text-parrot-500" />
                Serving USA & Canadian Markets
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
