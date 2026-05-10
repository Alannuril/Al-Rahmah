import { SectionHeading } from "@/components/ui/SectionHeading";

export default function PortalPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-primary flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center max-w-xl">
        <SectionHeading 
          title="Portal Digital Madrasah" 
          subtitle="Sistem Informasi Manajemen Terpadu Pondok Pesantren Al-Rahmah untuk Staff dan Wali Santri."
          badge="Admin Area"
          centered
          light
        />

        <div className="mt-12 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative border border-gray-100">
          <form className="flex flex-col gap-6 text-left">
            <div>
              <label className="block text-sm font-bold text-brand-primary mb-2">Username / NIP / NIS</label>
              <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition-all text-brand-primary font-medium" placeholder="Masukkan ID Anda" />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-primary mb-2">Password</label>
              <input type="password" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition-all text-brand-primary font-medium" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 text-sm text-brand-primary/70 font-medium font-sans">
                <input type="checkbox" className="rounded text-brand-secondary focus:ring-brand-secondary border-gray-300 w-4 h-4 cursor-pointer" />
                Ingat Saya
              </label>
              <a href="#" className="text-sm font-bold text-brand-primary hover:text-brand-secondary transition-colors">Lupa Password?</a>
            </div>
            <button type="button" className="w-full mt-6 py-4 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white font-bold tracking-wide transition-colors shadow-xl hover:-translate-y-0.5">
              Masuk ke Dashboard
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-brand-primary/50 font-medium">
            <span className="text-brand-secondary font-bold">INFO:</span> Portal ini terintegrasi dengan data akademik dan asrama secara real-time.
          </div>
        </div>
      </div>
    </div>
  );
}
