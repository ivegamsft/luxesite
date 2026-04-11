import { render, screen } from '@testing-library/react';
import Footer from '@/app/components/Footer';

describe('Footer', () => {
  it('renders logo', () => {
    render(<Footer />);
    expect(screen.getByText('AURORA LUXE')).toBeInTheDocument();
  });

  it('renders image credits text', () => {
    render(<Footer />);
    expect(screen.getByText(/Images via/i)).toBeInTheDocument();
    expect(screen.getByText('Unsplash')).toBeInTheDocument();
  });

  it('renders copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 Aurora Luxe Events/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    // Footer has Celebrations section heading + Company links
    expect(screen.getByText('Celebrations')).toBeInTheDocument();
    expect(screen.getByText('Our Team')).toBeInTheDocument();
    // Contact appears as both a section heading and a nav link
    const contactElements = screen.getAllByText('Contact');
    expect(contactElements.length).toBeGreaterThanOrEqual(1);
  });

  // --- Gradient text removal verification (Trinity's fix) ---

  it('logo does NOT use gradient text clipping (bg-clip-text)', () => {
    render(<Footer />);

    const logo = screen.getByText('AURORA LUXE');
    expect(logo).toBeInTheDocument();
    expect(logo.className).not.toMatch(/bg-clip-text/);
  });
});
