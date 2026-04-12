'use client';

import Image from 'next/image';
import AnimatedSection from './AnimatedSection';

export default function Interstitial() {
  return (
    <section
      aria-label="Visual interlude"
      className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden bg-aurora-bg-dark"
    >
      <Image
        src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&h=1080&fit=crop"
        alt="Grand celebration venue with dramatic lighting at golden hour"
        fill
        sizes="100vw"
        className="object-cover"
        loading="eager"
      />
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-aurora-navy/50" aria-hidden="true" />

      {/* Centered quote */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <AnimatedSection variant="fade-up">
          <blockquote className="text-center max-w-2xl">
            <p className="font-heading text-fluid-2xl italic text-white leading-snug tracking-tight">
              &ldquo;A great party is a book of memories — every detail a page worth remembering.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-white/60 tracking-widest uppercase">
              Aurora Luxe
            </footer>
          </blockquote>
        </AnimatedSection>
      </div>
    </section>
  );
}
