"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import {
  NakhodaDetailModal,
  NakhodaData,
} from "./NakhodaDetailModal";

const NAKHODA_LIST: NakhodaData[] = [
  {
    id: "kh-mahfud-romli",
    nama: "KH. Mahfud Romli",
    jabatan: "Pimpinan & Pengasuh Pesantren",
    peranTag: "Pimpinan & Penanggung Jawab Utama",
    foto: "/images/kh-mahfud-romli.jpg",
    fotoPosition: "object-[35%_center]",
    quote:
      "Membina generasi santri berakhlak mulia, cerdas, dan berkarakter kepondokmodernan yang kokoh.",
    ringkasan:
      "Sosok penanggung jawab operasional harian pesantren sekaligus arsitek karakter kepondokmodernan santri Al-Rahmah.",
    biografiLengkap: [
      "KH. Mahfud Romli bertindak sebagai pimpinan sekaligus penanggung jawab utama operasional harian di Pondok Pesantren Al-Rahmah Walantaka. Dalam mengelola roda pendidikan pesantren, beliau bekerja sama secara sinergis dengan Umi Hj. Enung Nurhayati, S.Ag. selaku pengasuh/pendiri yayasan, serta Ustaz Wahono, M.Pd yang menjabat sebagai Direktur KMI.",
      "Sebagai pondok yang mengadopsi sistem modern, beliau merupakan sosok di balik penguatan ideologi kepesantrenan santri. Beliau menyusun buku panduan internal bertajuk 'Kepondokmodernan Al-Rahmah' yang menjadi landasan wajib bagi disiplin dan mentalitas para santri.",
      "Beliau juga memimpin agenda tahunan Khutbatul 'Arsy (pekan orientasi nilai pondok) serta aktif membangun diplomasi kelembagaan, kemitraan lintas sektoral, dan sinergi bersama aparat kewilayahan demi keamanan serta kemajuan pondok.",
    ],
    fokusKontribusi: [
      {
        judul: "Manajemen & Operasional Harian",
        deskripsi:
          "Memimpin koordinasi harian seluruh lini kepesantrenan dan tata kelola lingkungan pondok.",
      },
      {
        judul: "Perumus Nilai Kepondokmodernan",
        deskripsi:
          "Menyusun buku panduan internal 'Kepondokmodernan Al-Rahmah' sebagai panduan mentalitas dan disiplin santri.",
      },
      {
        judul: "Diplomasi & Hubungan Kelembagaan",
        deskripsi:
          "Mengawal kemitraan strategis, hubungan masyarakat, dan koordinasi keamanan wilayah.",
      },
    ],
  },
  {
    id: "umi-enung-nurhayati",
    nama: "Umi Hj. Enung Nurhayati, S.Ag.",
    jabatan: "Pengasuh & Pendiri Yayasan",
    peranTag: "Pengasuh & Pendiri Yayasan",
    foto: "/images/umi-enung-nahkoda.jpg",
    fotoPosition: "object-top",
    quote:
      "Anak-anak... jadi santri itu harus sabar, ikhlas, dan tawakal.",
    ringkasan:
      "Sosok sentral peletak batu pertama Al-Rahmah yang menghadirkan sentuhan keibuan, bimbingan moral, dan pengawal khitah pesantren.",
    biografiLengkap: [
      "Umi Hj. Enung Nurhayati, S.Ag. adalah sosok sentral di balik berdirinya Pondok Pesantren Al-Rahmah Walantaka. Mendampingi almarhum suami tercinta, K.H. Abdul Rasyid Muslim (Abi Rasyid), beliau ikut berjuang meletakkan batu pertama pembangunan pesantren. Beliau mendedikasikan hidupnya untuk mentransfer nilai-nilai karakter kepondokmodernan berbasis Panca Jiwa Pondok kepada ribuan santri yang menimba ilmu di Al-Rahmah.",
      "Peran beliau melampaui posisi struktural formal; beliau adalah figur ibu (Umi) bagi seluruh santriwan dan santriwati. Beliau hadir mendengarkan keluh kesah santri baru yang mengalami adaptasi lingkungan, menanamkan keikhlasan dan ketabahan, serta memberikan ketenangan spiritual.",
      "Sebagai jajaran dewan pendiri yayasan, beliau senantiasa memastikan agar visi awal pendirian pesantren tetap terjaga murni: mencetak generasi berkarakter unggul, mandiri, dan berjiwa ikhlas mengabdi bagi kemaslahatan umat.",
    ],
    fokusKontribusi: [
      {
        judul: "Penjaga Khitah & Sejarah Yayasan",
        deskripsi:
          "Mengawal nilai-nilai perjuangan pendiri dan Panca Jiwa Pondok tetap menjadi ruh pesantren.",
      },
      {
        judul: "Bimbingan Moral & Sentuhan Keibuan",
        deskripsi:
          "Menjadi figur rujukan kasih sayang dan bimbingan spiritual bagi seluruh santriwan-santriwati.",
      },
      {
        judul: "Kaderisasi & Pembinaan Keputrian",
        deskripsi:
          "Membimbing organisasi santri, pembinaan keputrian, dan kehangatan rasa kekeluargaan pondok.",
      },
    ],
  },
  {
    id: "ustaz-wahono",
    nama: "Ustaz Wahono, M.Pd.",
    jabatan: "Direktur KMI (Kulliyatul Mu'allimin Al-Islamiyyah)",
    peranTag: "Direktur KMI",
    foto: "/images/ustaz-wahono.jpg",
    fotoPosition: "object-top",
    quote:
      "Santri menyerap ilmu dari berbagai sumber, lalu menyaringnya dengan analisis kuat berlandaskan nilai Islam.",
    ringkasan:
      "Penggerak mutu akademis pesantren yang mengawal kurikulum terpadu KMI, standar pedagogi guru, dan nalar kritis santri.",
    biografiLengkap: [
      "Ustaz Wahono, M.Pd. memegang peranan krusial sebagai Direktur KMI (Kulliyatul Mu'allimin Al-Islamiyyah), satuan pendidikan formal kepesantrenan yang menjadi jantung pembelajaran akademis dan pembentukan guru di Al-Rahmah.",
      "Dengan latar belakang Magister Pendidikan (M.Pd.), beliau merancang standarisasi kurikulum terpadu yang memadukan khazanah keilmuan Islam, bahasa internasional (Arab & Inggris), serta sains dan teknologi modern.",
      "Beliau juga mengomandoi program kaderisasi pendidik santri senior melalui 'Amaliyah At-Tadris' (praktik mengajar micro-teaching), memastikan setiap lulusan memiliki kapasitas pengajaran pedagogis yang unggul dan nalar kritis yang berakar pada nilai-nilai Islam.",
    ],
    fokusKontribusi: [
      {
        judul: "Standardisasi Kurikulum KMI",
        deskripsi:
          "Memimpin perancangan dan integrasi kurikulum kepesantrenan terpadu yang adaptif dan berkualitas tinggi.",
      },
      {
        judul: "Program Kaderisasi Guru (Amaliyah At-Tadris)",
        deskripsi:
          "Mengawal pelatihan dan praktik micro-teaching bagi santri akhir untuk mencetak kader pendidik unggul.",
      },
      {
        judul: "Pengembangan Nalar Kritis (Critical Thinking)",
        deskripsi:
          "Membekali santri kemampuan memfilter dan menganalisis informasi modern berlandaskan adab Islam.",
      },
    ],
  },
];

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

export function NakhodaClient() {
  const [selectedNakhoda, setSelectedNakhoda] = useState<NakhodaData | null>(null);

  return (
    <>
      <section className="relative pt-28 sm:pt-32 pb-20 sm:pb-28 lg:pb-32 bg-surface/40 overflow-hidden">
        {/* Subtle Ambient Emerald Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-gradient-to-b from-emerald-100/40 via-brand-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Gradasi Hijau Halus Meluncur dari Section Bawah (Panca Jiwa) ke Atas - Merata Kiri, Tengah, Kanan */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 sm:h-64 lg:h-80 pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(to top, #1c483a 0%, rgba(28, 72, 58, 0.85) 25%, rgba(28, 72, 58, 0.3) 65%, transparent 100%)",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* ============================================================ */}
          {/* SECTION HEADER: ENTRANCE ANIMATION                           */}
          {/* ============================================================ */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-14">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-bold text-zinc-900 tracking-tight"
            >
              Nakhoda Al-Rahmah
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs sm:text-sm text-zinc-600 leading-relaxed"
            >
              Mengenal profil dan kepemimpinan di balik Pondok Pesantren Al-Rahmah Walantaka.
            </motion.p>
          </div>

          {/* ============================================================ */}
          {/* TIGA CARD SEJAJAR: STAGGERED ENTRANCE & HOVER LIFT          */}
          {/* ============================================================ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {NAKHODA_LIST.map((nakhoda, idx) => (
              <motion.article
                key={nakhoda.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.28 + idx * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-2xl overflow-hidden border border-zinc-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300/80 transition-shadow duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Foto Potret Responsif: Minimalis di Mobile (aspect-[4/3]) & Proporsional di Desktop (md:aspect-[3/4]) */}
                  <div className="relative w-full aspect-[4/3] md:aspect-[3/4] overflow-hidden bg-zinc-100">
                    <Image
                      src={nakhoda.foto}
                      alt={`Foto profil ${nakhoda.nama}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-cover ${nakhoda.fotoPosition || "object-top"} group-hover:scale-105 transition-transform duration-700`}
                    />

                    {/* Badge Peran Melayang di Sudut Kiri Atas */}
                    <div className="absolute top-3 left-3 md:top-3.5 md:left-3.5 z-10">
                      <span className="text-[10px] sm:text-[11px] font-semibold bg-white/90 backdrop-blur-md text-brand-primary px-2.5 py-0.5 md:px-3 md:py-1 rounded-full shadow-xs border border-white/50">
                        {nakhoda.peranTag}
                      </span>
                    </div>

                    {/* Gradasi Hijau Modern di Bagian Bawah Foto dengan Kutipan Kata-Kata */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14362B] via-[#14362B]/85 to-transparent pt-10 md:pt-16 pb-3.5 md:pb-4 px-4 md:px-5 flex flex-col justify-end">
                      <div className="flex items-start gap-2 text-white">
                        <Quote size={12} className="text-brand-lime shrink-0 mt-0.5 opacity-90 md:w-[13px] md:h-[13px]" />
                        <p className="font-heading italic text-[10.5px] sm:text-xs text-white/95 leading-relaxed drop-shadow-xs line-clamp-2 md:line-clamp-3">
                          &ldquo;{nakhoda.quote}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Informasi Singkat & Ringkas */}
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div>
                      <h2 className="font-heading font-bold text-lg sm:text-xl text-zinc-900 tracking-tight leading-snug">
                        {nakhoda.nama}
                      </h2>
                      <p className="text-xs font-semibold text-brand-primary mt-1">
                        {nakhoda.jabatan}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {nakhoda.ringkasan}
                    </p>
                  </div>
                </div>

                {/* Tombol Lihat Selengkapnya (Membuka Modal Detail) */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedNakhoda(nakhoda)}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-50 hover:bg-emerald-50 text-zinc-800 hover:text-brand-primary border border-zinc-200/80 hover:border-emerald-300 font-medium text-xs sm:text-sm transition-all duration-200 group/btn cursor-pointer shadow-2xs"
                  >
                    <span>Lihat Selengkapnya</span>
                    <ArrowRight
                      size={14}
                      className="text-zinc-400 group-hover/btn:text-brand-primary group-hover/btn:translate-x-0.5 transition-all"
                    />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION: PANCA JIWA AL-RAHMAH (FULL WIDTH MODERN & SOFT)     */}
      {/* ============================================================ */}
      <section id="panca-jiwa" className="relative w-full overflow-hidden bg-[#1c483a] py-20 sm:py-28 md:py-32 lg:py-36 scroll-mt-20">
        {/* Background Image: Santri Berbaris Rapi - Percerah & Lebih Hidup */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/panca-jiwa-bg.jpg"
            alt="Suasana Santri Pondok Pesantren Al-Rahmah"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
          {/* Modern Soft Gradient Overlay: Nuansa emerald/forest green kaya & seimbang, tidak terlalu gelap */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c483a]/92 via-[#265e4b]/78 to-[#184033]/92" />
          
          {/* Halus: Fade Lembut di Batas Atas Seam ke #1c483a */}
          <div
            className="absolute inset-x-0 top-0 h-32 sm:h-48 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #1c483a 0%, rgba(28, 72, 58, 0.8) 40%, transparent 100%)",
            }}
          />

          {/* Hairline Divider Halus di Batas Bawah */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
        </div>

        {/* Content Container: Centered & Balanced within standard 7xl */}
        <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-white">
          {/* Header with ScrollReveal */}
          <ScrollReveal variant="fade-up" duration={0.6}>
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16 lg:mb-20">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
                Panca Jiwa Al-Rahmah
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal max-w-xl mx-auto drop-shadow-xs">
                Pilar pembentukan karakter kepondokmodernan yang mengakar kuat pada diri santri serta menjadi ruh keteladanan para pendidik di Al-Rahmah.
              </p>
            </div>
          </ScrollReveal>

          {/* 4 Pilar Grid with Staggered Scroll Animation (2x2 on Mobile, 4 Columns on Desktop) */}
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

      {/* Interactive Modal Profile */}
      <NakhodaDetailModal
        nakhoda={selectedNakhoda}
        onClose={() => setSelectedNakhoda(null)}
      />
    </>
  );
}

