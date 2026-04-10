import { render, screen } from '@testing-library/react';
import Tiers from '@/app/components/Tiers';

describe('Tiers', () => {
  it('renders all 3 tiers (Silver, Black, Obsidian)', () => {
    render(<Tiers />);
    
    expect(screen.getByText('Silver')).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('Obsidian')).toBeInTheDocument();
  });

  it('featured tier (Black) has special styling/badge', () => {
    render(<Tiers />);
    
    // The Black tier should have a "Most Popular" badge
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
    
    // Black tier should be present
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('Elevated Beyond Limits')).toBeInTheDocument();
  });

  it('renders tier prices', () => {
    render(<Tiers />);
    
    // Check for price information (softened with "From" language)
    expect(screen.getByText(/From \$25,000/)).toBeInTheDocument();
    expect(screen.getByText(/From \$75,000/)).toBeInTheDocument();
    expect(screen.getByText(/By Invitation/)).toBeInTheDocument();
  });

  it('renders conversation buttons for all tiers', () => {
    render(<Tiers />);
    
    const buttons = screen.getAllByText('Begin a Conversation');
    expect(buttons).toHaveLength(3);
  });
});
