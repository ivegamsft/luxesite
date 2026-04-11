import { notFound } from 'next/navigation';
import Link from 'next/link';
import { faqs } from '../../data/faqs';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return faqs.map((faq) => ({ id: faq.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const faq = faqs.find((f) => f.id === params.id);
  if (!faq) return {};
  return {
    title: `${faq.question} | Aurora Luxe FAQ`,
    description: faq.answer.slice(0, 160),
  };
}

export default function FAQDetailPage({ params }: { params: { id: string } }) {
  const faq = faqs.find((f) => f.id === params.id);
  if (!faq) return notFound();

  const relatedFaqs = faqs.filter((f) => f.id !== faq.id);

  return (
    <main className="min-h-screen bg-aurora-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-aurora-bg/95 backdrop-blur-sm border-b border-aurora-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
          <Link
            href="/#faq"
            className="text-sm font-medium text-aurora-text-muted hover:text-aurora-gold transition-colors"
          >
            &larr; All FAQs
          </Link>
          <span className="text-sm text-aurora-text-muted">FAQ</span>
        </div>
      </nav>

      {/* Question & Answer */}
      <section className="py-section-md px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-fluid-2xl font-bold text-aurora-text mb-8 leading-tight">
            {faq.question}
          </h1>
          <div className="p-8 bg-aurora-bg-light border border-aurora-border rounded-sm">
            <p className="text-aurora-text leading-relaxed text-lg">
              {faq.answer}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-xs px-4 sm:px-6 lg:px-12 bg-aurora-bg-dark">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-aurora-text-muted mb-6">
            Still have questions? Our team is happy to help.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-aurora-gold text-white font-semibold px-8 py-3.5 rounded-lg hover:shadow-lift hover:-translate-y-0.5 transition-all min-h-[44px] focus:ring-2 focus:ring-aurora-gold focus:ring-offset-2 focus:outline-none"
          >
            Begin a Conversation
          </Link>
        </div>
      </section>

      {/* Related FAQs */}
      <section className="py-section-sm px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-fluid-lg font-semibold text-aurora-text mb-6">
            Related Questions
          </h2>
          <div className="space-y-4">
            {relatedFaqs.map((related) => (
              <Link
                key={related.id}
                href={`/faq/${related.id}`}
                className="block p-5 bg-aurora-bg-light border border-aurora-border rounded-sm hover:border-aurora-gold/40 hover:shadow-subtle transition-all"
              >
                <h3 className="font-heading text-base font-medium text-aurora-text hover:text-aurora-gold transition-colors">
                  {related.question}
                </h3>
                <p className="text-sm text-aurora-text-muted mt-1 line-clamp-1">
                  {related.answer}
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
          className="text-sm text-aurora-text-muted hover:text-aurora-gold transition-colors"
        >
          &larr; Return to Aurora Luxe
        </Link>
      </div>
    </main>
  );
}
