import { SectionHeading } from "@/components/ui/SectionHeading";
import { Camera as Instagram } from "lucide-react";
import clsx from "clsx";

const galleryItems = [
  { src: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop", type: "seminar", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop", type: "kegiatan", span: "col-span-1 md:col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop", type: "ldks", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop", type: "ramadhan", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop", type: "prestasi", span: "col-span-1 md:col-span-2 row-span-1" },
];

export function GalleryFeed() {
  return (
    <section className="py-28 bg-brand-primary relative overflow-hidden">
      {/* Decorative background geometry */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0d1e38] rounded-bl-full opacity-60 z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brand-accent/5 rounded-tr-full blur-3xl z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <SectionHeading 
            title="Galeri Aktivitas" 
            subtitle="Intip keseruan dan semangat belajar para santri di Pondok Pesantren Al-Rahmah."
            badge="Momen Berharga"
            light
          />
          <a href="#" className="flex items-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition-all backdrop-blur-md shadow-xl group whitespace-nowrap hover:-translate-y-1">
            <Instagram size={20} className="text-brand-accent group-hover:scale-110 transition-transform" />
            <span className="font-semibold tracking-wide text-sm">@alrahmah_walantaka</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 md:gap-5 h-[500px] md:h-[700px]">
          {galleryItems.map((item, index) => (
            <div key={index} className={clsx("group relative rounded-2xl md:rounded-3xl overflow-hidden bg-brand-secondary shadow-lg", item.span)}>
              <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors z-10 duration-500 mix-blend-overlay"></div>
              <img src={item.src} alt={`Gallery ${item.type}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-6 md:p-8">
                <span className="text-brand-primary font-bold tracking-widest uppercase bg-brand-accent shadow-lg shadow-brand-accent/30 px-5 py-2 rounded-full w-fit text-xs backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
