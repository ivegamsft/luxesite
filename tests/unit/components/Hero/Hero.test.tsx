import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '@/app/components/Hero';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');
  function strip({ children, whileInView, viewport, initial, animate, transition, exit, variants, whileHover, whileTap, layout, layoutId, ...rest }: any) {
    return { children, rest };
  }
  return {
    __esModule: true,
    motion: {
      div: React.forwardRef((props: any, ref: any) => { const { children, rest } = strip(props); return React.createElement('div', { ref, ...rest }, children); }),
      section: React.forwardRef((props: any, ref: any) => { const { children, rest } = strip(props); return React.createElement('section', { ref, ...rest }, children); }),
      button: React.forwardRef((props: any, ref: any) => { const { children, rest } = strip(props); return React.createElement('button', { ref, ...rest }, children); }),
      span: React.forwardRef((props: any, ref: any) => { const { children, rest } = strip(props); return React.createElement('span', { ref, ...rest }, children); }),
      h1: React.forwardRef((props: any, ref: any) => { const { children, rest } = strip(props); return React.createElement('h1', { ref, ...rest }, children); }),
      p: React.forwardRef((props: any, ref: any) => { const { children, rest } = strip(props); return React.createElement('p', { ref, ...rest }, children); }),
      ul: React.forwardRef((props: any, ref: any) => { const { children, rest } = strip(props); return React.createElement('ul', { ref, ...rest }, children); }),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    useInView: () => [React.createRef(), true],
    useReducedMotion: () => false,
  };
});

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

  it('renders headline', () => {
    render(<Hero />);
    expect(screen.getByText('Extraordinary Celebrations for Every Age')).toBeInTheDocument();
  });

  it('renders both CTA buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Request Consultation')).toBeInTheDocument();
    expect(screen.getByText('Explore Celebrations')).toBeInTheDocument();
  });

  it('CTA links point to correct sections', () => {
    render(<Hero />);
    
    // Click "Request Consultation" button
    const consultButton = screen.getByText('Request Consultation');
    fireEvent.click(consultButton);
    
    // Should call getElementById with 'contact'
    expect(mockGetElementById).toHaveBeenCalledWith('contact');

    // Reset mock
    mockGetElementById.mockClear();
    
    // Click "Explore Celebrations" button
    const exploreButton = screen.getByText('Explore Celebrations');
    fireEvent.click(exploreButton);
    
    // Should call getElementById with 'experiences'
    expect(mockGetElementById).toHaveBeenCalledWith('experiences');
  });

  it('scroll indicator is present', () => {
    render(<Hero />);

    // The scroll indicator is an SVG arrow at the bottom
    const svg = document.querySelector('.animate-scroll-hint svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders without errors', () => {
    // Smoke test — no exceptions during render
    const { container } = render(<Hero />);
    expect(container.querySelector('section#hero')).toBeInTheDocument();
  });
});
