'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const rafRef = useRef<number>(0);

  const applyParallax = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    const y = scrollYRef.current;
    el.style.transform = `translateY(${y * 0.3}px)`;
    el.style.opacity = `${Math.max(0, 1 - y / 500)}`;
  }, []);

  useEffect(() => {
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
  }, [applyParallax]);

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
      <div className="absolute inset-0 z-10 bg-gradient-aurora-subtle animate-aurora-pulse" />

      {/* Noise Texture Overlay (optional) */}
      <div className="absolute inset-0 z-10 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px',
      }} />

      {/* Aurora Blob */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-96 h-96 md:w-[600px] md:h-[600px] bg-gradient-aurora opacity-20 rounded-full blur-[120px] animate-aurora-pulse" />
      </div>

      {/* Content with parallax — transforms applied via ref to bypass React re-renders */}
      <motion.div 
        ref={contentRef}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-fluid-5xl font-bold text-aurora-white mb-6 tracking-tight px-4"
        >
          Beyond First Class.
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-fluid-base text-aurora-white/70 max-w-2xl mx-auto mb-10 leading-relaxed px-4"
        >
          Experience the pinnacle of luxury travel with Aurora Luxe. From private jets to superyachts, 
          Michelin-starred dining to exclusive island retreats—every journey is curated to perfection 
          for the world&apos;s most discerning travelers.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleDesignTrip}
            className="w-full sm:w-auto bg-gradient-aurora text-aurora-white font-medium px-8 py-4 rounded-2xl hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-cyan focus:ring-offset-2 focus:ring-offset-aurora-dark min-h-[44px]"
          >
            Design My Trip
          </button>
          <button
            onClick={handleExploreDestinations}
            className="w-full sm:w-auto border border-aurora-glass-border text-aurora-white/80 font-medium px-8 py-4 rounded-2xl hover:border-aurora-cyan hover:text-aurora-white hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-cyan focus:ring-offset-2 focus:ring-offset-aurora-dark min-h-[44px]"
          >
            Explore Destinations
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-float">
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
