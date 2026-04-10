'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero (roughly 100vh)
      const shouldShow = window.scrollY > window.innerHeight;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={handleClick}
          className="md:hidden fixed bottom-6 right-6 z-40 bg-gradient-aurora text-aurora-dark font-semibold px-6 py-4 rounded-full shadow-glow hover:-translate-y-0.5 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-cyan"
          aria-label="Design My Trip"
        >
          Design My Trip
        </motion.button>
      )}
    </AnimatePresence>
  );
}
