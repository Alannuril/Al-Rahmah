import Link from "next/link";
import { Phone, Mail, MapPin, Camera, Globe, MonitorPlay } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-primary text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-brand-primary font-bold text-2xl shadow-lg">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-2xl leading-tight tracking-tight text-white">Al-Rahmah</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-lime">Islamic Boarding School</span>
              </div>
            </Link>
            <p className="text-white/70 leading-relaxed text-sm pr-4">
              Membentuk Generasi Qurani, Berakhlak, dan Berprestasi. Mengintegrasikan pendidikan agama, formal, dan pembinaan karakter dalam satu kawasan premium.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary hover:border-brand-accent transition-all duration-300">
                <Camera size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary hover:border-brand-accent transition-all duration-300">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary hover:border-brand-accent transition-all duration-300">
                <MonitorPlay size={18} />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-heading font-semibold text-lg mb-6 text-white tracking-wide">Pintasan</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/profil" className="text-white/70 hover:text-brand-accent transition-colors text-sm">Profil Pondok</Link></li>
              <li><Link href="/pendidikan" className="text-white/70 hover:text-brand-accent transition-colors text-sm">Program Pendidikan</Link></li>
              <li><Link href="/santri" className="text-white/70 hover:text-brand-accent transition-colors text-sm">Kehidupan Santri</Link></li>
              <li><Link href="/galeri" className="text-white/70 hover:text-brand-accent transition-colors text-sm">Galeri Kegiatan</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-semibold text-lg mb-6 text-white tracking-wide">Informasi</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/psb" className="text-white/70 hover:text-brand-accent transition-colors text-sm">Pendaftaran (PSB)</Link></li>
              <li><Link href="/portal" className="text-white/70 hover:text-brand-accent transition-colors text-sm">Portal Madrasah</Link></li>
              <li><Link href="/karir" className="text-white/70 hover:text-brand-accent transition-colors text-sm">Karir</Link></li>
              <li><Link href="/faq" className="text-white/70 hover:text-brand-accent transition-colors text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="font-heading font-semibold text-lg mb-6 text-white tracking-wide">Hubungi Kami</h4>
            <ul className="flex flex-col gap-5 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-lime shrink-0 mt-0.5" />
                <span className="leading-relaxed">Jl. Pendidikan No. 1, Walantaka, Kota Serang, Banten 42183</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-brand-lime shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-brand-lime shrink-0" />
                <span>info@alrahmah.sch.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Pondok Pesantren Al-Rahmah Walantaka. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
