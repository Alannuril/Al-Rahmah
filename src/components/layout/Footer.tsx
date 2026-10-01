import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { getWebsiteInfo } from "@/lib/data/website";
import { GOOGLE_MAPS_URL } from "@/lib/utils/websiteInfo";
import { FOOTER_NAV_LINKS } from "@/lib/constants/navigation";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export async function Footer() {
  const info = await getWebsiteInfo();

  const socialLinks = [
    {
      name: "Instagram",
      href: info.instagram_url || "https://www.instagram.com/pondok.alrahmah/",
      icon: InstagramIcon,
    },
    {
      name: "Facebook",
      href:
        info.facebook_url ||
        "https://www.facebook.com/p/Pondok-Pesantren-Al-Rahmah-Islamic-Boarding-School-100023081542264/?locale=id_ID",
      icon: FacebookIcon,
    },
    {
      name: "YouTube",
      href: info.youtube_url || "https://www.youtube.com/@pondokalrahmah1577",
      icon: YoutubeIcon,
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#307562] via-[#266150] to-[#1D4F41] text-white pt-7 pb-6 sm:pt-9 sm:pb-7 overflow-hidden border-t border-emerald-400/20 shadow-lg">
      {/* Ambient soft glow on top border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
      {/* Soft atmospheric radial light */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[28rem] h-48 bg-emerald-400/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Row: Clean, Soft & Modern Layout */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* 1. Brand Identity with Soft Depth */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/40 bg-white shadow-md shadow-emerald-950/20 transition-transform duration-200 hover:scale-105"
              aria-label="Kembali ke Beranda Al-Rahmah"
            >
              <Image
                src="/images/logoAl-rahmah.jpeg"
                alt="Logo Al-Rahmah"
                fill
                sizes="40px"
                className="object-contain"
              />
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading text-base font-bold tracking-tight text-white drop-shadow-xs">
                  Al-Rahmah
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-white/20 border border-white/25 px-2 py-0.5 rounded-full backdrop-blur-xs shadow-2xs">
                  Walantaka
                </span>
              </div>
              <span className="text-xs text-white/85 font-medium mt-0.5">
                Islamic Boarding School
              </span>
            </div>
          </div>

          {/* 2. Soft Modern Interactive Navigation Capsules */}
          <nav aria-label="Navigasi Footer" className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
            {FOOTER_NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-medium text-white/90 hover:text-white hover:bg-white/20 active:bg-white/30 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. Soft Glass Social Media Buttons & WhatsApp Pill */}
          <div className="flex items-center gap-2 shrink-0">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Kunjungi ${name} resmi Pondok Pesantren Al-Rahmah`}
                title={name}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 border border-white/25 text-white backdrop-blur-md shadow-xs transition-all duration-200 hover:bg-white/30 hover:text-white hover:border-white/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-950/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}

            {info.whatsapp_url && (
              <a
                href={info.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Hubungi kami via WhatsApp: ${info.no_whatsapp}`}
                title={info.whatsapp_label}
                className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-md shadow-xs transition-all duration-200 hover:bg-white/35 hover:border-white/50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-950/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ml-1"
              >
                <Phone size={13} className="shrink-0 text-white" />
                <span>WhatsApp</span>
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar: Clean & Minimalist Copyright + Location */}
        <div className="mt-6 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/80">
          <p className="tracking-wide">
            &copy; {new Date().getFullYear()} {info.nama_website}. Hak cipta dilindungi.
          </p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white/85 hover:text-white hover:bg-white/10 transition-all duration-200"
            title="Buka lokasi pondok di Google Maps"
          >
            <MapPin size={12} className="text-white shrink-0" />
            <span>Walantaka, Kota Serang, Banten</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
