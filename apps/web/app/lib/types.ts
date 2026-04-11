export interface Venue {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  price: number;
  currency: string;
  imageUrl: string;
  quickFacts: string[];
}

/** @deprecated Use Venue instead */
export type Destination = Venue;

export interface Experience {
  id: string;
  title: string;
  description: string;
  icon: string;
  regions: string[];
  imageUrl?: string;
}

export interface EventTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  featured: boolean;
  perks: string[];
  perTrip?: string;
}

/** @deprecated Use EventTier instead */
export type MembershipTier = EventTier;

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  location: string;
  date: string;
  avatar?: string;
  rating?: number;
  sourceLink?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  yearsExperience: number;
  specialties: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface InsiderGuide {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  imageUrl: string;
  link: string;
  author: string;
}

/** @deprecated Use InsiderGuide instead */
export type TravelGuide = InsiderGuide;

export interface PressAward {
  id: string;
  name: string;
  logoText: string;
  link: string;
}
