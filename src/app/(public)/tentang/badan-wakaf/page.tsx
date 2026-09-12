import { Building } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Badan Wakaf - Al-Rahmah",
  description: "Informasi mengenai Badan Wakaf Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function BadanWakafPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Badan Wakaf"
          subtitle="Lembaga pengelola amanah umat untuk keberlanjutan dan kemandirian pendidikan pesantren."
          centered
        />

        {/* Content */}
        <div className="mt-10 sm:mt-14 max-w-4xl mx-auto space-y-8">
          {/* Main Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-brand-primary/5 text-brand-primary flex items-center justify-center">
                <Building size={20} strokeWidth={1.8} />
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 tracking-tight">
                Tentang Badan Wakaf
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
              <p>
                Badan Wakaf Pondok Pesantren Al-Rahmah merupakan lembaga resmi yang ditugaskan 
                untuk mengelola, memelihara, dan mengembangkan aset-aset wakaf yang dipercayakan 
                oleh umat kepada pesantren.
              </p>
              <p>
                Wakaf merupakan pilar penting dalam kemandirian institusi pendidikan Islam. 
                Melalui tata kelola yang amanah, transparan, dan produktif, kami berkomitmen 
                untuk mendukung seluruh operasional dan pengembangan sarana santri secara berkesinambungan.
              </p>
            </div>
          </div>

          {/* Visi & Misi Wakaf Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-xs">
              <h3 className="text-base font-heading font-bold text-brand-primary mb-2 tracking-tight">
                Visi Badan Wakaf
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Menjadi lembaga pengelola wakaf yang profesional, amanah, dan produktif 
                guna mewujudkan kemandirian finansial Pondok Pesantren Al-Rahmah.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-xs">
              <h3 className="text-base font-heading font-bold text-brand-primary mb-2 tracking-tight">
                Misi Badan Wakaf
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                  <span>Mengamankan dan memproduktifkan aset-aset wakaf pesantren.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                  <span>Meningkatkan nilai tambah sarana pendidikan santri.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                  <span>Menyalurkan hasil wakaf bagi keberlanjutan beasiswa santri dhuafa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                  <span>Menjaga transparansi dan akuntabilitas laporan berkala kepada umat.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
