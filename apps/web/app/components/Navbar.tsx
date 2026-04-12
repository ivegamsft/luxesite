'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const sectionId = link.href.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const sectionId = href.replace('#', '');
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-aurora-bg border-b border-aurora-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="font-heading text-fluid-lg font-bold uppercase tracking-wider text-aurora-text">
              Aurora Luxe
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 overflow-visible">
            <ul className="flex items-center space-x-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`uppercase tracking-wider text-xs font-medium transition-all duration-300 hover:text-aurora-gold-accessible focus:outline-none focus:text-aurora-gold-accessible focus:underline focus:ring-2 focus:ring-aurora-gold/50 focus:ring-offset-2 focus:ring-offset-white focus:rounded-sm ${
                        isActive
                          ? 'text-aurora-gold-accessible underline decoration-2 underline-offset-4'
                          : 'text-aurora-text'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* CTA Button */}
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="shrink-0 whitespace-nowrap bg-aurora-gold text-aurora-text font-semibold px-5 py-2.5 rounded-lg hover:bg-aurora-gold/85 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:ring-offset-white min-h-[44px]"
            >
              Request Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-aurora-text hover:text-aurora-gold-accessible focus:outline-none focus:text-aurora-gold-accessible transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-aurora-bg border-t border-aurora-border overflow-hidden"
          >
          <div className="px-4 pt-4 pb-6 space-y-3">
            <ul className="space-y-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`block uppercase tracking-wider text-xs font-medium transition-colors py-3 focus:outline-none focus:text-aurora-gold-accessible min-h-[44px] ${
                        isActive
                          ? 'text-aurora-gold-accessible'
                          : 'text-aurora-text hover:text-aurora-gold-accessible'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
                setMobileMenuOpen(false);
              }}
              className="w-full bg-aurora-gold text-aurora-text font-semibold px-6 py-3 rounded-lg hover:bg-aurora-gold/85 hover:-translate-y-0.5 transition-all duration-300 mt-4 focus:outline-none focus:ring-2 focus:ring-aurora-gold min-h-[44px]"
            >
              Request Consultation
            </button>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
