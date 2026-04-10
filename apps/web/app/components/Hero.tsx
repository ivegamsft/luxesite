'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const rafRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const applyParallax = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    const y = scrollYRef.current;
    el.style.transform = `translateY(${y * 0.3}px)`;
    el.style.opacity = `${Math.max(0, 1 - y / 500)}`;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        applyParallax();
        rafRef.current = 0;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyParallax, prefersReducedMotion]);

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-aurora-subtle" />

      {/* Noise Texture Overlay (optional) */}
      <div className="absolute inset-0 z-10 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px',
      }} />

      {/* Bottom vignette for text readability */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 z-10 bg-gradient-to-t from-aurora-dark via-aurora-dark/40 to-transparent" />

      {/* Content with parallax — transforms applied via ref to bypass React re-renders */}
      <motion.div 
        ref={contentRef}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Headline */}
        <motion.h1 
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
          className="font-heading text-fluid-3xl font-bold text-aurora-white mb-6 tracking-tight leading-[1.1] px-4"
        >
          Beyond First Class.
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
          className="text-fluid-base text-aurora-white/70 max-w-[65ch] mx-auto mb-10 leading-relaxed px-4"
        >
          Private shores. Unmarked airstrips. Tables that don&apos;t take reservations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleDesignTrip}
            className="w-full sm:w-auto bg-gradient-aurora text-aurora-white font-semibold px-8 py-4 rounded-lg hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-cyan focus:ring-offset-2 focus:ring-offset-aurora-dark min-h-[44px]"
          >
            Design My Trip
          </button>
          <button
            onClick={handleExploreDestinations}
            className="w-full sm:w-auto border border-aurora-glass-border text-aurora-white/80 font-semibold px-8 py-4 rounded-lg hover:border-aurora-cyan hover:text-aurora-white hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-cyan focus:ring-offset-2 focus:ring-offset-aurora-dark min-h-[44px]"
          >
            Explore Destinations
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-scroll-hint">
        <svg
          className="w-6 h-6 text-aurora-white/50"
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
