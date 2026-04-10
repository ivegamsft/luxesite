'use client';

import { useState, useEffect } from 'react';
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

    // Observe all sections that match nav hrefs
    navLinks.forEach((link) => {
      const sectionId = link.href.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    // Also observe hero section
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
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wider text-aurora-white">
              Aurora Luxe
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
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
                      className={`text-sm font-medium transition-all duration-300 hover:text-aurora-cyan focus:outline-none focus:text-aurora-cyan focus:underline ${
                        isActive
                          ? 'text-aurora-cyan underline decoration-2 underline-offset-4'
                          : 'text-aurora-white/80'
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
              className="bg-gradient-aurora text-aurora-white font-medium px-6 py-3 rounded-2xl hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-aurora-cyan focus:ring-offset-2 focus:ring-offset-aurora-dark min-h-[44px]"
            >
              Request Itinerary
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-aurora-white hover:text-aurora-cyan focus:outline-none focus:text-aurora-cyan transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-aurora-glass-border">
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
                      className={`block text-base font-medium transition-colors py-3 focus:outline-none focus:text-aurora-cyan min-h-[44px] ${
                        isActive
                          ? 'text-aurora-cyan'
                          : 'text-aurora-white/80 hover:text-aurora-cyan'
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
              className="w-full bg-gradient-aurora text-aurora-white font-medium px-6 py-3 rounded-2xl hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 mt-4 focus:outline-none focus:ring-2 focus:ring-aurora-cyan min-h-[44px]"
            >
              Request Itinerary
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
