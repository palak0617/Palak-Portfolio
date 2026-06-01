import type { Variants, Transition } from 'framer-motion';

// ── Shared transitions ────────────────────────────────────────────────────────

export const spring: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 22,
};

export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 130,
  damping: 20,
};

export const pageTurnTransition: Transition = {
  duration: 0.55,
  ease: [0.4, 0, 0.2, 1],
};

// ── Reveal variants ───────────────────────────────────────────────────────────

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1 },
};

// ── Container stagger ─────────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

// ── Page variants (book page turn) ────────────────────────────────────────────

export const bookPageVariants: Variants = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? 14 : -14,
    x:       dir > 0 ? '5%' : '-5%',
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    rotateY: 0,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    rotateY: dir < 0 ? 14 : -14,
    x:       dir < 0 ? '5%' : '-5%',
    opacity: 0,
    scale: 0.97,
  }),
};

// ── Stamp reveal (skills) ─────────────────────────────────────────────────────

export const stampVariants: Variants = {
  hidden: { opacity: 0, scale: 0.65, rotate: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 220, damping: 18 },
  },
};
