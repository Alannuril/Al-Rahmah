import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Pendidikan - Al-Rahmah",
  description:
    "Program pendidikan Madrasah Tsanawiyah (MTs) dan Madrasah Aliyah (MA) Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function PendidikanPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="bg-[#f4f7f4] pb-7 pt-28 sm:pb-9 sm:pt-32">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 text-left sm:px-6 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:items-center md:gap-10 lg:px-8">
          <ScrollReveal variant="soft-up" duration={0.8}>
            <h1 className="font-heading text-[28px] font-semibold leading-tight text-brand-primary sm:text-[32px]">
              Pendidikan
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade" delay={0.2} duration={0.85} className="hidden md:block">
            <p className="max-w-2xl text-sm leading-6 text-zinc-600 sm:text-[15px] sm:leading-7">
              Pendidikan berlandaskan Al-Qur&apos;an dan Hadits untuk generasi cerdas berkarakter <span className="font-semibold text-brand-primary">rahmatan lil &apos;alamin</span>, terbuka bagi semua, termasuk anak yatim dan dhuafa.
            </p>
          </ScrollReveal>
        </div>
      </header>

      <section aria-labelledby="mts-heading" className="relative isolate overflow-hidden py-9 max-lg:bg-zinc-950 sm:py-12 lg:py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[5fr_6fr] lg:gap-12 lg:px-8">
          <div className="relative aspect-[3/2] min-w-0 overflow-hidden rounded-lg bg-zinc-100 max-lg:absolute max-lg:inset-0 max-lg:-z-10 max-lg:aspect-auto max-lg:rounded-none max-lg:bg-zinc-950">
            <ScrollReveal variant="soft-zoom" duration={1.05} className="absolute inset-0">
              <Image
                src="/images/pendidikan-mts.jpg"
                alt="Suasana kegiatan belajar mengajar santri Madrasah Tsanawiyah (MTs) Al-Rahmah"
                fill
                loading="eager"
                sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 42vw, 530px"
                className="object-cover object-left max-lg:object-center"
              />
            </ScrollReveal>
            <div aria-hidden="true" className="absolute inset-0 bg-black/65 lg:hidden" />
          </div>

          <div className="min-w-0">
            <ScrollReveal variant="soft-left" delay={0.16} duration={0.85} className="mb-3">
              <p className="mb-1.5 text-xs font-semibold leading-5 text-brand-primary max-lg:text-white/85">
                Tingkat Menengah Pertama
              </p>
              <h2 id="mts-heading" className="font-heading text-2xl font-semibold leading-tight text-zinc-900 max-lg:text-white sm:text-[28px]">
                Madrasah Tsanawiyah (MTs)
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="fade" delay={0.34} duration={0.9}>
              <p className="text-sm leading-6 text-zinc-600 max-lg:text-white/90 sm:text-[15px] sm:leading-7">
                Fase awal pembinaan yang menitikberatkan pada penanaman adab dan akhlakul karimah, pembentukan karakter mandiri, serta peletakan fondasi keilmuan Al-Qur&apos;an dan sains. Santri dibina dalam suasana kekeluargaan yang penuh keteladanan untuk membangun rasa percaya diri dan kepedulian terhadap sesama.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="soft-up" delay={0.52} duration={0.9} className="mt-4">
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600 marker:text-brand-primary max-lg:text-white/90 max-lg:marker:text-white/80">
                <li className="pl-1">
                  Penguatan hafalan Al-Qur&apos;an (tahfidz) dengan bimbingan makhraj dan tajwid yang tepat.
                </li>
                <li className="pl-1">
                  Pembiasaan adab harian, ibadah berjamaah, dan disiplin hidup mandiri di lingkungan asrama.
                </li>
                <li className="pl-1">
                  Kurikulum terpadu yang memadukan ilmu keagamaan Islam dengan sains dan teknologi.
                </li>
                <li className="pl-1">
                  Pemberian akses pendidikan yang setara dan penuh kasih sayang bagi santri yatim dan dhuafa.
                </li>
              </ul>
            </ScrollReveal>
            <ScrollReveal variant="soft-right" delay={0.7} duration={0.85} className="mt-4">
              <Link
                href="/psb"
                className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm py-2 text-sm font-semibold leading-6 text-brand-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary max-lg:text-white max-lg:focus-visible:outline-white"
              >
                <span>Pendaftaran Santri Baru MTs</span>
                <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="landasan-heading" className="relative isolate overflow-hidden bg-[#1c483a] py-9 text-white sm:py-12 lg:py-14">
        <div className="absolute inset-0 -z-10">
          <ScrollReveal variant="soft-zoom" duration={1.15} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1600&auto=format&fit=crop"
              alt="Kajian Al-Qur'an dan Pendidikan Santri"
              fill
              sizes="100vw"
              unoptimized
              className="object-cover"
            />
          </ScrollReveal>
          <div className="absolute inset-0 bg-[#163c30]/90" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade" delay={0.12} duration={0.85} className="max-w-4xl">
            <h2 id="landasan-heading" className="text-xs font-semibold leading-5 text-brand-lime">
              Landasan Pendidikan Al-Rahmah
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="soft-up" delay={0.3} duration={0.95} className="mt-4 max-w-4xl">
            <blockquote>
              <p className="text-balance font-heading text-xl font-medium leading-normal sm:text-2xl lg:text-[28px] lg:leading-snug">
                &ldquo;Mendidik bukan sekadar mentransfer ilmu, melainkan menanamkan adab, merawat fitrah keimanan, dan merangkul setiap santri agar tumbuh menjadi pribadi yang bermanfaat bagi umat.&rdquo;
              </p>
            </blockquote>
          </ScrollReveal>
          <ScrollReveal variant="fade" delay={0.5} duration={0.9} className="mt-4 max-w-xl">
            <p className="text-sm leading-6 text-white/85">
              Berpedoman teguh pada Al-Qur&apos;an dan Hadits sebagai perekat persatuan ummat.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section aria-labelledby="ma-heading" className="relative isolate overflow-hidden bg-[#f1f6f2] py-9 max-lg:bg-zinc-950 sm:py-12 lg:py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[6fr_5fr] lg:gap-12 lg:px-8">
          <div className="order-2 min-w-0 lg:order-1">
            <ScrollReveal variant="soft-right" delay={0.16} duration={0.85} className="mb-3">
              <p className="mb-1.5 text-xs font-semibold leading-5 text-brand-primary max-lg:text-white/85">
                Tingkat Menengah Atas
              </p>
              <h2 id="ma-heading" className="font-heading text-2xl font-semibold leading-tight text-zinc-900 max-lg:text-white sm:text-[28px]">
                Madrasah Aliyah (MA)
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="fade" delay={0.34} duration={0.9}>
              <p className="text-sm leading-6 text-zinc-600 max-lg:text-white/90 sm:text-[15px] sm:leading-7">
                Jenjang lanjutan yang berorientasi pada kematangan intelektual, kepemimpinan, dan integritas moral. Kurikulum sains dan keislaman dirancang terpadu guna mempersiapkan santri berkiprah di masyarakat luas maupun melanjutkan studi ke jenjang perguruan tinggi, dengan tetap menjaga kerendahan hati dan kepedulian sosial.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="soft-up" delay={0.52} duration={0.9} className="mt-4">
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600 marker:text-brand-primary max-lg:text-white/90 max-lg:marker:text-white/80">
                <li className="pl-1">
                  Pendalaman literatur keislaman klasik dan kajian Al-Qur&apos;an kontemporer.
                </li>
                <li className="pl-1">
                  Penguasaan sains, matematika, dan wawasan kebangsaan yang berkarakter islami.
                </li>
                <li className="pl-1">
                  Pembekalan kepemimpinan, dakwah santun, dan kemampuan komunikasi santri.
                </li>
                <li className="pl-1">
                  Program pembinaan lanjutan dan beasiswa prestasi bagi anak yatim dan santri dhuafa.
                </li>
              </ul>
            </ScrollReveal>
            <ScrollReveal variant="soft-left" delay={0.7} duration={0.85} className="mt-4">
              <Link
                href="/psb"
                className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm py-2 text-sm font-semibold leading-6 text-brand-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary max-lg:text-white max-lg:focus-visible:outline-white"
              >
                <span>Pendaftaran Santri Baru MA</span>
                <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="relative order-1 aspect-[3/2] min-w-0 overflow-hidden rounded-lg bg-zinc-100 max-lg:absolute max-lg:inset-0 max-lg:-z-10 max-lg:aspect-auto max-lg:rounded-none max-lg:bg-zinc-950 lg:order-2">
            <ScrollReveal variant="soft-zoom" duration={1.05} className="absolute inset-0">
              <Image
                src="/images/pendidikan-ma.jpg"
                alt="Santriwati Madrasah Aliyah (MA) Al-Rahmah berbaris tertib di lingkungan pesantren"
                fill
                sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 42vw, 530px"
                className="object-cover"
              />
            </ScrollReveal>
            <div aria-hidden="true" className="absolute inset-0 bg-black/65 lg:hidden" />
          </div>
        </div>
      </section>

      <section aria-labelledby="pendaftaran-heading" className="bg-white py-9 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="soft-up" duration={0.8} className="max-w-3xl">
            <p className="mb-2 text-xs font-semibold leading-5 text-brand-primary">
              Penerimaan Santri Baru (PSB)
            </p>
            <h2 id="pendaftaran-heading" className="text-balance font-heading text-xl font-semibold leading-snug text-zinc-900 sm:text-2xl">
              Informasi Pendaftaran Santri Baru Al-Rahmah
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade" delay={0.2} duration={0.85} className="mt-3 max-w-2xl">
            <p className="text-sm leading-6 text-zinc-600">
              Pendaftaran santri baru jenjang Madrasah Tsanawiyah (MTs) dan Madrasah Aliyah (MA) dibuka untuk seluruh kalangan masyarakat. Dapatkan kemudahan informasi berkas persyaratan, jadwal observasi, serta beasiswa bagi santri berprestasi, anak yatim, dan kaum dhuafa.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="soft-right" delay={0.4} duration={0.85} className="mt-5">
            <Link
              href="/psb"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-[13px] font-semibold leading-6 text-white transition-colors hover:bg-[#2a594b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary sm:px-5"
            >
              <span>Portal PSB Online</span>
              <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
