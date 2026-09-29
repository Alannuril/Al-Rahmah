"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { BeritaStatus } from "@/lib/supabase/types";
import { NewsArticle, type NewsArticleData } from "@/components/news/NewsArticle";

export function NewsPreviewDialog({
  berita,
  status,
  onClose,
}: {
  berita: NewsArticleData;
  status: BeritaStatus;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="news-preview-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto rounded-md border-0 bg-white p-0 text-zinc-900 shadow-2xl backdrop:bg-zinc-950/65"
    >
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-zinc-200 bg-white px-4 py-2.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <h2 id="news-preview-title" className="truncate text-sm font-semibold">Pratinjau Berita</h2>
          <span className={status === "Terbit"
            ? "rounded-sm bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700"
            : "rounded-sm bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700"}
          >
            {status}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup pratinjau"
          title="Tutup pratinjau"
          autoFocus
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </header>
      <div className="bg-surface/40 px-4 py-6 sm:px-6 sm:py-8">
        <NewsArticle berita={berita} showFooter={false} />
      </div>
    </dialog>
  );
}
