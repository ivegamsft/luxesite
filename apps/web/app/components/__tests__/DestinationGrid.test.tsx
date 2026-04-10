import { render, screen } from '@testing-library/react';
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
});
