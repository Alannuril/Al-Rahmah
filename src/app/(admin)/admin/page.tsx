"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper, Images, Megaphone, Users, TrendingUp,
  ArrowUpRight, Clock, FileText, ImagePlus, UserPlus,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface DashboardStats {
  totalBerita: number;
  totalGaleri: number;
  totalPengumuman: number;
  statusPsb: string;
}

interface RecentActivity {
  action: string;
  detail: string;
  time: string;
  icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  bg: string;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBerita: 0,
    totalGaleri: 0,
    totalPengumuman: 0,
    statusPsb: "Dibuka",
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();

      const [beritaRes, galeriRes, pengumumanRes, psbRes, activityRes] =
        await Promise.all([
          supabase.from("berita").select("id", { count: "exact", head: true }),
          supabase.from("galeri_foto").select("id", { count: "exact", head: true }),
          supabase.from("pengumuman").select("id", { count: "exact", head: true }).eq("status", "Aktif"),
          supabase.from("psb_settings").select("status").limit(1).maybeSingle(),
          supabase.from("berita").select("judul, created_at").order("created_at", { ascending: false }).limit(3),
        ]);

      setStats({
        totalBerita: beritaRes.count ?? 0,
        totalGaleri: galeriRes.count ?? 0,
        totalPengumuman: pengumumanRes.count ?? 0,
        statusPsb: psbRes.data?.status ?? "Dibuka",
      });

      if (activityRes.data) {
        setRecentActivity(
          activityRes.data.map((b) => ({
            action: "Artikel berita",
            detail: b.judul,
            time: new Date(b.created_at).toLocaleDateString("id-ID"),
            icon: FileText,
            color: "text-brand-primary",
            bg: "bg-brand-primary/5",
          }))
        );
      }

      setLoading(false);
    }

    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Berita", value: stats.totalBerita.toString(), change: "artikel", icon: Newspaper, color: "from-brand-primary to-emerald-700", bgLight: "bg-brand-primary/5", textColor: "text-brand-primary" },
    { label: "Total Foto Galeri", value: stats.totalGaleri.toString(), change: "foto", icon: Images, color: "from-brand-secondary to-emerald-500", bgLight: "bg-brand-secondary/10", textColor: "text-brand-secondary" },
    { label: "Pengumuman Aktif", value: stats.totalPengumuman.toString(), change: "aktif", icon: Megaphone, color: "from-amber-500 to-orange-500", bgLight: "bg-amber-50", textColor: "text-amber-600" },
    { label: "Status PSB", value: stats.statusPsb, change: "gelombang aktif", icon: Users, color: "from-brand-lime to-brand-accent", bgLight: "bg-brand-lime/10", textColor: "text-brand-primary" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={item}
              className="group bg-white rounded-2xl p-5 lg:p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 hover:-translate-y-0.5 cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgLight} p-2.5 rounded-xl`}>
                  <Icon size={20} className={stat.textColor} />
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-lg">
                  <TrendingUp size={12} />
                  {stat.change}
                </span>
              </div>
              <div className="space-y-1">
                {loading ? (
                  <div className="h-9 w-16 bg-gray-100 animate-pulse rounded-lg" />
                ) : (
                  <p className="text-3xl font-heading font-bold text-gray-900 tracking-tight">
                    {stat.value}
                  </p>
                )}
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div variants={item} className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <h2 className="font-heading font-semibold text-gray-800 text-sm">Berita Terbaru</h2>
            </div>
            <a href="/admin/berita" className="text-xs text-brand-primary font-medium hover:underline">Lihat Semua</a>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              [1,2,3].map((i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-100 animate-pulse rounded w-3/4" />
                    <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : recentActivity.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">Belum ada aktivitas</p>
            ) : (
              recentActivity.map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
                    <div className={`${activity.bg} p-2 rounded-xl shrink-0`}>
                      <Icon size={16} className={activity.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{activity.action}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{activity.detail}</p>
                    </div>
                    <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">{activity.time}</span>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-heading font-semibold text-gray-800 text-sm">Aksi Cepat</h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: "Tambah Berita", href: "/admin/berita", icon: FileText },
              { label: "Upload Galeri", href: "/admin/galeri", icon: ImagePlus },
              { label: "Buat Pengumuman", href: "/admin/pengumuman", icon: Megaphone },
              { label: "Pengaturan PSB", href: "/admin/psb", icon: Users },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-brand-primary/5 group transition-all duration-200"
                >
                  <div className="p-2 rounded-lg bg-brand-primary/5 group-hover:bg-brand-primary/10 transition-colors">
                    <Icon size={16} className="text-brand-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-brand-primary transition-colors flex-1">
                    {action.label}
                  </span>
                  <ArrowUpRight size={14} className="text-gray-300 group-hover:text-brand-primary transition-colors" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
