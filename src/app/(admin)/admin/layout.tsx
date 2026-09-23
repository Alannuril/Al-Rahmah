"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin": { title: "Dashboard", subtitle: "Ringkasan data dan statistik" },
  "/admin/berita": { title: "Kelola Berita", subtitle: "Manajemen artikel dan berita" },
  "/admin/galeri": { title: "Kelola Galeri", subtitle: "Manajemen foto dan album" },
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

  const currentPage = pageTitles[pathname] || { title: "Admin Panel", subtitle: "" };

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-[260px] flex flex-col min-h-screen">
        <AdminTopbar
          title={currentPage.title}
          subtitle={currentPage.subtitle}
          onMenuToggle={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
        <footer className="px-4 lg:px-8 py-4 border-t border-gray-100 bg-white/50">
          <p className="text-xs text-gray-400 text-center">
            © 2026 Pondok Pesantren Al-Rahmah Walantaka — Admin Panel v1.0
          </p>
        </footer>
      </div>
    </div>
  );
}
