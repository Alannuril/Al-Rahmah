import clsx from 'clsx';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-primary text-white border-transparent",
    secondary: "bg-brand-paper text-brand-primary border-transparent",
    success: "bg-brand-accent text-brand-primary border-transparent",
    warning: "bg-yellow-100 text-yellow-800 border-transparent",
    error: "bg-red-100 text-red-800 border-transparent",
    outline: "text-brand-primary border border-brand-primary/30"
  };

  return (
    <div className={clsx(baseClasses, variants[variant], className)}>
      {children}
    </div>
  );
}
