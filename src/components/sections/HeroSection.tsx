"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { AlRahmahStats } from "./AlRahmahStats";

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
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const introY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.8]);

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
  };

  const setSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [currentImageIndex, isPaused, shouldReduceMotion]);

  return (
    <section 
      ref={heroRef}
      className="relative isolate overflow-hidden bg-[#1e3f35]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Clean Cinematic Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -inset-y-16 inset-x-0"
          style={{
            y: shouldReduceMotion ? 0 : backgroundY,
            scale: shouldReduceMotion ? 1 : backgroundScale,
          }}
        >
          {BACKGROUND_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className={`absolute inset-0 w-full h-full bg-cover transition-opacity duration-1000 ease-out motion-reduce:transition-none ${
                index === currentImageIndex
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{
                backgroundImage: `url('${image.src}')`,
                backgroundPosition: image.position
              }}
            />
          ))}
        </motion.div>

        {/* Clean Vignette Gradient - Natural & Airy while preserving text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/85 z-10 pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 mx-auto flex min-h-dvh w-full max-w-[1300px] flex-col px-4 pb-4 pt-28 sm:px-6 sm:pb-6 md:pt-32 lg:px-7 lg:pt-28">
        <motion.div
          className="flex w-full flex-1 flex-col gap-3 md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center md:gap-8 lg:grid-cols-2 lg:gap-12"
          style={{
            y: shouldReduceMotion ? 0 : introY,
            opacity: shouldReduceMotion ? 1 : introOpacity,
          }}
        >
          
          {/* Keep the introduction and its actions together above the statistics. */}
          <div className="order-2 flex max-w-xl flex-col items-start text-left md:order-1">
            
            {/* Heading & Description */}
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 font-heading text-[28px] font-bold leading-tight text-white sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Membentuk Generasi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
                Cerdas &amp; Berkarakter
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 max-w-lg text-sm font-normal leading-relaxed text-white/90 max-[374px]:mb-4 sm:mb-6 sm:text-base lg:text-lg"
            >
              Berkarakter Rahmatan Lil &apos;Alamin, berpedoman pada Al-Qur&apos;an dan Hadits, serta merangkul anak yatim dan kaum dhuafa.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="w-fit"
            >
              <Link
                href="/psb"
                className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-lime px-5 py-2.5 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-7 sm:py-3 sm:text-[15px]"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

          </div>

          <div className="relative order-1 flex items-center justify-center md:order-2 md:justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1, 
                y: shouldReduceMotion ? 0 : [0, -8, 0]
              }}
              transition={{ 
                opacity: { duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
                y: { duration: shouldReduceMotion ? 0 : 5, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut", delay: 1.15 }
              }}
              className="relative aspect-[1602/1362] w-full max-w-40 max-[374px]:max-w-28 sm:max-w-44 md:max-w-[260px] lg:max-w-[340px] xl:max-w-[380px]"
            >
              <Image
                src="/images/model-gradien.png"
                alt="Santriwati Pondok Pesantren Al-Rahmah sedang membaca buku"
                fill
                sizes="(max-width: 374px) 112px, (max-width: 639px) 160px, (max-width: 767px) 176px, (max-width: 1023px) 260px, (max-width: 1279px) 340px, 380px"
                className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
                priority
              />
            </motion.div>
          </div>

        </motion.div>
        <div role="group" aria-label="Pilihan foto pesantren" className="mt-2 flex shrink-0 items-center justify-center">
          {BACKGROUND_IMAGES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSlide(index)}
              aria-label={`Pindah ke slide ${index + 1}`}
              aria-pressed={index === currentImageIndex}
              className="flex h-11 w-8 cursor-pointer items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-lime"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${index === currentImageIndex ? "w-6 bg-brand-lime" : "w-1.5 bg-white/60 hover:bg-white/85"}`}
              />
            </button>
          ))}
        </div>
        <AlRahmahStats />
      </div>
    </section>
  );
}
