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
    expect(screen.getByText(/© 2025 Aurora Luxe Travel/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    expect(screen.getByText('Destinations')).toBeInTheDocument();
    expect(screen.getByText('Experiences')).toBeInTheDocument();
    expect(screen.getByText('Membership')).toBeInTheDocument();
  });
});
