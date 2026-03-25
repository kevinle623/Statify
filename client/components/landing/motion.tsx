"use client";

import { type ReactNode } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";

// Reusable scroll-triggered reveal wrapper
export function Reveal({
  children,
  className,
  width = "100%",
  delay = 0,
  direction = "up",
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  width?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  amount?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  const offsets = {
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  if (prefersReducedMotion) {
    return (
      <div className={className} style={{ width }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={{ width }}
      initial={{
        opacity: 0,
        x: offsets[direction].x,
        y: offsets[direction].y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for child animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Fade-up variant for individual elements
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Line expand animation (for decorative lines)
export const lineExpand: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Re-export motion for convenience
export { motion };
