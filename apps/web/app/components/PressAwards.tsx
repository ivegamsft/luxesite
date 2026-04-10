'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { awards } from '../data/awards';
import AnimatedSection from './AnimatedSection';

export default function PressAwards() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="press"
      className="py-section-lg px-4 sm:px-6 lg:px-12 bg-aurora-bg-light"
    >
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedSection>
          <p className="text-aurora-gold font-heading text-fluid-lg font-semibold mb-3">★ 4.9/5 on Trustpilot · 2,471 verified reviews</p>
          <h2 className="font-heading text-fluid-xl font-semibold tracking-tight leading-tight text-aurora-text">
            Trusted by industry leaders worldwide
          </h2>
        </AnimatedSection>

        {/* Logo row */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
          className="mt-10 mb-8"
        >
          {/* Desktop: evenly spaced row with dividers */}
          <div className="hidden md:flex items-center justify-center">
            {awards.map((award, index) => (
              <div key={award.id} className="flex items-center">
                {index > 0 && (
                  <div
                    className="w-px h-8 mx-6 lg:mx-8 bg-aurora-border"
                    aria-hidden="true"
                  />
                )}
                <a
                  href={award.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm lg:text-base font-heading font-semibold tracking-widest transition-colors duration-200 whitespace-nowrap text-aurora-text-muted hover:text-aurora-gold focus:text-aurora-gold focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
                  aria-label={`Visit ${award.name}`}
                >
                  {award.logoText}
                </a>
              </div>
            ))}
          </div>

          {/* Mobile: 2×3 grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:hidden">
            {awards.map((award) => (
              <a
                key={award.id}
                href={award.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-3 px-2 rounded-sm text-xs font-heading font-semibold tracking-widest transition-colors duration-200 text-aurora-text-muted border border-aurora-border hover:text-aurora-gold focus:text-aurora-gold focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
                aria-label={`Visit ${award.name}`}
              >
                {award.logoText}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
