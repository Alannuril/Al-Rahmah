import { Building } from "lucide-react";

export const metadata = {
  title: "Badan Wakaf - Al-Rahmah",
  description: "Informasi mengenai Badan Wakaf Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function BadanWakafPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-gray-50">
      {/* Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary/80 z-10"></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Badan Wakaf
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Lembaga pengelola amanah umat untuk keberlangsungan pendidikan
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Building size={32} />
              </div>
              <h2 className="text-3xl font-heading font-bold text-gray-900">Tentang Badan Wakaf</h2>
            </div>
            
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="mb-4">
                Badan Wakaf Pondok Pesantren Al-Rahmah merupakan lembaga resmi yang ditugaskan 
                untuk mengelola, memelihara, dan mengembangkan aset-aset wakaf yang dipercayakan 
                oleh umat kepada pesantren.
              </p>
              <p>
                Wakaf merupakan pilar penting dalam kemandirian institusi pendidikan Islam. 
                Melalui pengelolaan wakaf yang profesional, transparan, dan produktif, kami 
                berkomitmen untuk mendukung seluruh kegiatan operasional dan pengembangan 
                Pondok Pesantren Al-Rahmah ke depannya.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Visi Badan Wakaf</h3>
              <p className="text-gray-600">
                Menjadi lembaga pengelola wakaf yang profesional, amanah, dan produktif 
                guna mewujudkan kemandirian finansial Pondok Pesantren Al-Rahmah.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-brand-primary mb-4">Misi Badan Wakaf</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Mengamankan aset-aset wakaf pesantren.</li>
                <li>Meningkatkan nilai tambah dan produktivitas aset wakaf.</li>
                <li>Menyalurkan hasil pengelolaan wakaf untuk pengembangan pendidikan.</li>
                <li>Membangun kepercayaan umat melalui transparansi dan akuntabilitas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
