import Image from "next/image";

const MISI_LIST = [
  {
    nomor: "01",
    title: "Membentuk generasi cerdas dan berakhlak",
    desc: "Membentuk generasi Islami yang berilmu, cerdas, berakhlak mulia, dan berkarakter rahmatan lil 'alamin.",
  },
  {
    nomor: "02",
    title: "Merangkul anak yatim dan kaum dhuafa",
    desc: "Menjadi lembaga pendidikan yang merangkul, membina, dan memberi akses pendidikan bermutu bagi anak yatim dan kaum dhuafa.",
  },
  {
    nomor: "03",
    title: "Menjadi perekat umat",
    desc: "Berdiri di atas dan untuk semua golongan, berpedoman teguh pada Al-Qur'an dan Hadits sebagai pemersatu umat.",
  },
];

export function VisiMisiSection() {
  return (
    <section id="visi-misi" aria-labelledby="visi-misi-heading" className="scroll-mt-24 bg-[#e3ece3]">
      <div className="border-t border-white/15 bg-[#244f43] py-10 text-white sm:py-12 lg:pb-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <header>
            <h2 id="visi-misi-heading" className="font-heading text-2xl font-medium leading-tight text-brand-lime sm:text-[28px]">
              Visi &amp; Misi
            </h2>
          </header>

          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
            <div className="max-w-xl border-l-2 border-brand-lime/60 pl-5 sm:pl-6">
              <h3 id="visi-heading" className="mb-4 text-sm font-medium text-brand-lime">
                Visi Pesantren
              </h3>
              <p className="max-w-xl font-heading text-[26px] font-medium leading-snug sm:text-[34px] sm:leading-snug">
                Membentuk generasi Islami yang cerdas dan berkarakter rahmatan
                lil &apos;alamin.
              </p>
              <p className="mt-5 max-w-md text-base leading-8 text-white/80">
                Menjadi lembaga pendidikan yang merangkul anak yatim dan kaum dhuafa.
              </p>
            </div>
            <figure>
              <div className="relative aspect-[1024/682] overflow-hidden rounded-sm bg-[#d5e2d4]">
                <Image
                  src="/images/pendidikan-mts.jpg"
                  alt="Guru menjelaskan pelajaran di depan kelas dan para santri menyimak dari bangku belajar"
                  fill
                  loading="eager"
                  sizes="(max-width: 1023px) calc(100vw - 32px), (max-width: 1280px) 55vw, 672px"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-3 border-b border-white/20 pb-3 text-xs leading-6 text-white/75">
                Kegiatan belajar di MTs Al-Rahmah.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <section aria-labelledby="misi-heading" className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <h3 id="misi-heading" className="self-start border-l-4 border-brand-primary pl-5 font-heading text-2xl font-semibold text-[#244f43] lg:col-span-4">
          Misi Lembaga
        </h3>
        <ol className="divide-y divide-brand-primary/25 lg:col-span-8">
          {MISI_LIST.map((misi) => (
            <li key={misi.nomor} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 py-7 first:pt-0 last:pb-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
              <span aria-hidden="true" className="font-heading text-[28px] font-medium leading-tight text-brand-primary sm:text-[32px]">
                {misi.nomor}
              </span>
              <div>
                <h4 className="font-heading text-xl font-semibold leading-snug text-[#244f43]">
                  {misi.title}
                </h4>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-700 sm:text-base sm:leading-8">
                  {misi.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
