"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Pendidikan", href: "/pendidikan" },
    { name: "Kehidupan Santri", href: "/santri" },
    { name: "PSB", href: "/psb" },
  ];

  return (
    <header className={clsx(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass-card py-4" : "bg-transparent py-6"
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
              isScrolled ? "text-brand-primary" : "text-white"
            )}>Al-Rahmah</span>
            <span className={clsx(
              "text-[10px] font-semibold uppercase tracking-widest transition-colors",
              isScrolled ? "text-brand-primary/70" : "text-white/80"
            )}>Islamic Boarding School</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={clsx(
                  "font-medium text-sm tracking-wide transition-colors relative group",
                  isScrolled ? "text-brand-primary/80 hover:text-brand-secondary" : "text-white/90 hover:text-white",
                  isActive && (isScrolled ? "text-brand-secondary font-semibold" : "text-white font-semibold")
                )}
              >
                {link.name}
                <span className={clsx(
                  "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                  isActive ? "w-full" : "",
                  isScrolled ? "bg-brand-secondary" : "bg-white"
                )}></span>
              </Link>
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
            isScrolled ? "text-brand-primary" : "text-white"
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
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={clsx(
                  "px-4 py-3 font-medium rounded-xl transition-colors",
                  isActive ? "bg-brand-primary/5 text-brand-secondary" : "text-brand-primary hover:bg-brand-primary/5"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
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
