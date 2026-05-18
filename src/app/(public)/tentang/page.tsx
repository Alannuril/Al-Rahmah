import Link from "next/link";
import { Users, Building, Target, History, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Tentang Al-Rahmah",
  description: "Informasi lengkap mengenai Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function TentangPage() {
  const cards = [
    {
      title: "Pimpinan Pondok",
      desc: "Mengenal sosok inspiratif di balik Al-Rahmah",
      href: "/tentang/pimpinan",
      icon: <Users size={40} className="text-brand-primary" />,
      color: "bg-brand-primary/10"
    },
    {
      title: "Badan Wakaf",
      desc: "Lembaga pengelola amanah umat",
      href: "/tentang/badan-wakaf",
      icon: <Building size={40} className="text-brand-secondary" />,
      color: "bg-brand-secondary/10"
    },
    {
      title: "Visi & Misi",
      desc: "Arah dan tujuan pendidikan pesantren",
      href: "/tentang/visi-misi",
      icon: <Target size={40} className="text-brand-primary" />,
      color: "bg-brand-primary/10"
    },
    {
      title: "Sejarah",
      desc: "Jejak langkah perjuangan pesantren",
      href: "/tentang/sejarah",
      icon: <History size={40} className="text-brand-secondary" />,
      color: "bg-brand-secondary/10"
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-gray-50">
      {/* Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary/80 z-10"></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Tentang Al-Rahmah
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Mengenal lebih dekat visi, sejarah, dan elemen penting di Pondok Pesantren Al-Rahmah Walantaka.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <Link href={card.href} key={i} className="group">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className={`w-20 h-20 rounded-2xl ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h2>
                <p className="text-gray-600 mb-8 flex-grow">{card.desc}</p>
                <div className="flex items-center text-brand-primary font-semibold gap-2 group-hover:gap-4 transition-all">
                  <span>Lihat Selengkapnya</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
