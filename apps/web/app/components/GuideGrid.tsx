'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { guides } from '../data/guides';
import AnimatedSection from './AnimatedSection';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function GuideGrid() {
  const prefersReducedMotion = useReducedMotion();

  const motionVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : cardVariants;

  return (
    <section id="guides" className="py-section-lg px-4 sm:px-6 lg:px-12" style={{ backgroundColor: '#faf9f7' }}>
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <p
            className="text-sm font-medium tracking-widest uppercase mb-3"
            style={{ color: '#c9a76a' }}
          >
            Expert Knowledge
          </p>
          <h2
            className="font-heading text-fluid-2xl font-semibold tracking-tight leading-tight mb-4"
            style={{ color: '#2c2620' }}
          >
            Travel Guides
          </h2>
          <p className="mb-12 max-w-[65ch] text-fluid-sm" style={{ color: '#6b6458' }}>
            In-depth destination intelligence from the specialists who know these places first-hand.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.08,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {guides.map((guide) => (
            <motion.article
              key={guide.id}
              variants={motionVariants}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
              }
              className="group rounded-sm overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e8e4df',
              }}
            >
              {/* Featured image — 4:3 */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={guide.imageUrl}
                  alt={guide.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                {/* Read-time badge */}
                <span
                  className="absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    color: '#2c2620',
                  }}
                >
                  {guide.readTime}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3
                  className="font-heading text-lg font-semibold leading-snug mb-2 line-clamp-2"
                  style={{ color: '#2c2620' }}
                >
                  {guide.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4 line-clamp-3"
                  style={{ color: '#6b6458' }}
                >
                  {guide.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#6b6458' }}>
                    by {guide.author}
                  </span>
                  <a
                    href={guide.link}
                    className="text-sm font-medium transition-colors duration-200 hover:underline"
                    style={{ color: '#c9a76a' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read Guide&nbsp;&rarr;
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
