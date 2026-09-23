import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowLeft, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Sejarah Al-Rahmah - Al-Rahmah",
  description:
    "Jejak perjuangan dan pengabdian Al-Rahmah Walantaka dari pengajian salafiyah hingga madrasah unggulan berakreditasi A.",
};

export default function SejarahPage() {
  return (
    <div className="pt-28 sm:pt-32 min-h-screen bg-surface/40">
      {/* ============================================================ */}
      {/* 1. HEADER HALAMAN: BERSIH & MINIMALIS                        */}
      {/* ============================================================ */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-6 sm:mb-8">
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 tracking-tight">
            Sejarah Al-Rahmah
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed">
            Jejak perjuangan dan pengabdian Al-Rahmah dari pengajian salafiyah hingga madrasah unggulan berakreditasi A.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. SECTION: TOKOH PENDIRI UTAMA (BUKAN CARD, FULL-WIDTH)     */}
      {/*    - Transisi Gradasi Lembut dari Section A ke Section B     */}
      {/*    - Latar Belakang Hijau #396e5f dengan Gradasi Halus Modern */}
      {/*    - Foto Asli K.H. Abdul Rasyid Muslim (Alm.) Tampak Jelas   */}
      {/*    - Desain Minimalis & Modern Tanpa Box / Card Border         */}
      {/* ============================================================ */}
      <section className="w-full bg-gradient-to-br from-[#3d7566] via-[#396e5f] to-[#2f5c4f] border-b border-[#2d564a] pt-16 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 text-white relative overflow-hidden">
        {/* Transisi Gradasi Halus: Dari Latar Section A (#E6E6E6) ke Section B (#396e5f) */}
        <div
          className="absolute inset-x-0 top-0 h-28 sm:h-36 lg:h-44 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, #E6E6E6 0%, rgba(230, 230, 230, 0.75) 20%, rgba(230, 230, 230, 0.35) 55%, transparent 100%)",
          }}
        />

        {/* Subtle Ambient Light Wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Foto K.H. Abdul Rasyid Muslim (Alm.) di sebelah Kiri */}
            <div className="lg:col-span-5 relative flex justify-center items-end">
              <div
                className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[460px] aspect-[534/721] flex items-end"
                style={{
                  maskImage:
                    "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.06) 10%, rgba(0,0,0,0.3) 22%, rgba(0,0,0,0.7) 34%, black 48%)",
                  WebkitMaskImage:
                    "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.06) 10%, rgba(0,0,0,0.3) 22%, rgba(0,0,0,0.7) 34%, black 48%)",
                }}
              >
                <Image
                  src="/images/rasyid-muslim.png"
                  alt="K.H. Abdul Rasyid Muslim (Alm.) - Inisiator & Pendiri Utama Pondok Pesantren Al-Rahmah"
                  fill
                  priority
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 380px, 460px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            {/* Narasi Editorial Minimalis di sebelah Kanan */}
            <div className="lg:col-span-7 space-y-6 text-left py-2">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald-300 block">
                  Inisiator &amp; Pendiri Utama
                </span>

                <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
                  K.H. Abdul Rasyid Muslim <span className="text-emerald-200/75 font-normal text-2xl sm:text-3xl lg:text-4xl">(Alm.)</span>
                </h2>

                <p className="text-xs sm:text-sm font-medium text-emerald-100/80">
                  Dikenal masyarakat sebagai K.H. Muslim / Kyai Rasyid
                </p>
              </div>

              <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed max-w-xl font-normal">
                Bersama sang istri, <strong className="text-white font-semibold">Umi Hj. Enung Nurhayati, S.Ag.</strong>, beliau meletakkan batu pertama pembangunan Al-Rahmah yang berakar dari keikhlasan pengajian tradisional (<em>salafiyah</em>) di Link. Lebak, hingga meresmikan Madrasah Aliyah Swasta pada tahun 2008. Seluruh keteladanan dan khitah perjuangan beliau terus hidup membina generasi santri berakhlakul karimah.
              </p>

              {/* Kutipan Mutiara Hikmah Minimalis */}
              <div className="pt-2 border-l-2 border-emerald-400/70 pl-5 max-w-lg">
                <p className="font-heading italic text-sm sm:text-base text-emerald-100 leading-relaxed">
                  &ldquo;Keikhlasan berjuang di surau sederhana adalah fondasi terkuat yang mengalirkan keberkahan bagi ribuan santri yang menuntut ilmu.&rdquo;
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SECTION: TITIK AWAL & BASIS KOMUNITAS (BUKAN CARD)        */}
      {/*    - Menggunakan foto arsip rintisan asli sebagai background */}
      {/*    - Penjelasan berada di sisi kanan tanpa card pembungkus   */}
      {/*    - Gradient scrim halus memastikan teks terbaca jelas       */}
      {/* ============================================================ */}
      <section className="w-full relative min-h-[580px] lg:min-h-[640px] flex items-center py-16 sm:py-24 lg:py-28 overflow-hidden text-white">
        {/* Background Image: Foto Asli Rintisan Pengajian Awal di Link. Lebak */}
        <Image
          src="/images/sejarah-titik-awal.jpg"
          alt="Dokumentasi asli sejarah titik awal pengajian salafiyah Al-Rahmah di Link. Lebak"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[25%_center] lg:object-[20%_center]"
        />

        {/* Ambient Gradient Scrim / Overlay: Transparan di kiri (fokus foto), gelap pekat di kanan (kontras teks) */}
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black/40 via-[#071711]/85 to-[#071711] lg:from-black/20 lg:via-[#071711]/85 lg:to-[#071711] pointer-events-none" />

        {/* Transisi Halus Atas (dari Section 2 hijau) & Bawah (ke Section 4 light surface) */}
        <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-[#2f5c4f]/90 via-[#2f5c4f]/40 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-32 bg-gradient-to-t from-surface via-surface/60 to-transparent pointer-events-none z-10" />

        {/* Konten Bersih Berbasis Tipografi Tanpa Pelapis Card */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Sisi Kiri: Terbuka untuk memperlihatkan keaslian foto bersejarah */}
            <div className="hidden lg:col-span-5 lg:flex flex-col justify-end h-full pt-44">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-white/90 text-xs w-fit shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <span className="font-medium tracking-wide">
                  Dokumentasi Arsip: Pengajian Salafiyah Rintisan di Link. Lebak
                </span>
              </div>
            </div>

            {/* Sisi Kanan: Penjelasan Sejarah Langsung di Atas Background (Tanpa Card) */}
            <div className="lg:col-span-6 lg:col-start-7 space-y-6">
              <div className="space-y-3">
                {/* Mobile Caption Tag */}
                <div className="lg:hidden inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-xs border border-white/15 text-emerald-300 text-[11px] font-medium w-fit mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Dokumentasi Arsip Rintisan</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <MapPin size={14} className="text-emerald-400 shrink-0" />
                  <span>Link. Lebak, Kel. Lebakwangi, Walantaka, Serang</span>
                </div>

                <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
                  Titik Awal &amp; Basis Komunitas
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-200/90 leading-relaxed font-normal">
                <p>
                  Jauh sebelum berkembang menjadi komplek pendidikan modern terpadu seperti saat ini,
                  aktivitas keagamaan dan dakwah Al-Rahmah berakar kuat di tengah-tengah masyarakat setempat,
                  tepatnya di Link. Lebak, Kelurahan Lebakwangi, Walantaka.
                </p>
                <p>
                  Pola pembelajarannya bermula dari pengajian tradisional (<em className="text-emerald-300 font-medium not-italic">salafiyah</em>) yang
                  didirikan guna menjawab kebutuhan bekal agama bagi anak-anak usia sekolah di sekitar
                  koridor jalan Ciruas-Petir. Dengan penuh ketulusan, <strong className="text-white font-semibold">K.H. Abdul Rasyid Muslim</strong> bersama{" "}
                  <strong className="text-white font-semibold">Umi Hj. Enung Nurhayati</strong> membimbing santri membaca Al-Qur&apos;an, memahami tauhid,
                  dan menanamkan adab serta akhlakul karimah dalam suasana kekeluargaan.
                </p>
                <p>
                  Tingginya antusiasme serta kepercayaan masyarakat sekitar menjadi pemicu utama bagi
                  perintis untuk memperluas jangkauan dakwah, hingga bertransformasi menjadi lembaga
                  pendidikan formal yang melahirkan generasi berprestasi.
                </p>
              </div>

              <div className="pt-4 border-t border-white/15 flex flex-wrap gap-2 text-xs font-medium text-emerald-100">
                <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs">
                  Akar Salafiyah Rintisan
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs">
                  Koridor Ciruas-Petir
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs">
                  Pendidikan Berbasis Umat
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <nav aria-label="Halaman tentang pesantren" className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link
          href="/tentang/visi-misi"
          className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Visi &amp; Misi
        </Link>
        <Link
          href="/tentang/pimpinan"
          className="inline-flex min-h-11 items-center gap-4 self-end text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
        >
          <span>
            <span className="block text-xs text-zinc-500">Selanjutnya</span>
            <span className="text-sm font-semibold">Nakhoda Al-Rahmah</span>
          </span>
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
}
