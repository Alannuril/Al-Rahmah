"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote, ArrowRight, Building, CheckCircle2 } from "lucide-react";
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
    // Ganti URL foto dengan foto asli saat sudah tersedia
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
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
    // Ganti URL foto dengan foto asli saat sudah tersedia
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
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

export function NakhodaClient() {
  const [selectedNakhoda, setSelectedNakhoda] = useState<NakhodaData | null>(null);

  return (
    <>
      <div className="pt-28 sm:pt-32 pb-20 sm:pb-28 min-h-screen bg-surface/40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* ============================================================ */}
          {/* SECTION HEADER: CLEAN & SOFT                                 */}
          {/* ============================================================ */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-14">
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-bold text-zinc-900 tracking-tight">
              Nakhoda Al-Rahmah
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Mengenal profil dan kepemimpinan di balik Pondok Pesantren Al-Rahmah Walantaka.
            </p>
          </div>

          {/* ============================================================ */}
          {/* TIGA CARD SEJAJAR: FOTO LEBIH TINGGI/BESAR & TIDAK TERPOTONG */}
          {/* ============================================================ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {NAKHODA_LIST.map((nakhoda) => (
              <article
                key={nakhoda.id}
                className="bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-xs hover:shadow-md hover:border-emerald-300/80 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Foto Potret Teggak (aspect-[3/4]) agar proporsi kepala/wajah utuh tidak terpotong */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-100">
                    <Image
                      src={nakhoda.foto}
                      alt={`Foto profil ${nakhoda.nama}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-cover ${nakhoda.fotoPosition || "object-top"} group-hover:scale-105 transition-transform duration-700`}
                    />

                    {/* Badge Peran Melayang di Sudut Kiri Atas */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="text-[10px] sm:text-[11px] font-semibold bg-white/90 backdrop-blur-md text-brand-primary px-3 py-1 rounded-full shadow-xs border border-white/50">
                        {nakhoda.peranTag}
                      </span>
                    </div>

                    {/* Gradasi Hijau Modern di Bagian Bawah Foto dengan Kutipan Kata-Kata */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14362B] via-[#14362B]/85 to-transparent pt-16 pb-4 px-4 sm:px-5 flex flex-col justify-end">
                      <div className="flex items-start gap-2 text-white">
                        <Quote size={13} className="text-brand-lime shrink-0 mt-0.5 opacity-90" />
                        <p className="font-heading italic text-[11px] sm:text-xs text-white/95 leading-relaxed drop-shadow-xs line-clamp-3">
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
              </article>
            ))}
          </div>

          {/* ============================================================ */}
          {/* SECTION BADAN WAKAF (TEPAT DI BAWAH 3 CARD NAKHODA)          */}
          {/* ============================================================ */}
          <section id="badan-wakaf" className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-zinc-200/80 scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6 sm:mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
                Badan Wakaf Pondok Pesantren
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Lembaga pengelola amanah umat untuk keberlanjutan, pemeliharaan aset, dan kemandirian institusi pendidikan Al-Rahmah.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Card Utama: Tentang Badan Wakaf */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-200/80 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-brand-primary border border-emerald-200/60 flex items-center justify-center shrink-0">
                      <Building size={22} strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-zinc-900 tracking-tight">
                        Tentang Badan Wakaf
                      </h3>
                      <p className="text-xs font-semibold text-brand-primary">
                        Pilar Kemandirian Institusi
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-sm text-zinc-600 leading-relaxed pt-2">
                    <p>
                      Badan Wakaf Pondok Pesantren Al-Rahmah merupakan lembaga resmi yang ditugaskan 
                      untuk mengelola, memelihara, dan mengembangkan aset-aset wakaf yang dipercayakan 
                      oleh umat kepada pesantren.
                    </p>
                    <p>
                      Wakaf merupakan pilar penting dalam kemandirian institusi pendidikan Islam. 
                      Melalui tata kelola yang amanah, transparan, dan produktif, kami berkomitmen 
                      untuk mendukung seluruh operasional dan pengembangan sarana santri secara berkesinambungan.
                    </p>
                  </div>
                </div>

                {/* Nilai Utama Pengelolaan */}
                <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs font-medium text-zinc-700">
                    <CheckCircle2 size={13} className="text-brand-primary" />
                    Tata Kelola Amanah
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs font-medium text-zinc-700">
                    <CheckCircle2 size={13} className="text-brand-primary" />
                    Transparan &amp; Akuntabel
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs font-medium text-zinc-700">
                    <CheckCircle2 size={13} className="text-brand-primary" />
                    Produktif &amp; Berkelanjutan
                  </span>
                </div>
              </div>

              {/* Kolom Kanan: Visi & Misi Badan Wakaf */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Visi */}
                <div className="bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/30 rounded-3xl p-6 sm:p-7 border border-emerald-200/70 shadow-xs space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block">
                    Visi
                  </span>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-zinc-900 tracking-tight">
                    Visi Badan Wakaf
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Menjadi lembaga pengelola wakaf yang profesional, amanah, dan produktif 
                    guna mewujudkan kemandirian finansial Pondok Pesantren Al-Rahmah.
                  </p>
                </div>

                {/* Misi */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs space-y-3 flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block">
                    Misi
                  </span>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-zinc-900 tracking-tight">
                    Misi Badan Wakaf
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-600">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-brand-primary shrink-0 mt-0.5" />
                      <span>Mengamankan dan memproduktifkan aset-aset wakaf pesantren.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-brand-primary shrink-0 mt-0.5" />
                      <span>Meningkatkan nilai tambah sarana pendidikan santri.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-brand-primary shrink-0 mt-0.5" />
                      <span>Menyalurkan hasil wakaf bagi keberlanjutan beasiswa santri dhuafa.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-brand-primary shrink-0 mt-0.5" />
                      <span>Menjaga transparansi dan akuntabilitas laporan berkala kepada umat.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Interactive Modal Profile */}
      <NakhodaDetailModal
        nakhoda={selectedNakhoda}
        onClose={() => setSelectedNakhoda(null)}
      />
    </>
  );
}

