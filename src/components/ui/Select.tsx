import React, { SelectHTMLAttributes } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, fullWidth = true, children, ...props }, ref) => {
    
    const wrapperClass = clsx(
      "flex flex-col gap-1.5",
      fullWidth && "w-full",
      className
    );

    const selectWrapperClass = clsx(
      "relative flex items-center w-full transition-all duration-300",
      "bg-white rounded-xl border",
      error 
        ? "border-red-400 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100" 
        : "border-brand-paper focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-accent/20",
      props.disabled && "opacity-60 bg-gray-50 cursor-not-allowed"
    );

    const selectClass = clsx(
      "w-full bg-transparent px-4 py-3 outline-none text-brand-primary appearance-none",
      props.disabled && "cursor-not-allowed"
    );

    return (
      <div className={wrapperClass}>
        {label && (
          <label className="text-sm font-semibold text-brand-primary ml-1">
            {label}
          </label>
        )}
        <div className={selectWrapperClass}>
          <select ref={ref} className={selectClass} {...props}>
            {children}
          </select>
          <div className="absolute right-4 pointer-events-none text-brand-primary">
            <ChevronDown size={18} />
          </div>
        </div>
        
        {error && (
          <span className="text-xs text-red-500 font-medium ml-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
