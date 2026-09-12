import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ProfilPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-paper">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading 
          title="Profil Pondok Pesantren" 
          subtitle="Mengenal lebih dekat sejarah, visi, dan misi perjuangan Al-Rahmah."
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card p-6 md:p-8 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-brand-paper/50">
            <h3 className="font-heading text-2xl font-bold text-brand-primary mb-3 tracking-tight">Visi</h3>
            <p className="text-brand-primary/70 text-xs sm:text-sm mb-3 leading-relaxed">
              Pondok Pesantren Al-Rahmah berdiri di atas dan untuk semua golongan, berpedoman pada Al-Qur&apos;an dan Hadits, bertekad menjadi perekat umat dalam menjalankan visi dan misinya yaitu:
            </p>
            <p className="text-brand-primary leading-relaxed text-base font-semibold">
              &quot;Membentuk Generasi Islami yang Cerdas dan Berkarakter Rahmatan Lil &apos;Alamin, dan Menjadi Lembaga Pendidikan yang Merangkul Para Anak Yatim dan Kaum Dhuafa&quot;
            </p>
          </div>
          <div className="glass-card p-6 md:p-8 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-brand-paper/50">
            <h3 className="font-heading text-2xl font-bold text-brand-primary mb-4 tracking-tight">Misi</h3>
            <ul className="text-brand-primary/80 leading-relaxed space-y-3 list-disc list-inside text-base font-medium">
              <li>Membentuk generasi Islami yang cerdas dan berkarakter rahmatan lil &apos;alamin.</li>
              <li>Menjadi lembaga pendidikan yang merangkul para anak yatim dan kaum dhuafa.</li>
              <li>Berdiri di atas dan untuk semua golongan serta bertekad menjadi perekat umat dengan berpedoman pada Al-Qur&apos;an dan Hadits.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 md:p-8 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-brand-paper/60 flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-2/3">
              <h3 className="font-heading text-2xl font-bold text-brand-primary mb-4 tracking-tight">Landasan Perjuangan</h3>
              <p className="text-brand-primary/70 leading-relaxed mb-4 text-base font-medium">
                Pondok Pesantren Al-Rahmah berdiri di atas dan untuk semua golongan, berpedoman pada Al-Qur&apos;an dan Hadits, serta bertekad menjadi perekat persatuan umat.
              </p>
              <p className="text-brand-primary/70 leading-relaxed font-medium text-base">
                Dengan dedikasi mendidik dan merangkul para anak yatim dan kaum dhuafa, Al-Rahmah terus berkomitmen mencetak generasi santri yang cerdas keilmuan dan berkarakter rahmatan lil &apos;alamin.
              </p>
            </div>
            <div className="md:w-1/3 w-full shrink-0">
              <img src="/images/gedung1.jpeg" alt="Pondok Pesantren Al-Rahmah" className="w-full h-48 object-cover rounded-2xl shadow-sm border border-brand-paper/50" />
            </div>
        </div>
      </div>
    </div>
  );
}
