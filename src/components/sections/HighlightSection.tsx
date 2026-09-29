"use client";

import { useEffect, useRef } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport) return;

    const controller = new AbortController();
    const { signal } = controller;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousTime = performance.now();
    let resumeAt = 0;
    let hovered = false;
    let position = viewport.scrollLeft;
    let lastWritten = position;
    let loopWidth = 0;
    let maxScroll = 0;
    let suppressClickUntil = 0;
    let pointer: {
      id: number;
      type: string;
      startX: number;
      startLeft: number;
      dragged: boolean;
    } | null = null;

    const pause = () => {
      resumeAt = performance.now() + 3000;
      position = viewport.scrollLeft;
      lastWritten = position;
    };
    const measure = () => {
      const first = viewport.children[0] as HTMLElement | undefined;
      const repeated = viewport.children[HIGHLIGHT_ITEMS.length] as HTMLElement | undefined;
      loopWidth = first && repeated ? repeated.offsetLeft - first.offsetLeft : 0;
      maxScroll = viewport.scrollWidth - viewport.clientWidth;
      position = viewport.scrollLeft;
      lastWritten = position;
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    if (viewport.firstElementChild) resizeObserver.observe(viewport.firstElementChild);
    measure();

    const animate = (time: number) => {
      const elapsed = Math.min(time - previousTime, 64);
      previousTime = time;
      // Native touch, trackpad, scrollbar, and keyboard scrolling take priority.
      if (viewport.scrollLeft !== lastWritten) pause();
      const paused = hovered || pointer !== null || viewport.contains(document.activeElement)
        || document.hidden || reducedMotion.matches || time < resumeAt;
      if (paused) {
        position = viewport.scrollLeft;
        lastWritten = position;
      } else if (maxScroll > 0 && loopWidth > 0) {
        position += (loopWidth / 38000) * elapsed;
        if (maxScroll >= loopWidth && position >= loopWidth) position %= loopWidth;
        else if (position >= maxScroll) position = 0;
        viewport.scrollLeft = position;
        lastWritten = viewport.scrollLeft;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    viewport.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") hovered = true;
    }, { signal });
    viewport.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") {
        hovered = false;
        pause();
      }
    }, { signal });
    viewport.addEventListener("pointerdown", (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      pause();
      suppressClickUntil = 0;
      pointer = {
        id: event.pointerId,
        type: event.pointerType,
        startX: event.clientX,
        startLeft: viewport.scrollLeft,
        dragged: false,
      };
    }, { signal });
    viewport.addEventListener("pointermove", (event) => {
      if (!pointer || pointer.id !== event.pointerId || pointer.type !== "mouse") return;
      const distance = event.clientX - pointer.startX;
      if (!pointer.dragged && Math.abs(distance) < 5) return;
      if (!pointer.dragged) {
        pointer.dragged = true;
        viewport.setPointerCapture(event.pointerId);
        viewport.dataset.dragging = "true";
      }
      event.preventDefault();
      viewport.scrollLeft = pointer.startLeft - distance;
      pause();
    }, { signal });
    const endPointer = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      if (pointer.dragged) suppressClickUntil = performance.now() + 400;
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
      pointer = null;
      delete viewport.dataset.dragging;
      pause();
    };
    window.addEventListener("pointerup", endPointer, { signal });
    window.addEventListener("pointercancel", endPointer, { signal });
    viewport.addEventListener("click", (event) => {
      if (event.detail > 0 && performance.now() < suppressClickUntil) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, { capture: true, signal });
    viewport.addEventListener("dragstart", (event) => event.preventDefault(), { signal });
    viewport.addEventListener("wheel", pause, { passive: true, signal });
    viewport.addEventListener("keydown", (event) => {
      pause();
      if (event.target !== viewport) return;
      const step = Math.min(viewport.clientWidth * 0.8, 350);
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        viewport.scrollLeft += event.key === "ArrowRight" ? step : -step;
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        viewport.scrollLeft = event.key === "Home" ? 0 : maxScroll;
      }
      pause();
    }, { signal });

    return () => {
      controller.abort();
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      delete viewport.dataset.dragging;
    };
  }, []);

  // Ensure there are at least 8 items in the track for seamless infinite looping
  const repeatCount = Math.max(2, Math.ceil(8 / HIGHLIGHT_ITEMS.length));
  const loopedItems = Array.from({ length: repeatCount }, () => HIGHLIGHT_ITEMS).flat();

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

          </div>
        </ScrollReveal>

      </div>

      {/* ============================================================ */}
      {/* 2. HORIZONTAL SCROLLING TRACK       */}
      {/* ============================================================ */}
      <div className="relative isolate w-full overflow-hidden py-2">
        {/* Soft edge gradient masks (kiri & kanan) */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Native scrolling supports touch, trackpads, mouse dragging, and keyboard. */}
        <div
          ref={scrollRef}
          role="region"
          aria-label="Fasilitas dan keunggulan, geser untuk melihat kartu lainnya"
          tabIndex={0}
          className="relative z-0 flex cursor-grab select-none gap-4 overflow-x-auto overscroll-x-contain px-4 pb-3 [scrollbar-width:thin] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-primary data-[dragging=true]:cursor-grabbing sm:gap-5"
        >
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
                    sizes="(max-width: 639px) 280px, (max-width: 767px) 310px, 330px"
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
