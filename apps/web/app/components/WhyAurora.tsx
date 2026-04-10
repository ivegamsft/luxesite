'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { teamMembers } from '../data/team';
import AnimatedSection from './AnimatedSection';

const differentiators = [
  {
    headline: '24/7 Concierge',
    description: 'Always available — day or night, anywhere in the world.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    headline: 'Hand-Curated',
    description: 'Every property personally visited and vetted by our specialists.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    headline: 'Specialists',
    description: '12+ years average expertise — deep regional knowledge you can trust.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function WhyAurora() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : cardVariants;

  return (
    <section id="why-aurora" className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <AnimatedSection>
          <div className="mb-14 lg:mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-[#c9a76a] mb-3">
              Meet the Team
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-[#2c2620] mb-4">
              Our Specialists
            </h2>
            <p className="text-[#6b6458] max-w-2xl text-base leading-relaxed">
              Each journey is designed by a regional expert with over a decade of on-the-ground experience.
            </p>
          </div>
        </AnimatedSection>

        {/* Team grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 lg:mb-20"
        >
          {teamMembers.map((member) => (
            <motion.article
              key={member.id}
              variants={motionVariants}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group bg-white border border-[#e8e4df] rounded-lg p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_4px_6px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.06)]"
            >
              {/* Photo */}
              <div className="relative w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden border-2 border-[#e8e4df]">
                <Image
                  src={member.photoUrl}
                  alt={`${member.name}, ${member.title}`}
                  fill
                  sizes="112px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Name & title */}
              <div className="text-center mb-4">
                <h3 className="font-heading text-lg font-semibold text-[#2c2620]">
                  {member.name}
                </h3>
                <p className="text-sm text-[#c9a76a] font-medium mt-0.5">
                  {member.title}
                </p>
                <p className="text-xs text-[#6b6458] mt-1">
                  {member.yearsExperience} years experience
                </p>
              </div>

              {/* Bio */}
              <p className="text-sm text-[#6b6458] leading-relaxed text-center mb-4">
                {member.bio}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {member.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="text-xs px-2.5 py-1 rounded-full bg-[#f5f3f0] text-[#6b6458] border border-[#e8e4df]"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Differentiators row */}
        <AnimatedSection>
          <div className="border-t border-[#e8e4df] pt-12 lg:pt-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {differentiators.map((item) => (
                <div key={item.headline} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#c9a76a]/10 text-[#c9a76a] mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#2c2620] mb-2">
                    {item.headline}
                  </h3>
                  <p className="text-sm text-[#6b6458] leading-relaxed max-w-xs mx-auto">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
