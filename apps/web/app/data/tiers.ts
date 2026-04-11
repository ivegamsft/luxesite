import { EventTier } from '../lib/types';

export const tiers: EventTier[] = [
  {
    id: 'one-time',
    name: 'One Time',
    tagline: 'Make Your Moment Legendary',
    price: 'From $500,000',
    featured: false,
    perks: [
      'Dedicated event producer assigned to your vision',
      'Venue transformation and custom design for your celebration',
      'Custom catering, entertainment, and décor coordination',
      'Day-of concierge team (up to 8 staff)',
      'Post-event highlight reel and memory book',
      'You dream it, we make it real'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly',
    tagline: 'Every Event, Every Year',
    price: 'From $1,200,000/year',
    featured: true,
    perks: [
      'Everything in One Time for EVERY event, all year',
      'Personal family event strategist (knows your kids\' names, allergies, friend groups)',
      'Up to 12 events per year included',
      'Birthday parties, holiday celebrations, first days of school, graduations',
      'Seasonal surprise boxes delivered to your door',
      'Priority rebooking — venue conflicts? We handle it',
      'Annual family portrait session at a stunning venue'
    ]
  },
  {
    id: 'gift',
    name: 'Gift',
    tagline: 'Give Someone the Aurora Treatment',
    price: 'From $250,000',
    featured: false,
    perks: [
      'Beautifully packaged gift experience card',
      'Recipient chooses from our full celebration menu',
      'Full concierge planning included',
      'Valid for 18 months',
      'Add-on: surprise delivery with balloons and a personal note'
    ]
  }
];
