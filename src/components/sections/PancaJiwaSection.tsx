"use client";

import Image from "next/image";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

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

export function PancaJiwaSection() {
  return (
    <section id="panca-jiwa" className="relative w-full overflow-hidden bg-[#1c483a] py-10 sm:py-16 md:py-20 scroll-mt-20">
      {/* Background Image: Santri Berbaris Rapi */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/panca-jiwa-bg.jpg"
          alt="Suasana Santri Pondok Pesantren Al-Rahmah"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        {/* Modern Soft Gradient Overlay: Nuansa emerald/forest green kaya & seimbang */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c483a]/92 via-[#265e4b]/78 to-[#184033]/92" />

        {/* Halus: Fade Lembut di Batas Atas Seam ke #1c483a */}
        <div
          className="absolute inset-x-0 top-0 h-24 sm:h-48 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #1c483a 0%, rgba(28, 72, 58, 0.8) 40%, transparent 100%)",
          }}
        />

        {/* Hairline Divider Halus di Batas Bawah */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-white">
        {/* Header Section with Scroll Animation */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-3 mb-6 sm:mb-10 lg:mb-12">
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-brand-lime/90 block">
              Nilai &amp; Karakter Pondok
            </span>
            <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
              Panca Jiwa Al-Rahmah
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal max-w-xl mx-auto drop-shadow-xs line-clamp-2 sm:line-clamp-none">
              Pilar pembentukan karakter kepondokmodernan yang mengakar kuat pada diri santri serta menjadi ruh keteladanan para pendidik di Al-Rahmah.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Pilar Grid: 2x2 pada Mobile, 4 Kolom pada Desktop */}
        <StaggerContainer staggerDelay={0.06} className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {PANCA_JIWA_LIST.map((pilar) => (
            <StaggerItem key={pilar.nomor} variant="zoom-in" className="h-full">
              <div className="group bg-[#102d23]/65 hover:bg-[#102d23]/85 border border-white/15 hover:border-emerald-300/40 rounded-xl sm:rounded-2xl p-3 sm:p-5 lg:p-6 backdrop-blur-md shadow-sm hover:shadow-emerald-950/25 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  {/* Header Kartu: Nomor & Teks Arab */}
                  <div className="flex items-center justify-between gap-1 pb-2 sm:pb-3 mb-2 sm:mb-3 border-b border-white/10">
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-emerald-300 tracking-wider">
                      {pilar.nomor}
                    </span>
                    <span className="text-xs sm:text-sm font-serif text-white/90 tracking-wide">
                      {pilar.arab}
                    </span>
                  </div>

                  {/* Judul Pilar */}
                  <h3 className="font-heading text-xs sm:text-base lg:text-lg font-bold text-white tracking-tight mb-1 sm:mb-2 group-hover:text-emerald-200 transition-colors leading-snug">
                    {pilar.judul}
                  </h3>

                  {/* Deskripsi */}
                  <p className="text-[10px] sm:text-xs lg:text-[13px] text-zinc-100/85 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                    {pilar.deskripsi}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

