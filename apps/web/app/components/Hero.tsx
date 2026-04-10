'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const handleDesignTrip = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreDestinations = () => {
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-start lg:pl-12 xl:pl-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&h=1400&fit=crop"
          alt="Luxury beach paradise"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
      </div>

      {/* Bottom vignette for text readability */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <motion.div 
        className="relative z-20 max-w-5xl px-4 sm:px-6 lg:px-8 text-left lg:max-w-[50%]"
      >
        {/* Headline */}
        <motion.h1 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="font-heading text-fluid-3xl font-bold text-white mb-6 tracking-tight leading-[1.1] px-4"
        >
          Beyond First Class.
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="text-fluid-base text-white/70 max-w-[65ch] mb-10 leading-relaxed px-4"
        >
          Private shores. Unmarked airstrips. Tables that don&apos;t take reservations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-start gap-4"
        >
          <button
            onClick={handleDesignTrip}
            className="w-full sm:w-auto bg-aurora-gold text-aurora-text font-semibold px-8 py-4 rounded-lg hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:ring-offset-aurora-bg min-h-[44px]"
          >
            Design My Trip
          </button>
          <button
            onClick={handleExploreDestinations}
            className="w-full sm:w-auto border border-white/30 text-white/80 font-semibold px-8 py-4 rounded-lg hover:border-aurora-gold hover:text-white hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:ring-offset-aurora-bg min-h-[44px]"
          >
            Explore Destinations
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-scroll-hint">
        <svg
          className="w-6 h-6 text-white/50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
