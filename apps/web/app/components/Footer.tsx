const footerDestinations = [
  { label: 'Maldives', href: '#destinations' },
  { label: 'Santorini', href: '#destinations' },
  { label: 'Kyoto', href: '#destinations' },
  { label: 'Patagonia', href: '#destinations' },
  { label: 'Swiss Alps', href: '#destinations' },
];

const footerCompany = [
  { label: 'About', href: '#about' },
  { label: 'Guides', href: '#guides' },
  { label: 'Press & Awards', href: '#press' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-aurora-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-section-sm">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="font-heading text-fluid-xl font-bold mb-4">
              AURORA LUXE
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-[28ch]">
              Award-winning private travel specialists crafting bespoke journeys since 2012.
            </p>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
              Destinations
            </h3>
            <ul className="space-y-2">
              {footerDestinations.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-aurora-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
              Company
            </h3>
            <ul className="space-y-2">
              {footerCompany.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-aurora-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href="tel:+18882005893" className="hover:text-aurora-gold transition-colors">
                  +1 (888) 200-LUXE
                </a>
              </li>
              <li>
                <a href="mailto:concierge@auroraluxe.com" className="hover:text-aurora-gold transition-colors">
                  concierge@auroraluxe.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row: Copyright + Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-sm text-white/40">
          <p>© 2025 Aurora Luxe Travel. All rights reserved.</p>
          <p>
            Images via{' '}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-aurora-gold/70 hover:text-aurora-gold transition-colors"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
