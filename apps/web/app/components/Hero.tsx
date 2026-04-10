'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const handleRequestConsultation = () => {
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
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Light overlay for readability on light theme */}
      <div className="absolute inset-0 z-10 bg-white/15" />

      <motion.div 
        className="relative z-20 max-w-5xl px-4 sm:px-6 lg:px-8 text-left lg:max-w-[50%]"
      >
        {/* Headline */}
        <motion.h1 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="font-heading text-fluid-3xl font-bold text-[#2c2620] mb-6 tracking-tight leading-[1.1] px-4"
        >
          Award-Winning Travel Specialists Designing Bespoke Journeys
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="text-fluid-base text-[#2c2620]/70 max-w-[65ch] mb-10 leading-relaxed px-4"
        >
          Hand-curated experiences. 24/7 concierge. Journeys tailored to you alone.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-start gap-4 px-4"
        >
          <button
            onClick={handleRequestConsultation}
            className="w-full sm:w-auto bg-[#c9a76a] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#b8965c] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#c9a76a] focus:ring-offset-2 focus:ring-offset-white min-h-[44px]"
          >
            Request Consultation
          </button>
          <button
            onClick={handleExploreDestinations}
            className="w-full sm:w-auto border border-[#2c2620]/30 text-[#2c2620] font-semibold px-8 py-4 rounded-lg hover:border-[#c9a76a] hover:text-[#c9a76a] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#c9a76a] focus:ring-offset-2 focus:ring-offset-white min-h-[44px]"
          >
            Explore Destinations
          </button>
        </motion.div>

        {/* Concierge Discovery Row — md+ only */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.8, ease: 'easeOut' }}
          className="hidden md:flex items-center gap-3 mt-8 mx-4 bg-white/80 backdrop-blur-sm border border-[#e8e4df] rounded-lg px-4 py-3"
        >
          <select
            aria-label="Destination"
            defaultValue=""
            className="flex-1 bg-transparent text-[#2c2620] text-sm font-medium border-r border-[#e8e4df] pr-3 py-2 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="" disabled>Where to? ▾</option>
            <option value="maldives">Maldives</option>
            <option value="santorini">Santorini</option>
            <option value="kyoto">Kyoto</option>
            <option value="patagonia">Patagonia</option>
            <option value="safari">East Africa Safari</option>
            <option value="other">Somewhere else</option>
          </select>
          <select
            aria-label="Travel timing"
            defaultValue=""
            className="flex-1 bg-transparent text-[#2c2620] text-sm font-medium border-r border-[#e8e4df] pr-3 py-2 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="" disabled>When? ▾</option>
            <option value="next-month">Next month</option>
            <option value="3-months">In 2–3 months</option>
            <option value="6-months">In 4–6 months</option>
            <option value="next-year">Next year</option>
            <option value="flexible">I&apos;m flexible</option>
          </select>
          <button
            onClick={handleRequestConsultation}
            className="whitespace-nowrap text-sm font-semibold text-[#c9a76a] hover:text-[#b8965c] transition-colors py-2 px-3 focus:outline-none focus:underline min-h-[44px]"
          >
            Discuss with a specialist →
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-scroll-hint">
        <svg
          className="w-6 h-6 text-[#2c2620]/50"
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
