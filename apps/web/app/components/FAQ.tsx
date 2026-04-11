'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'consultation',
    question: 'How does the consultation process work?',
    answer: 'We begin with a complimentary consultation where we learn about your celebration dreams, preferences, and requirements. You\'ll be matched with a specialist who has deep expertise in your event type. They\'ll craft a custom plan tailored to your vision, and we\'ll work through revisions together until every detail is perfect.'
  },
  {
    id: 'tiers',
    question: "What's included in each tier?",
    answer: 'One Time (from $500,000) is for a single event or experience — dedicated curator, venue scouting across 50+ countries, custom coordination, day-of concierge team, and a post-event memory book. Yearly (from $1,200,000/year) covers up to 12 events per year with a personal family event strategist who knows your kids\' preferences and handles everything from birthdays to graduations, plus seasonal surprise boxes and priority rebooking. Gift (from $250,000) is a beautifully packaged experience card valid for 18 months with full concierge planning included.'
  },
  {
    id: 'booking-advance',
    question: 'How far in advance should I book?',
    answer: 'We recommend booking 3-6 months in advance for most events. For peak season celebrations, exclusive venues, or complex multi-day experiences, 12+ months advance notice ensures the best availability and rates. However, we can also accommodate last-minute requests when flexibility allows.'
  },
  {
    id: 'modifications',
    question: 'Can I modify my event after booking?',
    answer: 'Absolutely. Flexibility is core to our service. We understand that plans change, and we\'re here to adapt your event as needed. Modifications are subject to venue and vendor policies and may incur fees, but we\'ll always work to minimize costs and maximize your experience.'
  },
  {
    id: 'cancellation',
    question: 'What if I need to cancel?',
    answer: 'We offer flexible cancellation policies that vary by tier and supplier. Many of our partner properties provide generous cancellation windows. We\'ll clearly outline all terms before booking, and our team will advocate on your behalf should unexpected circumstances arise.'
  },
  {
    id: 'transfers',
    question: 'Do you handle venues and logistics?',
    answer: 'Yes, we provide comprehensive end-to-end service. This includes venue scouting, catering coordination, entertainment booking, floral design, lighting, and everything in between. We coordinate every element of your celebration so you can enjoy the moment seamlessly.'
  },
  {
    id: 'specialist-matching',
    question: 'How are your specialists matched to my event?',
    answer: 'Our matching process considers event expertise, venue knowledge, and shared aesthetic sensibilities. If you\'re planning a grand gala in a historic estate, you\'ll work with someone who has deep knowledge of luxury venues and a passion for unforgettable celebrations. This ensures authentic insights and genuine enthusiasm for your event.'
  },
  {
    id: 'minimum-budget',
    question: 'Is there a minimum budget?',
    answer: 'Our Gift tier starts at $250,000 per experience. This allows us to deliver the level of personalization, exclusive access, and white-glove service that defines Aurora Luxe. For those seeking exceptional celebrations with meticulous attention to detail, we deliver unparalleled value.'
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-section-md px-4 sm:px-6 lg:px-12 bg-aurora-bg-dark">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-fluid-2xl font-semibold tracking-tight text-aurora-text mb-10">
            Common Questions
          </h2>
        </AnimatedSection>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
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
