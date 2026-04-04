import { SectionHeading } from "@/components/ui/SectionHeading";
import { Phone, Mail, MapPin } from "lucide-react";

export default function KontakPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-paper">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading 
          title="Hubungi Kami" 
          subtitle="Kami siap membantu Anda. Silakan hubungi kami untuk informasi lebih lanjut mengenai pendaftaran atau merencanakan kunjungan langsung."
          badge="Kontak Official"
          centered
        />

        <div className="mt-16 flex flex-col lg:flex-row gap-8 bg-white p-4 md:p-8 rounded-[3rem] shadow-xl shadow-brand-primary/5 border border-gray-50">
          <div className="lg:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <h3 className="font-heading text-3xl font-bold text-brand-primary mb-8">Kirim Pesan Langsung</h3>
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-brand-primary mb-2">Nama Lengkap</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-accent transition-all text-brand-primary font-medium" placeholder="Bpk/Ibu/Sdr" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-primary mb-2">No. WhatsApp</label>
                  <input type="tel" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-accent transition-all text-brand-primary font-medium" placeholder="0812..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-primary mb-2">Pesan Anda</label>
                <textarea rows={5} className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-accent transition-all text-brand-primary font-medium resize-none" placeholder="Tuliskan pertanyaan atau pesan Anda di sini..."></textarea>
              </div>
              <button type="button" className="px-8 py-4 rounded-xl bg-brand-accent text-brand-primary font-bold tracking-wide hover:shadow-lg hover:-translate-y-1 transition-all w-full md:w-fit mt-2 border-none">
                Kirim Via WhatsApp
              </button>
            </form>
          </div>
          
          <div className="lg:w-1/2 rounded-[2.5rem] bg-brand-primary p-10 md:p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-inner border border-white/10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10 mb-12">
              <h3 className="font-heading text-2xl font-bold mb-8">Informasi Center</h3>
              <ul className="space-y-8">
                <li className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex shrink-0 items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-primary transition-colors duration-300 shadow-lg">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-lime text-xs mb-1.5 uppercase tracking-widest">Alamat Kampus</h4>
                    <p className="text-white/80 leading-relaxed font-medium">Jl. Pendidikan No. 1, Desa Walantaka,<br/>Kecamatan Walantaka, Kota Serang,<br/>Provinsi Banten 42183.</p>
                  </div>
                </li>
                <li className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex shrink-0 items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-primary transition-colors duration-300 shadow-lg">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-lime text-xs mb-1.5 uppercase tracking-widest">Hotline PSB</h4>
                    <p className="text-white/80 font-medium text-lg">+62 812 3456 7890</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative z-10 w-full h-[250px] rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126907.03960351717!2d106.07925102553924!3d-6.1158498808605335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e418b76eaebd217%3A0xe543ed9b31911979!2sWalantaka%2C%20Serang%20City%2C%20Banten!5e0!3m2!1sen!2sid!4v1709424683072!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-90 hover:opacity-100 transition-opacity duration-500 saturate-[1.2] grayscale-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
