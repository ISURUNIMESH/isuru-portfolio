import type { Transition, Variants } from "framer-motion";

export const easeCinema: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const duration = {
  fast: 0.15,
  base: 0.18,
  slow: 0.2,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 90,
  damping: 20,
  mass: 0.8,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easeCinema },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: easeCinema },
  },
};

export const reveal: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeCinema },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.99 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easeCinema },
  },
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easeCinema },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 6 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: easeCinema },
  },
  leave: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15, ease: easeCinema },
  },
};

export const overlayTransition: Transition = {
  duration: 0.18,
  ease: easeCinema,
};
