import Link from "next/link";
import { Phone, Mail, MapPin, Camera, Globe, MonitorPlay, Video } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { PengaturanWebsite } from "@/lib/supabase/types";

async function getPengaturan(): Promise<PengaturanWebsite | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("pengaturan_website")
      .select("*")
      .limit(1)
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function Footer() {
  const setting = await getPengaturan();

  const namaWebsite = setting?.nama_website || "Al-Rahmah";
  const tagline = setting?.tagline || "Membentuk Generasi Qurani, Berakhlak, dan Berprestasi.";
  const noWa = setting?.no_whatsapp || "+62 812-3456-7890";
  const alamat = setting?.alamat || "Jl. Raya Walantaka No. 1, Kecamatan Walantaka, Kota Serang, Provinsi Banten 42183";
  const instagramUrl = setting?.instagram_url || "https://instagram.com/alrahmah.walantaka";
  const youtubeUrl = setting?.youtube_url || "https://youtube.com/@alrahmahwalantaka";

  const cleanWaNumber = noWa.replace(/[^0-9]/g, "");

  return (
    <footer className="bg-brand-primary text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-2xl shadow-lg border border-white/20">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-2xl leading-tight tracking-tight text-white">
                  Al-Rahmah
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-lime">
                  Islamic Boarding School
                </span>
              </div>
            </Link>
            <p className="text-white/70 leading-relaxed text-sm pr-4">
              {tagline} Mengintegrasikan pendidikan agama, kurikulum terpadu, dan pembinaan karakter dalam lingkungan pondok pesantren modern.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-300"
                >
                  <Camera size={18} />
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-300"
                >
                  <Video size={18} />
                </a>
              )}
              {cleanWaNumber && (
                <a
                  href={`https://wa.me/${cleanWaNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp Official"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-300"
                >
                  <Phone size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-heading font-semibold text-lg mb-6 text-white tracking-wide">Pintasan</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/profil" className="text-white/70 hover:text-brand-secondary transition-colors text-sm">Profil Pondok</Link></li>
              <li><Link href="/tentang/visi-misi" className="text-white/70 hover:text-brand-secondary transition-colors text-sm">Visi &amp; Misi</Link></li>
              <li><Link href="/pendidikan" className="text-white/70 hover:text-brand-secondary transition-colors text-sm">Program Pendidikan</Link></li>
              <li><Link href="/media/dokumentasi" className="text-white/70 hover:text-brand-secondary transition-colors text-sm">Galeri Dokumentasi</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-semibold text-lg mb-6 text-white tracking-wide">Informasi</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/psb" className="text-white/70 hover:text-brand-secondary transition-colors text-sm">Pendaftaran (PSB)</Link></li>
              <li><Link href="/media/berita" className="text-white/70 hover:text-brand-secondary transition-colors text-sm">Berita &amp; Kabar</Link></li>
              <li><Link href="/media/kejuaraan" className="text-white/70 hover:text-brand-secondary transition-colors text-sm">Prestasi Santri</Link></li>
              <li><Link href="/kontak" className="text-white/70 hover:text-brand-secondary transition-colors text-sm">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="font-heading font-semibold text-lg mb-6 text-white tracking-wide">Hubungi Kami</h4>
            <ul className="flex flex-col gap-5 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-secondary shrink-0 mt-0.5" />
                <span className="leading-relaxed">{alamat}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-brand-secondary shrink-0" />
                {cleanWaNumber ? (
                  <a
                    href={`https://wa.me/${cleanWaNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-secondary transition-colors"
                  >
                    {noWa}
                  </a>
                ) : (
                  <span>{noWa}</span>
                )}
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-brand-secondary shrink-0" />
                <span>info@alrahmah.sch.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} {namaWebsite}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/admin/login" className="hover:text-white transition-colors">Portal Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
