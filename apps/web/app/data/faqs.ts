export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: 'consultation',
    question: 'How does the consultation process work?',
    answer: 'We begin with a complimentary consultation where we learn about your celebration vision, guest list, and preferences. You\'ll be matched with a specialist who has deep expertise in your event type — whether that\'s a children\'s birthday, a corporate gala, or a multi-generational reunion. They\'ll craft a custom plan, and we\'ll refine it together until every detail is perfect.'
  },
  {
    id: 'tiers',
    question: "What's included in each tier?",
    answer: 'One Time (from $500,000) covers a single spectacular event — dedicated producer, venue transformation and custom design, full catering and entertainment coordination, day-of concierge team, and a post-event memory book. Yearly (from $1,200,000/year) includes up to 12 events per year with a personal family event strategist who knows your kids\' preferences and handles everything from birthdays to graduations, plus seasonal surprise boxes and priority rebooking. Gift (from $250,000) is a beautifully packaged experience card valid for 18 months with full concierge planning included.'
  },
  {
    id: 'booking-advance',
    question: 'How far in advance should I book?',
    answer: 'For most celebrations, 3–6 months gives us plenty of time to secure your ideal venue and coordinate every detail. For holiday-season events, popular Saturday dates, or complex multi-day celebrations, 12+ months ensures the best availability. That said, we specialize in making the impossible possible — we\'ve pulled off stunning events in as little as six weeks.'
  },
  {
    id: 'all-ages',
    question: 'Can you handle children\'s events AND adult galas?',
    answer: 'Absolutely — that\'s our specialty. Our team includes a dedicated Children\'s Experience Architect alongside our Production Director who oversees large-scale galas. Whether it\'s a whimsical 5th birthday with character performers or a 500-guest black-tie fundraiser, we bring the same level of creativity and precision.'
  },
  {
    id: 'gift-tier',
    question: 'What\'s included in the Gift tier?',
    answer: 'The Gift tier ($250,000) is a beautifully packaged experience card that lets the recipient choose from our full celebration menu. It includes full concierge planning — they simply tell us what they\'d like to celebrate, and we handle everything. The card is valid for 18 months, and you can add a surprise delivery with balloons and a personal note.'
  },
  {
    id: 'catering',
    question: 'Do you provide catering and food service?',
    answer: 'Yes. Our Culinary Director works with a curated network of chefs and caterers to design menus for every occasion and dietary need. From whimsical kids\' menus with edible art to 12-course tasting experiences for black-tie affairs, every plate is part of the story. We handle tastings, dietary accommodations, and all food logistics.'
  },
  {
    id: 'what-ages',
    question: 'What ages do you serve?',
    answer: 'All of them — and that\'s the point. We produce events for 1st birthdays and 90th birthdays with equal care. Our team designs age-appropriate experiences at every celebration, so toddlers, teens, parents, and grandparents all feel the event was made for them. Multi-generational celebrations are one of our proudest specialties.'
  },
  {
    id: 'minimum-budget',
    question: 'Is there a minimum budget?',
    answer: 'Our Gift tier starts at $250,000 per experience. This allows us to deliver the level of personalization, exclusive venue access, and white-glove production that defines Aurora Luxe. For those seeking extraordinary celebrations with meticulous attention to detail, we deliver unparalleled value.'
  }
];
