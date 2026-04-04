import { ReactNode } from "react";
import clsx from "clsx";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  centered = false,
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={clsx("flex flex-col gap-4", centered ? "items-center text-center" : "", className)}>
      {badge && (
        <span className={clsx(
          "inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-fit",
          light ? "bg-brand-accent/20 text-brand-accent" : "bg-brand-primary/10 text-brand-primary"
        )}>
          {badge}
        </span>
      )}
      
      <h2 className={clsx(
        "font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
        light ? "text-white" : "text-brand-primary"
      )}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={clsx(
          "text-base md:text-lg max-w-2xl leading-relaxed mt-2",
          light ? "text-white/80" : "text-brand-primary/70"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
