import { Target, Compass, BookOpen, Heart, Award } from "lucide-react";

export const metadata = {
  title: "Visi & Misi - Al-Rahmah",
  description: "Visi dan Misi Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function VisiMisiPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-gray-50">
      {/* Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary/80 z-10"></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Visi & Misi
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Arah dan tujuan kami dalam mendidik generasi penerus bangsa
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Visi */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-brand-primary">
              <Target size={200} />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-semibold mb-6">
                <Target size={20} />
                Visi Kami
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6 leading-tight">
                "Menjadi Lembaga Pendidikan Islam Terdepan dalam Membentuk Generasi Qurani, Berakhlak Mulia, dan Berprestasi"
              </h2>
            </div>
          </div>

          {/* Misi */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/10 text-brand-secondary font-semibold mb-8">
              <Compass size={20} />
              Misi Kami
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <BookOpen size={32} />,
                  title: "Pendidikan Al-Quran",
                  desc: "Menyelenggarakan pendidikan Al-Quran secara komprehensif, mulai dari tahsin, tahfidz, hingga tafsir."
                },
                {
                  icon: <Heart size={32} />,
                  title: "Pembentukan Karakter",
                  desc: "Membentuk karakter santri yang berakhlakul karimah berlandaskan nilai-nilai ajaran Islam Ahlussunnah wal Jama'ah."
                },
                {
                  icon: <Award size={32} />,
                  title: "Keunggulan Akademik",
                  desc: "Menyelenggarakan pendidikan formal yang berkualitas unggul untuk membekali santri menghadapi tantangan global."
                }
              ].map((misi, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
                    {misi.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{misi.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{misi.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
