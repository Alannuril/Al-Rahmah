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
    <section id="visi-misi" aria-labelledby="visi-misi-heading" className="scroll-mt-24 pb-14 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="border-t border-zinc-200 pt-8">
          <h2 id="visi-misi-heading" className="font-heading text-2xl font-semibold leading-tight sm:text-3xl">
            Visi &amp; Misi
          </h2>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <h3 id="visi-heading" className="mb-4 text-sm font-semibold text-brand-primary">
              Visi Pesantren
            </h3>
            <p className="max-w-xl font-heading text-2xl font-medium leading-relaxed">
              Membentuk generasi Islami yang cerdas dan berkarakter rahmatan
              lil &apos;alamin.
            </p>
            <p className="mt-4 max-w-lg text-base leading-7 text-zinc-600">
              Menjadi lembaga pendidikan yang merangkul anak yatim dan kaum dhuafa.
            </p>
          </div>
          <figure>
            <div className="relative aspect-[1024/682] overflow-hidden rounded-sm bg-zinc-100">
              <Image
                src="/images/pendidikan-mts.jpg"
                alt="Guru menjelaskan pelajaran di depan kelas dan para santri menyimak dari bangku belajar"
                fill
                loading="eager"
                sizes="(max-width: 1023px) calc(100vw - 32px), (max-width: 1152px) calc((100vw - 112px) / 2), 520px"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-5 text-zinc-600">
              Kegiatan belajar di MTs Al-Rahmah.
            </figcaption>
          </figure>
        </div>

        <section aria-labelledby="misi-heading" className="mt-10 grid gap-6 border-t border-zinc-200 pt-8 sm:mt-12 lg:grid-cols-12 lg:gap-12">
          <h3 id="misi-heading" className="font-heading text-xl font-semibold lg:col-span-4">
            Misi Lembaga
          </h3>
          <ol className="divide-y divide-zinc-200 lg:col-span-8">
            {MISI_LIST.map((misi) => (
              <li key={misi.nomor} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-4 py-5 first:pt-0 last:pb-0 sm:gap-5">
                <span aria-hidden="true" className="pt-1 font-mono text-sm text-brand-primary">
                  {misi.nomor}
                </span>
                <div>
                  <h4 className="font-heading text-lg font-semibold leading-snug">
                    {misi.title}
                  </h4>
                  <p className="mt-2 text-sm leading-7 text-zinc-600 sm:text-base">
                    {misi.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}
