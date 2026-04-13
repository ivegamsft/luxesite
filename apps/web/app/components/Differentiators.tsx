import React from 'react';

const differentiators = [
  {
    headline: '24/7 Concierge',
    description: 'Always available — day or night, anywhere in the world.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    headline: 'Hand-Curated',
    description: 'Every venue personally scouted and transformed by our specialists.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    headline: 'Specialists',
    description: '12+ years average expertise — deep event production knowledge you can trust.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function Differentiators() {
  return (
    <section className="py-section-xs px-4 sm:px-6 lg:px-12 bg-aurora-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-fluid-2xl font-bold text-aurora-text mb-4">
            The Aurora Difference
          </h2>
          <p className="text-aurora-text-muted max-w-2xl mx-auto leading-relaxed">
            Bespoke event production backed by unparalleled expertise, personal attention, and around-the-clock support.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {differentiators.map((item) => (
            <div key={item.headline} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-aurora-gold/10 text-aurora-gold-accessible mb-4">
                {item.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-aurora-text mb-2">
                {item.headline}
              </h3>
              <p className="text-sm text-aurora-text-muted leading-relaxed max-w-xs mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
