import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function Testimonials() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="testimonials" className="bg-charcoal-900 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className={`reveal mx-auto mb-16 max-w-2xl text-center ${isVisible ? 'is-visible' : ''}`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-parrot-400/20 px-4 py-2 text-sm font-medium text-parrot-300">
            <Star size={16} className="fill-parrot-400 text-parrot-400" />
            5-Star Client Reviews
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-charcoal-300">
            We're proud to have earned 5-star reviews from every client we've
            worked with. Here's what they have to say about FJX Studio.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal rounded-2xl border border-charcoal-700/50 bg-charcoal-800 p-7 transition-all duration-500 hover:border-parrot-400/40 hover:bg-charcoal-800/80 ${
        isVisible ? 'is-visible' : ''
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <Quote size={32} className="mb-4 text-parrot-400/50" />

      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-parrot-400 text-parrot-400" />
        ))}
      </div>

      <p className="text-sm leading-relaxed text-charcoal-200">
        "{testimonial.text}"
      </p>

      <div className="mt-6 flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-parrot-400/30"
          loading="lazy"
        />
        <div>
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-xs text-charcoal-400">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}
