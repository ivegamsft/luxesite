import { MembershipTier } from '../lib/types';

export const tiers: MembershipTier[] = [
  {
    id: 'silver',
    name: 'Silver',
    tagline: 'Your Journey Begins',
    price: '$25,000/year',
    perTrip: 'from $5,000 per journey',
    featured: false,
    perks: [
      'Priority booking at partner properties worldwide',
      'Complimentary airport lounge access',
      'Quarterly destination guide and travel intelligence',
      '10% discount on all curated experiences',
      'Dedicated concierge hotline'
    ]
  },
  {
    id: 'black',
    name: 'Black',
    tagline: 'Elevated Beyond Limits',
    price: '$75,000/year',
    perTrip: 'from $15,000 per journey',
    featured: true,
    perks: [
      'Everything in Silver, plus:',
      'Personal travel curator who knows your preferences',
      'Complimentary room upgrades at 500+ luxury hotels',
      'Access to private jet booking platform with preferred rates',
      'Invitation-only events in Monaco, Aspen, and Dubai',
      'Annual complimentary week at an Aurora-owned property',
      '24/7 emergency travel assistance anywhere in the world'
    ]
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    tagline: 'The Rarest Circle',
    price: '$200,000/year',
    perTrip: 'from $50,000 per journey',
    featured: false,
    perks: [
      'Everything in Black, plus:',
      'Dedicated travel team of three specialists',
      'Unlimited complimentary companion travel for one guest',
      'Private experiences designed exclusively for you',
      'Helicopter transfers in major cities',
      'Annual bespoke journey (valued at $50,000)',
      'Access to Aurora\'s private island in the Seychelles',
      'Lifetime membership after five consecutive years',
      'Your name etched in the Aurora Hall of Explorers'
    ]
  }
];
