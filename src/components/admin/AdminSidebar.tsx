"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Newspaper,
  Images,
  GraduationCap,
  Megaphone,
  Trophy,
  Settings,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Kelola Berita", href: "/admin/berita", icon: Newspaper },
  { name: "Kelola Galeri", href: "/admin/galeri", icon: Images },
  { name: "Informasi PSB", href: "/admin/psb", icon: GraduationCap },
  { name: "Pengumuman", href: "/admin/pengumuman", icon: Megaphone },
  { name: "Media & Prestasi", href: "/admin/media", icon: Trophy },
  { name: "Pengaturan Website", href: "/admin/pengaturan", icon: Settings },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem("alrahmah_admin_logged_in");
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-[260px] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          background: "linear-gradient(180deg, #1E3F35 0%, #2D5A4C 40%, #396E5F 100%)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/10 shadow-lg">
              <Image
                src="/images/logoAl-rahmah.jpeg"
                alt="Logo Al-Rahmah"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-white text-sm tracking-tight leading-tight">
                Al-Rahmah
              </span>
              <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase">
                CMS Admin
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                  active
                    ? "bg-white/15 text-white shadow-sm shadow-black/10"
                    : "text-white/60 hover:bg-white/8 hover:text-white/90"
                )}
              >
                <Icon
                  size={19}
                  className={clsx(
                    "shrink-0 transition-colors",
                    active ? "text-brand-accent" : "text-white/50 group-hover:text-white/70"
                  )}
                />
                <span className="flex-1">{item.name}</span>
                {active && (
                  <ChevronRight size={14} className="text-white/40" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-red-500/15 hover:text-red-300 transition-all duration-200 w-full group"
          >
            <LogOut size={19} className="shrink-0 group-hover:text-red-300 transition-colors" />
            <span>Logout</span>
          </button>

          {/* Admin info */}
          <div className="mt-3 px-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 text-xs font-bold">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white/70">Administrator</span>
              <span className="text-[10px] text-white/40">admin@alrahmah.id</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
