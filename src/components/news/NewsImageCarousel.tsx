"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

interface NewsImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

export function NewsImageCarousel({ images, alt, className = "" }: NewsImageCarouselProps) {
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

  // If no images
  if (!images || images.length === 0) {
    return null;
  }

  // If only 1 image, display clean static container
  if (images.length === 1) {
    return (
      <div
        className={`mb-8 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 aspect-video relative bg-zinc-100 ${className}`}
      >
        <img
          src={images[0]}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    );
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

  return (
    <div className={`relative mb-8 group ${className}`}>
      {/* Scrollable Images Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full aspect-video flex overflow-x-auto snap-x snap-mandatory rounded-2xl shadow-sm border border-zinc-100 bg-zinc-950 scrollbar-none scroll-smooth"
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

      {/* Floating Counter Badge */}
      <div className="absolute top-3.5 right-3.5 z-10 px-2.5 py-1 rounded-full bg-zinc-900/70 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 shadow-sm select-none">
        <Images size={13} className="text-white/80" />
        <span>
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Navigation Arrows (Desktop / Hover) */}
      {activeIndex > 0 && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Foto sebelumnya"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-zinc-900/60 hover:bg-zinc-900 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {activeIndex < images.length - 1 && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Foto selanjutnya"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-zinc-900/60 hover:bg-zinc-900 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Dots Pagination Indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToSlide(idx)}
            aria-label={`Lihat foto ${idx + 1}`}
            className={`transition-all duration-200 cursor-pointer rounded-full ${
              idx === activeIndex
                ? "w-6 h-2 bg-brand-primary"
                : "w-2 h-2 bg-zinc-300 hover:bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

