import { PremiumButton } from "@/components/ui/PremiumButton";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-primary/60 lg:bg-brand-primary/50 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/80 via-brand-secondary/40 to-transparent z-20 pointer-events-none"></div>
        {/* Background Image */}
        <div className="w-full h-full bg-[url('/images/bgHero.jpeg')] bg-cover bg-center"></div>
      </div>

      <div className="container relative z-30 mx-auto px-4 md:px-6 lg:px-8 mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column - Content */}
        <div className="flex flex-col items-start text-left">
          <span className="inline-block py-1.5 px-6 rounded-full bg-brand-secondary/20 text-brand-soft-glow border border-brand-secondary/30 text-xs md:text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-2xl">
            Islamic Boarding School Premium
          </span>
          
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 max-w-5xl text-shadow-lg">
            Membentuk Generasi <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-brand-soft-glow">Qurani, Berakhlak,</span> dan Berprestasi
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-12 leading-relaxed font-light drop-shadow-md">
            Pondok Pesantren Al-Rahmah Walantaka mengintegrasikan pendidikan agama, pendidikan formal berkualitas tinggi, dan pembinaan karakter di lingkungan asrama yang modern.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-center my-2 justify-start w-full sm:w-auto">
            <PremiumButton href="/psb" variant="primary" icon className="w-full sm:w-auto px-10 py-4 text-lg">
              Daftar Sekarang
            </PremiumButton>
            <PremiumButton href="/profil" variant="white" className="w-full sm:w-auto px-10 py-4 text-lg bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md">
              Lihat Profil
            </PremiumButton>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="hidden lg:flex justify-end items-center relative h-full mt-16">
          {/* Glow backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/20 via-transparent to-brand-lime/10 rounded-3xl blur-2xl pointer-events-none z-0" />

          <div className="relative w-full max-w-sm xl:max-w-md" style={{ height: '85vh' }}>
            <Image
              src="/images/model.png"
              alt="Siswi berprestasi Pondok Pesantren Al-Rahmah"
              fill
              sizes="(max-width: 1280px) 384px, 448px"
              className="object-contain object-center drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-30 pointer-events-none">
        <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1">
          <div className="w-1.5 h-3 bg-brand-secondary rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
