import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookOpen, Award, Target, Beaker, Globe } from "lucide-react";

export default function PendidikanPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading 
          title="Program Pendidikan" 
          subtitle="Kurikulum komprehensif yang dirancang untuk menjawab tantangan masa depan dengan landasan iman yang teguh."
          badge="Akademik Inti"
          centered
        />

        <div className="mt-20 space-y-16">
          <div className="flex flex-col md:flex-row gap-8 items-start bg-brand-paper border border-brand-paper/60 rounded-3xl p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <div className="md:w-5/12 w-full shrink-0">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="MA Al-Rahmah" className="rounded-2xl shadow-sm object-cover h-[250px] w-full" />
            </div>
            <div className="md:w-7/12 px-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-secondary/20 text-brand-primary rounded-full mb-4">
                <Target size={14} className="text-brand-secondary" />
                <span className="font-bold text-[10px] uppercase tracking-widest">Formal & Pesantren</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-brand-primary mb-3 leading-tight tracking-tight">Madrasah Aliyah <span className="text-brand-secondary">Al-Rahmah</span></h3>
              <p className="text-brand-primary/70 leading-relaxed mb-6 text-sm font-medium">
                Program Madrasah Aliyah kami memadukan sains, humaniora, dan ilmu agama secara terintegrasi, diakui secara nasional dengan nilai akreditasi unggul (A).
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-brand-paper/50">
                  <div className="w-10 h-10 rounded-lg bg-brand-lime/10 flex items-center justify-center text-brand-secondary shrink-0"><BookOpen size={18}/></div>
                  <div>
                    <h4 className="font-semibold text-brand-primary mb-1 text-sm tracking-tight">Kurikulum Plus</h4>
                    <p className="text-xs text-brand-primary/60 leading-relaxed">Integrasi kurikulum Kemenag dan kepesantrenan.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-brand-paper/50">
                  <div className="w-10 h-10 rounded-lg bg-brand-lime/10 flex items-center justify-center text-brand-secondary shrink-0"><Beaker size={18}/></div>
                  <div>
                    <h4 className="font-semibold text-brand-primary mb-1 text-sm tracking-tight">Fasilitas Modern</h4>
                    <p className="text-xs text-brand-primary/60 leading-relaxed">Lab sains interaktif dan lab bahasa standar global.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-brand-paper/50">
                  <div className="w-10 h-10 rounded-lg bg-brand-lime/10 flex items-center justify-center text-brand-secondary shrink-0"><Globe size={18}/></div>
                  <div>
                    <h4 className="font-semibold text-brand-primary mb-1 text-sm tracking-tight">Wawasan Global</h4>
                    <p className="text-xs text-brand-primary/60 leading-relaxed">Bilingual environment (Arab & English) untuk santri.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
