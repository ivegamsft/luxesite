import React from 'react';

// Strip framer-specific props so they don't leak to DOM elements
function strip({ children, whileInView, viewport, initial, animate, transition, exit, variants, whileHover, whileTap, layout, layoutId, ...rest }: any) {
  return { children, rest };
}

// Mock all motion components as regular HTML elements
export const motion = {
  div: React.forwardRef<HTMLDivElement, any>((props, ref) => { const { children, rest } = strip(props); return <div ref={ref} {...rest}>{children}</div>; }),
  section: React.forwardRef<HTMLElement, any>((props, ref) => { const { children, rest } = strip(props); return <section ref={ref} {...rest}>{children}</section>; }),
  button: React.forwardRef<HTMLButtonElement, any>((props, ref) => { const { children, rest } = strip(props); return <button ref={ref} {...rest}>{children}</button>; }),
  span: React.forwardRef<HTMLSpanElement, any>((props, ref) => { const { children, rest } = strip(props); return <span ref={ref} {...rest}>{children}</span>; }),
  h1: React.forwardRef<HTMLHeadingElement, any>((props, ref) => { const { children, rest } = strip(props); return <h1 ref={ref} {...rest}>{children}</h1>; }),
  p: React.forwardRef<HTMLParagraphElement, any>((props, ref) => { const { children, rest } = strip(props); return <p ref={ref} {...rest}>{children}</p>; }),
  ul: React.forwardRef<HTMLUListElement, any>((props, ref) => { const { children, rest } = strip(props); return <ul ref={ref} {...rest}>{children}</ul>; }),
};

// Mock AnimatePresence to just render children
export const AnimatePresence: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

// Mock useInView hook
export const useInView = () => [React.useRef(null), true];

// Mock useReducedMotion hook
export const useReducedMotion = () => false;
