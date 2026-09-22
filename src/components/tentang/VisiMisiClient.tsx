"use client";

import Link from "next/link";
import { BookOpen, Heart, Award, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

const MISI_LIST = [
  {
    nomor: "01",
    icon: BookOpen,
    title: "Generasi Cerdas & Rahmatan Lil 'Alamin",
    desc: "Membentuk generasi Islami yang berilmu, cerdas, berakhlak mulia, dan berkarakter rahmatan lil 'alamin.",
  },
  {
    nomor: "02",
    icon: Heart,
    title: "Merangkul Yatim & Kaum Dhuafa",
    desc: "Menjadi lembaga pendidikan yang merangkul, membina, dan memberi akses pendidikan bermutu bagi anak yatim dan kaum dhuafa.",
  },
  {
    nomor: "03",
    icon: Award,
    title: "Perekat Umat & Semua Golongan",
    desc: "Berdiri di atas dan untuk semua golongan, berpedoman teguh pada Al-Qur'an dan Hadits sebagai pemersatu umat.",
  },
];

export function VisiMisiClient() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-28 min-h-screen bg-surface/40 relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-gradient-to-b from-emerald-100/40 via-brand-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        {/* ============================================================ */}
        {/* 1. HEADER HALAMAN: CLEAN & MODERN                            */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-zinc-900 tracking-tight"
          >
            Visi &amp; Misi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto"
          >
            Pondok Pesantren Al-Rahmah berdiri di atas dan untuk semua golongan, berpedoman pada Al-Qur&apos;an dan Hadits, bertekad menjadi perekat umat.
          </motion.p>
        </div>

        {/* Content Container */}
        <div className="space-y-10 sm:space-y-14">
          {/* ============================================================ */}
          {/* 2. SECTION VISI: EDITORIAL STATEMENT CARD                    */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl p-7 sm:p-10 md:p-12 border border-zinc-200/80 shadow-xs relative overflow-hidden"
          >
            {/* Top Subtle Brand Gradient Accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" />

            {/* Subtle Watermark Quote Mark */}
            <Quote
              size={96}
              className="absolute right-6 bottom-6 text-emerald-900/[0.03] pointer-events-none"
            />

            <div className="relative z-10 space-y-4">
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase text-brand-primary block">
                Visi Pesantren
              </span>

              <p className="text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed max-w-3xl">
                Pondok Pesantren Al-Rahmah berdiri di atas dan untuk semua golongan, berpedoman pada Al-Qur&apos;an dan Hadits, bertekad menjadi perekat umat dalam menjalankan visi dan misinya yaitu:
              </p>

              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 leading-snug sm:leading-snug tracking-tight pt-1">
                &ldquo;Membentuk Generasi Islami yang Cerdas dan Berkarakter Rahmatan Lil &apos;Alamin, dan Menjadi Lembaga Pendidikan yang Merangkul Para Anak Yatim dan Kaum Dhuafa&rdquo;
              </h2>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* 3. SECTION MISI: 3 BALANCED CARDS                            */}
          {/* ============================================================ */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase text-brand-primary block">
                Misi Lembaga
              </span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
              {MISI_LIST.map((misi, idx) => {
                const Icon = misi.icon;
                return (
                  <motion.div
                    key={misi.nomor}
                    initial={{ opacity: 0, y: 35, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.45 + idx * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -5, transition: { duration: 0.25 } }}
                    className="bg-white p-6 sm:p-7 rounded-2xl border border-zinc-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300/80 transition-all duration-300 flex flex-col justify-between group h-full"
                  >
                    <div>
                      {/* Card Top: Number & Icon */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <span className="text-xs font-mono font-bold text-brand-primary bg-emerald-50/90 px-2.5 py-1 rounded-lg border border-emerald-200/50">
                          {misi.nomor}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-brand-primary/5 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 flex items-center justify-center shrink-0">
                          <Icon size={18} strokeWidth={1.8} />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-bold text-base sm:text-lg text-zinc-900 mb-2.5 tracking-tight group-hover:text-brand-primary transition-colors">
                        {misi.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                        {misi.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. BOTTOM CONTINUITY NAVIGATION                              */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-14 sm:mt-20 pt-8 border-t border-zinc-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm"
        >
          <Link
            href="/tentang/sejarah"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand-primary font-medium transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Sejarah &amp; Jejak Langkah</span>
          </Link>
          <Link
            href="/tentang/pimpinan"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand-primary font-medium transition-colors group"
          >
            <span>Nakhoda &amp; Kepemimpinan Al-Rahmah</span>
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

