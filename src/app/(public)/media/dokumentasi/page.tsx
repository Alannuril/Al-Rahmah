import { Camera } from "lucide-react";

export const metadata = {
  title: "Dokumentasi - Al-Rahmah",
  description: "Galeri dan dokumentasi Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function DokumentasiPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-gray-50">
      {/* Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary/80 z-10"></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Galeri Dokumentasi
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Momen-momen berharga di Pondok Pesantren Al-Rahmah
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                <Camera size={32} />
              </div>
              <h2 className="text-3xl font-heading font-bold text-gray-900">Album Foto</h2>
            </div>
            
            <div className="prose prose-lg text-gray-600 max-w-none space-y-6 leading-relaxed">
              <p className="text-center text-gray-500 italic">
                Galeri foto sedang dalam proses unggah.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
