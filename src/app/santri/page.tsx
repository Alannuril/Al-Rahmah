import { SectionHeading } from "@/components/ui/SectionHeading";

export default function SantriPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-paper">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <SectionHeading 
            title="Kehidupan Santri" 
            subtitle="Lingkungan yang suportif untuk menumbuhkan adab, memperkuat ilmu, dan mengeratkan ukhuwah."
            badge="Dunia Pesantren"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-brand-primary/5 hover:shadow-2xl transition-shadow border border-gray-50 flex flex-col group">
            <div className="relative overflow-hidden h-64">
              <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8 flex-grow">
              <h3 className="font-heading font-bold text-2xl mb-4 text-brand-primary">Fasilitas Asrama Premium</h3>
              <p className="text-brand-primary/60 leading-relaxed font-medium">
                Dilengkapi dengan AC, ranjang yang nyaman, ruang belajar komunal, dan pengawasan musyrif/musyrifah 24 jam penuh untuk menjamin keamanan santri.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-brand-primary/5 hover:shadow-2xl transition-shadow border border-gray-50 flex flex-col group">
            <div className="relative overflow-hidden h-64">
              <img src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8 flex-grow">
              <h3 className="font-heading font-bold text-2xl mb-4 text-brand-primary">Ekstrakurikuler Aktif</h3>
              <p className="text-brand-primary/60 leading-relaxed font-medium">
                Kami menyediakan wadah pengembangan diri meliputi jurnalistik, pencak silat tapak suci, pramuka, club robotika, hingga desain grafis.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-brand-primary/5 hover:shadow-2xl transition-shadow border border-gray-50 flex flex-col group">
            <div className="relative overflow-hidden h-64">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8 flex-grow">
              <h3 className="font-heading font-bold text-2xl mb-4 text-brand-primary">Pembiasaan Ibadah</h3>
              <p className="text-brand-primary/60 leading-relaxed font-medium">
                Salat berjamaah tepat waktu, qiyamullail, halaqah tahfidz bada subuh dan maghrib, serta pembacaan kitab kuning klasik di malam hari.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
