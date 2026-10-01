"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface PancaJiwaItem {
  nomor: string;
  judul: string;
  arab: string;
  deskripsi: string;
}

const PANCA_JIWA_LIST: PancaJiwaItem[] = [
  {
    nomor: "01",
    judul: "Keikhlasan",
    arab: "الإخلاص",
    deskripsi:
      "Beramal, mengabdi, dan menuntut ilmu semata-mata mengharap ridha Allah SWT tanpa pamrih atau keuntungan duniawi semu.",
  },
  {
    nomor: "02",
    judul: "Kesederhanaan",
    arab: "البساطة",
    deskripsi:
      "Membiasakan pola hidup bersahaja, wajar, dan tabah, namun berjiwa besar, berbudi pekerti luhur, serta pantang berputus asa.",
  },
  {
    nomor: "03",
    judul: "Kemandirian",
    arab: "الاعتماد على النفس",
    deskripsi:
      "Sanggup berdikari, bertanggung jawab atas diri sendiri, serta memiliki ketangguhan mental dalam memikul amanah hidup.",
  },
  {
    nomor: "04",
    judul: "Ukhuwah Islamiyah",
    arab: "الأخوة الإسلامية",
    deskripsi:
      "Menjalin persaudaraan sejati atas dasar iman, merajut harmoni dan kebersamaan erat di atas semua golongan.",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function PancaJiwaSection({
  showMobileDescriptions = false,
}: {
  showMobileDescriptions?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="panca-jiwa"
      aria-labelledby="panca-jiwa-heading"
      className="relative overflow-hidden scroll-mt-24 bg-[#1c483a] py-12 text-white sm:py-16 md:py-20 lg:py-28"
    >
      {/* Background with Soft Depth & Ambient Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          initial={shouldReduceMotion ? undefined : { scale: 1.06, opacity: 0.8 }}
          whileInView={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/images/panca-jiwa-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c483a]/94 via-[#225745]/85 to-[#163c30]/94" />
        <div
          className="absolute inset-x-0 top-0 h-24 sm:h-48"
          style={{
            background:
              "linear-gradient(to bottom, #1c483a 0%, rgba(28, 72, 58, 0.8) 40%, transparent 100%)",
          }}
        />
        {/* Soft Ambient Radial Light */}
        <div className="absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Left Column: Animated Header */}
        <motion.header
          variants={headerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="lg:col-span-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-brand-lime text-xs font-semibold mb-3.5 backdrop-blur-xs shadow-2xs">
            <Sparkles size={13} className="text-brand-lime" />
            <span>Falsafah Karakter</span>
          </div>
          <h2
            id="panca-jiwa-heading"
            className="font-heading text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-[32px] text-white drop-shadow-xs"
          >
            Panca Jiwa Al-Rahmah
          </h2>
          <p className="mt-2.5 max-w-lg text-[13px] leading-relaxed text-white/85 sm:text-base sm:leading-7">
            Nilai-nilai luhur yang mendasari pembentukan karakter santri dan keteladanan pendidik di Pondok Pesantren Al-Rahmah.
          </p>
        </motion.header>

        {/* Mobile View (!showMobileDescriptions) */}
        {!showMobileDescriptions && (
          <div className="sm:hidden">
            <motion.ol
              variants={containerVariants}
              initial={shouldReduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="divide-y divide-white/15 border-y border-white/15"
            >
              {PANCA_JIWA_LIST.map((pilar) => (
                <motion.li
                  key={pilar.nomor}
                  variants={itemVariants}
                  className="min-w-0 py-3.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <h3 className="inline-flex items-baseline gap-3 font-heading text-sm font-semibold leading-5 text-white">
                      <span
                        aria-hidden="true"
                        className="inline-flex items-center justify-center font-mono text-[11px] font-semibold px-1.5 py-0.5 rounded-md bg-white/10 text-brand-lime border border-white/10"
                      >
                        {pilar.nomor}
                      </span>
                      {pilar.judul}
                    </h3>
                    <span
                      lang="ar"
                      dir="rtl"
                      className="font-serif text-base leading-5 text-brand-lime"
                    >
                      {pilar.arab}
                    </span>
                  </div>
                </motion.li>
              ))}
            </motion.ol>

            <motion.div
              variants={headerVariants}
              initial={shouldReduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
            >
              <Link
                href="/tentang#panca-jiwa"
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl py-2 px-3 bg-white/10 border border-white/15 text-[13px] font-medium text-brand-lime hover:bg-white/15 hover:text-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-lime"
              >
                <span>Selengkapnya tentang Panca Jiwa</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        )}

        {/* Desktop View & Full Mobile Grid */}
        <motion.ol
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className={
            "gap-8 sm:grid sm:grid-cols-2 lg:col-span-8 " +
            (showMobileDescriptions ? "grid" : "hidden")
          }
        >
          {PANCA_JIWA_LIST.map((pilar) => (
            <motion.li
              key={pilar.nomor}
              variants={itemVariants}
              className="group min-w-0 border-t border-white/20 pt-5 sm:pt-6 transition-all duration-300 hover:border-brand-lime/50"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-brand-lime">
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-white/10 text-brand-lime border border-white/10 group-hover:bg-brand-lime/20 group-hover:border-brand-lime/30 transition-all duration-300 shadow-2xs"
                >
                  {pilar.nomor}
                </span>
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-serif text-xl sm:text-2xl leading-7 text-brand-lime/90 group-hover:text-brand-lime group-hover:scale-105 transition-all duration-300 origin-right"
                >
                  {pilar.arab}
                </span>
              </div>
              <h3 className="mt-3.5 font-heading text-lg sm:text-xl font-semibold leading-snug text-white group-hover:text-brand-accent transition-colors duration-200">
                {pilar.judul}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80 group-hover:text-white/90 transition-colors duration-200">
                {pilar.deskripsi}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
