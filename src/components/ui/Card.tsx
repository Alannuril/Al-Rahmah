import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'dark-glass' | 'outline';
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ 
  children, 
  variant = 'default', 
  className,
  padding = 'md'
}: CardProps) {
  
  const baseClasses = "rounded-2xl transition-all duration-300 overflow-hidden";
  
  const variants = {
    'default': "bg-white shadow-lg border border-brand-paper",
    'glass': "glass-card",
    'dark-glass': "dark-glass-card text-white",
    'outline': "bg-transparent border-2 border-brand-accent/30"
  };

  const paddings = {
    'none': "",
    'sm': "p-4",
    'md': "p-6",
    'lg': "p-8 md:p-10"
  };

  return (
    <div className={clsx(baseClasses, variants[variant], paddings[padding], className)}>
      {children}
    </div>
  );
}
