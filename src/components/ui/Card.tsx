import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'dark-glass' | 'outline' | 'primary';
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export function Card({ 
  children, 
  variant = 'default', 
  className,
  padding = 'md',
  interactive = false
}: CardProps) {
  
  const baseClasses = "rounded-2xl transition-all duration-300 overflow-hidden";
  
  const variants = {
    'default': "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-brand-paper/60",
    'glass': "glass-card",
    'dark-glass': "dark-glass-card text-white",
    'outline': "bg-transparent border-2 border-brand-accent/30",
    'primary': "bg-brand-primary text-white shadow-[0_4px_12px_rgba(57,110,95,0.2)]"
  };

  const paddings = {
    'none': "",
    'sm': "p-4",
    'md': "p-5 md:p-6",
    'lg': "p-6 md:p-8"
  };

  const interactiveClasses = interactive 
    ? "cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-brand-accent/30" 
    : "";

  return (
    <div className={clsx(baseClasses, variants[variant], paddings[padding], interactiveClasses, className)}>
      {children}
    </div>
  );
}
