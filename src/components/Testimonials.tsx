import { useEffect, useState, type FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Star, Quote, Send, CheckCircle2, MessageSquarePlus, X } from 'lucide-react';
import { testimonials, type TestimonialItem } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

type Review = {
  id: string;
  name: string;
  company: string | null;
  rating: number;
  feedback: string;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export default function Testimonials() {
  const { ref, isVisible } = useReveal();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    supabase
      .from('reviews')
      .select('id, name, company, rating, feedback')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .then(({ data, error: fetchError }) => {
        if (!active || fetchError || !data) return;
        setReviews(data as Review[]);
      });

    return () => { active = false; };
  }, []);

  const visibleTestimonials: TestimonialItem[] = [
    ...testimonials,
    ...reviews.map((review) => ({
      id: review.id,
      name: review.name,
      role: review.company || 'FJX Studio Client',
      avatar: '',
      rating: review.rating,
      text: review.feedback,
    })),
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setError('Reviews are not connected yet. Please contact sales@fjxstudio.com to share your feedback.');
      return;
    }

    setSubmitting(true);
    setError('');
    const { error: submitError } = await supabase.from('reviews').insert({
      name: name.trim(),
      company: company.trim() || null,
      rating,
      feedback: feedback.trim(),
      status: 'pending',
    });
    setSubmitting(false);

    if (submitError) {
      setError('We could not submit your review. Please try again in a moment.');
      return;
    }

    setSubmitted(true);
    setName('');
    setCompany('');
    setRating(5);
    setFeedback('');
  }

  return (
    <section id="testimonials" className="bg-charcoal-900 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className={`reveal mx-auto mb-12 max-w-2xl text-center ${isVisible ? 'is-visible' : ''}`}
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
          <button
            type="button"
            onClick={() => { setShowForm((value) => !value); setSubmitted(false); setError(''); }}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-parrot-400 px-6 py-3 font-semibold text-charcoal-900 transition-colors hover:bg-parrot-300"
          >
            {showForm ? <X size={18} /> : <MessageSquarePlus size={18} />}
            {showForm ? 'Close Review Form' : 'Write a Review'}
          </button>
        </div>

        {showForm && (
          <div className="mx-auto mb-12 max-w-2xl rounded-2xl border border-charcoal-700 bg-charcoal-800 p-6 sm:p-8">
            {submitted ? (
              <div className="py-5 text-center" role="status">
                <CheckCircle2 size={42} className="mx-auto mb-4 text-parrot-400" />
                <h3 className="text-xl font-bold text-white">Thank you for your review!</h3>
                <p className="mt-2 text-charcoal-300">Your feedback has been submitted and will appear here after our team approves it.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white">Share your experience</h3>
                  <p className="mt-1 text-sm text-charcoal-300">Tell others what it was like working with FJX Studio.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-charcoal-200">
                    Your name *
                    <input
                      required maxLength={80} value={name} onChange={(event) => setName(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-white outline-none transition focus:border-parrot-400"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block text-sm font-medium text-charcoal-200">
                    Company / role
                    <input
                      maxLength={100} value={company} onChange={(event) => setCompany(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-white outline-none transition focus:border-parrot-400"
                      placeholder="Company or job title"
                    />
                  </label>
                </div>
                <fieldset>
                  <legend className="text-sm font-medium text-charcoal-200">Your rating *</legend>
                  <div className="mt-2 flex items-center gap-2" role="radiogroup" aria-label="Your rating">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value} type="button" role="radio" aria-checked={rating === value}
                        aria-label={`${value} star${value === 1 ? '' : 's'}`}
                        onClick={() => setRating(value)}
                        className="rounded-md p-1 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-parrot-400"
                      >
                        <Star size={28} className={value <= rating ? 'fill-parrot-400 text-parrot-400' : 'text-charcoal-500'} />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-charcoal-300">{rating} out of 5</span>
                  </div>
                </fieldset>
                <label className="block text-sm font-medium text-charcoal-200">
                  Your review *
                  <textarea
                    required minLength={10} maxLength={1500} rows={5} value={feedback}
                    onChange={(event) => setFeedback(event.target.value)}
                    className="mt-2 w-full resize-y rounded-xl border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-white outline-none transition focus:border-parrot-400"
                    placeholder="Share details about your experience..."
                  />
                </label>
                {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
                <button
                  type="submit" disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-parrot-400 px-6 py-3 font-semibold text-charcoal-900 transition-colors hover:bg-parrot-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send size={17} />
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <p className="text-xs text-charcoal-400">Reviews are checked by our team before they are published.</p>
              </form>
            )}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map((testimonial, idx) => (
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
  testimonial: TestimonialItem;
  index: number;
}) {
  const { ref, isVisible } = useReveal();
  const [avatarFailed, setAvatarFailed] = useState(false);

  return (
    <div
      ref={ref}
      className={`reveal rounded-2xl border border-charcoal-700/50 bg-charcoal-800 p-7 transition-all duration-500 hover:border-parrot-400/40 hover:bg-charcoal-800/80 ${
        isVisible ? 'is-visible' : ''
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <Quote size={32} className="mb-4 text-parrot-400/50" />
      <div className="mb-4 flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-parrot-400 text-parrot-400" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-charcoal-200">"{testimonial.text}"</p>
      <div className="mt-6 flex items-center gap-4">
        {testimonial.avatar && !avatarFailed ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-parrot-400/30"
            loading="lazy"
            onError={() => setAvatarFailed(true)}
          />
        ) : (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-parrot-400/20 font-display text-sm font-bold text-parrot-300 ring-2 ring-parrot-400/30"
            aria-hidden="true"
          >
            {getInitials(testimonial.name)}
          </div>
        )}
        <div>
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-xs text-charcoal-400">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}
