import Link from "next/link";
import { Phone, Mail, MapPin, Camera, Video, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { PengaturanWebsite } from "@/lib/supabase/types";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/J1PeZhP9SzcFiC3M8";

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
  const tagline =
    setting?.tagline || "Membentuk Generasi Qurani, Berakhlak, dan Berprestasi.";
  const noWa = setting?.no_whatsapp || "+62 812-3456-7890";
  const alamat =
    setting?.alamat ||
    "Jl. Raya Walantaka No. 1, Walantaka, Kota Serang, Banten 42183";
  const instagramUrl =
    setting?.instagram_url || "https://instagram.com/alrahmah.walantaka";
  const youtubeUrl =
    setting?.youtube_url || "https://youtube.com/@alrahmahwalantaka";

  const cleanWaNumber = noWa.replace(/[^0-9]/g, "");

  return (
    <footer className="bg-brand-primary text-white pt-10 pb-6 md:pt-14 md:pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-10">
          {/* Kolom 1: Brand & Sosial */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-none text-white">
                  Al-Rahmah
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-lime mt-0.5">
                  Walantaka – Serang
                </span>
              </div>
            </Link>

            <p className="text-white/70 text-xs leading-relaxed max-w-sm">
              {tagline}
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-2 mt-1">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-secondary text-white/80 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Camera size={15} />
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-secondary text-white/80 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Video size={15} />
                </a>
              )}
              {cleanWaNumber && (
                <a
                  href={`https://wa.me/${cleanWaNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp Resmi"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-secondary text-white/80 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Phone size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Link Columns: 2 kolom berdampingan di Mobile, langsung di Desktop */}
          <div className="grid grid-cols-2 gap-4 md:contents">
            {/* Kolom 2: Pintasan Navigasi */}
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-brand-lime mb-3">
                Pintasan
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-white/75">
                <li>
                  <Link href="/profil" className="hover:text-white transition-colors">
                    Profil Pondok
                  </Link>
                </li>
                <li>
                  <Link href="/tentang/visi-misi" className="hover:text-white transition-colors">
                    Visi &amp; Misi
                  </Link>
                </li>
                <li>
                  <Link href="/pendidikan" className="hover:text-white transition-colors">
                    Program Pendidikan
                  </Link>
                </li>
                <li>
                  <Link href="/media/dokumentasi" className="hover:text-white transition-colors">
                    Galeri Dokumentasi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Informasi PSB & Media */}
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-brand-lime mb-3">
                Informasi
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-white/75">
                <li>
                  <Link href="/psb" className="hover:text-white transition-colors">
                    Pendaftaran (PSB)
                  </Link>
                </li>
                <li>
                  <Link href="/media/berita" className="hover:text-white transition-colors">
                    Berita &amp; Kabar
                  </Link>
                </li>
                <li>
                  <Link href="/media/kejuaraan" className="hover:text-white transition-colors">
                    Prestasi Santri
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="hover:text-white transition-colors">
                    Hubungi Kami
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Kolom 4: Kontak & Lokasi Cepat */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-brand-lime mb-3">
              Kontak &amp; Lokasi
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/75">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-brand-secondary shrink-0 mt-0.5" />
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed flex items-start gap-1 group"
                  title="Buka di Google Maps"
                >
                  <span>{alamat}</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-brand-secondary shrink-0" />
                {cleanWaNumber ? (
                  <a
                    href={`https://wa.me/${cleanWaNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {noWa}
                  </a>
                ) : (
                  <span>{noWa}</span>
                )}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-brand-secondary shrink-0" />
                <span>info@alrahmah.sch.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Minimal Bar */}
        <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/50">
          <p>
            &copy; {new Date().getFullYear()} {namaWebsite}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/admin/login" className="hover:text-white transition-colors">
              Portal Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
