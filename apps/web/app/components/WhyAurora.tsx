'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { teamMembers } from '../data/team';
import AnimatedSection from './AnimatedSection';

const differentiators = [
  {
    headline: '24/7 Concierge',
    description: 'Always available — day or night, anywhere in the world.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    headline: 'Hand-Curated',
    description: 'Every property personally visited and vetted by our specialists.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    headline: 'Specialists',
    description: '12+ years average expertise — deep regional knowledge you can trust.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function WhyAurora() {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const totalCards = teamMembers.length;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);

    // Determine active card by finding the one closest to the left edge
    const cards = Array.from(el.children) as HTMLElement[];
    let closestIdx = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - scrollLeft - el.offsetLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });
    setActiveIndex(closestIdx);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const target = cards[index];
    if (!target) return;
    const scrollTarget = target.offsetLeft - el.offsetLeft;
    el.scrollTo({
      left: scrollTarget,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [prefersReducedMotion]);

  const scrollPrev = useCallback(() => {
    const next = Math.max(0, activeIndex - 1);
    scrollToIndex(next);
  }, [activeIndex, scrollToIndex]);

  const scrollNext = useCallback(() => {
    const next = Math.min(totalCards - 1, activeIndex + 1);
    scrollToIndex(next);
  }, [activeIndex, totalCards, scrollToIndex]);

  const handleCarouselKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollNext();
    }
  }, [scrollPrev, scrollNext]);

  return (
    <section id="why-aurora" className="py-section-lg px-4 sm:px-6 lg:px-12 bg-aurora-bg-light">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <AnimatedSection>
          <div className="mb-14 lg:mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-aurora-gold mb-3">
              Meet the Team
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-aurora-text mb-4">
              Our Specialists
            </h2>
            <p className="text-aurora-text-muted max-w-2xl text-base leading-relaxed">
              Each journey is designed by a regional expert with over a decade of on-the-ground experience.
            </p>
          </div>
        </AnimatedSection>

        {/* Team carousel */}
        <div
          className="relative mb-16 lg:mb-20"
          role="region"
          aria-label="Team members carousel"
          aria-roledescription="carousel"
          onKeyDown={handleCarouselKeyDown}
        >
          {/* Previous arrow */}
          {canScrollLeft && (
            <button
              onClick={scrollPrev}
              aria-label="Previous team member"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-aurora-border bg-white/90 backdrop-blur-sm text-aurora-text-muted hover:text-aurora-text hover:border-aurora-gold transition-colors focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Next arrow */}
          {canScrollRight && (
            <button
              onClick={scrollNext}
              aria-label="Next team member"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-aurora-border bg-white/90 backdrop-blur-sm text-aurora-text-muted hover:text-aurora-text hover:border-aurora-gold transition-colors focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          <div
            ref={scrollRef}
            tabIndex={0}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 scrollbar-thin scrollbar-thumb-aurora-border focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 rounded"
          >
            {teamMembers.map((member, i) => {
              const isLarge = i < 2;
              return (
                <article
                  key={member.id}
                  aria-label={`${member.name}, ${member.title}`}
                  aria-roledescription="slide"
                  aria-current={i === activeIndex ? 'true' : undefined}
                  className={`snap-start shrink-0 bg-white border border-aurora-border rounded-lg p-6 transition-shadow duration-200 hover:shadow-[0_4px_6px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.06)] ${
                    isLarge ? 'w-[300px] md:w-[340px]' : 'w-[260px] md:w-[280px]'
                  }`}
                >
                  <div className={`relative mx-auto mb-5 rounded-full overflow-hidden border-2 border-aurora-border ${
                    isLarge ? 'w-32 h-32' : 'w-24 h-24'
                  }`}>
                    <Image
                      src={member.photoUrl}
                      alt={`${member.name}, ${member.title}`}
                      fill
                      sizes={isLarge ? '128px' : '96px'}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center mb-4">
                    <h3 className={`font-heading font-semibold text-aurora-text ${isLarge ? 'text-lg' : 'text-base'}`}>
                      {member.name}
                    </h3>
                    <p className="text-sm text-aurora-gold font-medium mt-0.5">
                      {member.title}
                    </p>
                    <p className="text-xs text-aurora-text-muted mt-1">
                      {member.yearsExperience} years experience
                    </p>
                  </div>
                  <p className={`text-aurora-text-muted leading-relaxed text-center mb-4 ${isLarge ? 'text-sm' : 'text-xs line-clamp-3'}`}>
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {member.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="text-xs px-2.5 py-1 rounded-full bg-aurora-bg text-aurora-text-muted border border-aurora-border"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
          {/* Fade hint on right edge */}
          {canScrollRight && (
            <div className="hidden lg:block absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-aurora-bg-light to-transparent pointer-events-none" />
          )}

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Carousel navigation">
            {teamMembers.map((member, i) => (
              <button
                key={member.id}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to ${member.name}`}
                onClick={() => scrollToIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 ${
                  i === activeIndex
                    ? 'bg-aurora-gold'
                    : 'bg-aurora-text-muted/30 hover:bg-aurora-text-muted/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Differentiators row — no animation, trust section */}
        <div className="border-t border-aurora-border pt-12 lg:pt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {differentiators.map((item) => (
              <div key={item.headline} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-aurora-gold/10 text-aurora-gold mb-4">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-aurora-text mb-2">
                  {item.headline}
                </h3>
                <p className="text-sm text-aurora-text-muted leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
