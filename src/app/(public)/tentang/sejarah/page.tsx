import { History, Clock } from "lucide-react";

export const metadata = {
  title: "Sejarah - Al-Rahmah",
  description: "Sejarah berdirinya Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function SejarahPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-gray-50">
      {/* Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary/80 z-10"></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Sejarah Al-Rahmah
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Jejak langkah perjuangan dalam menegakkan pendidikan Islam
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                <History size={32} />
              </div>
              <h2 className="text-3xl font-heading font-bold text-gray-900">Awal Mula Berdiri</h2>
            </div>
            
            <div className="prose prose-lg text-gray-600 max-w-none space-y-6 leading-relaxed">
              <p>
                Pondok Pesantren Al-Rahmah Walantaka bermula dari sebuah cita-cita mulia untuk 
                membangun peradaban Islam melalui jalur pendidikan. Didirikan dengan landasan 
                keikhlasan dan tekad yang kuat, pesantren ini berawal dari sebuah majelis taklim kecil.
              </p>
              <p>
                Seiring berjalannya waktu dan tingginya antusiasme masyarakat sekitar terhadap 
                pendidikan agama yang terstruktur, majelis ini berkembang menjadi sebuah lembaga 
                pendidikan pondok pesantren yang mengintegrasikan sistem pendidikan salaf dan modern.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative border-l-4 border-brand-primary/20 ml-6 md:ml-12 space-y-12 pb-8">
            {[
              { year: "20XX", title: "Peletakan Batu Pertama", desc: "Pembangunan infrastruktur awal pesantren dimulai dengan dukungan penuh dari masyarakat sekitar dan para muhsinin." },
              { year: "20XX", title: "Peresmian Pondok Pesantren", desc: "Pondok Pesantren Al-Rahmah secara resmi dibuka dan mulai menerima santri angkatan pertama." },
              { year: "20XX", title: "Pendirian Lembaga Formal", desc: "Merespon kebutuhan pendidikan formal, didirikanlah unit sekolah dari tingkat menengah hingga atas di dalam lingkungan pesantren." },
              { year: "Sekarang", title: "Perkembangan Pesat", desc: "Kini Al-Rahmah telah menjadi salah satu pondok pesantren rujukan di wilayah Banten dengan fasilitas yang lengkap dan modern." },
            ].map((item, i) => (
              <div key={i} className="relative pl-8 md:pl-12">
                <div className="absolute -left-[18px] top-1 w-8 h-8 rounded-full bg-brand-primary border-4 border-white shadow-md"></div>
                <div className="inline-flex items-center gap-2 text-brand-secondary font-bold text-sm mb-2 bg-brand-secondary/10 px-3 py-1 rounded-full">
                  <Clock size={14} />
                  {item.year}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
