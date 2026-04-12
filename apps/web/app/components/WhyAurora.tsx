'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { teamMembers } from '../data/team';
import AnimatedSection from './AnimatedSection';

/** Responsive cards-per-view: 1 mobile, 2 tablet, 3 desktop */
function useCardsPerView() {
  const [count, setCount] = useState(3);
  useEffect(() => {
    function update() {
      if (window.innerWidth < 640) setCount(1);
      else if (window.innerWidth < 1024) setCount(2);
      else setCount(3);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return count;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

const AVATAR_COLORS = [
  'from-aurora-gold/30 to-aurora-gold/10',
  'from-[#1a2744]/20 to-[#1a2744]/5',
  'from-aurora-gold/20 to-[#1a2744]/10',
  'from-[#1a2744]/15 to-aurora-gold/15',
  'from-aurora-gold/25 to-aurora-gold/5',
  'from-[#1a2744]/25 to-[#1a2744]/5',
  'from-aurora-gold/15 to-[#1a2744]/15',
];

export default function WhyAurora() {
  const prefersReducedMotion = useReducedMotion();
  const cardsPerView = useCardsPerView();
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(teamMembers.length / cardsPerView);

  // Clamp page if resize shrinks cardsPerView
  useEffect(() => {
    if (page >= totalPages) setPage(Math.max(0, totalPages - 1));
  }, [page, totalPages]);

  const visibleMembers = teamMembers.slice(
    page * cardsPerView,
    page * cardsPerView + cardsPerView
  );

  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  const next = useCallback(() => setPage((p) => Math.min(totalPages - 1, p + 1)), [totalPages]);

  // Swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart === null) return;
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next();
        else prev();
      }
      setTouchStart(null);
    },
    [touchStart, next, prev]
  );

  return (
    <section id="why-aurora" className="py-section-lg px-4 sm:px-6 lg:px-12 bg-aurora-bg-light">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection variant="fade-up">
          <div className="mb-14 lg:mb-16">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-aurora-gold-accessible mb-3">
              Our Specialists
            </p>
            <h2 className="font-heading text-fluid-2xl font-bold tracking-tight leading-tight text-aurora-text mb-4">
              Designed by Specialists, Not Algorithms
            </h2>
            <p className="section-intro">
              Every Aurora celebration is shaped by a dedicated specialist with over a decade of production experience — curating entertainment, transforming venues, and orchestrating every detail so the impossible feels effortless.
            </p>
          </div>
        </AnimatedSection>

        {/* Carousel */}
        <div
          className="relative mb-10"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Specialists carousel"
          aria-roledescription="carousel"
        >
          {/* Prev / Next Arrows */}
          <button
            onClick={prev}
            disabled={page === 0}
            aria-label="Previous specialists"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white border border-aurora-border shadow-sm text-aurora-text hover:border-aurora-gold/40 hover:shadow-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={page >= totalPages - 1}
            aria-label="Next specialists"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white border border-aurora-border shadow-sm text-aurora-text hover:border-aurora-gold/40 hover:shadow-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Cards grid */}
          <div className="overflow-hidden px-6 sm:px-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={page}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -40 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeInOut' }}
                className={`grid gap-6 md:gap-8 ${
                  cardsPerView === 1
                    ? 'grid-cols-1 max-w-sm mx-auto'
                    : cardsPerView === 2
                      ? 'grid-cols-2'
                      : 'grid-cols-3'
                }`}
                aria-live="polite"
              >
                {visibleMembers.map((member, i) => (
                  <article
                    key={member.id}
                    aria-label={`${member.name}, ${member.title}`}
                    className="bg-white border border-aurora-border rounded-sm p-8 text-center transition-all duration-200 hover:shadow-medium hover:-translate-y-1 hover:border-aurora-gold/30 surface-card flex flex-col min-h-[380px]"
                  >
                    {/* Avatar with initials */}
                    <div
                      className={`mx-auto mb-5 w-28 h-28 rounded-full flex items-center justify-center border-2 border-aurora-border bg-gradient-to-br ${AVATAR_COLORS[teamMembers.indexOf(member) % AVATAR_COLORS.length]}`}
                    >
                      <span className="font-heading text-2xl font-semibold text-aurora-text/70 select-none">
                        {getInitials(member.name)}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-aurora-text">
                      {member.name}
                    </h3>
                    <p className="text-sm text-aurora-gold-accessible font-medium mt-0.5">
                      {member.title}
                    </p>
                    <p className="text-xs text-aurora-text-muted mt-1 mb-4">
                      {member.yearsExperience} years experience
                    </p>
                    <p className="text-sm text-aurora-text-muted leading-relaxed mb-4 flex-1">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="text-xs px-2.5 py-1 rounded-full bg-aurora-bg text-aurora-text-muted border border-aurora-border"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/specialists/${member.id}`}
                      className="inline-block text-sm font-medium text-aurora-gold-accessible hover:underline underline-offset-4 transition-colors mt-auto"
                    >
                      View full profile &rarr;
                    </Link>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mb-12" role="tablist" aria-label="Carousel pages">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              role="tab"
              aria-selected={i === page}
              aria-label={`Go to page ${i + 1}`}
              className={`w-2.5 h-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all ${
                i === page ? '' : ''
              }`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === page
                    ? 'w-6 h-2.5 bg-aurora-gold'
                    : 'w-2.5 h-2.5 bg-aurora-border hover:bg-aurora-gold/40'
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA — Plan with the team */}
        <AnimatedSection>
          <div className="text-center">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 text-sm font-medium text-aurora-gold-accessible underline decoration-aurora-gold/40 underline-offset-4 hover:decoration-aurora-gold transition-colors focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
            >
              Start planning with our team&nbsp;&rarr;
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
