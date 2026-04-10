'use client';

import { useState, useCallback, KeyboardEvent } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { destinations } from '../data/destinations';
import AnimatedSection from './AnimatedSection';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function DestinationGrid() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const cardMotionVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : cardVariants;

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
          <h2 className="font-heading text-fluid-2xl font-semibold tracking-tight leading-tight mb-4">
            Curated Destinations
          </h2>
          <p className="text-aurora-white/50 mb-12 max-w-[75ch] text-fluid-sm">
            Handpicked escapes where luxury meets adventure. Every destination tells a story worth living.
          </p>
        </AnimatedSection>

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
          {destinations.map((destination, index) => {
            const isExpanded = expandedSlug === destination.slug;
            const isFeature = index === 0;
            return (
              <motion.div
                key={destination.slug}
                variants={cardMotionVariants}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}                className={`destination-card group relative rounded-sm overflow-hidden border border-aurora-glass-border shadow-glass transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-glow hover:shadow-aurora-cyan/20 ${isFeature ? 'md:col-span-2 md:row-span-2' : ''}`}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-aurora-dark/70 via-aurora-dark/20 to-transparent pointer-events-none"></div>
                  {/* Bottom scrim — WCAG AA text contrast on bright images */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-aurora-dark/80 via-aurora-dark/40 to-transparent pointer-events-none"></div>
                  {/* Top-right scrim — cinematic vignette for price readability */}
                  <div className="absolute top-0 right-0 w-2/3 h-1/3 bg-gradient-to-bl from-aurora-dark/60 to-transparent pointer-events-none"></div>
                  
                  {/* Price — editorial typographic treatment */}
                  <div className="absolute top-5 right-5">
                    <span className="font-heading text-base tracking-wide text-aurora-white/80 tabular-nums">
                      from {destination.currency}{destination.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Quick Facts Overlay — visible on hover, focus, or tap toggle */}
                  <div className={`absolute inset-0 bg-aurora-dark/95 transition-opacity duration-300 p-6 flex flex-col justify-center group-hover:opacity-100 focus-within:opacity-100 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                    <h4 className="font-heading text-lg mb-3 text-aurora-cyan">Quick Facts:</h4>
                    <ul className="space-y-2 text-sm text-aurora-white/80">
                      {destination.quickFacts.map((fact, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-aurora-cyan mr-2">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className={`font-heading font-medium mb-1 text-aurora-white ${isFeature ? 'text-fluid-xl' : 'text-fluid-lg'}`}>
                    {destination.name}
                  </h3>
                  <p className="text-sm text-aurora-white/70 mb-2">
                    {destination.region}
                  </p>
                  <p className="text-sm text-aurora-white/80 italic">
                    {destination.tagline}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
