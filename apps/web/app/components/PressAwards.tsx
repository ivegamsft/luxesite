'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { awards, awardStyles } from '../data/awards';

export default function PressAwards() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="complementary"
      aria-label="Featured press and awards"
      className="py-8 px-4 sm:px-6 lg:px-12 border-y border-aurora-border/50 bg-aurora-bg"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <p className="text-xs font-medium tracking-widest uppercase text-aurora-text-muted text-center mb-5">
            As Featured In
          </p>
          {/* Desktop: evenly spaced row with dividers */}
          <div className="hidden md:flex items-center justify-center">
            {awards.map((award, index) => (
              <div key={award.id} className="flex items-center">
                {index > 0 && (
                  <div
                    className="w-px h-6 mx-5 lg:mx-7 bg-aurora-border"
                    aria-hidden="true"
                  />
                )}
                <a
                  href={award.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block transition-colors duration-200 whitespace-nowrap text-aurora-text-muted/70 hover:text-aurora-gold-accessible focus:text-aurora-gold-accessible focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 ${awardStyles[award.id] || 'text-sm font-heading font-semibold tracking-widest'}`}
                  aria-label={`Visit ${award.name}`}
                >
                  {award.logoText}
                </a>
              </div>
            ))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="flex items-center justify-center gap-4 overflow-x-auto scrollbar-hide md:hidden pb-1">
            {awards.map((award) => (
              <a
                key={award.id}
                href={award.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 transition-colors duration-200 text-aurora-text-muted/70 hover:text-aurora-gold-accessible focus:text-aurora-gold-accessible focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 ${awardStyles[award.id] || 'text-xs font-heading font-semibold tracking-widest'}`}
                aria-label={`Visit ${award.name}`}
              >
                {award.logoText}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
