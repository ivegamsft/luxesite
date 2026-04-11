export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
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
