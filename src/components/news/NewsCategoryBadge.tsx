import clsx from "clsx";
import { getNewsCategory } from "@/lib/constants/newsCategories";

interface NewsCategoryBadgeProps {
  category?: string | null;
  className?: string;
}

export function NewsCategoryBadge({ category, className }: NewsCategoryBadgeProps) {
  return (
    <span className={clsx(
      "inline-flex max-w-full items-center rounded-md bg-white/80 px-2 py-0.5 text-[10px] font-medium leading-4 text-zinc-700 backdrop-blur-sm",
      className,
    )}>
      <span className="truncate">{getNewsCategory(category)}</span>
    </span>
  );
}
