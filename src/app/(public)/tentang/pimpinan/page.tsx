import { Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Pimpinan Pondok - Al-Rahmah",
  description: "Profil Pimpinan Pondok Pesantren Al-Rahmah Walantaka.",
};

export default function PimpinanPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-surface/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Pimpinan Pondok"
          subtitle="Mengenal figur teladan dan sosok pengasuh di balik Pondok Pesantren Al-Rahmah Walantaka."
          centered
        />

        {/* Content */}
        <div className="mt-10 sm:mt-14 max-w-4xl mx-auto bg-white rounded-3xl shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <div className="relative min-h-[300px] md:min-h-[380px] bg-brand-primary/5 flex items-center justify-center text-brand-primary/20">
              <Users size={100} strokeWidth={1.2} />
            </div>
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900 mb-1 tracking-tight">
                K.H. Pimpinan Pesantren
              </h2>
              <p className="text-brand-secondary font-medium text-xs sm:text-sm mb-5">
                Pengasuh Pondok Pesantren Al-Rahmah
              </p>

              <div className="space-y-3.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <p>
                  Sosok ulama yang berdedikasi tinggi dalam mengembangkan pendidikan Islam di Banten, 
                  khususnya melalui Pondok Pesantren Al-Rahmah Walantaka.
                </p>
                <p>
                  Dengan komitmen membina generasi Qurani yang berakhlak mulia dan berprestasi, 
                  beliau terus mengarahkan para santri dan tenaga pengajar untuk mengintegrasikan 
                  ilmu agama dan ilmu pengetahuan umum modern.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
