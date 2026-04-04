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
          <div className="flex flex-col md:flex-row gap-12 items-center bg-brand-paper border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-brand-primary/5">
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="MA Al-Rahmah" className="rounded-3xl shadow-xl object-cover h-[400px] w-full" />
            </div>
            <div className="md:w-1/2 px-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/20 text-brand-primary rounded-full mb-6">
                <Target size={18} className="text-brand-accent" />
                <span className="font-bold text-xs uppercase tracking-widest">Formal & Pesantren</span>
              </div>
              <h3 className="font-heading text-4xl font-bold text-brand-primary mb-6 leading-tight">Madrasah Aliyah <br/><span className="text-brand-accent">Al-Rahmah</span></h3>
              <p className="text-brand-primary/70 leading-relaxed mb-10 text-lg font-medium">
                Program Madrasah Aliyah kami memadukan sains, humaniora, dan ilmu agama secara terintegrasi, diakui secara nasional dengan nilai akreditasi unggul (A).
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-brand-accent shrink-0"><BookOpen size={20}/></div>
                  <div>
                    <h4 className="font-bold text-brand-primary mb-1">Kurikulum Plus</h4>
                    <p className="text-sm text-brand-primary/60">Integrasi kurikulum Kemenag dan kurikulum kepesantrenan.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-brand-accent shrink-0"><Beaker size={20}/></div>
                  <div>
                    <h4 className="font-bold text-brand-primary mb-1">Fasilitas Modern</h4>
                    <p className="text-sm text-brand-primary/60">Lab sains interaktif dan lab bahasa standar internasional.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-brand-accent shrink-0"><Globe size={20}/></div>
                  <div>
                    <h4 className="font-bold text-brand-primary mb-1">Wawasan Global</h4>
                    <p className="text-sm text-brand-primary/60">Bilingual environment (Arab & English) untuk seluruh santri.</p>
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
