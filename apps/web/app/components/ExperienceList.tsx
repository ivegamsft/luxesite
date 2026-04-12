'use client';

import React, { type ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { experiences } from '../data/experiences';
import AnimatedSection from './AnimatedSection';

/* ── SVG icon map (24×24, stroke style) ── */
const experienceIcons: Record<string, ReactElement> = {
  wildlife: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" />
      <path d="M5 8V6a3 3 0 0 1 6 0v2M13 8V6a3 3 0 0 1 6 0v2M3 14l4-3 2 2 3-3 3 3 2-2 4 3" />
      <rect x="3" y="14" width="18" height="6" rx="1" />
    </svg>
  ),
  cultural: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <path d="M12 2L8 6h8l-4-4zM6 6l-2 4h16l-2-4M4 10v2h16v-2" />
      <path d="M6 12v7M10 12v7M14 12v7M18 12v7M3 19h18M4 21h16" />
    </svg>
  ),
  beach: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <path d="M14 4c0 0 2 1 2 4s-2 5-2 5" /><path d="M14 4c0 0-2.5 1.5-3 5s1 4 1 4" />
      <path d="M14 4c0 0-4-1-6 3s0 6 0 6" /><line x1="14" y1="4" x2="14" y2="22" />
      <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /><path d="M2 22c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </svg>
  ),
  mountain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <path d="M8 21l4-10 4 10" /><path d="M2 21l6-14 3.5 7" /><path d="M15.5 14L22 21H2" />
      <circle cx="18" cy="5" r="2" />
    </svg>
  ),
  'culinary': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <path d="M8 2v5a4 4 0 0 0 8 0V2" /><path d="M12 11v9" /><path d="M8 20h8" />
      <line x1="8" y1="5" x2="16" y2="5" />
    </svg>
  ),
  adventure: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M5.6 5.6l2.15 2.15M16.25 16.25l2.15 2.15M5.6 18.4l2.15-2.15M16.25 7.75l2.15-2.15" />
    </svg>
  ),
  family: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <path d="M12 2C8 2 5 7 5 12h14c0-5-3-10-7-10z" />
      <rect x="10" y="12" width="4" height="8" rx="1" />
      <path d="M9 22h6" /><circle cx="12" cy="5" r="1" />
      <path d="M5 12c-1 0-3 .5-3 2s3 3 3 3M19 12c1 0 3 .5 3 2s-3 3-3 3" />
    </svg>
  ),
  romance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

export default function ExperienceList() {
  const prefersReducedMotion = useReducedMotion();

  const featured = experiences[0];
  const rest = experiences.slice(1);

  return (
    <section id="experiences" className="py-section-md sm:py-section-lg px-4 sm:px-6 lg:px-12 bg-aurora-bg-dark">
      <div className="max-w-7xl mx-auto">
        {/* Editorial section intro — distinct from Destinations heading style */}
        <AnimatedSection>
          <div className="mb-12 md:mb-16 max-w-3xl">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-aurora-gold-accessible mb-3">
              Signature Experiences
            </p>
            <h2 className="font-heading text-fluid-2xl font-semibold tracking-tight leading-tight text-aurora-text mb-4">
              Productions, Not Parties
            </h2>
            <p className="section-intro">
              We don&rsquo;t set tables and hang streamers. We build worlds&nbsp;&mdash; 
              from a child&rsquo;s enchanted forest to a rooftop gala with a live orchestra 
              suspended above the skyline. Every experience is a full-scale production 
              with a story arc, a design team, and a standing ovation.
            </p>
          </div>
        </AnimatedSection>

        {/* Two-column: featured left + stacked right on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Featured card — tall, editorial hero treatment */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-aurora-border rounded-sm overflow-hidden hover:shadow-lift hover:-translate-y-1 transition-all duration-300 flex flex-col row-span-full"
          >
            {/* Featured image — hero-scale */}
            {featured.imageUrl && (
              <div className="relative h-64 lg:h-80 bg-aurora-bg-dark">
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
            )}

            <div className="p-8 lg:p-10 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 text-aurora-gold-accessible text-xs font-medium tracking-[0.15em] uppercase">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
                </svg>
                Featured Experience
              </span>
            </div>

            <h3 className="font-heading text-fluid-xl font-semibold mb-4 text-aurora-text">
              {featured.title}
            </h3>
            <p className="text-aurora-text-muted leading-relaxed text-fluid-sm mb-8">
              {featured.description}
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8 flex-1" role="list">
              {[
                'Age-appropriate entertainment from toddlers to grandparents',
                'Bespoke themes designed around your celebration vision',
                'Full-service production from concept to cleanup',
                'Dedicated event coordinator for seamless execution',
              ].map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5 text-sm text-aurora-text-muted leading-relaxed">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-0.5 text-aurora-gold-accessible shrink-0" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143z" clipRule="evenodd" />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2 pt-8 border-t border-aurora-border">
              {featured.regions.map((region) => (
                <span
                  key={region}
                  className="bg-aurora-bg-light border border-aurora-border text-aurora-text-muted text-xs tracking-wide rounded-full px-3 py-1"
                >
                  {region}
                </span>
              ))}
            </div>
            <Link
              href={`/experiences/${featured.id}`}
              className="inline-block mt-6 text-sm font-medium text-aurora-gold-accessible hover:underline underline-offset-4 transition-colors"
            >
              Explore this experience &rarr;
            </Link>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {rest.map((experience, i) => (
              <motion.div
                key={experience.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: i * 0.04 }}
                className="group relative rounded-sm overflow-hidden hover:shadow-lift transition-all duration-300 hover:-translate-y-1"
              >
                <Link href={`/experiences/${experience.id}`} className="absolute inset-0 z-10" aria-label={`View ${experience.title} details`} />
                {/* Full-bleed background image */}
                {experience.imageUrl && (
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-aurora-bg-dark">
                    <Image
                      src={experience.imageUrl}
                      alt={experience.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading={i < 3 ? 'eager' : 'lazy'}
                    />
                    {/* Scrim for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Content overlay pinned to bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="text-aurora-gold/90" aria-hidden="true">
                          {experienceIcons[experience.icon]}
                        </span>
                        <h3 className="font-heading text-fluid-lg font-semibold text-white drop-shadow-md tracking-tight">
                          {experience.title}
                        </h3>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed line-clamp-2 drop-shadow-sm">
                        {experience.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {experience.regions.map((region) => (
                          <span
                            key={region}
                            className="bg-aurora-text/80 text-white text-xs tracking-wide rounded-full px-2.5 py-0.5"
                          >
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Fallback for no-image cards */}
                {!experience.imageUrl && (
                  <div className="bg-white border border-aurora-border p-5 flex flex-col h-56 sm:h-64">
                    <div className="mb-3 text-aurora-gold-accessible" aria-hidden="true">
                      {experienceIcons[experience.icon]}
                    </div>
                    <h3 className="font-heading text-fluid-base font-medium mb-2 text-aurora-text">
                      {experience.title}
                    </h3>
                    <p className="text-aurora-text-muted leading-relaxed text-sm mb-4 flex-1 line-clamp-2">
                      {experience.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {experience.regions.map((region) => (
                        <span
                          key={region}
                          className="bg-aurora-bg-light border border-aurora-border text-aurora-text-muted text-xs rounded-full px-2 py-0.5"
                        >
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
