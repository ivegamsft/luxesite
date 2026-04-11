'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
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
    <section id="membership" className="py-section-lg px-4 sm:px-6 lg:px-12 bg-aurora-navy">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection variant="fade-up">
          <div className="flex items-baseline justify-between mb-10 flex-wrap gap-4">
            <h2 className="font-heading text-fluid-2xl font-semibold tracking-tight text-white">
              Tiers
            </h2>
            <p className="text-sm text-white/50">Every event is custom-tailored to your vision.</p>
          </div>
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
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`tier-card relative rounded-sm p-8 md:p-10 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                tier.featured
                  ? 'tier-featured z-10 shadow-lift'
                  : 'bg-aurora-bg-light/95 border border-aurora-border shadow-subtle hover:border-aurora-gold/40'
              }`}
            >

              <div className="mb-8">
                <h3 className="font-heading text-fluid-xl font-medium mb-2 text-aurora-text">
                  {tier.name}
                </h3>
                <p className="text-xs md:text-sm text-aurora-text-muted mb-4">
                  {tier.tagline}
                </p>
                <div className="text-2xl md:text-3xl font-bold text-aurora-text tabular-nums">
                  {tier.price.includes('/') ? (
                    <>
                      {tier.price.split('/')[0]}
                      <span className="text-sm font-normal text-aurora-text-muted">
                        /{tier.price.split('/')[1]}
                      </span>
                    </>
                  ) : (
                    <span>{tier.price}</span>
                  )}
                </div>

              </div>

              <ul className="space-y-3.5 mb-8 flex-1">
                {tier.perks.map((perk, index) => (
                  <li key={index} className="flex items-start text-sm text-aurora-text">
                    <span className="text-aurora-gold mr-2 mt-0.5 flex-shrink-0">✓</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6 space-y-3">
                <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('tier-selected', { detail: { tier: tier.name } }));
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 min-h-[44px] focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:outline-none ${
                  tier.featured
                    ? 'bg-aurora-gold text-white hover:shadow-lift hover:-translate-y-0.5'
                    : 'border-2 border-aurora-gold/40 text-aurora-text hover:border-aurora-gold hover:bg-aurora-gold/10 hover:-translate-y-0.5 focus:border-aurora-gold'
                }`}
              >
                Begin a Conversation
              </button>
                <Link
                  href={`/tiers/${tier.id}`}
                  className="block w-full text-center py-2 text-sm text-white/60 hover:text-aurora-gold transition-colors"
                >
                  View full details &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
