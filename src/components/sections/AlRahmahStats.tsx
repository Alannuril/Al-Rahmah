import { Calendar, Award, GraduationCap, BookOpen, Map } from "lucide-react";

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
    label: "Akreditasi Madrasah Aliyah",
    icon: GraduationCap,
  },
  {
    id: 3,
    value: "B",
    label: "Akreditasi Madrasah Tsanawiyah",
    icon: BookOpen,
  },
  {
    id: 4,
    value: "2",
    label: "Kombinasi Kurikulum (Gontor & Kemenag)",
    icon: Map,
  },
];

export function AlRahmahStats() {
  return (
    <section className="bg-white/80 py-12 md:py-20 w-full relative z-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 custom-grid-lines">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className="w-full flex flex-col items-center justify-start text-center py-8 md:py-4 lg:py-8 px-4 transition-transform duration-300 hover:-translate-y-1 relative group"
              >
                <div className="mb-4 text-brand-primary/80">
                  <Icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-brand-primary mb-3 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-gray-600 font-medium text-sm lg:text-base max-w-36 md:max-w-50 mx-auto leading-relaxed">
                  {stat.label}
                </p>
                
                {/* Linestrip Horizontal (Mobile: baris atas, Desktop: none) */}
                {index < 2 && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-primary/20 md:hidden" />
                )}
                
                {/* Linestrip Vertikal */}
                {/* Di Mobile: pemisah kolom 1 & 2 (index ganjil) */}
                {/* Di Desktop: pemisah antar semua kolom kecuali yang terakhir */}
                <div className="absolute right-0 top-0 bottom-0 w-px bg-brand-primary/20 hidden md:block" style={{ display: index === 3 ? 'none' : '' }} />
                {(index % 2 === 0) && (
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-brand-primary/20 md:hidden" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
