import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Pendidikan - Al-Rahmah",
  description:
    "Program pendidikan Madrasah Tsanawiyah (MTs) dan Madrasah Aliyah (MA) Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function PendidikanPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-0 min-h-screen bg-surface/40">
      {/* ============================================================ */}
      {/* 1. SEKSI ATAS: HEADER & MTs (DALAM CONTAINER LEGA)           */}
      {/* ============================================================ */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Header Bersih & Minimalis */}
        <div className="mb-8 sm:mb-12">
          <SectionHeading title="Pendidikan" centered />
        </div>

        {/* Narasi Pengantar Visi & Misi Al-Rahmah */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed">
            Berdiri untuk semua golongan berlandaskan Al-Qur&apos;an dan Hadits, Pondok Pesantren Al-Rahmah berkomitmen mencetak generasi cerdas berkarakter <span className="text-brand-primary font-semibold">rahmatan lil &apos;alamin</span>, serta merangkul anak yatim dan dhuafa melalui pendidikan berkualitas.
          </p>
        </div>

        {/* Jenjang 1: Madrasah Tsanawiyah (MTs) */}
        <section className="mb-12 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
            {/* Visual Foto Pendidikan Islami Santri Belajar */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[16/11] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-100 shadow-xs border border-zinc-200/80">
                <img
                  src="/images/pendidikan-mts.jpg"
                  alt="Suasana kegiatan belajar mengajar santri Madrasah Tsanawiyah (MTs) Al-Rahmah"
                  className="w-full h-full object-cover object-left"
                />
              </div>
            </div>

            {/* Teks Editorial MTs */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              <span className="text-xs font-semibold text-brand-secondary mb-2">
                Tingkat Menengah Pertama
              </span>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-4">
                Madrasah Tsanawiyah (MTs)
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed mb-6">
                Fase awal pembinaan yang menitikberatkan pada penanaman adab dan akhlakul karimah, pembentukan karakter mandiri, serta peletakan fondasi keilmuan Al-Qur&apos;an dan sains. Santri dibina dalam suasana kekeluargaan yang penuh keteladanan untuk membangun rasa percaya diri dan kepedulian terhadap sesama.
              </p>

              {/* Poin Esensial */}
              <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-zinc-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <span>Penguatan hafalan Al-Qur&apos;an (tahfidz) dengan bimbingan makhraj dan tajwid yang tepat.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <span>Pembiasaan adab harian, ibadah berjamaah, dan disiplin hidup mandiri di lingkungan asrama.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <span>Kurikulum terpadu yang memadukan ilmu keagamaan Islam dengan sains dan teknologi.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <span>Pemberian akses pendidikan yang setara dan penuh kasih sayang bagi santri yatim dan dhuafa.</span>
                </div>
              </div>

              <div>
                <Link
                  href="/psb"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-primary hover:gap-2.5 transition-all"
                >
                  <span>Pendaftaran Santri Baru MTs</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* 2. SEKSI FULL-WIDTH SECTION: LANDASAN PENDIDIKAN AL-RAHMAH   */}
      {/* (Transisi Lembut & Elegan, Menyatu Mulus Tanpa Warna Menabrak) */}
      {/* ============================================================ */}
      <section className="w-full relative overflow-hidden py-24 sm:py-32 md:py-36 my-6 sm:my-12">
        {/* Kontainer Background Foto & Overlay dengan Masking Fade Halus Atas & Bawah */}
        <div className="absolute inset-0 z-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)]">
          <img
            src="https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1600&auto=format&fit=crop"
            alt="Kajian Al-Qur'an dan Pendidikan Santri"
            className="w-full h-full object-cover scale-105"
          />
          {/* Subtle Balanced Emerald Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-[#254f43]/90 to-brand-primary/95" />
        </div>

        {/* Hairline Divider Halus di Batas Atas & Bawah (Aksen Minimalis) */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent pointer-events-none" />

        {/* Teks Pesan Filosofis Al-Rahmah di Tengah Kontainer */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl relative z-10 text-center text-white space-y-4">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-brand-lime/90 block">
            Landasan Pendidikan Al-Rahmah
          </span>
          <p className="font-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed sm:leading-snug tracking-tight text-white drop-shadow-xs">
            &ldquo;Mendidik bukan sekadar mentransfer ilmu, melainkan menanamkan adab, merawat fitrah keimanan, dan merangkul setiap santri agar tumbuh menjadi pribadi yang bermanfaat bagi umat.&rdquo;
          </p>
          <p className="text-xs sm:text-sm md:text-base text-white/85 max-w-xl mx-auto leading-relaxed">
            Berpedoman teguh pada Al-Qur&apos;an dan Hadits sebagai perekat persatuan ummat.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SEKSI MA: MADRASAH ALIYAH (DALAM CONTAINER)              */}
      {/* ============================================================ */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl pb-16 sm:pb-24">
        {/* Jenjang 2: Madrasah Aliyah (MA) (Tata Letak Bergantian / Alternating) */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
            {/* Teks Editorial MA (Kiri di Desktop) */}
            <div className="lg:col-span-6 flex flex-col justify-start order-2 lg:order-1">
              <span className="text-xs font-semibold text-brand-secondary mb-2">
                Tingkat Menengah Atas
              </span>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-4">
                Madrasah Aliyah (MA)
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed mb-6">
                Jenjang lanjutan yang berorientasi pada kematangan intelektual, kepemimpinan, dan integritas moral. Kurikulum sains dan keislaman dirancang terpadu guna mempersiapkan santri berkiprah di masyarakat luas maupun melanjutkan studi ke jenjang perguruan tinggi, dengan tetap menjaga kerendahan hati dan kepedulian sosial.
              </p>

              {/* Poin Esensial */}
              <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-zinc-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <span>Pendalaman literatur keislaman klasik dan kajian Al-Qur&apos;an kontemporer.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <span>Penguasaan sains, matematika, dan wawasan kebangsaan yang berkarakter islami.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <span>Pembekalan kepemimpinan, dakwah santun, dan kemampuan komunikasi santri.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <span>Program pembinaan lanjutan dan beasiswa prestasi bagi anak yatim dan santri dhuafa.</span>
                </div>
              </div>

              <div>
                <Link
                  href="/psb"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-primary hover:gap-2.5 transition-all"
                >
                  <span>Pendaftaran Santri Baru MA</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Visual Foto Kelas Santri Belajar */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="relative aspect-[16/11] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-100 shadow-xs border border-zinc-200/80">
                <img
                  src="/images/pendidikan-ma.jpg"
                  alt="Santriwati Madrasah Aliyah (MA) Al-Rahmah berbaris tertib di lingkungan pesantren"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* 4. SEKSI PSB: INFORMASI PENDAFTARAN SANTRI BARU (FULL WIDTH) */}
      {/* (Design System: Clean White Section with Hairline Divider)   */}
      {/* ============================================================ */}
      <section className="w-full relative overflow-hidden bg-white border-t border-zinc-200/80 py-16 sm:py-24">
        {/* Modern Hairline Divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
          {/* Badge Ikon Elegan Sesuai Design System */}
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={22} />
          </div>

          <span className="text-xs font-semibold tracking-wider uppercase text-brand-secondary block mb-2">
            Penerimaan Santri Baru (PSB)
          </span>

          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
            Informasi Pendaftaran Santri Baru Al-Rahmah
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-zinc-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Pendaftaran santri baru jenjang Madrasah Tsanawiyah (MTs) dan Madrasah Aliyah (MA) dibuka untuk seluruh kalangan masyarakat. Dapatkan kemudahan informasi berkas persyaratan, jadwal observasi, serta beasiswa bagi santri berprestasi, anak yatim, dan kaum dhuafa.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/psb"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-sm"
            >
              <span>Portal PSB Online</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/kontak"
              className="px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs sm:text-sm font-semibold transition-all"
            >
              Hubungi Sekretariat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
