import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumButton } from "@/components/ui/PremiumButton";

export default function PsbPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center max-w-5xl">
        <SectionHeading 
          title="Penerimaan Santri Baru" 
          subtitle="Tahun Ajaran 2026/2027 resmi dibuka. Kuota kelas unggulan terbatas!"
          badge="Admissions"
          centered
        />

        <div className="mt-16 bg-brand-primary text-white p-12 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden text-left border border-brand-primary lg:mx-12">
          {/* Abstract blobs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-secondary/30 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="font-heading text-4xl font-bold mb-12 text-center text-white drop-shadow-md">Alur Pendaftaran E-PSB</h3>
            <ol className="w-full space-y-6 max-w-2xl mx-auto mb-16">
              {[
                "Membuat akun melalui portal E-PSB Al-Rahmah.",
                "Mengisi data diri dan mengupload dokumen pendukung (Kartu Keluarga, Akta Kelahiran, NISN, Rapor Terakhir).",
                "Membayar biaya formulir pendaftaran melalui virtual account (VA).",
                "Melaksanakan Ujian Seleksi Berbasis Komputer (CBT) dan wawancara lisan.",
                "Menunggu Pengumuman Kelulusan Resmi."
              ].map((step, i) => (
                <li key={i} className="flex gap-6 items-start bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-brand-secondary text-white flex shrink-0 items-center justify-center font-bold text-lg shadow-lg">
                    {i + 1}
                  </div>
                  <p className="text-white/90 font-medium text-lg pt-1.5">{step}</p>
                </li>
              ))}
            </ol>

            <PremiumButton href="#" variant="primary" className="px-12 py-5 text-lg w-full md:w-auto shadow-xl shadow-brand-secondary/20">
              Menuju Portal Pendaftaran PSB
            </PremiumButton>
          </div>
        </div>
      </div>
    </div>
  );
}
