'use client';

import { motion } from 'framer-motion';
import { experiences } from '../data/experiences';
import AnimatedSection from './AnimatedSection';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function ExperienceList() {
  return (
    <section id="experiences" className="py-section-md px-4 sm:px-6 lg:px-12 bg-aurora-darker">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-fluid-3xl mb-4">
            Signature Experiences
          </h2>
          <p className="text-aurora-white/60 mb-12 max-w-2xl text-fluid-sm">
            Unforgettable moments crafted exclusively for those who seek the extraordinary.
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
          className="flex flex-col gap-6 md:gap-8"
        >
          {experiences.map((experience, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={experience.id}
                variants={cardVariants}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch border border-aurora-glass-border rounded-2xl overflow-hidden shadow-glass transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-glow hover:shadow-aurora-purple/20`}
              >
                {/* Icon side */}
                <div className="flex items-center justify-center bg-aurora-darker p-8 md:p-12 md:w-48 shrink-0">
                  <span className="text-5xl md:text-6xl">{experience.icon}</span>
                </div>
                {/* Content side */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center bg-aurora-darker/80">
                  <h3 className="font-heading text-fluid-lg mb-3 text-aurora-white">
                    {experience.title}
                  </h3>
                  <p className="text-aurora-white/70 leading-relaxed text-fluid-sm max-w-[65ch]">
                    {experience.description}
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
