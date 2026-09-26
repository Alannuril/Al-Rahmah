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
    <section id="visi-misi" aria-labelledby="visi-misi-heading" className="relative isolate scroll-mt-24 overflow-hidden bg-[#163c30] text-white">
      <Image
        src="/images/pendidikan-mts.jpg"
        alt="Guru menjelaskan pelajaran di depan kelas dan para santri menyimak dari bangku belajar"
        aria-describedby="visi-photo-caption"
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#163c30]/85" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <header>
          <h2 id="visi-misi-heading" className="font-heading text-2xl font-semibold leading-tight sm:text-3xl">
            Visi &amp; Misi
          </h2>
        </header>

        <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
          <div className="grid gap-4 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
            <h3 id="visi-heading" className="text-base font-medium leading-7 text-brand-lime lg:pt-1">
              Visi Pesantren
            </h3>
            <div>
              <p className="max-w-3xl font-heading text-2xl font-medium leading-snug sm:text-[28px] lg:text-[32px]">
                Membentuk generasi Islami yang cerdas dan berkarakter rahmatan
                lil &apos;alamin.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                Menjadi lembaga pendidikan yang merangkul anak yatim dan kaum dhuafa.
              </p>
            </div>
          </div>
          <section aria-labelledby="misi-heading" className="grid gap-5 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
            <h3 id="misi-heading" className="text-base font-medium leading-7 text-brand-lime">
              Misi Lembaga
            </h3>
            <ol className="grid gap-7 lg:grid-cols-3 lg:gap-8">
              {MISI_LIST.map((misi) => (
                <li key={misi.nomor} className="grid min-w-0 grid-cols-[1.5rem_minmax(0,1fr)] content-start gap-x-3 lg:grid-cols-1 lg:gap-y-3">
                  <span aria-hidden="true" className="pt-0.5 font-mono text-xs leading-6 text-brand-lime">
                    {misi.nomor}
                  </span>
                  <div>
                    <h4 className="font-heading text-lg font-medium leading-snug lg:min-h-14">
                      {misi.title}
                    </h4>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-white/85">
                      {misi.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <p id="visi-photo-caption" className="mt-10 text-xs leading-6 text-white/75 lg:pl-52">
          Kegiatan belajar di MTs Al-Rahmah.
        </p>
      </div>
    </section>
  );
}
