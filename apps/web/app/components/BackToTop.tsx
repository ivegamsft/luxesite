'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const threshold = window.innerHeight * 1.5; // 150vh

    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 bg-aurora-navy text-white border-2 border-aurora-gold/60 rounded-full w-12 h-12 flex items-center justify-center shadow-lift hover:bg-aurora-gold hover:text-white hover:border-aurora-gold hover:shadow-lift active:bg-aurora-gold/90 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2"
      aria-label="Back to top"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
