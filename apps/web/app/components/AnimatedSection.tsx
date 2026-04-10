'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

type AnimationVariant = 'fade' | 'fade-up' | 'fade-left';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
}

const variantMap: Record<AnimationVariant, { initial: Record<string, number>; animate: Record<string, number> }> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  'fade-up': {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  },
  'fade-left': {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
  },
};

export default function AnimatedSection({ children, className, delay = 0, variant = 'fade' }: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const v = variantMap[variant];

  return (
    <motion.div
      initial={prefersReducedMotion ? v.animate : v.initial}
      whileInView={v.animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
