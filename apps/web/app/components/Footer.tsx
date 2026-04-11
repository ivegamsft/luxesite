const footerDestinations = [
  { label: 'Private Galas', href: '#destinations' },
  { label: 'Milestone Birthdays', href: '#destinations' },
  { label: 'Corporate Retreats', href: '#destinations' },
  { label: 'Weddings', href: '#destinations' },
  { label: 'Festival Experiences', href: '#destinations' },
];

const footerCompany = [
  { label: 'Our Team', href: '#why-aurora' },
  { label: 'Guides', href: '#guides' },
  { label: 'Press & Awards', href: '#press' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-aurora-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-12">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 mb-14">
          {/* Brand */}
          <div>
            <div className="font-heading text-fluid-xl font-bold mb-6">
              AURORA LUXE
            </div>
            <p className="text-sm text-white/80 leading-relaxed max-w-[28ch]">
              Award-winning private event specialists crafting bespoke celebrations since 2012.
            </p>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-6 text-white/80">
              Experiences
            </h3>
            <ul className="space-y-3">
              {footerDestinations.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 hover:text-aurora-gold focus:text-white focus:underline focus:outline-none focus:ring-2 focus:ring-aurora-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-6 text-white/80">
              Company
            </h3>
            <ul className="space-y-3">
              {footerCompany.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 hover:text-aurora-gold focus:text-white focus:underline focus:outline-none focus:ring-2 focus:ring-aurora-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-6 text-white/80">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a href="tel:+18882005893" className="hover:text-aurora-gold focus:text-white focus:underline focus:outline-none focus:ring-2 focus:ring-aurora-gold transition-colors">
                  +1 (888) 200-LUXE
                </a>
              </li>
              <li>
                <a href="mailto:concierge@auroraluxe.com" className="hover:text-aurora-gold focus:text-white focus:underline focus:outline-none focus:ring-2 focus:ring-aurora-gold transition-colors">
                  concierge@auroraluxe.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row: Copyright + Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/15 text-sm text-white/70">
          <p>© 2026 Aurora Luxe Events. All rights reserved.</p>
          <p>
            Images via{' '}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-aurora-gold/70 hover:text-aurora-gold focus:text-white focus:underline focus:outline-none focus:ring-2 focus:ring-aurora-gold transition-colors"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
