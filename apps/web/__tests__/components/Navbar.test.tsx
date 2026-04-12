import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/app/components/Navbar';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

global.IntersectionObserver = MockIntersectionObserver as any;

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

describe('Navbar', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders logo text "AURORA LUXE"', () => {
    render(<Navbar />);
    expect(screen.getByText('Aurora Luxe')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Celebrations')).toBeInTheDocument();
    expect(screen.getByText('Experiences')).toBeInTheDocument();
    expect(screen.getByText('Tiers')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders "Request Consultation" CTA', () => {
    render(<Navbar />);
    const ctaButtons = screen.getAllByText('Request Consultation');
    // Should have at least one CTA button (desktop view)
    expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('mobile menu toggle works (click hamburger, menu appears)', () => {
    render(<Navbar />);
    
    // Mobile menu should not be visible initially
    // The mobile menu is rendered conditionally, so links should only appear once initially (desktop)
    const venueLinks = screen.getAllByText('Celebrations');
    expect(venueLinks).toHaveLength(1);

    // Find and click the mobile menu button
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);

    // After clicking, mobile menu should appear with additional links
    const venueLinksAfter = screen.getAllByText('Celebrations');
    expect(venueLinksAfter.length).toBeGreaterThan(1);
  });
});
