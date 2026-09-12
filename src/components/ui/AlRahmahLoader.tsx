import Image from "next/image";
import clsx from "clsx";

export type LoaderSize = "sm" | "md" | "lg" | "xl";
export type LoaderMode = "fullscreen" | "block" | "inline";

export interface AlRahmahLoaderProps {
  /**
   * Ukuran spinner:
   * - sm: 36px (cocok untuk tombol/input kecil)
   * - md: 54px (cocok untuk kartu/modal)
   * - lg: 76px (cocok untuk tabel/section)
   * - xl: 104px (cocok untuk transisi halaman penuh)
   */
  size?: LoaderSize;
  /**
   * Mode tampilan:
   * - fullscreen: Overlay layar penuh dengan backdrop blur
   * - block: Elemen blok di tengah container (default)
   * - inline: Sebaris dengan teks/tombol
   */
  mode?: LoaderMode;
  /**
   * Teks label di bawah spinner (misal: "Memuat data...", "Memproses...")
   */
  label?: string;
  /**
   * Sub-keterangan tambahan di bawah label
   */
  sublabel?: string;
  /**
   * Menampilkan logo Al-Rahmah di dalam ring (default: true)
   */
  showLogo?: boolean;
  /**
   * Custom className untuk container terluar
   */
  className?: string;
}

const sizeConfig: Record<
  LoaderSize,
  {
    ringClass: string;
    logoInset: string;
    textSize: string;
    subtextSize: string;
  }
> = {
  sm: {
    ringClass: "w-9 h-9",
    logoInset: "inset-[14%]",
    textSize: "text-[11px]",
    subtextSize: "text-[9px]",
  },
  md: {
    ringClass: "w-14 h-14",
    logoInset: "inset-[14%]",
    textSize: "text-xs",
    subtextSize: "text-[11px]",
  },
  lg: {
    ringClass: "w-20 h-20",
    logoInset: "inset-[14%]",
    textSize: "text-sm",
    subtextSize: "text-xs",
  },
  xl: {
    ringClass: "w-28 h-28",
    logoInset: "inset-[14%]",
    textSize: "text-base",
    subtextSize: "text-xs",
  },
};

export function AlRahmahLoader({
  size = "md",
  mode = "block",
  label,
  sublabel,
  showLogo = true,
  className,
}: AlRahmahLoaderProps) {
  const config = sizeConfig[size];

  const spinnerGraphic = (
    <div className={clsx("relative shrink-0", config.ringClass)}>
      {/* Outer Ambient Glow Ring (Subtle) */}
      <div className="absolute inset-0 rounded-full bg-brand-primary/10 blur-md animate-pulse pointer-events-none" />

      {/* Dynamic Spinning SVG Ring */}
      <svg
        className="animate-spin absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="alrahmah-spinner-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#047857" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#6ee7b7" />
          </linearGradient>
        </defs>

        {/* Static Background Track (Clean & Thin) */}
        <circle
          cx="50"
          cy="50"
          r="43"
          stroke="currentColor"
          strokeWidth="4"
          className="text-emerald-950/10 dark:text-white/10"
        />

        {/* Animated Moving Arc */}
        <circle
          cx="50"
          cy="50"
          r="43"
          stroke="url(#alrahmah-spinner-grad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray="175 270"
        />
      </svg>

      {/* Center Logo with Breathing Pulse */}
      {showLogo && (
        <div
          className={clsx(
            "absolute rounded-full overflow-hidden bg-white shadow-2xs ring-1 ring-zinc-200/70 p-1 flex items-center justify-center transition-transform",
            config.logoInset
          )}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/images/logoAl-rahmah.jpeg"
              alt="Logo Al-Rahmah"
              fill
              sizes="80px"
              className="object-contain scale-95"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );

  const textContent = (label || sublabel) && (
    <div className="flex flex-col items-center text-center gap-0.5 mt-3 select-none">
      {label && (
        <p
          className={clsx(
            "font-heading font-medium text-zinc-700 dark:text-zinc-200 tracking-tight flex items-center gap-1",
            config.textSize
          )}
        >
          <span>{label}</span>
          <span className="inline-flex tracking-widest animate-pulse font-mono">
            ...
          </span>
        </p>
      )}
      {sublabel && (
        <p className={clsx("text-zinc-400 font-normal", config.subtextSize)}>
          {sublabel}
        </p>
      )}
    </div>
  );

  if (mode === "fullscreen") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={clsx(
          "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/85 backdrop-blur-md transition-all duration-300",
          className
        )}
      >
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/40 shadow-xs border border-zinc-100/60">
          {spinnerGraphic}
          {textContent}
        </div>
      </div>
    );
  }

  if (mode === "inline") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={clsx("inline-flex items-center gap-2.5", className)}
      >
        {spinnerGraphic}
        {label && (
          <span
            className={clsx(
              "font-medium text-zinc-700 dark:text-zinc-200",
              config.textSize
            )}
          >
            {label}
          </span>
        )}
      </div>
    );
  }

  // Default: block mode
  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "w-full py-8 sm:py-12 flex flex-col items-center justify-center",
        className
      )}
    >
      {spinnerGraphic}
      {textContent}
    </div>
  );
}

