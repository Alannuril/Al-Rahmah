import React, { InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, iconPosition = 'left', fullWidth = true, ...props }, ref) => {
    
    const wrapperClass = clsx(
      "flex flex-col gap-1.5",
      fullWidth && "w-full",
      className
    );

    const inputWrapperClass = clsx(
      "relative flex items-center w-full transition-all duration-300",
      "bg-white rounded-xl border",
      error 
        ? "border-red-400 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100" 
        : "border-brand-paper focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-accent/20",
      props.disabled && "opacity-60 bg-gray-50 cursor-not-allowed"
    );

    const inputClass = clsx(
      "w-full bg-transparent px-4 py-3 outline-none text-brand-primary placeholder:text-gray-400",
      icon && iconPosition === 'left' && "pl-11",
      icon && iconPosition === 'right' && "pr-11",
      props.disabled && "cursor-not-allowed"
    );

    return (
      <div className={wrapperClass}>
        {label && (
          <label className="text-sm font-semibold text-brand-primary ml-1">
            {label}
          </label>
        )}
        <div className={inputWrapperClass}>
          {icon && iconPosition === 'left' && (
            <div className="absolute left-4 text-gray-400 flex items-center justify-center">
              {icon}
            </div>
          )}
          
          <input ref={ref} className={inputClass} {...props} />
          
          {icon && iconPosition === 'right' && (
            <div className="absolute right-4 text-gray-400 flex items-center justify-center">
              {icon}
            </div>
          )}
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

Input.displayName = 'Input';
