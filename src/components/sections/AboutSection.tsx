import Link from "next/link";
import Image from "next/image";
import { Users, Sparkles, Target, History, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const aboutCards = [
  {
    title: "Nakhoda Al-Rahmah",
    desc: "Figur teladan & pengasuh",
    href: "/tentang#nakhoda",
    icon: Users,
  },
  {
    title: "Panca Jiwa",
    desc: "Falsafah karakter santri",
    href: "/tentang#panca-jiwa",
    icon: Sparkles,
  },
  {
    title: "Visi & Misi",
    desc: "Arah & komitmen pendidikan",
    href: "/tentang#visi-misi",
    icon: Target,
  },
  {
    title: "Sejarah Pesantren",
    desc: "Dedikasi sejak tahun 2005",
    href: "/tentang#sejarah",
    icon: History,
  },
];

export function AboutSection() {
  return (
    <section className="relative py-10 sm:py-14 md:py-18 bg-surface/40 overflow-hidden">
      {/* Modern Hairline Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Heading - Ringkas & Padat */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <SectionHeading
            title="Sekilas Tentang Al-Rahmah"
            subtitle="Berdiri di atas dan untuk semua golongan, berpedoman pada Al-Qur'an dan Hadits sebagai perekat umat."
            centered
            className="mb-6 sm:mb-10"
          />
        </ScrollReveal>

        {/* Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          {/* Left Column: Foto Pondok (Slide-in from Left) */}
          <ScrollReveal variant="slide-left" duration={0.7} className="lg:col-span-5 flex flex-col">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:flex-1 min-h-[260px] lg:min-h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs group bg-zinc-100">
              <Image
                src="/images/gedung1.jpeg"
                alt="Gedung Pondok Pesantren Al-Rahmah"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <span className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl bg-white/95 backdrop-blur-sm text-[10px] sm:text-[11px] font-bold text-brand-primary shadow-xs">
                Pondok Pesantren Al-Rahmah
              </span>
            </div>
          </ScrollReveal>

          {/* Right Column: Narasi Singkat, 4 Kartu & Tombol Selengkapnya (Slide-in from Right) */}
          <ScrollReveal variant="slide-right" duration={0.7} delay={0.15} className="lg:col-span-7 flex flex-col justify-center">
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg lg:text-xl text-zinc-900 tracking-tight">
                Cerdas &amp; Berkarakter Rahmatan Lil &apos;Alamin
              </h3>
              <p className="text-zinc-600 text-xs sm:text-sm mt-1 sm:mt-1.5 leading-relaxed">
                Berdiri sejak tahun 2005 berpedoman pada Al-Qur&apos;an dan Hadits untuk mencetak generasi Islami yang cerdas, berkarakter rahmatan lil &apos;alamin, serta merangkul anak yatim dan kaum dhuafa.
              </p>
            </div>

            {/* 4 Cards: Grid 2 Kolom Kompak di Mobile & Desktop with Stagger */}
            <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 gap-2.5 sm:gap-3.5 mt-4 sm:mt-5">
              {aboutCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <StaggerItem key={idx} variant="zoom-in">
                    <Link
                      href={card.href}
                      className="group bg-white rounded-2xl p-3 sm:p-4 shadow-xs hover:shadow-md hover:-translate-y-0.5 border border-zinc-100/80 transition-all duration-200 flex flex-col justify-between gap-2.5 h-full"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 flex items-center justify-center shrink-0">
                          <Icon size={16} strokeWidth={1.8} />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-zinc-50 text-zinc-400 group-hover:bg-brand-primary group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                          <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-zinc-900 group-hover:text-brand-primary transition-colors tracking-tight">
                          {card.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 line-clamp-1">
                          {card.desc}
                        </p>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Tombol Selengkapnya di Bawah 4 Card (Full Width) */}
            <div className="mt-4 sm:mt-5">
              <Link
                href="/tentang"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-medium text-xs sm:text-sm shadow-xs hover:shadow-md transition-all w-full text-center"
              >
                <span>Selengkapnya Tentang Pesantren</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
