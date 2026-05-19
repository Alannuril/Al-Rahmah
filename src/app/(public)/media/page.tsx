import { GraduationCap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Media & Prestasi - Al-Rahmah",
  description: "Media informasi dan prestasi santri Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function MediaPage() {
  const menus = [
    { name: "Berita", href: "/media/berita", desc: "Informasi dan kabar terbaru dari pesantren" },
    { name: "Kejuaraan", href: "/media/kejuaraan", desc: "Prestasi gemilang santri Al-Rahmah" },
    { name: "Kegiatan", href: "/media/kegiatan", desc: "Agenda dan kegiatan harian santri" },
    { name: "Dokumentasi", href: "/media/dokumentasi", desc: "Galeri foto dan video momen berharga" }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-gray-50">
      {/* Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary/80 z-10"></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Media & Prestasi
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Pusat informasi, kegiatan, dokumentasi, dan prestasi santri
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {menus.map((menu, i) => (
            <Link key={i} href={menu.href} className="group">
              <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors duration-300">
                    <GraduationCap size={28} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-gray-900 group-hover:text-brand-primary transition-colors">{menu.name}</h2>
                </div>
                <p className="text-gray-600 text-lg">
                  {menu.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
