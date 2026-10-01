import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function VisiMisiSection() {
  return (
    <section id="visi-misi" aria-labelledby="visi-misi-heading" className="relative isolate scroll-mt-24 overflow-hidden bg-[#163c30] text-white">
      <ScrollReveal variant="soft-zoom" duration={1.15} className="absolute inset-0">
        <Image
          src="/images/pendidikan-mts.jpg"
          alt="Guru menjelaskan pelajaran di depan kelas dan para santri menyimak dari bangku belajar"
          aria-describedby="visi-photo-caption"
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover object-center"
        />
      </ScrollReveal>
      <div aria-hidden="true" className="absolute inset-0 bg-[#163c30]/85" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <header>
          <ScrollReveal variant="soft-left" delay={0.12} duration={0.85}>
            <h2 id="visi-misi-heading" className="font-heading text-2xl font-semibold leading-tight sm:text-3xl">
              Visi &amp; Misi
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade" delay={0.3} duration={0.9} className="mt-4 max-w-3xl">
            <p className="text-sm leading-7 text-white/85 sm:text-base">
              Pondok Pesantren Al-Rahmah berdiri di atas dan untuk semua golongan,
              berpedoman pada Al-Qur&apos;an dan Hadits, bertekad menjadi perekat umat
              dalam menjalankan visi dan misinya yaitu:
            </p>
          </ScrollReveal>
        </header>

        <ScrollReveal variant="soft-up" delay={0.5} duration={0.95} className="mt-7 max-w-4xl space-y-4 text-balance font-heading text-xl font-medium leading-relaxed sm:mt-8 sm:text-2xl lg:text-[28px] lg:leading-snug">
          <p>
            Membentuk generasi Islami yang cerdas dan berkarakter rahmatan lil &apos;alamin
          </p>
          <p>
            dan menjadi lembaga pendidikan yang merangkul para anak yatim dan kaum dhuafa.
          </p>
        </ScrollReveal>
        <ScrollReveal variant="fade" delay={0.7} duration={0.85} className="mt-8">
          <p id="visi-photo-caption" className="text-xs leading-6 text-white/75">
            Kegiatan belajar di MTs Al-Rahmah.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
