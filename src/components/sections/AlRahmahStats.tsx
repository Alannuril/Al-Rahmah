import { Calendar, GraduationCap, BookOpen, Map } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const statsData = [
  {
    id: 1,
    value: "2005",
    label: "Tahun Berdiri",
    icon: Calendar,
  },
  {
    id: 2,
    value: "A",
    label: "Akreditasi MA",
    sublabel: "Madrasah Aliyah",
    icon: GraduationCap,
  },
  {
    id: 3,
    value: "B",
    label: "Akreditasi MTs",
    sublabel: "Madrasah Tsanawiyah",
    icon: BookOpen,
  },
  {
    id: 4,
    value: "2",
    label: "Kombinasi Kurikulum",
    sublabel: "Gontor & Kemenag",
    icon: Map,
  },
];

export function AlRahmahStats() {
  return (
    <section className="py-8 sm:py-10 md:py-14 bg-white relative z-10">
      {/* Modern Soft Boundary Lines (Atas & Bawah) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-4">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <StaggerItem
                key={stat.id}
                variant="zoom-in"
                className="relative flex flex-col items-center text-center py-4 px-3 sm:px-6 transition-all duration-300 group"
              >
                {/* Modern Soft Icon Container */}
                <div className="w-10 h-10 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                {/* Value / Angka */}
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-brand-primary tracking-tight">
                  {stat.value}
                </span>

                {/* Label */}
                <span className="text-xs sm:text-sm font-semibold text-zinc-800 mt-1 leading-tight">
                  {stat.label}
                </span>

                {/* Sublabel */}
                {stat.sublabel && (
                  <span className="text-[11px] text-zinc-400 mt-0.5 leading-tight hidden sm:block">
                    {stat.sublabel}
                  </span>
                )}

                {/* Modern Clean Vertical Separator (Desktop) */}
                {index < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-gradient-to-b from-transparent via-zinc-200 to-transparent pointer-events-none" />
                )}

                {/* Modern Clean Separator (Mobile 2x2 Grid) */}
                {index % 2 === 0 && (
                  <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gradient-to-b from-transparent via-zinc-200 to-transparent pointer-events-none" />
                )}
                {index < 2 && (
                  <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent pointer-events-none" />
                )}
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
