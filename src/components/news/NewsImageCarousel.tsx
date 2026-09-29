"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

export function NewsImageCarousel({
  images,
  alt,
  className = "",
}: NewsImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
        setActiveIndex(newIndex);
      }
    }
  }, [activeIndex, images.length]);

  if (!images || images.length === 0) {
    return null;
  }

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: index * clientWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const handlePrev = () => {
    const nextIndex = Math.max(0, activeIndex - 1);
    scrollToSlide(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = Math.min(images.length - 1, activeIndex + 1);
    scrollToSlide(nextIndex);
  };

  // If only 1 image: large photo without border or rounded
  if (images.length === 1) {
    return (
      <div
        className={`relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[520px] overflow-hidden bg-zinc-900 ${className}`}
      >
        <img
          src={images[0]}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Multiple images: slideable carousel with dot indicators (No border, No rounded)
  return (
    <div className={`relative w-full ${className}`}>
      {/* Photo Viewport — No border, No rounded */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[520px] overflow-hidden bg-zinc-950">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((imgUrl, idx) => (
            <div
              key={idx}
              className="w-full h-full shrink-0 snap-center relative overflow-hidden bg-zinc-900"
            >
              <img
                src={imgUrl}
                alt={`${alt} - Foto ${idx + 1}`}
                className="w-full h-full object-cover select-none"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {activeIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Foto sebelumnya"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {activeIndex < images.length - 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Foto selanjutnya"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Counter Badge on bottom right corner */}
        <div className="absolute bottom-3 right-3 z-10 rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Dots Pagination Indicator below the photo */}
      <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToSlide(idx)}
            aria-label={`Lihat foto ${idx + 1}`}
            className={`transition-all duration-300 cursor-pointer ${
              idx === activeIndex
                ? "w-6 h-1.5 rounded-full bg-brand-primary"
                : "w-1.5 h-1.5 rounded-full bg-zinc-300 hover:bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
