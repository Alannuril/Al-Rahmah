import Link from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';

interface PremiumButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'white' | 'cta';
  className?: string;
  icon?: boolean;
  onClick?: () => void;
}

export function PremiumButton({
  children,
  href,
  variant = 'primary',
  className,
  icon = false,
  onClick
}: PremiumButtonProps) {
  
  const baseClasses = "relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-full transition-all duration-300 shadow-lg text-sm tracking-wide";
  
  const variants = {
    primary: "bg-brand-primary hover:bg-brand-secondary text-white shadow-brand-primary/30 hover:-translate-y-1 hover:shadow-xl",
    cta: "bg-brand-lime text-brand-primary font-bold shadow-[0_8px_25px_rgba(171,216,177,0.3)] hover:shadow-[0_12px_35px_rgba(171,216,177,0.6)] hover:-translate-y-1",
    outline: "bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white hover:-translate-y-1 shadow-none",
    ghost: "bg-brand-primary/5 hover:bg-brand-primary/10 text-brand-primary shadow-none",
    white: "bg-white text-brand-primary hover:bg-brand-paper border border-white hover:border-brand-paper shadow-xl hover:-translate-y-1"
  };

  const cssClass = clsx(baseClasses, variants[variant], className);

  const innerContent = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {icon && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
      </span>
      {variant === 'cta' && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-lime to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${cssClass} group`}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${cssClass} group`}>
      {innerContent}
    </button>
  );
}
