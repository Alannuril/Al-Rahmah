"use client";

import { useState, useRef, useEffect } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (isInteracting) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 300; // 16 from gap-4

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        // Kembali ke slide awal jika sudah di ujung
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Pindah ke slide berikutnya
        scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3000); // Ganti tiap 3 detik

    return () => clearInterval(interval);
  }, [isInteracting]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.offsetWidth;
    // adding a small offset to ensure dot updates before full snap
    const newIndex = Math.round(scrollPosition / cardWidth);
    setActiveIndex(newIndex);
  };

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

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col md:flex-row items-start gap-4 h-full bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-brand-paper/60 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-brand-accent/30 cursor-pointer"
            >
              <div className="w-full md:w-44 h-44 md:h-full shrink-0 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col grow">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-lime/15 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300 mb-3">
                  <item.icon size={20} strokeWidth={2} />
                </div>

                <h3 className="font-semibold text-lg text-gray-900 tracking-tight mb-2 group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm grow mb-4">
                  {item.description}
                </p>

                <Link href={item.link} className="mt-auto inline-flex items-center gap-1 text-brand-primary font-semibold text-xs tracking-wide group/link w-fit">
                  <span className="group-hover/link:underline underline-offset-4">Pelajari Lebih Lanjut</span>
                  <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- MOBILE VIEW (CAROUSEL) --- */}
        <div className="md:hidden relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setIsInteracting(false)}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="w-[85vw] max-w-[320px] shrink-0 snap-center flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-brand-paper/60"
              >
                <div className="w-full h-40 shrink-0 bg-gray-100 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900/30 to-transparent pointer-events-none"></div>
                </div>
                
                <div className="p-5 flex flex-col grow relative">
                  <div className="absolute -top-7 right-5 w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-brand-primary border border-brand-paper/50">
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  
                  <h3 className="font-semibold text-lg text-gray-900 tracking-tight mb-2 pr-12">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <Link href={item.link} className="mt-auto inline-flex items-center gap-1 text-brand-primary font-semibold text-xs tracking-wide">
                    <span>Pelajari Lebih Lanjut</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-2">
            {highlights.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? "w-6 bg-brand-primary" 
                    : "w-1.5 bg-brand-primary/20"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
