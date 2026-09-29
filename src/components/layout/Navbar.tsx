"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { PUBLIC_NAV_LINKS } from "@/lib/constants/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [menuPathname, setMenuPathname] = useState(pathname);

  const isHomePage = pathname === "/";
  const isPsbPage = pathname.startsWith("/psb");
  const isNavSolid = isScrolled || !isHomePage;
  const showCta = (isScrolled || !isHomePage) && !isPsbPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = PUBLIC_NAV_LINKS;

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
              sizes="48px"
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
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={clsx(
                  "group font-medium text-sm tracking-wide transition-colors relative flex items-center gap-1.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary",
                  isNavSolid ? "text-brand-primary/80 hover:text-brand-secondary" : "text-white/90 hover:text-white",
                  isActive && (isNavSolid ? "text-brand-secondary font-semibold" : "text-white font-semibold")
                )}
              >
                {link.name}
                <span className={clsx(
                  "absolute -bottom-1 left-0 h-0.5 transition-all duration-300 group-hover:w-full",
                  isActive ? "w-full" : "w-0",
                  isNavSolid ? "bg-brand-secondary" : "bg-white"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center justify-end shrink-0 py-1 relative">
          {!isPsbPage && (
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
          aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={clsx(
        "lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-[#2d6153]/95 via-[#245246]/95 to-[#1d443a]/95 backdrop-blur-xl border border-white/20 mx-4 rounded-2xl overflow-hidden transition-all duration-300 origin-top shadow-2xl shadow-emerald-950/50 text-white",
        mobileMenuOpen ? "opacity-100 scale-y-100 mt-2" : "opacity-0 scale-y-0 pointer-events-none"
      )}>
        <div className="p-5 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={clsx(
                  "px-4 py-3 font-medium rounded-xl transition-colors flex justify-between items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-lime",
                  isActive
                    ? "bg-[#8AC77F]/25 text-[#ABD8B1] border border-[#8AC77F]/30 font-semibold"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          {!isPsbPage && (
            <div className="mt-3">
              <Link
                href="/psb"
                className="block text-center bg-gradient-to-r from-[#ABD8B1] via-[#8AC77F] to-[#7CBF71] text-[#143026] hover:brightness-105 transition-all font-bold px-6 py-3.5 rounded-xl text-base shadow-lg shadow-black/25"
                onClick={() => setMobileMenuOpen(false)}
              >
                Daftar Sekarang
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
