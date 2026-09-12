import clsx from "clsx";
import { AlRahmahLoader } from "./AlRahmahLoader";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "white";
  withLogo?: boolean;
  label?: string;
  className?: string;
}

export function Spinner({
  size = "md",
  variant = "primary",
  withLogo = false,
  label,
  className,
}: SpinnerProps) {
  if (withLogo) {
    return (
      <AlRahmahLoader
        size={size}
        mode="inline"
        label={label}
        className={className}
      />
    );
  }

  const baseClasses =
    "inline-block animate-spin rounded-full border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]";

  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  const variants = {
    primary: "text-brand-primary",
    white: "text-white",
  };

  return (
    <div
      className={clsx(baseClasses, sizes[size], variants[variant], className)}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}

export { AlRahmahLoader };
