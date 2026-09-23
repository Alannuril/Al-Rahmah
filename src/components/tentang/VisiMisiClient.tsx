import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const MISI_LIST = [
  {
    nomor: "01",
    title: "Generasi Cerdas & Rahmatan Lil 'Alamin",
    desc: "Membentuk generasi Islami yang berilmu, cerdas, berakhlak mulia, dan berkarakter rahmatan lil 'alamin.",
  },
  {
    nomor: "02",
    title: "Merangkul Yatim & Kaum Dhuafa",
    desc: "Menjadi lembaga pendidikan yang merangkul, membina, dan memberi akses pendidikan bermutu bagi anak yatim dan kaum dhuafa.",
  },
  {
    nomor: "03",
    title: "Perekat Umat & Semua Golongan",
    desc: "Berdiri di atas dan untuk semua golongan, berpedoman teguh pada Al-Qur'an dan Hadits sebagai pemersatu umat.",
  },
];

export function VisiMisiClient() {
  return (
    <div className="min-h-screen bg-white pt-28 sm:pt-32 text-zinc-900">
      <header className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
        <Link
          href="/tentang"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Tentang Al-Rahmah
        </Link>
        <h1 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
          Visi &amp; Misi
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
          Pondok Pesantren Al-Rahmah berdiri di atas dan untuk semua golongan,
          berpedoman pada Al-Qur&apos;an dan Hadits, bertekad menjadi perekat umat.
        </p>
      </header>

      <section aria-labelledby="visi-heading" className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8">
          <div className="lg:col-span-7">
            <h2 id="visi-heading" className="mb-5 text-sm font-semibold text-brand-primary">
              Visi Pesantren
            </h2>
            <p className="font-heading text-2xl font-medium leading-relaxed sm:text-3xl sm:leading-relaxed">
              Membentuk Generasi Islami yang Cerdas dan Berkarakter Rahmatan
              Lil &apos;Alamin, dan Menjadi Lembaga Pendidikan yang Merangkul
              Para Anak Yatim dan Kaum Dhuafa
            </p>
          </div>
          <figure className="lg:col-span-5">
            <div className="relative aspect-[3/2] w-full overflow-hidden lg:aspect-[4/3]">
              <Image
                src="/images/panca-jiwa-bg.jpg"
                alt="Para santri berseragam putih dan berpeci mengikuti kegiatan bersama di aula"
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover object-center"
              />
            </div>
          </figure>
        </div>
      </section>

      <section aria-labelledby="misi-heading" className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-3">
          <h2 id="misi-heading" className="font-heading text-2xl font-semibold">
            Misi Lembaga
          </h2>
        </div>
        <ol className="divide-y divide-zinc-200 border-y border-zinc-200 lg:col-span-9">
          {MISI_LIST.map((misi) => (
            <li key={misi.nomor} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 sm:py-8">
              <span aria-hidden="true" className="pt-1 font-mono text-sm text-brand-primary">
                {misi.nomor}
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold leading-snug sm:text-xl">
                  {misi.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                  {misi.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <nav aria-label="Halaman tentang pesantren" className="mx-auto flex max-w-6xl justify-end px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <Link
          href="/tentang/sejarah"
          className="inline-flex min-h-11 items-center gap-4 text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
        >
          <span>
            <span className="block text-xs text-zinc-500">Selanjutnya</span>
            <span className="text-sm font-semibold">Sejarah Al-Rahmah</span>
          </span>
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
}
