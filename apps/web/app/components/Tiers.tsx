'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { tiers } from '../data/tiers';
import AnimatedSection from './AnimatedSection';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function Tiers() {
  const prefersReducedMotion = useReducedMotion();
  const cardMotionVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : cardVariants;

  return (
    <section id="membership" className="py-section-lg px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-fluid-2xl font-semibold tracking-tight leading-tight mb-4 text-aurora-text">
            Membership
          </h2>
          <p className="text-aurora-text-muted mb-12 max-w-[65ch] text-fluid-sm">
            Three tiers. One standard&nbsp;&mdash; uncompromising.
          </p>
        </AnimatedSection>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="@container grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardMotionVariants}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}              className={`tier-card relative rounded-sm p-6 md:p-8 transition-all duration-300 ${
                tier.featured
                  ? 'animated-border z-10 shadow-lift'
                  : 'bg-aurora-bg-light border border-aurora-border shadow-subtle hover:border-aurora-gold/40'
              }`}
            >

              <div className="mb-6">
                <h3 className="font-heading text-fluid-xl font-medium mb-2 text-aurora-text">
                  {tier.name}
                </h3>
                <p className="text-xs md:text-sm text-aurora-text-muted mb-4">
                  {tier.tagline}
                </p>
                <div className="text-2xl md:text-3xl font-bold text-aurora-text tabular-nums">
                  {tier.price.split('/')[0]}
                  <span className="text-sm font-normal text-aurora-text-muted">
                    /{tier.price.split('/')[1]}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.perks.map((perk, index) => (
                  <li key={index} className="flex items-start text-sm text-aurora-text/80">
                    <span className="text-aurora-gold mr-2 mt-0.5 flex-shrink-0">✓</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 min-h-[44px] focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:outline-none ${
                  tier.featured
                    ? 'bg-aurora-gold text-aurora-text hover:shadow-lift hover:-translate-y-0.5'
                    : 'border border-aurora-border text-aurora-text-muted hover:border-aurora-gold hover:text-aurora-text hover:-translate-y-0.5'
                }`}
              >
                Join {tier.name}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
