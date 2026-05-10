import clsx from 'clsx';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

interface ToastProps {
  variant?: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}

export function Toast({ variant = 'info', title, description, onClose, className }: ToastProps) {
  const baseClasses = "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-6 pr-8 shadow-lg transition-all";
  
  const variants = {
    success: "bg-white border-brand-secondary/30 text-brand-primary",
    error: "bg-white border-red-200 text-red-900",
    info: "bg-white border-brand-paper text-brand-primary",
    warning: "bg-white border-yellow-200 text-yellow-900"
  };

  const icons = {
    success: <CheckCircle2 className="text-brand-secondary h-6 w-6" />,
    error: <AlertCircle className="text-red-500 h-6 w-6" />,
    info: <Info className="text-brand-primary h-6 w-6" />,
    warning: <AlertTriangle className="text-yellow-500 h-6 w-6" />
  };

  return (
    <div className={clsx(baseClasses, variants[variant], className)}>
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-0.5">
          {icons[variant]}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">{title}</h3>
          {description && (
            <p className="text-sm opacity-80">{description}</p>
          )}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 text-gray-400 hover:text-gray-900 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
