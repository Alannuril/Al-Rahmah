"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, LogOut, FileText } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/components/providers/AuthProvider";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isNavSolid = isScrolled || !isHomePage;
  const showCta = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { 
      name: "Tentang Al-Rahmah", 
      href: "/tentang",
      subLinks: [
        { name: "Visi Misi", href: "/tentang/visi-misi" },
        { name: "Sejarah Al-Rahmah", href: "/tentang/sejarah" },
        { name: "Nakhoda Al-Rahmah", href: "/tentang/pimpinan" }
      ]
    },
    { name: "Pendidikan", href: "/pendidikan" },
    { 
      name: "Media & Prestasi", 
      href: "/media",
      subLinks: [
        { name: "Berita", href: "/media/berita" },
        { name: "Kejuaraan", href: "/media/kejuaraan" },
        { name: "Kegiatan", href: "/media/kegiatan" },
        { name: "Dokumentasi", href: "/media/dokumentasi" }
      ]
    },
    { name: "PSB", href: "/psb" },
  ];

  return (
    <header className={clsx(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isNavSolid ? "glass-card py-4" : "bg-transparent py-6"
    )}>
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-7 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white group-hover:scale-105 transition-transform shadow-lg shadow-brand-primary/20 border-2 border-white/20">
            <Image
              src="/images/logoAl-rahmah.jpeg"
              alt="Logo Pondok Pesantren Al-Rahmah"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className={clsx(
              "font-heading font-bold text-xl leading-tight tracking-tight transition-colors",
              isNavSolid ? "text-brand-primary" : "text-white"
            )}>Al-Rahmah</span>
            <span className={clsx(
              "text-[10px] font-semibold uppercase tracking-widest transition-colors",
              isNavSolid ? "text-brand-primary/70" : "text-white/80"
            )}>Islamic Boarding School</span>
          </div>
        </Link>

        {/* Desktop Nav - Centered in remaining space */}
        <nav className="hidden lg:flex items-center justify-center gap-10 xl:gap-11 flex-1 transition-all duration-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.subLinks && link.href !== "/" && pathname.startsWith(link.href));
            return (
              <div key={link.name} className="relative group">
                <Link 
                  href={link.href}
                  className={clsx(
                    "font-medium text-sm tracking-wide transition-colors relative flex items-center gap-1.5",
                    isNavSolid ? "text-brand-primary/80 hover:text-brand-secondary" : "text-white/90 hover:text-white",
                    isActive && (isNavSolid ? "text-brand-secondary font-semibold" : "text-white font-semibold")
                  )}
                >
                  {link.name}
                  {link.subLinks && <ChevronDown size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />}
                  <span className={clsx(
                    "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                    isActive ? "w-full" : "",
                    isNavSolid ? "bg-brand-secondary" : "bg-white"
                  )}></span>
                </Link>
                
                {/* Dropdown */}
                {link.subLinks && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 flex flex-col transform origin-top-left scale-95 group-hover:scale-100 transition-transform duration-300">
                      {link.subLinks.map((subLink) => (
                        <Link 
                          key={subLink.name} 
                          href={subLink.href}
                          className="px-5 py-2.5 text-sm font-medium text-brand-primary hover:bg-brand-primary/5 hover:text-brand-secondary transition-colors"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Account / CTA Button */}
        <div className="hidden lg:flex items-center justify-end shrink-0 py-1 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={clsx(
                  "flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-300 text-xs font-semibold shadow-xs",
                  isNavSolid
                    ? "bg-white text-brand-primary border-zinc-200 hover:bg-zinc-50"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md"
                )}
              >
                <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-[10px]">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="max-w-[110px] truncate">{user.email?.split("@")[0]}</span>
                <ChevronDown size={14} className={clsx("transition-transform duration-200", userMenuOpen ? "rotate-180" : "")} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-zinc-100 p-2 z-50 text-xs">
                  <div className="p-2.5 border-b border-zinc-100">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Akun Calon Santri</p>
                    <p className="font-bold text-zinc-800 truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/psb/daftar"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-700 hover:bg-brand-primary/5 hover:text-brand-primary font-medium transition-colors"
                    >
                      <FileText size={14} />
                      <span>Formulir E-PSB</span>
                    </Link>
                  </div>
                  <div className="pt-1 border-t border-zinc-100">
                    <button
                      onClick={async () => {
                        setUserMenuOpen(false);
                        await signOut();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-medium transition-colors text-left"
                    >
                      <LogOut size={14} />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={clsx(
              "transition-all duration-300",
              showCta
                ? "w-48 opacity-100 translate-x-0 overflow-visible"
                : "w-0 opacity-0 translate-x-4 overflow-hidden pointer-events-none"
            )}>
              <Link 
                href="/psb" 
                className="bg-brand-primary hover:bg-brand-secondary text-white font-bold text-sm tracking-wide px-7 py-3 rounded-full shadow-lg shadow-brand-primary/25 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap inline-block"
              >
                Daftar Sekarang
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={clsx(
            "lg:hidden p-2 -mr-2 transition-colors",
            isNavSolid ? "text-brand-primary" : "text-white"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={clsx(
        "lg:hidden absolute top-full left-0 right-0 glass-card mx-4 rounded-2xl overflow-hidden transition-all duration-300 origin-top shadow-2xl",
        mobileMenuOpen ? "opacity-100 scale-y-100 mt-2" : "opacity-0 scale-y-0 pointer-events-none"
      )}>
        <div className="p-5 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.subLinks && link.href !== "/" && pathname.startsWith(link.href));
            const isSubMenuOpen = openSubMenus[link.name];
            
            return (
              <div key={link.name} className="flex flex-col">
                {link.subLinks ? (
                  <button
                    className={clsx(
                      "px-4 py-3 font-medium rounded-xl transition-colors flex justify-between items-center w-full text-left",
                      isActive ? "bg-brand-primary/5 text-brand-secondary" : "text-brand-primary hover:bg-brand-primary/5"
                    )}
                    onClick={() => {
                      setOpenSubMenus(prev => ({ ...prev, [link.name]: !prev[link.name] }))
                    }}
                  >
                    {link.name}
                    <ChevronDown 
                      size={18} 
                      className={clsx("transition-transform duration-300", isSubMenuOpen ? "rotate-180" : "")} 
                    />
                  </button>
                ) : (
                  <Link 
                    href={link.href}
                    className={clsx(
                      "px-4 py-3 font-medium rounded-xl transition-colors flex justify-between items-center",
                      isActive ? "bg-brand-primary/5 text-brand-secondary" : "text-brand-primary hover:bg-brand-primary/5"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
                {link.subLinks && (
                  <div className={clsx(
                    "grid transition-all duration-300 ease-in-out",
                    isSubMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden">
                      <div className="flex flex-col px-4 pb-2 pt-1 gap-1 ml-4 border-l-2 border-brand-primary/10">
                        {link.subLinks.map(subLink => (
                          <Link 
                            key={subLink.name}
                            href={subLink.href}
                            className={clsx(
                              "py-2 px-3 text-sm rounded-lg transition-colors",
                              pathname === subLink.href ? "text-brand-secondary bg-brand-primary/5 font-semibold" : "text-brand-primary/70 hover:text-brand-primary hover:bg-brand-primary/5 font-medium"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {user ? (
            <div className="mt-4 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] uppercase font-bold text-zinc-400">Akun Aktif</p>
                  <p className="text-xs font-bold text-brand-primary truncate">{user.email}</p>
                </div>
              </div>
              <Link
                href="/psb/daftar"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-brand-primary text-white hover:bg-brand-secondary font-semibold px-4 py-3 rounded-xl text-sm transition-colors shadow-xs"
              >
                Buka Formulir E-PSB
              </Link>
              <button
                onClick={async () => {
                  setMobileMenuOpen(false);
                  await signOut();
                }}
                className="w-full text-center text-xs font-semibold text-red-600 hover:underline py-1"
              >
                Keluar (Logout)
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              <Link 
                href="/psb" 
                className="block text-center bg-brand-primary text-white hover:bg-brand-secondary transition-colors font-semibold px-6 py-3.5 rounded-xl text-base shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Daftar Sekarang
              </Link>
              <Link
                href="/psb/login"
                className="block text-center text-xs font-bold text-brand-primary hover:underline py-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                Masuk Akun Calon Santri
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
