import { BookOpen, Home, Users, Trophy, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

const highlights = [
  {
    title: "MA Al-Rahmah",
    description: "Madrasah Aliyah dengan kurikulum terpadu nasional dan kepesantrenan.",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    link: "/pendidikan"
  },
  {
    title: "Asrama Premium",
    description: "Fasilitas asrama modern yang nyaman dengan pembinaan 24 jam.",
    icon: Home,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop",
    link: "/santri"
  },
  {
    title: "Ekstrakurikuler",
    description: "Pengembangan bakat santri dari public speaking hingga teknologi.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop",
    link: "/santri#kegiatan"
  },
  {
    title: "Prestasi Santri",
    description: "Deretan prestasi membanggakan dari tingkat regional hingga nasional.",
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    link: "/profil#prestasi"
  }
];

export function HighlightSection() {
  return (
    <section className="py-28 bg-brand-paper">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading 
          title="Fasilitas & Keunggulan Kami" 
          subtitle="Lingkungan pendidikan modern yang didesain secara komprehensif untuk mendukung potensi terbaik santri dalam menuntut ilmu."
          badge="Mengapa Al-Rahmah?"
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {highlights.map((item, index) => (
            <div key={index} className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-xl shadow-brand-primary/5 border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-2">
              <div className="relative h-56 w-full overflow-hidden">
                <div className="absolute inset-0 bg-brand-primary/40 group-hover:bg-brand-primary/20 transition-colors duration-500 z-10 mix-blend-multiply"></div>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute top-5 left-5 z-20 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30 shadow-lg">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow relative bg-white">
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-brand-secondary/50 to-transparent -translate-y-px"></div>
                <h3 className="font-heading font-bold text-2xl text-brand-primary mb-3 group-hover:text-brand-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="text-brand-primary/60 leading-relaxed text-sm flex-grow mb-8 font-medium">
                  {item.description}
                </p>
                <Link href={item.link} className="mt-auto inline-flex items-center gap-2 text-brand-primary font-bold text-sm tracking-wide group/link w-fit relative overflow-hidden pb-1">
                  <span className="relative z-10 group-hover/link:text-brand-secondary transition-colors">Pelajari Lebih Lanjut</span>
                  <ChevronRight size={16} className="relative z-10 group-hover/link:text-brand-secondary group-hover/link:translate-x-1 transition-all" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-secondary group-hover/link:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
