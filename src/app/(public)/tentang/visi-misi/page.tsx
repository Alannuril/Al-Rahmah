import { Target, Compass, BookOpen, Heart, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Visi & Misi - Al-Rahmah",
  description: "Visi dan Misi Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function VisiMisiPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Visi & Misi"
          subtitle="Pondok Pesantren Al-Rahmah berdiri di atas dan untuk semua golongan, berpedoman pada Al-Qur'an dan Hadits, bertekad menjadi perekat umat."
          centered
        />

        {/* Content */}
        <div className="mt-10 sm:mt-14 max-w-4xl mx-auto space-y-12">
          {/* Visi */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-xs mb-4">
                <Target size={14} />
                <span>Visi &amp; Falsafah</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium mb-3 leading-relaxed">
                Pondok Pesantren Al-Rahmah berdiri di atas dan untuk semua golongan, berpedoman pada Al-Qur&apos;an dan Hadits, bertekad menjadi perekat umat dalam menjalankan visi dan misinya yaitu:
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-zinc-900 leading-snug tracking-tight">
                &ldquo;Membentuk Generasi Islami yang Cerdas dan Berkarakter Rahmatan Lil &apos;Alamin, dan Menjadi Lembaga Pendidikan yang Merangkul Para Anak Yatim dan Kaum Dhuafa&rdquo;
              </h2>
            </div>
          </div>

          {/* Misi */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary font-semibold text-xs mb-6">
              <Compass size={14} />
              <span>Misi Lembaga</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: BookOpen,
                  title: "Generasi Cerdas & Rahmatan Lil 'Alamin",
                  desc: "Membentuk generasi Islami yang berilmu, cerdas, berakhlak mulia, dan berkarakter rahmatan lil 'alamin.",
                },
                {
                  icon: Heart,
                  title: "Merangkul Yatim & Kaum Dhuafa",
                  desc: "Menjadi lembaga pendidikan yang merangkul, membina, dan memberi akses pendidikan bermutu bagi anak yatim dan kaum dhuafa.",
                },
                {
                  icon: Award,
                  title: "Perekat Umat & Semua Golongan",
                  desc: "Berdiri di atas dan untuk semua golongan, berpedoman teguh pada Al-Qur'an dan Hadits sebagai pemersatu umat.",
                },
              ].map((misi, i) => {
                const Icon = misi.icon;
                return (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-3xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col justify-start"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-4">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <h3 className="text-base font-heading font-bold text-zinc-900 mb-2 tracking-tight">
                      {misi.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                      {misi.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
