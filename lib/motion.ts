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
