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
            <h2 className="text-fluid-sm font-heading tracking-widest uppercase text-aurora-text-muted mb-6">
              Testimonials
            </h2>
            <p className="font-heading italic text-fluid-2xl text-aurora-text/70 max-w-[75ch] leading-snug tracking-tight">
              &ldquo;The measure of a journey is not the distance&nbsp;&mdash; it&rsquo;s the silence when you return.&rdquo;
            </p>
          </div>
        </AnimatedSection>

        {/* Featured Quote — large, single testimonial with navigation */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start"
          role="region"
          aria-roledescription="carousel"
          aria-label="Member testimonials"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Main quote */}
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }}
              >
                {/* Large quote mark */}
                <div className="text-8xl text-aurora-gold/15 font-serif leading-none mb-2 select-none">&ldquo;</div>

                {active.rating && (
                  <div className="mb-4 -mt-4">
                    <StarRating rating={active.rating} />
                  </div>
                )}

                <p className="text-fluid-xl italic text-aurora-text/90 mb-8 max-w-[50ch] leading-snug -mt-2">
                  {active.quote}
                </p>

                <div className="h-px bg-gradient-aurora opacity-30 mb-6 max-w-xs"></div>

                <p className="font-heading font-semibold text-fluid-lg text-aurora-text">
                  {active.name}
                </p>
                <p className="text-fluid-sm text-aurora-text-muted">
                  {active.location}
                </p>
                <p className="text-fluid-sm text-aurora-text-muted mt-1">
                  {active.role}
                </p>
                <p className="text-xs text-aurora-text-muted/70 mt-2">
                  {active.date}
                </p>

                {active.sourceLink && (
                  <a
                    href={active.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-aurora-gold hover:text-aurora-gold/80 transition-colors mt-3"
                  >
                    Verified on Trustpilot <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation sidebar — dots + arrows */}
          <div className="flex lg:flex-col items-center lg:items-start gap-6">
            {/* Navigation dots */}
            <div className="flex lg:flex-col gap-1">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => goTo(i)}
                  aria-label={`View testimonial from ${t.name}`}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <span className={`block transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? 'w-10 h-3 lg:w-3 lg:h-10 bg-aurora-gold'
                      : 'w-3 h-3 bg-aurora-text/20 hover:bg-aurora-text/40'
                  }`} />
                </button>
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <button
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-aurora-border flex items-center justify-center text-aurora-text-muted hover:text-aurora-text hover:border-aurora-gold transition-all min-h-[44px]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-aurora-border flex items-center justify-center text-aurora-text-muted hover:text-aurora-text hover:border-aurora-gold transition-all min-h-[44px]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
