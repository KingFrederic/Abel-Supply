'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { revealVariants, revealVariantsReduced, staggerParent } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

export default function Reveal({ children, className, stagger, delay = 0 }: RevealProps) {
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce ? revealVariantsReduced : revealVariants;
  const containerVariants = stagger
    ? {
        ...staggerParent,
        show: {
          ...staggerParent.show,
          transition: {
            ...staggerParent.show.transition,
            delayChildren: delay,
          },
        },
      }
    : undefined;

  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
