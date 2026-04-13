import { PressAward } from '../lib/types';

// Each publication gets a distinctive typographic style
// Serif for editorial brands, sans for everything else
const awardStyles: Record<string, string> = {
  'award-conde-nast': 'text-base lg:text-lg font-serif italic tracking-normal',
  'award-event-design': 'text-sm lg:text-base font-heading font-semibold tracking-wide',
  'award-forbes': 'text-sm lg:text-base font-heading font-semibold tracking-wide',
  'award-trustpilot': 'text-sm lg:text-base font-heading font-semibold tracking-wide',
  'award-virtuoso': 'text-sm lg:text-base font-heading font-semibold tracking-wide',
  'award-feefo': 'text-sm lg:text-base font-heading font-semibold tracking-wide uppercase',
};

export const awards: PressAward[] = [
  {
    id: 'award-conde-nast',
    name: 'Condé Nast',
    logoText: 'CONDÉ NAST',
    link: 'https://www.condenast.com',
  },
  {
    id: 'award-event-design',
    name: 'Event Design Magazine',
    logoText: 'EVENT DESIGN',
    link: 'https://www.eventdesign.com',
  },
  {
    id: 'award-forbes',
    name: 'Forbes Life',
    logoText: 'FORBES LIFE',
    link: 'https://www.forbes.com/life',
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
