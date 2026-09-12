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
    <div className={clsx("flex flex-col gap-2.5", centered ? "items-center text-center" : "items-start text-left", className)}>
      {badge && (
        <span className={clsx(
          "inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit",
          light ? "bg-brand-accent/20 text-brand-accent" : "bg-brand-primary/10 text-brand-primary"
        )}>
          {badge}
        </span>
      )}
      
      <h2 className={clsx(
        "font-heading text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight tracking-tight",
        light ? "text-white" : "text-brand-primary"
      )}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={clsx(
          "text-sm sm:text-base max-w-2xl leading-relaxed",
          light ? "text-white/80" : "text-zinc-600"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
