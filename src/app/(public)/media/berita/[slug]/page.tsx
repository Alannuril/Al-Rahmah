import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBeritaBySlug } from "@/lib/data/news";
import { NewsArticle } from "@/components/news/NewsArticle";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const berita = await getBeritaBySlug(slug);
  if (!berita) {
    return { title: "Berita Tidak Ditemukan - Al-Rahmah" };
  }
  return {
    title: `${berita.judul} - Al-Rahmah`,
    description: berita.excerpt || berita.judul,
  };
}

export default async function DetailBeritaPage({ params }: PageProps) {
  const { slug } = await params;
  const berita = await getBeritaBySlug(slug);

  if (!berita) notFound();

  return (
    <main className="min-h-screen bg-surface/40 pb-20 pt-28 sm:pb-24 sm:pt-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-5 sm:mb-6">
          <Link
            href="/media/berita"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-brand-primary sm:text-sm"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <span>Kembali ke Semua Berita</span>
          </Link>
        </div>

        <NewsArticle berita={berita} />
      </div>
    </main>
  );
}
