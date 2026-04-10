'use client';

import { motion } from 'framer-motion';
import { experiences } from '../data/experiences';
import AnimatedSection from './AnimatedSection';

const cardVariants = {
  hidden: { opacity: 1, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ExperienceList() {
  return (
    <section id="experiences" className="py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-aurora-darker">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-center mb-4">
            Signature Experiences
          </h2>
          <p className="text-center text-aurora-white/60 mb-12 max-w-2xl mx-auto text-sm md:text-base">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {experiences.map((experience) => (
            <motion.div
              key={experience.id}
              variants={cardVariants}
              transition={{ duration: 0.5 }}
              className="bg-aurora-glass backdrop-blur-glass border border-aurora-glass-border rounded-2xl p-6 md:p-8 shadow-glass transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-glow hover:shadow-aurora-purple/20"
            >
              <div className="text-4xl md:text-5xl mb-4">{experience.icon}</div>
              <h3 className="font-heading text-lg md:text-xl mb-3 text-aurora-white">
                {experience.title}
              </h3>
              <p className="text-aurora-white/70 leading-relaxed text-sm md:text-base max-w-[65ch]">
                {experience.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
