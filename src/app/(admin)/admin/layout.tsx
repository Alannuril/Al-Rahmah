"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin": { title: "Dashboard", subtitle: "Ringkasan data dan statistik" },
  "/admin/berita": { title: "Kelola Berita", subtitle: "Manajemen artikel dan berita" },
  "/admin/berita/new": { title: "Tambah Berita", subtitle: "Manajemen artikel dan berita" },
  "/admin/psb": { title: "Informasi PSB", subtitle: "Penerimaan Santri Baru" },
  "/admin/pengaturan": { title: "Pengaturan Website", subtitle: "Konfigurasi umum website" },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Login page has its own standalone layout (middleware handles auth redirect)
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const currentPage = pageTitles[pathname]
    || (pathname.startsWith("/admin/berita/")
      ? { title: "Edit Berita", subtitle: "Manajemen artikel dan berita" }
      : { title: "Admin Panel", subtitle: "" });

  return (
    <div className="min-h-screen bg-[#f7f8f7] text-zinc-900">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen min-w-0 flex-col lg:pl-60">
        <AdminTopbar
          title={currentPage.title}
          subtitle={currentPage.subtitle}
          onMenuToggle={() => setSidebarOpen(true)}
        />
        <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          {children}
        </main>
        <footer className="border-t border-zinc-200 px-4 py-3 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-zinc-500">
            © 2026 Pondok Pesantren Al-Rahmah Walantaka — Admin Panel v1.0
          </p>
        </footer>
      </div>
    </div>
  );
}
