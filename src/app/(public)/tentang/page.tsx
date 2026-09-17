import Link from "next/link";
import Image from "next/image";
import { Users, Building, Target, History, ArrowRight, BookOpen, Heart, Sparkles } from "lucide-react";

export const metadata = {
  title: "Tentang Al-Rahmah",
  description: "Informasi lengkap mengenai Pondok Pesantren Al-Rahmah Walantaka Serang.",
};

const cards = [
  {
    title: "Nakhoda Al-Rahmah",
    desc: "Mengenal figur teladan dan sosok pimpinan di balik amanah Pondok Pesantren Al-Rahmah.",
    href: "/tentang/pimpinan",
    icon: Users,
  },
  {
    title: "Badan Wakaf",
    desc: "Lembaga penjaga amanah wakaf umat untuk keberlanjutan dakwah dan sarana pendidikan.",
    href: "/tentang/pimpinan#badan-wakaf",
    icon: Building,
  },
  {
    title: "Visi & Misi",
    desc: "Generasi cerdas berkarakter rahmatan lil 'alamin serta merangkul anak yatim & dhuafa.",
    href: "/tentang/visi-misi",
    icon: Target,
  },
  {
    title: "Sejarah Pesantren",
    desc: "Perjalanan dedikasi dan jejak langkah berdirinya Al-Rahmah sejak tahun 2005.",
    href: "/tentang/sejarah",
    icon: History,
  },
];

const pillars = [
  {
    title: "Rahmatan Lil 'Alamin",
    icon: BookOpen,
  },
  {
    title: "Merangkul Dhuafa & Yatim",
    icon: Heart,
  },
  {
    title: "Perekat Umat",
    icon: Sparkles,
  },
];

export default function TentangPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-16 sm:pt-20 md:pt-24 bg-surface/40">
      {/* Header Banner - Sleek & Modern */}
      <section className="relative pt-10 pb-24 sm:pt-14 sm:pb-28 md:pt-16 md:pb-32 bg-brand-primary text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-secondary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight">
            Tentang Al-Rahmah
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed mt-1.5 sm:mt-2">
            Berdiri di atas dan untuk semua golongan, berpedoman pada Al-Qur&apos;an dan Hadits, bertekad menjadi perekat umat.
          </p>
        </div>
      </section>

      {/* Main Content with Split Layout & Overlap */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 -mt-10 sm:-mt-14 md:-mt-16 relative z-20 pb-16 md:pb-24 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Left: Compact Campus Photo & Narrative Profile */}
          <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs flex flex-col justify-between gap-4 sm:gap-5">
            <div>
              <div className="relative w-full h-36 sm:h-48 md:h-52 rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-100 group">
                <Image
                  src="/images/gedung1.jpeg"
                  alt="Gedung Pondok Pesantren Al-Rahmah"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl bg-white/95 backdrop-blur-sm text-[10px] sm:text-[11px] font-bold text-brand-primary shadow-xs">
                  Pondok Pesantren Al-Rahmah
                </span>
              </div>

              <h2 className="font-heading font-bold text-base sm:text-lg text-zinc-900 mt-3.5 sm:mt-4 tracking-tight">
                Cerdas &amp; Berkarakter Rahmatan Lil &apos;Alamin
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 leading-relaxed">
                Didirikan sejak tahun 2005 di Kota Serang untuk semua golongan dengan berpedoman pada Al-Qur&apos;an dan Hadits, bertekad menjadi perekat umat, serta merangkul para anak yatim dan kaum dhuafa.
              </p>
            </div>

            {/* Nilai / Pilar Pokok - Minimalist Clean Chips */}
            <div className="pt-3 sm:pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-1.5 sm:gap-2">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-50 text-zinc-700 text-[11px] sm:text-xs font-medium"
                  >
                    <Icon size={12} className="text-brand-primary shrink-0" />
                    <span>{pillar.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: 4 Pillar Navigation Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-3 sm:gap-4">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Link href={card.href} key={i} className="group block h-full">
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 h-full flex items-start gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-heading font-bold text-sm sm:text-base md:text-lg text-zinc-900 group-hover:text-brand-primary transition-colors tracking-tight">
                          {card.title}
                        </h3>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-50 text-zinc-400 group-hover:bg-brand-primary group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-500 mt-0.5 sm:mt-1 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Action Ribbon */}
        <div className="mt-8 sm:mt-10 md:mt-12 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-heading font-bold text-sm sm:text-base md:text-lg text-zinc-900 tracking-tight">
              Ingin Mengenal Lebih Dekat Pondok Pesantren Al-Rahmah?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5 sm:mt-1">
              Pintu silaturahmi selalu terbuka bagi orang tua dan calon santri untuk berkunjung langsung.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all"
            >
              <span>Kunjungi Pesantren</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
