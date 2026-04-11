import { render, screen } from '@testing-library/react';
import Tiers from '@/app/components/Tiers';

describe('Tiers', () => {
  it('renders all 3 tiers (One Time, Yearly, Gift)', () => {
    render(<Tiers />);
    
    expect(screen.getByText('One Time')).toBeInTheDocument();
    expect(screen.getByText('Yearly')).toBeInTheDocument();
    expect(screen.getByText('Gift')).toBeInTheDocument();
  });

  it('featured tier (Yearly) has tagline', () => {
    render(<Tiers />);
    
    // Yearly tier should be present with its tagline
    expect(screen.getByText('Yearly')).toBeInTheDocument();
    expect(screen.getByText('Every Event, Every Year')).toBeInTheDocument();
  });

  it('renders tier prices', () => {
    render(<Tiers />);
    
    // Check for price information (softened with "From" language)
    expect(screen.getByText(/From \$500,000/)).toBeInTheDocument();
    expect(screen.getByText(/From \$1,200,000/)).toBeInTheDocument();
    expect(screen.getByText(/From \$250,000/)).toBeInTheDocument();
  });

  it('renders conversation buttons for all tiers', () => {
    render(<Tiers />);
    
    const buttons = screen.getAllByText('Begin a Conversation');
    expect(buttons).toHaveLength(3);
  });
});
