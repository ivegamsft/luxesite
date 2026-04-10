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
  avatar?: string;
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
