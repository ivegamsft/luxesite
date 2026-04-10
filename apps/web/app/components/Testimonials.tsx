'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import AnimatedSection from './AnimatedSection';

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
    <section id="testimonials" className="py-section-md px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header — left-aligned */}
        <AnimatedSection>
          <div className="mb-16">
            <h2 className="text-fluid-sm font-heading tracking-widest uppercase text-aurora-white/40 mb-6">
              Testimonials
            </h2>
            <p className="font-heading italic text-fluid-2xl text-aurora-white/70 max-w-[75ch] leading-snug tracking-tight">
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
          <div className="relative min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }}
              >
                {/* Large quote mark */}
                <div className="text-8xl text-aurora-cyan/15 font-serif leading-none mb-2 select-none">&ldquo;</div>

                <p className="text-fluid-xl italic text-aurora-white/90 mb-8 max-w-[50ch] leading-snug -mt-6">
                  {active.quote}
                </p>

                <div className="h-px bg-gradient-aurora opacity-30 mb-6 max-w-xs"></div>

                <p className="font-heading font-semibold text-fluid-lg text-aurora-white">
                  {active.name}
                </p>
                <p className="text-fluid-sm text-aurora-white/60">
                  {active.role}
                </p>
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
                      ? 'w-10 h-3 lg:w-3 lg:h-10 bg-aurora-cyan'
                      : 'w-3 h-3 bg-aurora-white/20 hover:bg-aurora-white/40'
                  }`} />
                </button>
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <button
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-aurora-glass-border flex items-center justify-center text-aurora-white/60 hover:text-aurora-white hover:border-aurora-cyan transition-all min-h-[44px]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-aurora-glass-border flex items-center justify-center text-aurora-white/60 hover:text-aurora-white hover:border-aurora-cyan transition-all min-h-[44px]"
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
