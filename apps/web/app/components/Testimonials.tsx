'use client';

import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import AnimatedSection from './AnimatedSection';

const cardVariants = {
  hidden: { opacity: 1, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-aurora-white">
              What Our Members Say
            </h2>
            <p className="text-base md:text-lg text-aurora-white/70 max-w-2xl mx-auto">
              Journeys crafted with precision, remembered with wonder.
            </p>
          </div>
        </AnimatedSection>

        {/* Testimonials Grid */}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              transition={{ duration: 0.5 }}
              className="bg-aurora-glass backdrop-blur-glass border border-aurora-glass-border rounded-2xl p-6 md:p-8 shadow-glass hover:shadow-glow hover:shadow-aurora-magenta/20 transition-all duration-300"
            >
              {/* Quote Mark */}
              <div className="text-6xl text-aurora-cyan/20 font-serif leading-none mb-4">"</div>

              {/* Quote Text */}
              <p className="text-base md:text-lg italic text-aurora-white/90 mb-6 max-w-[65ch]">
                {testimonial.quote}
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-aurora opacity-30 mb-6"></div>

              {/* Author Info */}
              <div>
                <p className="font-heading font-semibold text-aurora-white">
                  {testimonial.name}
                </p>
                <p className="text-sm text-aurora-white/60">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
