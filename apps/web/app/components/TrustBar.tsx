'use client';

import React from 'react';

const trustSignals = [
  {
    id: 'phone',
    label: (<a href="tel:+18882005893" className="hover:text-aurora-gold transition-colors">+1 (888) 200-LUXE</a>),
    sublabel: 'Available 24/7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    highlight: true,
  },
  {
    id: 'concierge',
    label: 'Alexandra Renard',
    sublabel: 'Head of Client Relations',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    highlight: false,
  },
  {
    id: 'press',
    label: 'As featured in',
    sublabel: 'Financial Times · Condé Nast Traveller',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    highlight: false,
  },
  {
    id: 'members',
    label: '1,200+ families',
    sublabel: 'Trusted worldwide',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    highlight: false,
  },
];

export default function TrustBar() {
  return (
    <div
      role="complementary"
      aria-label="Trust and credibility"
      className="border-y border-aurora-border bg-aurora-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4">
        {/* Desktop: horizontal row with dividers */}
        <div className="hidden md:flex items-center justify-between gap-6">
          {trustSignals.map((signal, i) => (
            <React.Fragment key={signal.id}>
              {i > 0 && (
                <div className="w-px h-8 bg-aurora-border shrink-0" aria-hidden="true" />
              )}
              <div className="flex items-center gap-3 min-w-0">
                <span className={signal.highlight ? 'text-aurora-gold' : 'text-aurora-text-muted'}>
                  {signal.icon}
                </span>
                <div className="min-w-0">
                  <p className={`text-sm font-medium leading-tight truncate ${signal.highlight ? 'text-aurora-gold' : 'text-aurora-text'}`}>
                    {signal.label}
                  </p>
                  <p className="text-xs text-aurora-text-muted leading-tight truncate">
                    {signal.sublabel}
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: 2x2 grid */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {trustSignals.map((signal) => (
            <div key={signal.id} className="flex items-start gap-2.5">
              <span className={`mt-0.5 shrink-0 ${signal.highlight ? 'text-aurora-gold' : 'text-aurora-text-muted'}`}>
                {signal.icon}
              </span>
              <div className="min-w-0">
                <p className={`text-sm font-medium leading-tight ${signal.highlight ? 'text-aurora-gold' : 'text-aurora-text'}`}>
                  {signal.label}
                </p>
                <p className="text-xs text-aurora-text-muted leading-tight">
                  {signal.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
