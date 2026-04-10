import { navLinks } from '../data/navigation';

export default function Footer() {
  return (
    <footer className="border-t border-aurora-glass-border bg-aurora-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Top Row: Logo + Nav */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Logo */}
          <div className="font-heading text-xl md:text-2xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
            AURORA LUXE
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-aurora-white/70 hover:text-aurora-cyan transition-colors text-sm min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Row: Copyright + Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-aurora-glass-border text-sm text-aurora-white/50">
          <p>© 2025 Aurora Luxe Travel. All rights reserved.</p>
          <p>
            Images via{' '}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-aurora-cyan/70 hover:text-aurora-cyan transition-colors"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
