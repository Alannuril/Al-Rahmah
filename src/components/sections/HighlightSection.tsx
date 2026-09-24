"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Home,
  Trophy,
  GraduationCap,
  Building2,
  Languages,
  ChevronRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Award,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type CategoryFilter = "all" | "keunggulan" | "fasilitas";

interface HighlightItem {
  id: string;
  title: string;
  category: "keunggulan" | "fasilitas";
  categoryLabel: string;
  description: string;
  icon: React.FC<{ size?: number; className?: string }>;
  image: string;
  link: string;
}

const HIGHLIGHT_ITEMS: HighlightItem[] = [
  {
    id: "kurikulum",
    title: "Kurikulum Terpadu Kemenag & Pesantren",
    category: "keunggulan",
    categoryLabel: "Keunggulan",
    description:
      "Integrasi kurikulum nasional Kementerian Agama (MTs & MA) dengan kepesantrenan modern, mencetak santri unggul sains dan kokoh adab.",
    icon: BookOpen,
    image: "/images/pendidikan-ma.jpg",
    link: "/pendidikan",
  },
  {
    id: "tahfidz",
    title: "Program Tahfidz Qur'an Bersanad",
    category: "keunggulan",
    categoryLabel: "Keunggulan",
    description:
      "Bimbingan intensif menghafal Al-Qur'an 30 juz metode talaqqi dengan asatidz bersanad dan karantina tahfidz mutqin.",
    icon: GraduationCap,
    image: "/images/panca-jiwa-bg.jpg",
    link: "/pendidikan",
  },
  {
    id: "asrama",
    title: "Asrama Representatif Putra & Putri",
    category: "fasilitas",
    categoryLabel: "Fasilitas",
    description:
      "Hunian santri yang bersih, tertib, dan asri dengan sistem pengasuhan 24 jam mendidik kedisiplinan dan kemandirian.",
    icon: Home,
    image: "/images/gedung1.jpeg",
    link: "/profil",
  },
  {
    id: "masjid",
    title: "Masjid Jami' & Pusat Ibadah Pesantren",
    category: "fasilitas",
    categoryLabel: "Fasilitas",
    description:
      "Pusat aktivitas ibadah berjamaah, halaqah Al-Qur'an, muhadharah pidato, dan kajian kitab kuning salaf.",
    icon: Building2,
    image: "/images/gedung2.jpg",
    link: "/profil",
  },
  {
    id: "bilingual",
    title: "Lingkungan Bilingual Arab & Inggris",
    category: "keunggulan",
    categoryLabel: "Keunggulan",
    description:
      "Pembiasaan percakapan harian (muhadatsah) dalam bahasa Arab dan Inggris untuk menyiapkan santri berwawasan global.",
    icon: Languages,
    image: "/images/pendidikan-mts.jpg",
    link: "/pendidikan",
  },
  {
    id: "sarana",
    title: "Sarana Olahraga & Pengembangan Minat",
    category: "fasilitas",
    categoryLabel: "Fasilitas",
    description:
      "Fasilitas olahraga serbaguna, bela diri pencak silat, kepramukaan, dan beragam ekstrakurikuler minat santri.",
    icon: Trophy,
    image: "/images/sejarah-titik-awal.jpg",
    link: "/media/kegiatan",
  },
];

const MINIMAL_PILLARS = [
  { icon: Clock, label: "Pengasuhan 24 Jam" },
  { icon: ShieldCheck, label: "Lingkungan Asri & Aman" },
  { icon: Award, label: "Sanad Tahfidz Qur'an" },
  { icon: Sparkles, label: "Jenjang Formal Terakreditasi" },
];

export function HighlightSection() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filteredItems = HIGHLIGHT_ITEMS.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  // Ensure there are at least 8 items in the track for seamless infinite looping
  const repeatCount = Math.max(2, Math.ceil(8 / filteredItems.length));
  const loopedItems = Array.from({ length: repeatCount }, () => filteredItems).flat();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Modern Hairline Divider (Atas & Bawah) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ============================================================ */}
        {/* 1. SECTION HEADER                                            */}
        {/* ============================================================ */}
        <ScrollReveal variant="fade-up" duration={0.5}>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <SectionHeading
              title="Fasilitas & Keunggulan Kami"
              centered
            />

            {/* Komponen Minimalis: 4 Pilar Ringkas & Bersih */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#2A5C4E] font-medium">
              {MINIMAL_PILLARS.map((pillar, idx) => {
                const PillarIcon = pillar.icon;
                return (
                  <div key={idx} className="inline-flex items-center gap-1.5">
                    <PillarIcon size={13} className="text-[#396E5F]" />
                    <span>{pillar.label}</span>
                    {idx < MINIMAL_PILLARS.length - 1 && (
                      <span className="hidden sm:inline-block text-[#ABD8B1] ml-3.5 select-none" aria-hidden="true">
                        •
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Filter Tabs (Clean Minimalist Segmented Tabs) */}
            <div className="mt-5 inline-flex items-center p-1 rounded-xl bg-zinc-50 border border-zinc-200/70 shadow-none">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-[#396E5F] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-[#1E3F35]"
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("keunggulan")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeFilter === "keunggulan"
                    ? "bg-[#396E5F] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-[#1E3F35]"
                }`}
              >
                Keunggulan
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("fasilitas")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeFilter === "fasilitas"
                    ? "bg-[#396E5F] text-white shadow-2xs"
                    : "text-zinc-600 hover:text-[#1E3F35]"
                }`}
              >
                Fasilitas
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* ============================================================ */}
      {/* 2. HORIZONTAL SCROLLING MARQUEE TRACK (PAUSE ON HOVER)       */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden py-2 pause-marquee-hover">
        {/* Soft edge gradient masks (kiri & kanan) */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Marquee Track: bergerak mulus ke samping & tanpa animasi zoom/hover */}
        <div className="animate-marquee gap-4 sm:gap-5 px-4">
          {loopedItems.map((item, index) => {
            const isKeunggulan = item.category === "keunggulan";

            return (
              <div
                key={`${item.id}-${index}`}
                className="w-[280px] sm:w-[310px] md:w-[330px] shrink-0 flex flex-col bg-white rounded-lg overflow-hidden border border-zinc-200/70"
              >
                {/* Image Container with 16:10 Aspect Ratio - Static, Tanpa Animasi Zoom */}
                <div className="relative w-full aspect-[16/10] bg-zinc-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 280px, 330px"
                    className="object-cover object-center"
                  />
                  {/* Subtle Gradient Shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold shadow-2xs ${
                        isKeunggulan
                          ? "bg-[#1E3F35] text-[#AED69F]"
                          : "bg-white/95 text-[#2A5C4E] border border-zinc-200/70"
                      }`}
                    >
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 flex flex-col flex-1 justify-between space-y-2.5">
                  <div className="space-y-1.5">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-zinc-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Link action - Static, Tanpa Animasi Geser */}
                  <div className="pt-2 border-t border-zinc-100">
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#396E5F] hover:text-[#1E3F35] transition-colors"
                    >
                      <span>Pelajari Lebih Lanjut</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
