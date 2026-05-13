import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ProfilPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-paper">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading 
          title="Profil Pondok Pesantren" 
          subtitle="Mengenal lebih dekat sejarah, visi, dan misi perjuangan Al-Rahmah."
          badge="Tentang Kami"
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card p-10 rounded-3xl shadow-xl shadow-brand-primary/5">
            <h3 className="font-heading text-3xl font-bold text-brand-primary mb-6">Visi</h3>
            <p className="text-brand-primary/80 leading-relaxed text-lg font-medium">
              "Menjadi lembaga pendidikan unggul yang mencetak generasi Qurani, berakhlak mulia, berwawasan global, dan memiliki jiwa kepemimpinan untuk kemaslahatan umat."
            </p>
          </div>
          <div className="glass-card p-10 rounded-3xl shadow-xl shadow-brand-primary/5">
            <h3 className="font-heading text-3xl font-bold text-brand-primary mb-6">Misi</h3>
            <ul className="text-brand-primary/80 leading-relaxed space-y-4 list-disc list-inside font-medium">
              <li>Menyelenggarakan pendidikan tahfidz berkualitas.</li>
              <li>Memadukan kurikulum pesantren dan pendidikan nasional.</li>
              <li>Membangun karakter melalui disiplin asrama penuh waktu.</li>
              <li>Mengembangkan kecakapan hidup dan teknologi santri.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-white p-10 md:p-16 rounded-3xl shadow-2xl shadow-brand-primary/5 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h3 className="font-heading text-4xl font-bold text-brand-primary mb-6">Sejarah Singkat</h3>
              <p className="text-brand-primary/70 leading-relaxed mb-6 font-medium text-lg">
                Pondok Pesantren Al-Rahmah berawal dari cita-cita luhur para muassis untuk membangun pusat pendidikan Islam yang moderat namun mengakar kuat pada tradisi keilmuan pesantren klasik.
              </p>
              <p className="text-brand-primary/70 leading-relaxed font-medium text-lg">
                Seiring berjalannya waktu, Al-Rahmah berevolusi menjadi boarding school modern dengan standar infrastruktur premium.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1541339892881-22444558e8df?q=80&w=2070&auto=format&fit=crop" alt="Sejarah" className="w-full h-80 object-cover rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
