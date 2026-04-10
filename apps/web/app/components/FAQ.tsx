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
    answer: 'We begin with a complimentary consultation where we learn about your travel dreams, preferences, and requirements. You\'ll be matched with a specialist who has deep expertise in your chosen destinations. They\'ll craft a custom itinerary tailored to your vision, and we\'ll work through revisions together until every detail is perfect.'
  },
  {
    id: 'tiers',
    question: "What's included in each membership tier?",
    answer: 'Gold tier ($5,000+ per trip) includes personalized itineraries, 24/7 support, and exclusive partnerships. Platinum tier ($15,000+) adds priority booking, complimentary upgrades, and dedicated concierge. Black tier ($50,000+) offers unlimited changes, private events access, and a personal travel director for white-glove service.'
  },
  {
    id: 'booking-advance',
    question: 'How far in advance should I book?',
    answer: 'We recommend booking 3-6 months in advance for most destinations. For peak season travel, exclusive properties, or complex multi-destination itineraries, 12+ months advance notice ensures the best availability and rates. However, we can also accommodate last-minute requests when flexibility allows.'
  },
  {
    id: 'modifications',
    question: 'Can I modify my itinerary after booking?',
    answer: 'Absolutely. Flexibility is core to our service. We understand that plans change, and we\'re here to adapt your itinerary as needed. Modifications are subject to supplier policies and may incur fees, but we\'ll always work to minimize costs and maximize your experience.'
  },
  {
    id: 'cancellation',
    question: 'What if I need to cancel?',
    answer: 'We offer flexible cancellation policies that vary by tier and supplier. Many of our partner properties provide generous cancellation windows. We\'ll clearly outline all terms before booking, and our team will advocate on your behalf should unexpected circumstances arise.'
  },
  {
    id: 'transfers',
    question: 'Do you handle flights and transfers?',
    answer: 'Yes, we provide comprehensive door-to-door service. This includes international and domestic flights, private transfers, helicopter charters, yacht bookings, and everything in between. We coordinate every leg of your journey so you can travel seamlessly.'
  },
  {
    id: 'specialist-matching',
    question: 'How are your specialists matched to my trip?',
    answer: 'Our matching process considers regional expertise, personal travel experience, and shared interests. If you\'re planning a safari in Tanzania, you\'ll work with someone who has deep knowledge of East Africa and a passion for wildlife. This ensures authentic insights and genuine enthusiasm for your journey.'
  },
  {
    id: 'minimum-budget',
    question: 'Is there a minimum budget?',
    answer: 'Our Gold tier has a minimum trip value of $5,000 per person. This allows us to deliver the level of personalization, exclusive access, and white-glove service that defines Aurora Luxe. For travelers seeking exceptional experiences with meticulous attention to detail, we deliver unparalleled value.'
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-section-lg px-4 sm:px-6 lg:px-12 bg-aurora-bg">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-fluid-2xl font-semibold tracking-tight leading-tight text-aurora-text mb-12 text-center">
            Frequently Asked Questions
          </h2>
        </AnimatedSection>

        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openId === faq.id;
            
            return (
              <AnimatedSection key={faq.id} delay={index * 0.05}>
                <div className="border border-aurora-border rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-aurora-bg/30 transition-colors focus:outline-none focus:ring-2 focus:ring-aurora-gold focus:ring-inset"
                  >
                    <span className="font-heading text-fluid-base font-medium text-aurora-text pr-8">
                      {faq.question}
                    </span>
                    <span
                      className="flex-shrink-0 text-aurora-gold text-2xl font-light transition-transform duration-300"
                      aria-hidden="true"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      +
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
                        <div className="px-6 pb-5 text-aurora-text-muted leading-relaxed">
                          {faq.answer}
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
