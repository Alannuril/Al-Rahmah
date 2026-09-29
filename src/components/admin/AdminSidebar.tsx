"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Newspaper,
  GraduationCap,
  Settings,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Kelola Berita", href: "/admin/berita", icon: Newspaper },
  { name: "Informasi PSB", href: "/admin/psb", icon: GraduationCap },
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

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      console.error("SignOut error:", e);
    }
    localStorage.removeItem("alrahmah_admin_logged_in");
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Tutup menu admin"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed left-0 top-0 z-50 flex h-dvh w-60 flex-col bg-[#1c4035] transition-transform duration-200 ease-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-white/15 px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-sm bg-white/10">
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
            type="button"
            aria-label="Tutup menu admin"
            className="rounded-md p-2 text-white/80 hover:bg-white/10 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav aria-label="Navigasi admin" className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "group flex min-h-11 items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon
                  size={19}
                  className={clsx(
                    "shrink-0 transition-colors",
                    active ? "text-brand-accent" : "text-white/65 group-hover:text-white"
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
        <div className="border-t border-white/15 px-3 py-4">
          <button 
            onClick={handleLogout}
            className="group flex min-h-11 w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/75 hover:bg-white/10 hover:text-white"
          >
            <LogOut size={19} className="shrink-0 group-hover:text-red-300 transition-colors" />
            <span>Logout</span>
          </button>

          {/* Admin info */}
          <div className="mt-3 px-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-white/10 text-xs font-bold text-white/70">
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
