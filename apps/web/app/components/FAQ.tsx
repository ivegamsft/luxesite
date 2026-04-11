'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../data/faqs';
import AnimatedSection from './AnimatedSection';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-section-sm sm:py-section-lg px-4 sm:px-6 lg:px-12 bg-aurora-bg-dark">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-fluid-2xl font-semibold tracking-tight text-aurora-text mb-10">
            Common Questions
          </h2>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            
            return (
              <AnimatedSection key={faq.id} delay={index * 0.05}>
                <div className={`border rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? 'border-aurora-gold/40 bg-aurora-bg-light shadow-subtle' : 'border-aurora-border bg-aurora-bg-light hover:border-aurora-gold/40 hover:shadow-subtle'}`}>
                  <button
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full flex items-center justify-between px-7 py-6 text-left hover:bg-aurora-bg/30 transition-colors focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-inset"
                  >
                    <span className="font-heading text-[1.0625rem] font-semibold text-aurora-text pr-8 leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-aurora-gold/30 text-aurora-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      aria-hidden="true"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-7 pb-6 border-t border-aurora-gold/20">
                          <p className="pt-5 text-aurora-text leading-relaxed text-[0.9375rem]">
                            {faq.answer}
                          </p>
                          <Link
                            href={`/faq/${faq.id}`}
                            className="inline-block mt-4 text-xs font-medium text-aurora-gold hover:underline underline-offset-4 transition-colors"
                          >
                            Permalink to this question &rarr;
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
