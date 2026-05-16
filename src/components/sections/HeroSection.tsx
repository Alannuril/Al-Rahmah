"use client";

import { useState, useEffect } from "react";
import { PremiumButton } from "@/components/ui/PremiumButton";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BACKGROUND_IMAGES = [
  { src: "/images/bgHero.jpeg", position: "center 45%" },
  { src: "/images/gedung1.jpeg", position: "center 45%" },
  { src: "/images/gedung2.jpg", position: "center 0%" },
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(timer);
  }, [currentImageIndex]);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden group">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-primary/60 lg:bg-brand-primary/50 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/90 via-brand-primary/40 to-transparent z-20 pointer-events-none"></div>
        {/* Background Images with smooth transition */}
        {BACKGROUND_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 w-full h-full bg-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ 
              backgroundImage: `url('${image.src}')`,
              backgroundPosition: image.position 
            }}
          ></div>
        ))}
      </div>

      {/* Manual Slide Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} className="sm:w-8 sm:h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight size={28} className="sm:w-8 sm:h-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 lg:bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-2 sm:gap-3">
        {BACKGROUND_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentImageIndex
                ? "bg-brand-lime w-6 sm:w-8"
                : "bg-white/50 hover:bg-white/80 w-1.5 sm:w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="container relative z-30 mx-auto px-4 md:px-6 lg:px-8 pt-16 pb-20 lg:pt-0 lg:pb-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column - Content */}
        <div className="flex flex-col items-start text-left order-2 lg:order-1">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 md:mb-10 max-w-5xl text-shadow-lg">
            Membentuk Generasi <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-brand-soft-glow">Qurani, Berakhlak,</span> dan Berprestasi
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-2xl mb-8 md:mb-12 leading-relaxed font-light drop-shadow-md">
            Pondok Pesantren Al-Rahmah Walantaka mengintegrasikan pendidikan agama, pendidikan formal berkualitas tinggi, dan pembinaan karakter di lingkungan asrama yang modern.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-start w-full sm:w-auto">
            <PremiumButton href="/psb" variant="primary" icon className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg">
              Daftar Sekarang
            </PremiumButton>
            <PremiumButton href="/profil" variant="white" className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md">
              Lihat Profil
            </PremiumButton>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="flex justify-center lg:justify-end items-center relative h-full mt-0 lg:mt-16 order-1 lg:order-2">
          {/* Glow backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/20 via-transparent to-brand-lime/10 rounded-3xl blur-2xl pointer-events-none z-0" />

          <div className="relative w-full max-w-[280px] sm:max-w-sm xl:max-w-md h-[35vh] sm:h-[40vh] lg:h-[85vh]">
            <Image
              src="/images/model-gradien.png"
              alt="Siswi berprestasi Pondok Pesantren Al-Rahmah"
              fill
              sizes="(max-width: 1280px) 384px, 448px"
              className="object-contain object-center drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-30 pointer-events-none hidden lg:flex">
        <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1">
          <div className="w-1.5 h-3 bg-brand-secondary rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
