'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import AnimatedSection from './AnimatedSection';

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-aurora-gold-accessible text-sm tracking-wide" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      goPrev();
    }
  }, [goNext, goPrev]);

  const active = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-section-lg px-4 sm:px-6 lg:px-12 bg-aurora-bg-light relative overflow-x-clip">
      {/* Subtle decorative element to break grid monotony */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-aurora-border/30 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative">
        <AnimatedSection variant="fade-up">
          <div className="mb-12 md:mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-aurora-gold-accessible mb-3">
              What Our Clients Say
            </p>
            <h2 className="font-heading text-fluid-2xl font-semibold tracking-tight leading-tight text-aurora-text mb-4">
              Voices of Celebration
            </h2>
            <p className="font-heading italic text-fluid-lg text-aurora-text-muted max-w-[60ch] leading-snug">
              &ldquo;The measure of an event is not the spectacle&nbsp;&mdash; it&rsquo;s the silence when you remember.&rdquo;
            </p>
          </div>
        </AnimatedSection>

        {/* Featured Quote — full width, no sidebar */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Member testimonials"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative min-h-[200px] sm:min-h-[240px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }}
              >
                {active.rating && (
                  <div className="mb-4">
                    <StarRating rating={active.rating} />
                  </div>
                )}

                <p className="text-fluid-lg italic text-aurora-text mb-8 max-w-[55ch] leading-snug">
                  &ldquo;{active.quote}&rdquo;
                </p>

                <div className="h-px bg-aurora-border mb-6 max-w-xs"></div>

                <p className="font-heading font-semibold text-fluid-lg text-aurora-text">
                  {active.name}
                </p>
                <p className="text-fluid-sm text-aurora-text-muted">
                  {active.location} · {active.role}
                </p>

                {active.sourceLink && (
                  <a
                    href={active.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-aurora-gold-accessible underline decoration-aurora-gold/40 underline-offset-2 hover:decoration-aurora-gold hover:text-aurora-gold-accessible/80 transition-colors mt-3 focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
                  >
                    Verified on Trustpilot <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 sm:gap-4 mt-8 flex-wrap">
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-aurora-border flex items-center justify-center text-aurora-text-muted hover:text-aurora-text hover:border-aurora-gold transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:ring-offset-aurora-bg-light"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-1.5">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => goTo(i)}
                  aria-label={`View testimonial from ${t.name}`}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:ring-offset-aurora-bg-light"
                >
                  <span className={`block transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? 'w-8 h-2.5 bg-aurora-gold'
                      : 'w-2.5 h-2.5 bg-aurora-border hover:bg-aurora-gold/40'
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-aurora-border flex items-center justify-center text-aurora-text-muted hover:text-aurora-text hover:border-aurora-gold transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:ring-offset-aurora-bg-light"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
