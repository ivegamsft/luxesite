'use client';

import { motion } from 'framer-motion';
import { tiers } from '../data/tiers';
import AnimatedSection from './AnimatedSection';

const cardVariants = {
  hidden: { opacity: 1, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Tiers() {
  return (
    <section id="membership" className="py-16 md:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-center mb-4">
            Membership
          </h2>
          <p className="text-center text-aurora-white/60 mb-12 max-w-2xl mx-auto text-sm md:text-base">
            Exclusive access to a world beyond ordinary. Choose the tier that unlocks your next chapter.
          </p>
        </AnimatedSection>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              transition={{ duration: 0.5 }}
              className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 ${
                tier.featured
                  ? 'animated-border scale-[1.02] md:scale-105 z-10 shadow-glow-purple'
                  : 'bg-aurora-glass backdrop-blur-glass border border-aurora-glass-border shadow-glass hover:shadow-glow hover:shadow-aurora-cyan/20'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-aurora text-aurora-dark text-xs font-bold px-4 py-1.5 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-heading text-xl md:text-2xl mb-2 text-aurora-white">
                  {tier.name}
                </h3>
                <p className="text-xs md:text-sm text-aurora-white/60 mb-4">
                  {tier.tagline}
                </p>
                <div className="text-2xl md:text-3xl font-bold text-aurora-white">
                  {tier.price.split('/')[0]}
                  <span className="text-sm font-normal text-aurora-white/60">
                    /{tier.price.split('/')[1]}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.perks.map((perk, index) => (
                  <li key={index} className="flex items-start text-sm text-aurora-white/80">
                    <span className="text-aurora-cyan mr-2 mt-0.5 flex-shrink-0">✓</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 min-h-[44px] ${
                  tier.featured
                    ? 'bg-gradient-aurora text-aurora-dark hover:shadow-glow hover:scale-105'
                    : 'bg-aurora-glass border border-aurora-glass-border text-aurora-white hover:bg-aurora-glass-border hover:scale-105'
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
