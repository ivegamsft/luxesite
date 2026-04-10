import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '@/app/components/Hero';

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock getElementById
const mockGetElementById = jest.fn();
document.getElementById = mockGetElementById;

describe('Hero', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetElementById.mockReturnValue({
      scrollIntoView: jest.fn(),
    });
  });

  it('renders headline "Beyond First Class."', () => {
    render(<Hero />);
    expect(screen.getByText('Beyond First Class.')).toBeInTheDocument();
  });

  it('renders both CTA buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Design My Trip')).toBeInTheDocument();
    expect(screen.getByText('Explore Destinations')).toBeInTheDocument();
  });

  it('CTA links point to correct sections', () => {
    render(<Hero />);
    
    // Click "Design My Trip" button
    const designTripButton = screen.getByText('Design My Trip');
    fireEvent.click(designTripButton);
    
    // Should call getElementById with 'contact'
    expect(mockGetElementById).toHaveBeenCalledWith('contact');

    // Reset mock
    mockGetElementById.mockClear();
    
    // Click "Explore Destinations" button
    const exploreButton = screen.getByText('Explore Destinations');
    fireEvent.click(exploreButton);
    
    // Should call getElementById with 'destinations'
    expect(mockGetElementById).toHaveBeenCalledWith('destinations');
  });
});
