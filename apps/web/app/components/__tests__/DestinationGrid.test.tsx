import { render, screen, fireEvent } from '@testing-library/react';
import DestinationGrid from '@/app/components/DestinationGrid';

describe('DestinationGrid', () => {
  it('renders section heading', () => {
    render(<DestinationGrid />);
    expect(screen.getByText('Celebration Spaces')).toBeInTheDocument();
  });

  it('renders all 6 venue cards', () => {
    render(<DestinationGrid />);
    
    // Check for all venue names (first 6 shown by default)
    expect(screen.getByText('Grand Ballrooms & Historic Estates')).toBeInTheDocument();
    expect(screen.getByText('Rooftop Terraces & Sky Gardens')).toBeInTheDocument();
    expect(screen.getByText('Beachfront Pavilions')).toBeInTheDocument();
    expect(screen.getByText('Garden & Botanical Venues')).toBeInTheDocument();
    expect(screen.getByText('Private Estates & Mansions')).toBeInTheDocument();
    expect(screen.getByText('Museum & Gallery Spaces')).toBeInTheDocument();
  });

  it('each card shows name and price', () => {
    render(<DestinationGrid />);
    
    // Check for Grand Ballrooms card with price
    expect(screen.getByText('Grand Ballrooms & Historic Estates')).toBeInTheDocument();
    expect(screen.getByText(/from \$150,000/i)).toBeInTheDocument();
    
    // Check for Rooftop Terraces card with price
    expect(screen.getByText('Rooftop Terraces & Sky Gardens')).toBeInTheDocument();
    expect(screen.getByText(/from \$120,000/i)).toBeInTheDocument();
    
    // Check for Beachfront Pavilions card with price
    expect(screen.getByText('Beachfront Pavilions')).toBeInTheDocument();
    expect(screen.getByText(/from \$135,000/i)).toBeInTheDocument();
  });

  // --- Touch/Keyboard Accessibility tests (verifying Trinity's fixes) ---

  describe('Touch & Keyboard Accessibility', () => {
    it('venue cards have role="button" for screen readers', () => {
      render(<DestinationGrid />);

      const buttons = screen.getAllByRole('button');
      // Each of the 6 venue cards should be a button
      expect(buttons.length).toBeGreaterThanOrEqual(6);
    });

    it('venue cards are keyboard-focusable', () => {
      render(<DestinationGrid />);

      const venueCard = screen.getByText('Grand Ballrooms & Historic Estates').closest('[role="button"]');
      expect(venueCard).toBeInTheDocument();
      expect(venueCard).toHaveAttribute('tabindex', '0');
    });

    it('pressing Enter toggles Quick Facts overlay', () => {
      render(<DestinationGrid />);

      const venueCard = screen.getByText('Grand Ballrooms & Historic Estates').closest('[role="button"]');
      expect(venueCard).toBeInTheDocument();

      // Initially aria-expanded should be false
      expect(venueCard).toHaveAttribute('aria-expanded', 'false');

      // Press Enter to open
      fireEvent.keyDown(venueCard!, { key: 'Enter' });
      expect(venueCard).toHaveAttribute('aria-expanded', 'true');

      // Press Enter again to close
      fireEvent.keyDown(venueCard!, { key: 'Enter' });
      expect(venueCard).toHaveAttribute('aria-expanded', 'false');
    });

    it('pressing Space toggles Quick Facts overlay', () => {
      render(<DestinationGrid />);

      const venueCard = screen.getByText('Grand Ballrooms & Historic Estates').closest('[role="button"]');
      expect(venueCard).toBeInTheDocument();

      // Press Space to open
      fireEvent.keyDown(venueCard!, { key: ' ' });
      expect(venueCard).toHaveAttribute('aria-expanded', 'true');

      // Press Space again to close
      fireEvent.keyDown(venueCard!, { key: ' ' });
      expect(venueCard).toHaveAttribute('aria-expanded', 'false');
    });

    it('aria-expanded attribute reflects toggle state', () => {
      render(<DestinationGrid />);

      const venueCard = screen.getByText('Grand Ballrooms & Historic Estates').closest('[role="button"]');
      expect(venueCard).toBeInTheDocument();

      // Default state: collapsed
      expect(venueCard).toHaveAttribute('aria-expanded', 'false');

      // Click to expand
      fireEvent.click(venueCard!);
      expect(venueCard).toHaveAttribute('aria-expanded', 'true');

      // Click to collapse
      fireEvent.click(venueCard!);
      expect(venueCard).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
