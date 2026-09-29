"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./PsbMotion.module.css";

interface PsbRevealProps {
  children: ReactNode;
  className?: string;
  variant?: "rise" | "slide-left" | "slide-right" | "scale" | "fade";
  delay?: number;
}

export function PsbReveal({
  children,
  className = "",
  variant = "rise",
  delay = 0,
}: PsbRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px 24px 0px", threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${className}`}
      data-variant={variant}
      style={{ animationDelay: `${Math.min(Math.max(delay, 0), 0.24)}s` }}
    >
      {children}
    </div>
  );
}
