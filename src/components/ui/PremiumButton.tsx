import Link from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';

interface PremiumButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'white';
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
  
  const baseClasses = "inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-full transition-all duration-300 shadow-lg text-sm tracking-wide";
  
  const variants = {
    primary: "bg-brand-accent hover:bg-brand-gold-glow text-brand-primary shadow-brand-accent/30 hover:-translate-y-1 hover:shadow-xl",
    outline: "bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white hover:-translate-y-1 shadow-none",
    ghost: "bg-brand-primary/5 hover:bg-brand-primary/10 text-brand-primary shadow-none",
    white: "bg-white text-brand-primary hover:bg-gray-50 border border-white hover:border-gray-100 shadow-xl hover:-translate-y-1"
  };

  const cssClass = clsx(baseClasses, variants[variant], className);

  const innerContent = (
    <>
      {children}
      {icon && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
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
