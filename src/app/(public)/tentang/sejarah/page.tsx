import { History, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Sejarah - Al-Rahmah",
  description: "Sejarah berdirinya Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function SejarahPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Sejarah Al-Rahmah"
          subtitle="Jejak langkah perjuangan dan dedikasi dalam menegakkan pendidikan Islam terpadu sejak 2005."
          centered
        />

        {/* Content */}
        <div className="mt-10 sm:mt-14 max-w-4xl mx-auto space-y-10">
          {/* Awal Mula Berdiri */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center">
                <History size={20} strokeWidth={1.8} />
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 tracking-tight">
                Awal Mula Berdiri
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
              <p>
                Pondok Pesantren Al-Rahmah Walantaka bermula dari cita-cita mulia untuk 
                membangun generasi Islam yang cerdas dan berkarakter. Didirikan dengan landasan 
                keikhlasan dan tekad yang kuat, berdiri di atas dan untuk semua golongan, 
                berpedoman pada Al-Qur&apos;an dan Hadits sebagai perekat persatuan umat.
              </p>
              <p>
                Seiring waktu dan tingginya kepercayaan kaum muslimin, Al-Rahmah terus bertumbuh 
                menjadi institusi pendidikan Islam yang berdedikasi mencetak generasi rahmatan lil &apos;alamin, 
                serta senantiasa membuka pintu dan merangkul para anak yatim dan kaum dhuafa.
              </p>
            </div>
          </div>

          {/* Timeline Ringkas & Minimalis */}
          <div className="space-y-4">
            <h3 className="text-base font-heading font-bold text-zinc-900 px-1 tracking-tight">
              Milestone Perjalanan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { year: "2005", title: "Awal Berdirinya Pesantren", desc: "Pembangunan infrastruktur awal pesantren dimulai atas dukungan para muhsinin dan masyarakat sekitar." },
                { year: "2008", title: "Peresmian & Angkatan Pertama", desc: "Al-Rahmah resmi beroperasi dan mulai menyambut santri-santri angkatan pertama untuk menuntut ilmu." },
                { year: "2012", title: "Penguatan Jenjang Formal", desc: "Pendirian unit Madrasah Tsanawiyah dan Madrasah Aliyah berakreditasi resmi di lingkungan pondok pesantren." },
                { year: "Sekarang", title: "Pengembangan Berkelanjutan", desc: "Menjadi pesantren rujukan di Banten dengan ribuan alumni yang berkontribusi bagi nusa dan bangsa." },
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 sm:p-6 rounded-3xl shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-brand-secondary font-bold text-xs mb-2 bg-brand-secondary/10 px-2.5 py-1 rounded-full w-fit">
                      <Clock size={12} />
                      <span>{item.year}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 mb-1.5 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
