'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { experiences } from '../data/experiences';
import AnimatedSection from './AnimatedSection';

const experienceIcons: Record<string, React.ReactNode> = {
  'private-jet': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4z" />
    </svg>
  ),
  'yacht-week': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v13" />
      <path d="M12 3l8 9H12" />
      <path d="M3 19c3-2 6-3 9-3s6 1 9 3" />
    </svg>
  ),
  'michelin-trails': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2h8l-1 6a3 3 0 0 1-6 0L8 2z" />
      <path d="M12 11v8" />
      <path d="M8 19h8" />
    </svg>
  ),
  'desert-stargazing': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  'alpine-retreat': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20l7-14 4 6 3-5 6 13" />
      <path d="M2 20h20" />
    </svg>
  ),
};

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
    <section id="experiences" className="py-section-md px-4 sm:px-6 lg:px-12 bg-aurora-darker">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-fluid-3xl mb-12">
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
                staggerChildren: prefersReducedMotion ? 0 : 0.1,
              },
            },
          }}
          className="@container flex flex-col gap-6 md:gap-8"
        >
          {experiences.map((experience, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={experience.id}
                variants={cardMotionVariants}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}                className={`experience-card flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch border border-aurora-glass-border rounded-sm overflow-hidden shadow-glass transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-glow hover:shadow-aurora-purple/20`}
              >
                {/* Icon side */}
                <div className="experience-icon flex items-center justify-center bg-aurora-darker p-8 md:p-12 md:w-48 shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 text-aurora-cyan/80 [&_svg]:w-full [&_svg]:h-full">
                    {experienceIcons[experience.id]}
                  </div>
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
