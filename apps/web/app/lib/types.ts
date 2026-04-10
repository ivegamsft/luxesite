export interface Destination {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  price: number;
  currency: string;
  imageUrl: string;
  quickFacts: string[];
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  icon: string;
  regions: string[];
}

export interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  featured: boolean;
  perks: string[];
}

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

export interface TravelGuide {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  imageUrl: string;
  link: string;
  author: string;
}

export interface PressAward {
  id: string;
  name: string;
  logoText: string;
  link: string;
}
