import Image from "next/image";
import { Users } from "lucide-react";

export const metadata = {
  title: "Pimpinan Pondok - Al-Rahmah",
  description: "Profil Pimpinan Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function PimpinanPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-gray-50">
      {/* Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary/80 z-10"></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Pimpinan Pondok
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Mengenal lebih dekat sosok inspiratif di balik Pondok Pesantren Al-Rahmah
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="relative h-[400px] md:h-auto bg-brand-primary/10">
              <div className="absolute inset-0 flex items-center justify-center text-brand-primary/20">
                <Users size={120} />
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-sm mb-4 w-max">
                Profil Pimpinan
              </div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">K.H. [Nama Pimpinan]</h2>
              <p className="text-brand-secondary font-medium mb-6">Pimpinan Pondok Pesantren Al-Rahmah</p>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Beliau adalah sosok ulama yang berdedikasi tinggi dalam mengembangkan pendidikan Islam di Banten, 
                  khususnya melalui Pondok Pesantren Al-Rahmah Walantaka.
                </p>
                <p>
                  Dengan visi yang kuat untuk mencetak generasi qurani yang berakhlakul karimah dan berprestasi, 
                  beliau terus membimbing para santri dan tenaga pendidik untuk mencapai keunggulan baik dalam 
                  ilmu agama maupun ilmu pengetahuan umum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
