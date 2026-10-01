"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "zoom-in"
  | "fade"
  | "soft-up"
  | "soft-left"
  | "soft-right"
  | "soft-zoom";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  viewportOnce?: boolean;
  viewportMargin?: string;
}

const VARIANTS: Record<AnimationVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -45 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 45 },
    visible: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  "fade": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "soft-up": {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  },
  "soft-left": {
    hidden: { opacity: 0, x: -14 },
    visible: { opacity: 1, x: 0 },
  },
  "soft-right": {
    hidden: { opacity: 0, x: 14 },
    visible: { opacity: 1, x: 0 },
  },
  "soft-zoom": {
    hidden: { opacity: 0, scale: 1.035 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  className = "",
  viewportOnce = true,
  viewportMargin = "-60px",
}: ScrollRevealProps) {
  const currentVariant = VARIANTS[variant] || VARIANTS["fade-up"];
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={currentVariant}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: viewportMargin }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: variant === "fade" || variant.startsWith("soft-")
          ? [0.25, 0.1, 0.25, 1]
          : [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  viewportOnce?: boolean;
  viewportMargin?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  delayChildren = 0,
  className = "",
  viewportOnce = true,
  viewportMargin = "-60px",
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: viewportMargin }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  variant?: AnimationVariant;
  duration?: number;
  className?: string;
}

export function StaggerItem({
  children,
  variant = "fade-up",
  duration = 0.55,
  className = "",
}: StaggerItemProps) {
  const currentVariant = VARIANTS[variant] || VARIANTS["fade-up"];

  return (
    <motion.div
      variants={currentVariant}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
