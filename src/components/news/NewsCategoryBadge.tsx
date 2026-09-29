import clsx from "clsx";
import { getNewsCategory } from "@/lib/constants/newsCategories";

interface NewsCategoryBadgeProps {
  category?: string | null;
  className?: string;
}

export function NewsCategoryBadge({ category, className }: NewsCategoryBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex max-w-full items-center rounded bg-white/85 px-1.5 py-0.5 text-[9px] font-medium leading-tight text-zinc-700 shadow-2xs backdrop-blur-sm sm:rounded-md sm:px-2 sm:py-0.5 sm:text-[10px] sm:leading-4",
        className,
      )}
    >
      <span className="truncate">{getNewsCategory(category)}</span>
    </span>
  );
}
