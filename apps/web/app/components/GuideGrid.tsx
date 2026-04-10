'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { guides } from '../data/guides';
import AnimatedSection from './AnimatedSection';

export default function GuideGrid() {
  const prefersReducedMotion = useReducedMotion();

  const featured = guides[0];
  const remaining = guides.slice(1);

  return (
    <section id="guides" className="py-section-lg px-4 sm:px-6 lg:px-12 bg-aurora-bg">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection variant="fade-up">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-3 text-aurora-gold"
          >
            Expert Knowledge
          </p>
          <h2
            className="font-heading text-fluid-2xl font-semibold tracking-tight leading-tight mb-4 text-aurora-text"
          >
            Travel Guides
          </h2>
          <p className="mb-12 max-w-[65ch] text-fluid-sm text-aurora-text-muted">
            In-depth destination intelligence from the specialists who know these places first-hand.
          </p>
        </AnimatedSection>

        {/* Featured guide — editorial hero card */}
        <motion.article
          initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-sm overflow-hidden mb-8 md:mb-10 transition-all duration-300 ease-out hover:shadow-lg bg-white border border-aurora-border"
        >
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px] overflow-hidden bg-aurora-bg-dark">
            <Image
              src={featured.imageUrl}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
            />
            <span
              className="absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm bg-white/85 text-aurora-text"
            >
              {featured.readTime}
            </span>
          </div>
          <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            <p className="text-xs font-medium tracking-widest uppercase mb-3 text-aurora-gold">
              Featured Guide
            </p>
            <h3
              className="font-heading text-xl md:text-2xl font-semibold leading-snug mb-3 text-aurora-text"
            >
              {featured.title}
            </h3>
            <p className="text-sm leading-relaxed mb-5 text-aurora-text-muted">
              {featured.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-aurora-text-muted">
                by {featured.author}
              </span>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-sm font-medium transition-colors duration-200 underline decoration-aurora-gold/40 underline-offset-2 hover:decoration-aurora-gold text-aurora-gold focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
              >
                Plan Your Journey&nbsp;&rarr;
              </a>
            </div>
          </div>
        </motion.article>

        {/* Remaining guides — 2-col grid with simple fade */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {remaining.map((guide, i) => (
            <motion.article
              key={guide.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: i * 0.06 }}
              className="group rounded-sm overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg bg-white border border-aurora-border"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-aurora-bg-dark">
                <Image
                  src={guide.imageUrl}
                  alt={guide.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <span
                  className="absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm bg-white/85 text-aurora-text"
                >
                  {guide.readTime}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3
                  className="font-heading text-lg font-semibold leading-snug mb-2 line-clamp-2 text-aurora-text"
                >
                  {guide.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 line-clamp-3 text-aurora-text-muted">
                  {guide.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-aurora-text-muted">
                    by {guide.author}
                  </span>
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="text-sm font-medium transition-colors duration-200 underline decoration-aurora-gold/40 underline-offset-2 hover:decoration-aurora-gold text-aurora-gold focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
                  >
                    Plan Your Journey&nbsp;&rarr;
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
