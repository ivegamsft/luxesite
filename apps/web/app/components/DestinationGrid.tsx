'use client';

import { useState, useCallback, KeyboardEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { destinations } from '../data/destinations';
import AnimatedSection from './AnimatedSection';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function DestinationGrid() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

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
          <h2 className="font-heading text-fluid-3xl mb-4">
            Curated Destinations
          </h2>
          <p className="text-aurora-white/60 mb-12 max-w-2xl text-fluid-sm">
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
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[minmax(280px,auto)]"
        >
          {destinations.map((destination, index) => {
            const isExpanded = expandedSlug === destination.slug;
            const isFeature = index === 0;
            return (
              <motion.div
                key={destination.slug}
                variants={cardVariants}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}                className={`group relative rounded-2xl overflow-hidden border border-aurora-glass-border shadow-glass transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-glow hover:shadow-aurora-cyan/20 ${isFeature ? 'md:col-span-2 md:row-span-2' : ''}`}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-aurora-dark/90 via-aurora-dark/30 to-transparent"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-aurora text-aurora-dark text-xs font-bold px-3 py-1.5 rounded-full">
                    from {destination.currency}{destination.price.toLocaleString()}
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
                  <h3 className={`font-heading mb-1 text-aurora-white ${isFeature ? 'text-fluid-xl' : 'text-fluid-lg'}`}>
                    {destination.name}
                  </h3>
                  <p className="text-sm text-aurora-white/60 mb-2">
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
