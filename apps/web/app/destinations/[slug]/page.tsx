import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { destinations } from '../../data/destinations';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const dest = destinations.find((d) => d.slug === params.slug);
  if (!dest) return {};
  return {
    title: `${dest.name} — ${dest.tagline} | Aurora Luxe`,
    description: `${dest.tagline}. ${dest.quickFacts[0]}`,
  };
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const dest = destinations.find((d) => d.slug === params.slug);
  if (!dest) return notFound();

  const otherDestinations = destinations
    .filter((d) => d.slug !== dest.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-aurora-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-aurora-bg/95 backdrop-blur-sm border-b border-aurora-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
          <Link
            href="/#destinations"
            className="text-sm font-medium text-aurora-text-muted hover:text-aurora-gold-accessible transition-colors"
          >
            &larr; All Venues
          </Link>
          <span className="text-sm text-aurora-text-muted">{dest.region}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-80 md:h-[28rem] bg-aurora-bg-dark">
        <Image
          src={dest.imageUrl}
          alt={dest.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-aurora-text/70 via-aurora-text/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-12 pb-10">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm text-white/70 mb-2">{dest.region}</p>
            <h1 className="font-heading text-fluid-3xl font-bold text-white drop-shadow-md mb-2">
              {dest.name}
            </h1>
            <p className="text-lg text-white/80 italic">{dest.tagline}</p>
          </div>
        </div>
      </section>

      {/* Pricing & Quick Facts */}
      <section className="py-section-md px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Price card */}
            <div className="md:w-1/3">
              <div className="sticky top-24 p-6 bg-aurora-bg-light border border-aurora-border rounded-sm text-center">
                <p className="text-sm text-aurora-text-muted mb-2">Starting from</p>
                <p className="text-3xl font-bold text-aurora-text tabular-nums">
                  {dest.currency}{dest.price.toLocaleString()}
                </p>
                <p className="text-xs text-aurora-text-muted mt-1 mb-6">per event</p>
                <Link
                  href="/#contact"
                  className="block w-full bg-aurora-gold text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lift hover:-translate-y-0.5 transition-all min-h-[44px] text-center focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:outline-none"
                >
                  Begin a Conversation
                </Link>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="md:w-2/3">
              <h2 className="font-heading text-fluid-xl font-semibold text-aurora-text mb-6">
                Highlights
              </h2>
              <ul className="space-y-5">
                {dest.quickFacts.map((fact, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 p-5 bg-aurora-bg-light border border-aurora-border rounded-sm"
                  >
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-aurora-gold/10 text-aurora-gold-accessible font-semibold text-sm">
                      {index + 1}
                    </span>
                    <span className="text-aurora-text leading-relaxed">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Other Destinations */}
      <section className="py-section-sm px-4 sm:px-6 lg:px-12 bg-aurora-bg-dark">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-fluid-lg font-semibold text-aurora-text mb-6">
            More Venues
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherDestinations.map((other) => (
              <Link
                key={other.slug}
                href={`/destinations/${other.slug}`}
                className="group block rounded-sm overflow-hidden border border-aurora-border hover:border-aurora-gold/40 hover:shadow-subtle transition-all"
              >
                <div className="relative h-40 bg-aurora-bg-dark">
                  <Image
                    src={other.imageUrl}
                    alt={other.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4 bg-aurora-bg-light">
                  <h3 className="font-heading text-base font-semibold text-aurora-text group-hover:text-aurora-gold-accessible transition-colors">
                    {other.name}
                  </h3>
                  <p className="text-xs text-aurora-text-muted">{other.region}</p>
                  <p className="text-sm font-medium text-aurora-gold-accessible mt-1">
                    from {other.currency}{other.price.toLocaleString()}
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
