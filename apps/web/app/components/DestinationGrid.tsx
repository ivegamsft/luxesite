'use client';

import { useState, useCallback, useMemo, KeyboardEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { destinations } from '../data/destinations';
import AnimatedSection from './AnimatedSection';

const ALL_REGIONS = 'All';
const DEFAULT_VISIBLE = 6;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function DestinationGrid() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState(ALL_REGIONS);
  const [showAll, setShowAll] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const cardMotionVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : cardVariants;

  // Derive unique regions with counts
  const regionTabs = useMemo(() => {
    const counts = new Map<string, number>();
    destinations.forEach((d) => {
      counts.set(d.region, (counts.get(d.region) ?? 0) + 1);
    });
    return [
      { label: ALL_REGIONS, count: destinations.length },
      ...Array.from(counts.entries()).map(([region, count]) => ({
        label: region,
        count,
      })),
    ];
  }, []);

  const filteredDestinations = useMemo(() => {
    if (activeRegion === ALL_REGIONS) return destinations;
    return destinations.filter((d) => d.region === activeRegion);
  }, [activeRegion]);

  // In "All" mode, gate visibility behind showAll
  const visibleDestinations =
    activeRegion === ALL_REGIONS && !showAll
      ? filteredDestinations.slice(0, DEFAULT_VISIBLE)
      : filteredDestinations;

  const hasMore =
    activeRegion === ALL_REGIONS &&
    !showAll &&
    filteredDestinations.length > DEFAULT_VISIBLE;

  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
    setShowAll(false);
    setExpandedSlug(null);
  };

  const toggleCard = useCallback((slug: string) => {
    setExpandedSlug(prev => (prev === slug ? null : slug));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent, slug: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCard(slug);
    }
  }, [toggleCard]);

  return (
    <section id="destinations" className="py-section-lg px-4 sm:px-6 lg:px-12 bg-aurora-bg-light">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection variant="fade-up">
          <div className="mb-8 md:mb-10">
            <p className="text-sm font-medium tracking-widest uppercase mb-4 text-aurora-gold">
            World-Class Destinations
            </p>
            <h2 className="font-heading text-fluid-2xl font-semibold tracking-tight leading-tight">
              Curated Destinations
            </h2>
          </div>
        </AnimatedSection>

        {/* Region Tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-12 md:mb-14" role="tablist" aria-label="Filter destinations by region">
            {regionTabs.map((tab) => {
              const isActive = activeRegion === tab.label;
              return (
                <button
                  key={tab.label}
                  id={`region-tab-${tab.label}`}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleRegionChange(tab.label)}
                    className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 ${
                    isActive
                      ? 'bg-aurora-gold text-white'
                      : 'bg-aurora-bg-light border border-aurora-border text-aurora-text-muted hover:border-aurora-gold/50'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion + (showAll ? '-all' : '')}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25 }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: prefersReducedMotion ? 0 : 0.1,
                  },
                },
              }}
              role="tabpanel"
              aria-labelledby={`region-tab-${activeRegion}`}
              tabIndex={0}
              className="@container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[minmax(280px,auto)]"
            >
              {visibleDestinations.map((destination, index) => {
                const isExpanded = expandedSlug === destination.slug;
                const isFeature = index === 0;
                return (
                  <motion.div
                    key={destination.slug}
                    variants={cardMotionVariants}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`destination-card group relative rounded-sm overflow-hidden border border-aurora-border bg-aurora-bg-light shadow-subtle transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-medium ${isFeature ? 'md:col-span-2 md:row-span-2' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onClick={() => toggleCard(destination.slug)}
                    onKeyDown={(e) => handleKeyDown(e, destination.slug)}
                  >
                    <div className={`relative bg-aurora-bg-dark ${isFeature ? 'aspect-[16/9] md:aspect-auto md:h-full' : 'aspect-[4/3]'}`}>
                      <Image
                        src={destination.imageUrl}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        sizes={isFeature ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                        loading={index < 6 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-aurora-text/78 via-aurora-text/24 to-transparent pointer-events-none"></div>
                      <div className="absolute top-0 right-0 w-2/3 h-1/3 bg-gradient-to-bl from-aurora-text/24 to-transparent pointer-events-none"></div>

                      <div className="absolute top-5 right-5">
                        <span className="font-heading text-base tracking-wide text-white/80 tabular-nums">
                          from {destination.currency}{destination.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Quick facts overlay — only shown when card is expanded (clicked), not on hover */}
                      <div className={`absolute inset-x-0 top-0 bottom-28 bg-gradient-to-b from-aurora-text/92 via-aurora-text/84 to-aurora-text/72 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="h-full overflow-y-auto px-5 py-5 md:px-6 md:py-6">
                          <h4 className="font-heading text-base font-semibold mb-3 text-aurora-gold tracking-wide">Quick Facts</h4>
                          <ul className="space-y-2 text-sm text-white/92 pr-2">
                            {destination.quickFacts.map((fact, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="text-aurora-gold mt-0.5 flex-shrink-0">•</span>
                                <span className="leading-relaxed">{fact}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <h3 className={`font-heading font-medium mb-1 text-white ${isFeature ? 'text-fluid-xl' : 'text-fluid-lg'}`}>
                        {destination.name}
                      </h3>
                      <p className="text-sm text-white/70 mb-1">
                        {destination.region}
                      </p>
                      <p className="text-sm text-white/80 italic mb-2">
                        {destination.tagline}
                      </p>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium tracking-wide text-aurora-gold md:hidden"
                        aria-hidden="true"
                      >
                        Tap to explore
                        <svg className="w-3.5 h-3.5 animate-[bounceX_1.5s_ease-in-out_3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-8 py-3 text-sm font-semibold rounded-lg border border-aurora-border text-aurora-text-muted hover:border-aurora-gold hover:text-aurora-gold transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
                >
                  View All Destinations ({filteredDestinations.length})
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
