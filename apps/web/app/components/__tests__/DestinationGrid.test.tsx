import { render, screen, fireEvent } from '@testing-library/react';
import DestinationGrid from '@/app/components/DestinationGrid';

describe('DestinationGrid', () => {
  it('renders section heading', () => {
    render(<DestinationGrid />);
    expect(screen.getByText('Curated Destinations')).toBeInTheDocument();
  });

  it('renders all 6 destination cards', () => {
    render(<DestinationGrid />);
    
    // Check for all destination names
    expect(screen.getByText('Maldives')).toBeInTheDocument();
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('Swiss Alps')).toBeInTheDocument();
    expect(screen.getByText('Dubai')).toBeInTheDocument();
    expect(screen.getByText('Kenya')).toBeInTheDocument();
    expect(screen.getByText('Mediterranean')).toBeInTheDocument();
  });

  it('each card shows name and price', () => {
    render(<DestinationGrid />);
    
    // Check for Maldives card with price
    expect(screen.getByText('Maldives')).toBeInTheDocument();
    expect(screen.getByText(/from €12,500/i)).toBeInTheDocument();
    
    // Check for Tokyo card with price
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText(/from €8,900/i)).toBeInTheDocument();
    
    // Check for Swiss Alps card with price
    expect(screen.getByText('Swiss Alps')).toBeInTheDocument();
    expect(screen.getByText(/from €15,200/i)).toBeInTheDocument();
  });

  // --- Touch/Keyboard Accessibility tests (verifying Trinity's fixes) ---

  describe('Touch & Keyboard Accessibility', () => {
    it('destination cards have role="button" for screen readers', () => {
      render(<DestinationGrid />);

      const buttons = screen.getAllByRole('button');
      // Each of the 6 destination cards should be a button
      expect(buttons.length).toBeGreaterThanOrEqual(6);
    });

    it('destination cards are keyboard-focusable', () => {
      render(<DestinationGrid />);

      const maldivesCard = screen.getByText('Maldives').closest('[role="button"]');
      expect(maldivesCard).toBeInTheDocument();
      expect(maldivesCard).toHaveAttribute('tabindex', '0');
    });

    it('pressing Enter toggles Quick Facts overlay', () => {
      render(<DestinationGrid />);

      const maldivesCard = screen.getByText('Maldives').closest('[role="button"]');
      expect(maldivesCard).toBeInTheDocument();

      // Initially aria-expanded should be false
      expect(maldivesCard).toHaveAttribute('aria-expanded', 'false');

      // Press Enter to open
      fireEvent.keyDown(maldivesCard!, { key: 'Enter' });
      expect(maldivesCard).toHaveAttribute('aria-expanded', 'true');

      // Press Enter again to close
      fireEvent.keyDown(maldivesCard!, { key: 'Enter' });
      expect(maldivesCard).toHaveAttribute('aria-expanded', 'false');
    });

    it('pressing Space toggles Quick Facts overlay', () => {
      render(<DestinationGrid />);

      const maldivesCard = screen.getByText('Maldives').closest('[role="button"]');
      expect(maldivesCard).toBeInTheDocument();

      // Press Space to open
      fireEvent.keyDown(maldivesCard!, { key: ' ' });
      expect(maldivesCard).toHaveAttribute('aria-expanded', 'true');

      // Press Space again to close
      fireEvent.keyDown(maldivesCard!, { key: ' ' });
      expect(maldivesCard).toHaveAttribute('aria-expanded', 'false');
    });

    it('aria-expanded attribute reflects toggle state', () => {
      render(<DestinationGrid />);

      const maldivesCard = screen.getByText('Maldives').closest('[role="button"]');
      expect(maldivesCard).toBeInTheDocument();

      // Default state: collapsed
      expect(maldivesCard).toHaveAttribute('aria-expanded', 'false');

      // Click to expand
      fireEvent.click(maldivesCard!);
      expect(maldivesCard).toHaveAttribute('aria-expanded', 'true');

      // Click to collapse
      fireEvent.click(maldivesCard!);
      expect(maldivesCard).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
