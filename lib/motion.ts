export const easeExpoOut = [0.16, 1, 0.3, 1] as const;

export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeExpoOut },
  },
};

export const revealVariantsReduced = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const hoverLift = {
  y: -4,
  scale: 1.02,
  transition: { duration: 0.24, ease: easeExpoOut },
};

export const charReveal = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 0.7, ease: easeExpoOut, delay: i * 0.03 },
  }),
};

export const heroSubReveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeExpoOut } },
};

export const accentScale = {
  hidden: { scale: 1.4, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: easeExpoOut } },
};
