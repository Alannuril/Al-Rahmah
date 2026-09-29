"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Eye, FileText, GraduationCap, Newspaper, Plus, Settings } from "lucide-react";
import { NewsPreviewDialog } from "@/components/admin/NewsPreviewDialog";
import { getAdminNews } from "@/lib/data/adminNews";
import { createClient } from "@/lib/supabase/client";
import type { Berita, PsbSettings } from "@/lib/supabase/types";
import { parsePsbSettings } from "@/lib/utils/psbHelper";

const quickActions = [
  { label: "Tambah Berita", href: "/admin/berita/new", icon: Plus },
  { label: "Informasi PSB", href: "/admin/psb", icon: GraduationCap },
  { label: "Pengaturan Website", href: "/admin/pengaturan", icon: Settings },
];

const publicPages = [
  { label: "Beranda", href: "/" },
  { label: "Berita", href: "/media/berita" },
  { label: "PSB", href: "/psb" },
];

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminDashboard() {
  const [news, setNews] = useState<Berita[]>([]);
  const [psb, setPsb] = useState(() => parsePsbSettings());
  const [website, setWebsite] = useState<{ name: string; updatedAt: string | null }>({
    name: "Al-Rahmah",
    updatedAt: null,
  });
  const [preview, setPreview] = useState<Berita | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadOverview() {
      const [newsItems, settings] = await Promise.all([
        getAdminNews(),
        (async () => {
          try {
            const supabase = createClient();
            const [psbResult, websiteResult] = await Promise.all([
              supabase.from("psb_settings").select("*").limit(1).maybeSingle(),
              supabase.from("pengaturan_website").select("nama_website, updated_at").limit(1).maybeSingle(),
            ]);
            return {
              psb: parsePsbSettings(psbResult.data as PsbSettings | null),
              website: {
                name: websiteResult.data?.nama_website || "Al-Rahmah",
                updatedAt: websiteResult.data?.updated_at || null,
              },
            };
          } catch {
            return {
              psb: parsePsbSettings(),
              website: { name: "Al-Rahmah", updatedAt: null },
            };
          }
        })(),
      ]);

      if (!active) return;
      setNews(newsItems);
      setPsb(settings.psb);
      setWebsite(settings.website);
      setLoading(false);
    }

    void loadOverview();
    return () => { active = false; };
  }, []);

  const latestNews = [...news]
    .sort((a, b) => (Date.parse(b.updated_at || b.created_at) || 0) - (Date.parse(a.updated_at || a.created_at) || 0))
    .slice(0, 5);
  const stats = [
    { label: "Total Berita", value: news.length, icon: Newspaper },
    { label: "Terbit", value: news.filter((item) => item.status === "Terbit").length, icon: FileText },
    { label: "Draft", value: news.filter((item) => item.status === "Draft").length, icon: FileText },
    { label: "Status PSB", value: psb.status, icon: GraduationCap },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="min-w-0 rounded-md border border-zinc-200 bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 text-zinc-500">
                <p className="text-xs font-medium sm:text-sm">{stat.label}</p>
                <Icon size={17} aria-hidden="true" className="shrink-0 text-brand-primary" />
              </div>
              {loading ? (
                <div className="mt-4 h-8 w-16 animate-pulse rounded-sm bg-zinc-100" />
              ) : (
                <p className="mt-3 min-h-8 font-heading text-2xl font-semibold leading-8 text-zinc-900 sm:text-[28px]">
                  {stat.value}
                </p>
              )}
              {stat.label === "Status PSB" && (
                <p className="mt-1 truncate text-xs text-zinc-500">Tahun ajaran {psb.tahun_ajaran}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.8fr)] xl:gap-10">
        <section aria-labelledby="latest-news-heading" className="min-w-0">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-200 pb-3">
            <h2 id="latest-news-heading" className="font-heading text-base font-semibold text-zinc-900">Pembaruan Berita</h2>
            <Link href="/admin/berita" className="inline-flex min-h-10 shrink-0 items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
              Lihat Semua <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          {loading ? (
            <div className="divide-y divide-zinc-200">
              {[1, 2, 3].map((item) => <div key={item} className="h-18 animate-pulse border-b border-zinc-200 py-4" />)}
            </div>
          ) : latestNews.length === 0 ? (
            <p className="py-10 text-sm text-zinc-500">Belum ada berita.</p>
          ) : (
            <div className="divide-y divide-zinc-200">
              {latestNews.map((item) => (
                <div key={item.id} className="flex min-w-0 items-center gap-3 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-900">{item.judul}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
                      <span className={item.status === "Terbit" ? "font-medium text-emerald-700" : "font-medium text-amber-700"}>{item.status}</span>
                      <span aria-hidden="true">&bull;</span>
                      <span>{item.kategori}</span>
                      <span aria-hidden="true">&bull;</span>
                      <span>{formatDate(item.updated_at || item.created_at)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreview(item)}
                    aria-label={`Pratinjau ${item.judul}`}
                    title="Pratinjau berita"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-brand-primary"
                  >
                    <Eye size={17} aria-hidden="true" />
                  </button>
                  <Link
                    href={`/admin/berita/${item.id}/edit`}
                    className="hidden min-h-10 shrink-0 items-center text-xs font-medium text-brand-primary hover:underline sm:inline-flex"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="space-y-7">
          <section aria-labelledby="quick-actions-heading">
            <h2 id="quick-actions-heading" className="border-b border-zinc-200 pb-3 font-heading text-base font-semibold text-zinc-900">Aksi Cepat</h2>
            <div className="divide-y divide-zinc-200">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.href} href={action.href} className="flex min-h-12 items-center gap-3 py-2 text-sm font-medium text-zinc-700 hover:text-brand-primary">
                    <Icon size={17} aria-hidden="true" className="shrink-0 text-brand-primary" />
                    <span className="min-w-0 flex-1">{action.label}</span>
                    <ArrowUpRight size={15} aria-hidden="true" className="shrink-0 text-zinc-400" />
                  </Link>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="public-preview-heading">
            <div className="border-b border-zinc-200 pb-3">
              <h2 id="public-preview-heading" className="font-heading text-base font-semibold text-zinc-900">Pratinjau Publik</h2>
              <p className="mt-1 truncate text-xs text-zinc-500">{website.name}</p>
            </div>
            <div className="divide-y divide-zinc-200">
              {publicPages.map((page) => (
                <a key={page.href} href={page.href} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between gap-3 py-2 text-sm text-zinc-700 hover:text-brand-primary">
                  <span>{page.label}</span>
                  <ArrowUpRight size={15} aria-hidden="true" className="text-zinc-400" />
                </a>
              ))}
            </div>
            {website.updatedAt && <p className="mt-2 text-xs text-zinc-500">Pengaturan diperbarui {formatDate(website.updatedAt)}</p>}
          </section>
        </div>
      </div>

      {preview && <NewsPreviewDialog berita={preview} status={preview.status} onClose={() => setPreview(null)} />}
    </div>
  );
}
