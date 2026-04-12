import { notFound } from 'next/navigation';
import Link from 'next/link';
import { teamMembers } from '../../data/team';

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase();
}
import type { Metadata } from 'next';

export function generateStaticParams() {
  return teamMembers.map((member) => ({ id: member.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const member = teamMembers.find((m) => m.id === params.id);
  if (!member) return {};
  return {
    title: `${member.name} — ${member.title} | Aurora Luxe`,
    description: member.bio,
  };
}

export default function SpecialistDetailPage({ params }: { params: { id: string } }) {
  const member = teamMembers.find((m) => m.id === params.id);
  if (!member) return notFound();

  const otherMembers = teamMembers.filter((m) => m.id !== member.id);

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
          <span className="text-sm text-aurora-text-muted">Our Team</span>
        </div>
      </nav>

      {/* Profile Hero */}
      <section className="py-section-md px-4 sm:px-6 lg:px-12 bg-aurora-bg-light">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-aurora-border bg-gradient-to-br from-aurora-gold/20 to-[#1a2744]/10 flex-shrink-0 flex items-center justify-center">
            <span className="font-heading text-4xl md:text-5xl font-semibold text-aurora-text/60 select-none">
              {getInitials(member.name)}
            </span>
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-heading text-fluid-2xl font-bold text-aurora-text mb-2">
              {member.name}
            </h1>
            <p className="text-lg text-aurora-gold-accessible font-medium mb-1">
              {member.title}
            </p>
            <p className="text-sm text-aurora-text-muted mb-6">
              {member.yearsExperience} years of experience
            </p>
            <p className="text-aurora-text leading-relaxed max-w-2xl">
              {member.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-section-sm px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-fluid-xl font-semibold text-aurora-text mb-6">
            Areas of Expertise
          </h2>
          <div className="flex flex-wrap gap-3">
            {member.specialties.map((specialty) => (
              <span
                key={specialty}
                className="px-5 py-2.5 text-sm font-medium rounded-full bg-aurora-bg-light border border-aurora-border text-aurora-text hover:border-aurora-gold/40 transition-colors"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-sm px-4 sm:px-6 lg:px-12 bg-aurora-bg-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-fluid-xl font-semibold text-aurora-text mb-4">
            Plan Your Event with {member.name.split(' ')[0]}
          </h2>
          <p className="text-aurora-text-muted mb-8 max-w-xl mx-auto">
            Share your vision and let {member.name.split(' ')[0]} craft a
            bespoke experience tailored to your dreams.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-aurora-gold text-white font-semibold px-8 py-3.5 rounded-lg hover:shadow-lift hover:-translate-y-0.5 transition-all min-h-[44px] focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:outline-none"
          >
            Begin a Conversation
          </Link>
        </div>
      </section>

      {/* Other Specialists */}
      <section className="py-section-sm px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-fluid-lg font-semibold text-aurora-text mb-6">
            Meet the Rest of Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherMembers.map((other) => (
              <Link
                key={other.id}
                href={`/specialists/${other.id}`}
                className="group block p-5 bg-aurora-bg-light border border-aurora-border rounded-sm text-center hover:border-aurora-gold/40 hover:shadow-subtle transition-all"
              >
                <div className="mx-auto mb-3 w-20 h-20 rounded-full border border-aurora-border bg-gradient-to-br from-aurora-gold/20 to-[#1a2744]/10 flex items-center justify-center">
                  <span className="font-heading text-xl font-semibold text-aurora-text/60 select-none">
                    {getInitials(other.name)}
                  </span>
                </div>
                <h3 className="font-heading text-sm font-semibold text-aurora-text group-hover:text-aurora-gold-accessible transition-colors">
                  {other.name}
                </h3>
                <p className="text-xs text-aurora-text-muted mt-0.5">
                  {other.title}
                </p>
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
