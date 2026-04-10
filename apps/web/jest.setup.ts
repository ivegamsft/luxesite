import '@testing-library/jest-dom';
import React from 'react';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');
  
  const createMotionComponent = (tag: string) => {
    const Component = React.forwardRef((props: any, ref: any) => {
      const { children, whileInView, viewport, initial, animate, transition, style, ...rest } = props;
      return React.createElement(tag, { ref, style, ...rest }, children);
    });
    Component.displayName = `motion.${tag}`;
    return Component;
  };
  
  return {
    motion: {
      div: createMotionComponent('div'),
      section: createMotionComponent('section'),
      button: createMotionComponent('button'),
      span: createMotionComponent('span'),
      h1: createMotionComponent('h1'),
      h2: createMotionComponent('h2'),
      h3: createMotionComponent('h3'),
      p: createMotionComponent('p'),
      a: createMotionComponent('a'),
    },
    AnimatePresence: ({ children }: any) => children,
    useInView: () => [React.useRef(null), true],
  };
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, priority, sizes, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return React.createElement('img', {
      ...rest,
      src: typeof props.src === 'string' ? props.src : props.src?.src,
    });
  },
}));
