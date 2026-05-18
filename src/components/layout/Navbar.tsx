"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isNavSolid = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
        { name: "Pimpinan", href: "/tentang/pimpinan" },
        { name: "Badan Wakaf", href: "/tentang/badan-wakaf" },
        { name: "Visi Misi", href: "/tentang/visi-misi" },
        { name: "Sejarah Alrahmah", href: "/tentang/sejarah" }
      ]
    },
    { name: "Pendidikan", href: "/pendidikan" },
    { name: "Kehidupan Santri", href: "/santri" },
    { name: "PSB", href: "/psb" },
  ];

  return (
    <header className={clsx(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isNavSolid ? "glass-card py-4" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Logo */}
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

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
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

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link href="/psb" className="bg-brand-primary hover:bg-brand-secondary text-white font-bold text-sm tracking-wide px-7 py-3 rounded-full shadow-lg shadow-brand-primary/25 transition-all duration-300 hover:-translate-y-0.5 inline-block">
            Daftar Sekarang
          </Link>
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
            return (
              <div key={link.name} className="flex flex-col">
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
                {link.subLinks && (
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
                )}
              </div>
            );
          })}
          <Link 
            href="/psb" 
            className="mt-4 text-center bg-brand-primary text-white hover:bg-brand-secondary transition-colors font-semibold px-6 py-3.5 rounded-xl text-lg shadow-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </header>
  );
}
