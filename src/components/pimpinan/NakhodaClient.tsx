"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
      "Memimpin kegiatan harian pesantren dan pembinaan karakter kepondokmodernan santri.",
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
      "Merintis Al-Rahmah bersama K.H. Abdul Rasyid Muslim serta mendampingi pembinaan akhlak dan kehidupan santri.",
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
      "Mengelola kurikulum KMI, pembinaan guru, dan kegiatan pembelajaran di pesantren.",
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
      <section id="nakhoda" aria-labelledby="nakhoda-heading" className="scroll-mt-24 bg-[#e3ece3] py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <header className="mb-10 grid gap-4 border-b border-brand-primary/25 pb-8 sm:mb-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <h2 id="nakhoda-heading" className="font-heading text-2xl font-semibold leading-tight text-[#244f43] sm:text-[32px] lg:col-span-5">
              Nakhoda Al-Rahmah
            </h2>
            <p className="max-w-xl text-base leading-7 text-zinc-600 lg:col-span-7">
              Pimpinan dan pengasuh yang mendampingi pendidikan serta kehidupan santri.
            </p>
          </header>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
            {NAKHODA_LIST.map((nakhoda) => (
              <article key={nakhoda.id} className="flex min-w-0 flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border-b-4 border-brand-primary bg-[#d5e2d4] md:aspect-[4/5]">
                  <Image
                    src={nakhoda.foto}
                    alt={"Foto profil " + nakhoda.nama}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1280px) 30vw, 374px"
                    className={"object-cover " + (nakhoda.fotoPosition || "object-top")}
                  />
                </div>
                <div className="flex flex-1 flex-col pt-5">
                  <h3 className="font-heading text-xl font-semibold leading-snug text-[#244f43]">
                    {nakhoda.nama}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-brand-primary">
                    {nakhoda.jabatan}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {nakhoda.ringkasan}
                  </p>
                  <div className="mt-auto pt-5">
                    <button
                      type="button"
                      onClick={() => setSelectedNakhoda(nakhoda)}
                      aria-label={"Baca profil " + nakhoda.nama}
                      aria-haspopup="dialog"
                      className="group inline-flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 border-t border-brand-primary/25 pt-3 text-sm font-semibold text-brand-primary underline-offset-4 hover:text-[#244f43] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
                    >
                      Baca profil
                      <ArrowRight size={16} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="panca-jiwa" aria-labelledby="panca-jiwa-heading" className="scroll-mt-24 border-b border-white/15 border-t-4 border-t-brand-lime bg-[#244f43] py-14 text-white sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <header className="lg:col-span-4">
            <h2 id="panca-jiwa-heading" className="font-heading text-2xl font-semibold leading-tight sm:text-[32px]">
              Panca Jiwa Al-Rahmah
            </h2>
            <p className="mt-3 max-w-lg text-base leading-7 text-white/85">
              Nilai-nilai yang mendasari pembentukan karakter santri dan keteladanan pendidik.
            </p>
          </header>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {PANCA_JIWA_LIST.map((pilar) => (
              <li key={pilar.nomor} className="min-w-0 border-t border-white/25 pt-5">
                <div className="flex flex-wrap items-start justify-between gap-3 text-brand-lime">
                  <span aria-hidden="true" className="font-heading text-2xl leading-8">{pilar.nomor}</span>
                  <span lang="ar" dir="rtl" className="font-serif text-2xl leading-8">{pilar.arab}</span>
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold leading-snug">
                  {pilar.judul}
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/85">
                  {pilar.deskripsi}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {selectedNakhoda && (
        <NakhodaDetailModal
          nakhoda={selectedNakhoda}
          onClose={() => setSelectedNakhoda(null)}
        />
      )}
    </>
  );
}
