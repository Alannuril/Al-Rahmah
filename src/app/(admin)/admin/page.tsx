"use client";

import { motion } from "framer-motion";
import {
  Newspaper,
  Images,
  Megaphone,
  Users,
  TrendingUp,
  ArrowUpRight,
  Clock,
  FileText,
  ImagePlus,
  UserPlus,
} from "lucide-react";

const stats = [
  {
    label: "Total Berita",
    value: "24",
    change: "+3 bulan ini",
    icon: Newspaper,
    color: "from-brand-primary to-emerald-700",
    bgLight: "bg-brand-primary/5",
    textColor: "text-brand-primary",
  },
  {
    label: "Total Galeri",
    value: "156",
    change: "+12 bulan ini",
    icon: Images,
    color: "from-brand-secondary to-emerald-500",
    bgLight: "bg-brand-secondary/10",
    textColor: "text-brand-secondary",
  },
  {
    label: "Pengumuman",
    value: "8",
    change: "3 aktif",
    icon: Megaphone,
    color: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    label: "Pendaftar PSB",
    value: "342",
    change: "+28 minggu ini",
    icon: Users,
    color: "from-brand-lime to-brand-accent",
    bgLight: "bg-brand-lime/10",
    textColor: "text-brand-primary",
  },
];

const recentActivity = [
  {
    action: "Artikel baru ditambahkan",
    detail: "Kegiatan Haflah Akhirussanah 2026",
    time: "2 jam lalu",
    icon: FileText,
    color: "text-brand-primary",
    bg: "bg-brand-primary/5",
  },
  {
    action: "Foto galeri diupload",
    detail: "Album Wisuda Tahfidz — 12 foto baru",
    time: "5 jam lalu",
    icon: ImagePlus,
    color: "text-brand-secondary",
    bg: "bg-brand-secondary/5",
  },
  {
    action: "Pendaftar PSB baru",
    detail: "Ahmad Fauzan — Program Tahfidz",
    time: "1 hari lalu",
    icon: UserPlus,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    action: "Pengumuman diperbarui",
    detail: "Jadwal Ujian Semester Genap 2026",
    time: "2 hari lalu",
    icon: Megaphone,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminDashboard() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => {
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
                <p className="text-3xl font-heading font-bold text-gray-900 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          variants={item}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <h2 className="font-heading font-semibold text-gray-800 text-sm">
                Aktivitas Terbaru
              </h2>
            </div>
            <button className="text-xs text-brand-primary font-medium hover:underline">
              Lihat Semua
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className={`${activity.bg} p-2 rounded-xl shrink-0`}>
                    <Icon size={16} className={activity.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {activity.detail}
                    </p>
                  </div>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={item}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-heading font-semibold text-gray-800 text-sm">
              Aksi Cepat
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: "Tambah Berita", href: "/admin/berita", icon: FileText },
              { label: "Upload Galeri", href: "/admin/galeri", icon: ImagePlus },
              { label: "Buat Pengumuman", href: "/admin/pengumuman", icon: Megaphone },
              { label: "Lihat Pendaftar", href: "/admin/psb", icon: Users },
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
