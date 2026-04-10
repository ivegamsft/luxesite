import React from 'react';

// Mock next/image to render a regular img tag
const MockImage = ({ src, alt, fill, priority, sizes, className, ...props }: any) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : src.src}
      alt={alt}
      className={className}
      data-testid="next-image"
      {...props}
    />
  );
};

export default MockImage;
