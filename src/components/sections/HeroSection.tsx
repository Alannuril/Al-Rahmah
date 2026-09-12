"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

        {/* Clean Vignette Gradient - Natural & Airy while preserving text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/75 lg:to-black/50 z-10 pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[1300px] relative z-20 mx-auto px-4 sm:px-6 lg:px-7 pt-24 pb-20 sm:pb-16 min-h-[100dvh] lg:min-h-screen flex flex-col justify-between lg:justify-center">
        <div className="flex-1 flex flex-col justify-between lg:justify-center lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center w-full">
          
          {/* Left Column (Desktop) / Bottom (Mobile): Text & CTA Button */}
          <div className="flex flex-col items-start text-left order-2 lg:order-1 max-w-xl mt-auto lg:mt-0 pt-6 lg:pt-0">
            
            {/* Heading & Description */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-3 sm:mb-4 drop-shadow-md">
              Membentuk Generasi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
                Qurani &amp; Berprestasi
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/85 max-w-lg leading-relaxed font-normal mb-6 sm:mb-8 drop-shadow-sm">
              Pendidikan Islam terpadu dan pembinaan karakter santri berasrama modern.
            </p>

            {/* CTA Button */}
            <Link
              href="/psb"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-[15px] font-semibold rounded-full bg-brand-lime hover:bg-brand-accent text-brand-primary shadow-md shadow-black/15 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <span>Daftar Sekarang</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>

          </div>

          {/* Right Column (Desktop) / Center (Mobile): Two Students Reading - Oval Design */}
          <div className="flex-1 flex justify-center lg:justify-end items-center relative order-1 lg:order-2 my-auto lg:my-0 py-4 lg:py-0">
            {/* Ambient Soft Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/20 via-brand-lime/10 to-transparent rounded-full blur-3xl pointer-events-none scale-90" />

            {/* Oval Image Container - Proportional & Clean */}
            <div className="relative w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px] aspect-[1602/1362] transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/model-gradien.png"
                alt="Santriwati Pondok Pesantren Al-Rahmah sedang membaca buku"
                fill
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 420px"
                className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
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
