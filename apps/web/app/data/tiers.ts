import { MembershipTier } from '../lib/types';

export const tiers: MembershipTier[] = [
  {
    id: 'one-time',
    name: 'One Time',
    tagline: 'Make Your Moment Legendary',
    price: 'From $500,000',
    perTrip: 'single event experience planning',
    featured: false,
    perks: [
      'Dedicated event curator assigned to your vision',
      'Venue scouting across 50+ countries',
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
    perTrip: 'up to 12 events per year included',
    featured: true,
    perks: [
      'Everything in One Time for EVERY event, all year',
      'Personal family event strategist (knows your kids\' names, allergies, friend groups)',
      'Up to 12 events per year included',
      'Birthday parties, holiday celebrations, first days of school, graduations',
      'Seasonal surprise boxes delivered to your door',
      'Priority rebooking — venue conflicts? We handle it',
      'Annual family portrait session at a stunning location'
    ]
  },
  {
    id: 'gift',
    name: 'Gift',
    tagline: 'Give Someone the Aurora Treatment',
    price: 'From $250,000',
    perTrip: 'beautifully packaged gift experience',
    featured: false,
    perks: [
      'Beautifully packaged gift experience card',
      'Recipient chooses from curated event catalog',
      'Full concierge planning included',
      'Valid for 18 months',
      'Add-on: surprise delivery with champagne and flowers'
    ]
  }
];
