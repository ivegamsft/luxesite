'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { awards } from '../data/awards';
import AnimatedSection from './AnimatedSection';

export default function PressAwards() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="press"
      className="py-section-lg px-4 sm:px-6 lg:px-12"
      style={{ backgroundColor: '#faf9f7' }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedSection>
          <p
            className="text-sm font-medium tracking-widest uppercase mb-3"
            style={{ color: '#c9a76a' }}
          >
            Recognition
          </p>
          <h2
            className="font-heading text-fluid-xl font-semibold tracking-tight leading-tight mb-3"
            style={{ color: '#2c2620' }}
          >
            Trusted by industry leaders and 2,400+ verified reviews
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
                    className="w-px h-8 mx-6 lg:mx-8"
                    style={{ backgroundColor: '#e8e4df' }}
                    aria-hidden="true"
                  />
                )}
                <a
                  href={award.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm lg:text-base font-heading font-semibold tracking-widest transition-colors duration-200 whitespace-nowrap"
                  style={{ color: '#6b6458' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = '#c9a76a')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = '#6b6458')
                  }
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
                className="flex items-center justify-center py-3 px-2 rounded-sm text-xs font-heading font-semibold tracking-widest transition-colors duration-200"
                style={{ color: '#6b6458', border: '1px solid #e8e4df' }}
                aria-label={`Visit ${award.name}`}
              >
                {award.logoText}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Stat line */}
        <AnimatedSection delay={0.2}>
          <p className="text-sm" style={{ color: '#6b6458' }}>
            <span style={{ color: '#c9a76a' }}>★ 4.9/5 on Trustpilot</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            2,471 verified reviews
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
