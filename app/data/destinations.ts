import { Destination } from '../lib/types';

export const destinations: Destination[] = [
  {
    slug: 'maldives',
    name: 'Maldives',
    region: 'Indian Ocean',
    tagline: 'Private Island Paradise',
    price: 12500,
    currency: '€',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&h=900&fit=crop',
    quickFacts: [
      'Private villa with infinity pool overlooking turquoise lagoons',
      '24/7 butler service and personal chef',
      'Direct seaplane transfers from Malé',
      'Exclusive access to coral reef diving with marine biologists'
    ]
  },
  {
    slug: 'tokyo',
    name: 'Tokyo',
    region: 'Japan',
    tagline: 'Neon Metropolis',
    price: 8900,
    currency: '€',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=900&fit=crop',
    quickFacts: [
      'Penthouse suite in Roppongi with skyline views',
      'Private omakase dining with three-Michelin-star chef',
      'VIP access to exclusive members-only clubs',
      'Bespoke shopping experiences in Ginza with personal stylist'
    ]
  },
  {
    slug: 'swiss-alps',
    name: 'Swiss Alps',
    region: 'Europe',
    tagline: 'Alpine Grandeur',
    price: 15200,
    currency: '€',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&h=900&fit=crop',
    quickFacts: [
      'Private chalet with panoramic Matterhorn views',
      'Heli-skiing with Olympic-level guides',
      'In-chalet spa and wellness concierge',
      'Michelin-starred mountain dining and vintage wine cellar'
    ]
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    region: 'United Arab Emirates',
    tagline: 'Gilded Skyline',
    price: 11800,
    currency: '€',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=900&fit=crop',
    quickFacts: [
      'Royal suite at Burj Al Arab with 24k gold interiors',
      'Private desert safari in vintage Land Rovers',
      'Helicopter tours over Palm Jumeirah',
      'VIP shopping at Dubai Mall with personal shopper'
    ]
  },
  {
    slug: 'kenya',
    name: 'Kenya',
    region: 'East Africa',
    tagline: 'Savanna Luxe',
    price: 14500,
    currency: '€',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=900&fit=crop',
    quickFacts: [
      'Exclusive tented camp in the Masai Mara',
      'Private game drives with expert wildlife photographers',
      'Champagne sundowners overlooking the Great Migration',
      'Cultural immersion with Maasai elders and warriors'
    ]
  },
  {
    slug: 'mediterranean',
    name: 'Mediterranean',
    region: 'Southern Europe',
    tagline: 'Azure Drift',
    price: 18900,
    currency: '€',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=900&fit=crop',
    quickFacts: [
      'Seven-night voyage aboard a 60-meter superyacht',
      'Private chef and crew of twelve',
      'Island-hopping across Santorini, Capri, and Ibiza',
      'Onboard spa, cinema, and water sports equipment'
    ]
  }
];
