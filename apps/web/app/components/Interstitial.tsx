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
        src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&h=1080&fit=crop"
        alt="Serene turquoise ocean with white sand beach at golden hour"
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
            <p className="font-heading text-2xl md:text-3xl lg:text-4xl italic text-white leading-snug tracking-tight">
              &ldquo;The world is a book, and those who do not travel read only one page.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-white/60 tracking-widest uppercase">
              Saint Augustine
            </footer>
          </blockquote>
        </AnimatedSection>
      </div>
    </section>
  );
}
