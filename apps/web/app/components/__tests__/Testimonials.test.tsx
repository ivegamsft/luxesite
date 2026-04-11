import { render, screen, fireEvent } from '@testing-library/react';
import Testimonials from '@/app/components/Testimonials';

describe('Testimonials', () => {
  it('renders section heading', () => {
    render(<Testimonials />);
    // Section heading is now an editorial quote
    expect(screen.getByText(/the measure of an event/i)).toBeInTheDocument();
  });

  it('renders testimonial quotes', () => {
    render(<Testimonials />);

    // The first testimonial quote should be visible by default
    const quotes = document.querySelectorAll('p[class*="italic"]');
    expect(quotes.length).toBeGreaterThanOrEqual(1);
  });

  // --- Gradient text removal verification (Trinity's fix) ---

  it('heading does NOT use gradient text clipping (bg-clip-text)', () => {
    render(<Testimonials />);

    const heading = screen.getByText(/the measure of an event/i);
    expect(heading).toBeInTheDocument();
    expect(heading.className).not.toMatch(/bg-clip-text/);
  });

  // --- Navigation tests ---

  it('next button advances to the next testimonial', () => {
    render(<Testimonials />);

    // First testimonial should be visible
    expect(screen.getByText('Rachel Kim')).toBeInTheDocument();

    // Click next
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);

    // Second testimonial should now be visible
    expect(screen.getByText('Marcus Laurent')).toBeInTheDocument();
  });

  it('previous button goes to the previous testimonial', () => {
    render(<Testimonials />);

    // Click prev to wrap to last
    const prevButton = screen.getByLabelText('Previous testimonial');
    fireEvent.click(prevButton);

    // Last testimonial should now be visible (wrap around)
    expect(screen.getByText('Patricia O\'Connor')).toBeInTheDocument();
  });
});
