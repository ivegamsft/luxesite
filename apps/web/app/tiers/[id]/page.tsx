import { notFound } from 'next/navigation';
import Link from 'next/link';
import { tiers } from '../../data/tiers';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return tiers.map((tier) => ({ id: tier.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const tier = tiers.find((t) => t.id === params.id);
  if (!tier) return {};
  return {
    title: `${tier.name} Tier | Aurora Luxe`,
    description: tier.tagline,
  };
}

export default function TierDetailPage({ params }: { params: { id: string } }) {
  const tier = tiers.find((t) => t.id === params.id);
  if (!tier) return notFound();

  const otherTiers = tiers.filter((t) => t.id !== tier.id);

  return (
    <main className="min-h-screen bg-aurora-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-aurora-bg/95 backdrop-blur-sm border-b border-aurora-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-aurora-text-muted hover:text-aurora-gold transition-colors"
          >
            &larr; Back to Aurora Luxe
          </Link>
          <span className="text-sm text-aurora-text-muted">Tier</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-aurora-navy py-section-md px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          {tier.featured && (
            <span className="inline-block mb-4 text-xs font-medium tracking-[0.2em] uppercase text-aurora-gold border border-aurora-gold/30 rounded-full px-4 py-1.5">
              Most Popular
            </span>
          )}
          <h1 className="font-heading text-fluid-3xl font-bold text-white mb-4">
            {tier.name}
          </h1>
          <p className="text-lg text-white/70 mb-6 max-w-2xl mx-auto">
            {tier.tagline}
          </p>
          <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
            {tier.price.includes('/') ? (
              <>
                {tier.price.split('/')[0]}
                <span className="text-lg font-normal text-white/60">
                  /{tier.price.split('/')[1]}
                </span>
              </>
            ) : (
              <span>{tier.price}</span>
            )}
          </div>
          {tier.perTrip && (
            <p className="text-sm text-white/50 mt-2">{tier.perTrip}</p>
          )}
        </div>
      </section>

      {/* Perks */}
      <section className="py-section-md px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-fluid-xl font-semibold text-aurora-text mb-8">
            What&apos;s Included
          </h2>
          <ul className="space-y-5">
            {tier.perks.map((perk, index) => (
              <li
                key={index}
                className="flex items-start gap-4 p-5 bg-aurora-bg-light border border-aurora-border rounded-sm"
              >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-aurora-gold/10 text-aurora-gold font-semibold text-sm">
                  {index + 1}
                </span>
                <span className="text-aurora-text leading-relaxed">{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-sm px-4 sm:px-6 lg:px-12 bg-aurora-bg-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-fluid-xl font-semibold text-aurora-text mb-4">
            Ready to Begin?
          </h2>
          <p className="text-aurora-text-muted mb-8 max-w-xl mx-auto">
            Start a conversation with our team to discuss your vision and craft
            the perfect {tier.name.toLowerCase()} experience.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-aurora-gold text-white font-semibold px-8 py-3.5 rounded-lg hover:shadow-lift hover:-translate-y-0.5 transition-all min-h-[44px] focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:outline-none"
          >
            Begin a Conversation
          </Link>
        </div>
      </section>

      {/* Other Tiers */}
      <section className="py-section-sm px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-fluid-lg font-semibold text-aurora-text mb-6">
            Explore Other Tiers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherTiers.map((other) => (
              <Link
                key={other.id}
                href={`/tiers/${other.id}`}
                className="block p-6 bg-aurora-bg-light border border-aurora-border rounded-sm hover:border-aurora-gold/40 hover:shadow-subtle transition-all"
              >
                <h3 className="font-heading text-lg font-medium text-aurora-text mb-1">
                  {other.name}
                </h3>
                <p className="text-sm text-aurora-text-muted mb-2">
                  {other.tagline}
                </p>
                <span className="text-sm font-semibold text-aurora-gold">
                  {other.price}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer link */}
      <div className="py-8 px-4 text-center border-t border-aurora-border">
        <Link
          href="/"
          className="text-sm text-aurora-text-muted hover:text-aurora-gold transition-colors"
        >
          &larr; Return to Aurora Luxe
        </Link>
      </div>
    </main>
  );
}
