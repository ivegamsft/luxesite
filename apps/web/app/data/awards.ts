import { PressAward } from '../lib/types';

// Each publication gets a distinctive typographic style
const awardStyles: Record<string, string> = {
  'award-conde-nast': 'text-base lg:text-lg font-serif italic tracking-normal',
  'award-travel-leisure': 'text-sm lg:text-base font-heading font-bold tracking-[0.3em]',
  'award-forbes': 'text-sm lg:text-base font-heading font-semibold tracking-[0.2em]',
  'award-trustpilot': 'text-sm lg:text-base font-heading font-bold tracking-[0.15em]',
  'award-virtuoso': 'text-base lg:text-lg font-heading font-light tracking-[0.35em]',
  'award-feefo': 'text-sm lg:text-base font-heading font-bold tracking-[0.25em] uppercase',
};

export const awards: PressAward[] = [
  {
    id: 'award-conde-nast',
    name: 'Condé Nast Traveler',
    logoText: 'CONDÉ NAST TRAVELER',
    link: 'https://www.cntraveler.com',
  },
  {
    id: 'award-travel-leisure',
    name: 'Travel + Leisure',
    logoText: 'TRAVEL+LEISURE',
    link: 'https://www.travelandleisure.com',
  },
  {
    id: 'award-forbes',
    name: 'Forbes Travel Guide',
    logoText: 'FORBES TRAVEL GUIDE',
    link: 'https://www.forbestravelguide.com',
  },
  {
    id: 'award-trustpilot',
    name: 'Trustpilot',
    logoText: 'TRUSTPILOT',
    link: 'https://www.trustpilot.com',
  },
  {
    id: 'award-virtuoso',
    name: 'Virtuoso',
    logoText: 'VIRTUOSO',
    link: 'https://www.virtuoso.com',
  },
  {
    id: 'award-feefo',
    name: 'Feefo',
    logoText: 'FEEFO',
    link: 'https://www.feefo.com',
  },
];

export { awardStyles };
