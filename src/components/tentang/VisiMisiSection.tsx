import Image from "next/image";

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
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">
            Pondok Pesantren Al-Rahmah berdiri di atas dan untuk semua golongan,
            berpedoman pada Al-Qur&apos;an dan Hadits, bertekad menjadi perekat umat
            dalam menjalankan visi dan misinya yaitu:
          </p>
        </header>

        <div className="mt-7 max-w-4xl space-y-4 text-balance font-heading text-xl font-medium leading-relaxed sm:mt-8 sm:text-2xl lg:text-[28px] lg:leading-snug">
          <p>
            Membentuk generasi Islami yang cerdas dan berkarakter rahmatan lil &apos;alamin
          </p>
          <p>
            dan menjadi lembaga pendidikan yang merangkul para anak yatim dan kaum dhuafa.
          </p>
        </div>
        <p id="visi-photo-caption" className="mt-8 text-xs leading-6 text-white/75">
          Kegiatan belajar di MTs Al-Rahmah.
        </p>
      </div>
    </section>
  );
}
