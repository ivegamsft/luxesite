import React from 'react';

// Mock all motion components as regular divs
export const motion = {
  div: React.forwardRef<HTMLDivElement, any>(({ children, whileInView, viewport, initial, animate, transition, ...props }, ref) => (
    <div ref={ref} {...props}>{children}</div>
  )),
  section: React.forwardRef<HTMLElement, any>(({ children, whileInView, viewport, initial, animate, transition, ...props }, ref) => (
    <section ref={ref} {...props}>{children}</section>
  )),
  button: React.forwardRef<HTMLButtonElement, any>(({ children, whileInView, viewport, initial, animate, transition, ...props }, ref) => (
    <button ref={ref} {...props}>{children}</button>
  )),
  span: React.forwardRef<HTMLSpanElement, any>(({ children, whileInView, viewport, initial, animate, transition, ...props }, ref) => (
    <span ref={ref} {...props}>{children}</span>
  )),
};

// Mock AnimatePresence to just render children
export const AnimatePresence: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

// Mock useInView hook
export const useInView = () => [React.useRef(null), true];
