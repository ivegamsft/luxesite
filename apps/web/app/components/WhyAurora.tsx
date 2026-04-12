'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { teamMembers } from '../data/team';
import AnimatedSection from './AnimatedSection';

const featuredMembers = teamMembers.slice(0, 3);

export default function WhyAurora() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="why-aurora" className="py-section-md sm:py-section-lg px-4 sm:px-6 lg:px-12 bg-aurora-bg-light">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection variant="fade-up">
          <div className="mb-14 lg:mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-aurora-gold-accessible mb-3">
              Why Aurora
            </p>
            <h2 className="font-heading text-fluid-2xl font-semibold tracking-tight text-aurora-text mb-4">
              Designed by Specialists, Not Algorithms
            </h2>
            <p className="text-aurora-text-muted max-w-2xl text-base leading-relaxed">
              Every Aurora celebration is shaped by an event specialist with over a decade of production experience — someone who has transformed the venues, curated the entertainment, and built the vendor relationships that make the impossible effortless.
            </p>
          </div>
        </AnimatedSection>

        {/* Featured team members — editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {featuredMembers.map((member, i) => (
            <motion.article
              key={member.id}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: i * 0.1 }}
              aria-label={`${member.name}, ${member.title}`}
              className="bg-white border border-aurora-border rounded-sm p-8 text-center transition-all duration-200 hover:shadow-medium hover:-translate-y-1 hover:border-aurora-gold/30 surface-card"
            >
              <div className="relative mx-auto mb-5 w-28 h-28 rounded-full overflow-hidden border-2 border-aurora-border bg-aurora-bg-dark">
                <Image
                  src={member.photoUrl}
                  alt={`${member.name}, ${member.title}`}
                  fill
                  sizes="112px"
                  className="object-cover"
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-aurora-text">
                {member.name}
              </h3>
              <p className="text-sm text-aurora-gold-accessible font-medium mt-0.5">
                {member.title}
              </p>
              <p className="text-xs text-aurora-text-muted mt-1 mb-4">
                {member.yearsExperience} years experience
              </p>
              <p className="text-sm text-aurora-text-muted leading-relaxed mb-4">
                {member.bio}
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {member.specialties.slice(0, 3).map((specialty) => (
                  <span
                    key={specialty}
                    className="text-xs px-2.5 py-1 rounded-full bg-aurora-bg text-aurora-text-muted border border-aurora-border"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <Link
                href={`/specialists/${member.id}`}
                className="inline-block mt-5 text-sm font-medium text-aurora-gold-accessible hover:underline underline-offset-4 transition-colors"
              >
                View full profile &rarr;
              </Link>
            </motion.article>
          ))}
        </div>

        {/* CTA — Plan with the team */}
        <AnimatedSection>
          <div className="text-center">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 text-sm font-medium text-aurora-gold-accessible underline decoration-aurora-gold/40 underline-offset-4 hover:decoration-aurora-gold transition-colors focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
            >
              Start planning with our team&nbsp;&rarr;
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
