'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { experiences } from '../data/experiences';
import AnimatedSection from './AnimatedSection';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function ExperienceList() {
  const prefersReducedMotion = useReducedMotion();
  const cardMotionVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : cardVariants;

  return (
    <section id="experiences" className="py-section-md px-4 sm:px-6 lg:px-12 bg-aurora-bg-dark">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-fluid-2xl font-semibold tracking-tight leading-tight mb-12">
            Signature Experiences
          </h2>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.08,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {experiences.map((experience) => (
            <motion.div
              key={experience.id}
              variants={cardMotionVariants}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-aurora-border rounded-lg p-6 hover:shadow-lift transition-shadow flex flex-col"
            >
              <div className="text-4xl mb-4" aria-hidden="true">
                {experience.icon}
              </div>

              <h3 className="font-heading text-fluid-lg font-medium mb-3 text-aurora-text">
                {experience.title}
              </h3>

              <p className="text-aurora-text-muted leading-relaxed text-fluid-sm mb-5 flex-1">
                {experience.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {experience.regions.map((region) => (
                  <span
                    key={region}
                    className="bg-aurora-bg-light border border-aurora-border text-aurora-text-muted text-xs rounded-full px-2.5 py-0.5"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
