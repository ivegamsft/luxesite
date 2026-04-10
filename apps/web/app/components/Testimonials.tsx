'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import AnimatedSection from './AnimatedSection';

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-aurora-gold text-sm tracking-wide" aria-label={`${rating} out of 5 stars`}>
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
    <section id="testimonials" className="py-section-md px-4 sm:px-6 bg-aurora-bg-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Header — left-aligned */}
        <AnimatedSection>
          <div className="mb-16">
            <p className="text-fluid-sm font-heading tracking-widest uppercase text-aurora-text-muted mb-6">
              Testimonials
            </p>
            <h2 className="font-heading italic text-fluid-2xl text-aurora-text/70 max-w-[75ch] leading-snug tracking-tight">
              &ldquo;The measure of a journey is not the distance&nbsp;&mdash; it&rsquo;s the silence when you return.&rdquo;
            </h2>
          </div>
        </AnimatedSection>

        {/* Featured Quote — large, single testimonial with navigation */}
        <div
          className="max-w-3xl"
          role="region"
          aria-roledescription="carousel"
          aria-label="Member testimonials"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Main quote */}
          <div className="relative min-h-[280px]" aria-live="polite">
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

                <p className="text-fluid-xl italic text-aurora-text/90 mb-8 max-w-[50ch] leading-snug">
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
                    className="inline-flex items-center gap-1 text-xs text-aurora-gold underline decoration-aurora-gold/40 underline-offset-2 hover:decoration-aurora-gold hover:text-aurora-gold/80 transition-colors mt-3 focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
                  >
                    Verified on Trustpilot <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Horizontal navigation — dots + arrows */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-aurora-border flex items-center justify-center text-aurora-text-muted hover:text-aurora-text hover:border-aurora-gold transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
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
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
                >
                  <span className={`block transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? 'w-8 h-2.5 bg-aurora-gold'
                      : 'w-2.5 h-2.5 bg-aurora-text/20 hover:bg-aurora-text/40'
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-aurora-border flex items-center justify-center text-aurora-text-muted hover:text-aurora-text hover:border-aurora-gold transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
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
