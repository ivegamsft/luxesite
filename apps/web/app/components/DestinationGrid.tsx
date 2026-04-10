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
    <section id="destinations" className="py-section-lg px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-fluid-2xl font-semibold tracking-tight leading-tight mb-10">
            Curated Destinations
          </h2>
        </AnimatedSection>

        {/* Region Tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter destinations by region">
            {regionTabs.map((tab) => {
              const isActive = activeRegion === tab.label;
              return (
                <button
                  key={tab.label}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleRegionChange(tab.label)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 ${
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
                    className={`destination-card group relative rounded-sm overflow-hidden border border-aurora-border shadow-subtle transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-medium ${isFeature ? 'md:col-span-2 md:row-span-2' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onClick={() => toggleCard(destination.slug)}
                    onKeyDown={(e) => handleKeyDown(e, destination.slug)}
                  >
                    <div className={`relative ${isFeature ? 'aspect-[16/9] md:aspect-auto md:h-full' : 'aspect-[4/3]'}`}>
                      <Image
                        src={destination.imageUrl}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        sizes={isFeature ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none"></div>
                      <div className="absolute top-0 right-0 w-2/3 h-1/3 bg-gradient-to-bl from-black/40 to-transparent pointer-events-none"></div>

                      <div className="absolute top-5 right-5">
                        <span className="font-heading text-base tracking-wide text-white/80 tabular-nums">
                          from {destination.currency}{destination.price.toLocaleString()}
                        </span>
                      </div>

                      <div className={`absolute inset-0 bg-black/95 transition-opacity duration-300 p-6 flex flex-col justify-center group-hover:opacity-100 group-focus-within:opacity-100 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                        <h4 className="font-heading text-lg mb-3 text-aurora-gold">Quick Facts:</h4>
                        <ul className="space-y-2 text-sm text-white/80">
                          {destination.quickFacts.map((fact, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-aurora-gold mr-2">•</span>
                              <span>{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
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
                        className="inline-block text-xs font-medium tracking-wide transition-opacity duration-200 opacity-0 group-hover:opacity-100 text-aurora-gold"
                      >
                        Learn More&nbsp;&rarr;
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
