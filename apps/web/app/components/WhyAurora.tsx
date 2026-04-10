'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { teamMembers } from '../data/team';
import AnimatedSection from './AnimatedSection';

export default function WhyAurora() {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const totalCards = teamMembers.length;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);

    const cards = Array.from(el.children) as HTMLElement[];
    if (cards.length === 0) return;

    // Count how many cards fit fully in the visible area
    let visibleCount = 0;
    for (const card of cards) {
      const cardLeft = card.offsetLeft - el.offsetLeft;
      const cardRight = cardLeft + card.offsetWidth;
      if (cardRight <= clientWidth + 8) {
        visibleCount++;
      } else {
        break;
      }
    }
    visibleCount = Math.max(1, visibleCount);

    const pages = Math.max(1, totalCards - visibleCount + 1);
    setTotalPages(pages);

    // Determine active page by closest card to left edge
    let closestIdx = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - scrollLeft - el.offsetLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });
    setActivePageIndex(Math.min(closestIdx, pages - 1));
  }, [totalCards]);

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
    const next = Math.max(0, activePageIndex - 1);
    scrollToIndex(next);
  }, [activePageIndex, scrollToIndex]);

  const scrollNext = useCallback(() => {
    const next = Math.min(totalCards - 1, activePageIndex + 1);
    scrollToIndex(next);
  }, [activePageIndex, totalCards, scrollToIndex]);

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
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 scrollbar-hide focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 rounded"
          >
            {teamMembers.map((member, i) => {
              const isLarge = i < 2;
              return (
                <article
                  key={member.id}
                  aria-label={`${member.name}, ${member.title}`}
                  aria-roledescription="slide"
                  aria-current={i === activePageIndex ? 'true' : undefined}
                  className={`snap-start shrink-0 bg-white border border-aurora-border rounded-lg p-6 transition-shadow duration-200 hover:shadow-[0_4px_6px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.06)] ${
                    isLarge ? 'w-[300px] md:w-[340px]' : 'w-[260px] md:w-[280px]'
                  }`}
                >
                  <div className={`relative mx-auto mb-5 rounded-full overflow-hidden border-2 border-aurora-border bg-aurora-bg-dark ${
                    isLarge ? 'w-32 h-32' : 'w-24 h-24'
                  }`}>
                    <Image
                      src={member.photoUrl}
                      alt={`${member.name}, ${member.title}`}
                      fill
                      sizes={isLarge ? '128px' : '96px'}
                      className="object-cover"
                      loading={i < 3 ? 'eager' : 'lazy'}
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

          {/* Page indicators */}
          <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Carousel navigation">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activePageIndex}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 ${
                  i === activePageIndex
                    ? 'bg-aurora-gold'
                    : 'bg-aurora-text-muted/30 hover:bg-aurora-text-muted/60'
                }`}
              />
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
