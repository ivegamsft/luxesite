'use client';

import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'destinations', label: 'Celebrations' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'why-aurora', label: 'Our Team' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'membership', label: 'Tiers' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export default function ScrollNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Page sections"
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Scroll to ${label}`}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center gap-2 focus:outline-none"
          >
            <span
              className={`text-xs font-medium tracking-wide transition-all duration-200 ${
                isActive
                  ? 'opacity-100 translate-x-0 text-aurora-gold'
                  : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 text-aurora-text-muted'
              }`}
            >
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-200 ${
                isActive
                  ? 'w-3 h-3 bg-aurora-gold shadow-[0_0_6px_rgba(201,167,106,0.4)]'
                  : 'w-2 h-2 bg-aurora-text-muted/30 group-hover:bg-aurora-gold/50'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
