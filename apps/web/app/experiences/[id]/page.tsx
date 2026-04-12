import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { experiences } from '../../data/experiences';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return experiences.map((exp) => ({ id: exp.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const experience = experiences.find((e) => e.id === params.id);
  if (!experience) return {};
  return {
    title: `${experience.title} | Aurora Luxe Experiences`,
    description: experience.description,
  };
}

export default function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const experience = experiences.find((e) => e.id === params.id);
  if (!experience) return notFound();

  const otherExperiences = experiences.filter((e) => e.id !== experience.id);

  return (
    <main className="min-h-screen bg-aurora-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-aurora-bg/95 backdrop-blur-sm border-b border-aurora-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-aurora-text-muted hover:text-aurora-gold-accessible transition-colors"
          >
            &larr; Back to Aurora Luxe
          </Link>
          <span className="text-sm text-aurora-text-muted">Experiences</span>
        </div>
      </nav>

      {/* Hero with Image */}
      {experience.imageUrl && (
        <section className="relative h-72 md:h-96 bg-aurora-bg-dark">
          <Image
            src={experience.imageUrl}
            alt={experience.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aurora-text/70 via-aurora-text/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-12 pb-10">
            <div className="max-w-5xl mx-auto">
              <h1 className="font-heading text-fluid-3xl font-bold text-white drop-shadow-md mb-2">
                {experience.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {experience.regions.map((region) => (
                  <span
                    key={region}
                    className="text-xs tracking-wide text-white/90 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Description */}
      <section className="py-section-md px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-fluid-xl font-semibold text-aurora-text mb-6">
            About This Celebration
          </h2>
          <p className="text-aurora-text leading-relaxed text-lg mb-10">
            {experience.description}
          </p>

          {/* Gallery placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="aspect-[4/3] rounded-sm bg-aurora-bg-dark border border-aurora-border flex items-center justify-center"
              >
                <span className="text-xs text-aurora-text-muted">
                  Gallery image {n}
                </span>
              </div>
            ))}
          </div>

          {/* Regions */}
          <h3 className="font-heading text-fluid-lg font-semibold text-aurora-text mb-4">
            Categories
          </h3>
          <div className="flex flex-wrap gap-3 mb-10">
            {experience.regions.map((region) => (
              <span
                key={region}
                className="px-5 py-2.5 text-sm font-medium rounded-full bg-aurora-bg-light border border-aurora-border text-aurora-text"
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-section-sm px-4 sm:px-6 lg:px-12 bg-aurora-navy">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-fluid-xl font-semibold text-white mb-4">
            Experience {experience.title}
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Let our event architects design a bespoke {experience.title.toLowerCase()}{' '}
            experience crafted around your vision.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-aurora-gold text-white font-semibold px-8 py-3.5 rounded-lg hover:shadow-lift hover:-translate-y-0.5 transition-all min-h-[44px] focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:outline-none"
          >
            Begin a Conversation
          </Link>
        </div>
      </section>

      {/* Other Experiences */}
      <section className="py-section-sm px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-fluid-lg font-semibold text-aurora-text mb-6">
            More Experiences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherExperiences.slice(0, 3).map((other) => (
              <Link
                key={other.id}
                href={`/experiences/${other.id}`}
                className="group block rounded-sm overflow-hidden border border-aurora-border hover:border-aurora-gold/40 hover:shadow-subtle transition-all"
              >
                {other.imageUrl && (
                  <div className="relative h-40 bg-aurora-bg-dark">
                    <Image
                      src={other.imageUrl}
                      alt={other.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-heading text-base font-semibold text-aurora-text group-hover:text-aurora-gold-accessible transition-colors">
                    {other.title}
                  </h3>
                  <p className="text-sm text-aurora-text-muted mt-1 line-clamp-2">
                    {other.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer link */}
      <div className="py-8 px-4 text-center border-t border-aurora-border">
        <Link
          href="/"
          className="text-sm text-aurora-text-muted hover:text-aurora-gold-accessible transition-colors"
        >
          &larr; Return to Aurora Luxe
        </Link>
      </div>
    </main>
  );
}
