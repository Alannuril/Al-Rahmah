"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const BACKGROUND_IMAGES = [
  { 
    src: "/images/gedung1.jpeg", 
    position: "center 40%" 
  },
  { 
    src: "/images/gedung2.jpg", 
    position: "center 30%" 
  },
  { 
    src: "/images/bgHero-enhanced.jpg", 
    position: "center 40%" 
  },
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + BACKGROUND_IMAGES.length) % BACKGROUND_IMAGES.length);
  };

  const setSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [currentImageIndex, isPaused]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Clean Cinematic Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {BACKGROUND_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 w-full h-full bg-cover transition-all duration-1000 ease-out ${
              index === currentImageIndex 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ 
              backgroundImage: `url('${image.src}')`,
              backgroundPosition: image.position 
            }}
          />
        ))}

        {/* Clean Vignette Gradient - Brighter & Natural while preserving text clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/55 z-10 pointer-events-none" />
      </div>

      {/* Side Slide Navigation (Visible on hover, unobtrusive) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/20 hover:bg-black/50 text-white/70 hover:text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden sm:block"
        aria-label="Slide sebelumnya"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/20 hover:bg-black/50 text-white/70 hover:text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden sm:block"
        aria-label="Slide selanjutnya"
      >
        <ChevronRight size={24} />
      </button>

      {/* Main Content Container */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-16 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center w-full">
          
          {/* Left Column: Heading, Description, & CTAs */}
          <div className="flex flex-col items-start text-left order-2 lg:order-1">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight mb-6 drop-shadow-md">
              Membentuk Generasi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
                Qurani, Berakhlak,
              </span>{" "}
              dan Berprestasi
            </h1>

            <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed font-normal mb-8 sm:mb-10 drop-shadow-sm">
              Pondok Pesantren Al-Rahmah Walantaka mengintegrasikan pendidikan agama, pendidikan formal berkualitas tinggi, dan pembinaan karakter di lingkungan asrama yang modern.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
              <Link
                href="/psb"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full bg-brand-lime hover:bg-brand-accent text-brand-primary shadow-lg shadow-black/20 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/profil"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Lihat Profil</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Two Students Reading (Oval Design) */}
          <div className="flex justify-center lg:justify-end items-center relative order-1 lg:order-2">
            {/* Ambient Soft Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/20 via-brand-lime/10 to-transparent rounded-full blur-3xl pointer-events-none scale-90" />

            {/* Oval Image Container */}
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] aspect-[1602/1362] transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/model-gradien.png"
                alt="Santriwati Pondok Pesantren Al-Rahmah sedang membaca buku"
                fill
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 460px"
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
                priority
              />
            </div>
          </div>

        </div>
      </div>

      {/* Minimalist Slide Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {BACKGROUND_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentImageIndex
                ? "w-8 bg-brand-lime"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Pindah ke slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

