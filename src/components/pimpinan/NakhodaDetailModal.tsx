"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import {
  findProfilePage,
  paginateProfile,
  profileLabelClass,
  profileTextClass,
  profileTitleClass,
  type ProfilePage,
  type ProfileSection,
} from "./profilePagination";

export interface NakhodaData {
  id: string;
  nama: string;
  jabatan: string;
  peranTag: string;
  foto: string;
  fotoPosition?: string;
  quote: string;
  ringkasan: string;
  biografiLengkap: string[];
  fokusKontribusi: {
    judul: string;
    deskripsi: string;
  }[];
}

interface NakhodaDetailModalProps {
  nakhoda: NakhodaData;
  onClose: () => void;
}

export function NakhodaDetailModal({ nakhoda, onClose }: NakhodaDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [pagination, setPagination] = useState<{ pages: ProfilePage[]; index: number }>({ pages: [], index: 0 });
  const sections = useMemo<ProfileSection[]>(() => [
    { id: "profile", title: nakhoda.jabatan, blocks: [{ id: "summary", text: nakhoda.ringkasan }] },
    {
      id: "biography",
      title: "Biografi",
      blocks: nakhoda.biografiLengkap.map((text, index) => ({ id: "bio-" + index, text })),
    },
    {
      id: "roles",
      title: "Peran dan tanggung jawab",
      blocks: nakhoda.fokusKontribusi.map((item, index) => ({ id: "role-" + index, label: item.judul, text: item.deskripsi })),
    },
  ], [nakhoda]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement;
    const originalBodyOverflow = document.body.style.overflow;
    const originalRootOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalRootOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  useLayoutEffect(() => {
    const reader = readerRef.current;
    const measure = measureRef.current;
    if (!reader || !measure) return;
    let frame = 0;
    let disposed = false;
    const layout = () => {
      if (disposed || reader.clientWidth === 0 || reader.clientHeight === 0) return;
      const pages = paginateProfile(sections, measure, reader.clientWidth, reader.clientHeight);
      setPagination(current => ({ pages, index: findProfilePage(pages, current.pages[current.index]) }));
    };
    const scheduleLayout = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(layout);
    };
    const observer = new ResizeObserver(scheduleLayout);
    observer.observe(reader);
    void document.fonts.ready.then(scheduleLayout);
    document.fonts.addEventListener("loadingdone", scheduleLayout);
    scheduleLayout();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", scheduleLayout);
    };
  }, [sections]);

  const page = pagination.pages[pagination.index];
  const turnPage = (direction: number) => {
    setPagination(current => ({
      ...current,
      index: Math.max(0, Math.min(current.pages.length - 1, current.index + direction)),
    }));
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="nakhoda-modal-title"
      className="m-auto h-[min(42rem,calc(100dvh-2rem))] w-[calc(100%-2rem)] max-w-4xl overflow-hidden overscroll-none rounded-lg border-0 bg-white p-0 text-zinc-900 shadow-xl backdrop:bg-zinc-950/60"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          turnPage(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <div className="flex h-full min-h-0 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-200 px-5 py-3 sm:px-8">
          <div className="min-w-0">
            <p className="text-xs font-medium leading-5 text-brand-primary">Profil Nakhoda</p>
            <h2 id="nakhoda-modal-title" className="mt-1 font-heading text-base font-semibold leading-snug sm:text-xl">
              {nakhoda.nama}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup profil"
            title="Tutup profil"
            autoFocus
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 flex-1 px-5 py-5 sm:px-8 sm:py-6 [@media(max-height:500px)]:py-3">
          <div ref={readerRef} className="relative h-full min-h-0 overflow-hidden">
            {page && (
              <div
                id="nakhoda-profile-page"
                role="region"
                aria-label={page.title}
                className={page.section === "profile" ? "grid h-full grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-center gap-5" : "h-full"}
              >
                {page.section === "profile" && (
                  <div className="relative aspect-[3/4] max-h-full w-full overflow-hidden rounded-sm bg-[#edf3ee]">
                    <Image
                      src={nakhoda.foto}
                      alt={"Foto profil " + nakhoda.nama}
                      fill
                      loading="eager"
                      sizes="(max-width: 639px) 30vw, 270px"
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0" data-profile-content>
                  <h3 className={profileTitleClass}>{page.title}</h3>
                  <div className="mt-4 space-y-4">
                    {page.fragments.map((fragment) => (
                      <div key={fragment.id + "-" + fragment.start}>
                        {fragment.label && <h4 className={profileLabelClass}>{fragment.label}</h4>}
                        <p className={profileTextClass} data-source={fragment.id} data-start={fragment.start}>
                          {fragment.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={measureRef} aria-hidden="true" className="pointer-events-none invisible absolute left-0 top-0" />
          </div>
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-zinc-200 px-4 py-2 sm:px-8 sm:py-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 cursor-pointer rounded-sm px-1 text-sm font-semibold text-brand-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Tutup profil
          </button>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label="Halaman sebelumnya"
              title="Halaman sebelumnya"
              aria-controls="nakhoda-profile-page"
              disabled={pagination.index === 0}
              onClick={() => turnPage(-1)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-brand-primary hover:bg-brand-primary/10 focus-visible:outline-2 focus-visible:outline-brand-primary disabled:cursor-default disabled:opacity-30"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <p aria-live="polite" aria-atomic="true" className="w-12 text-center text-xs tabular-nums text-zinc-600">
              <span className="sr-only">Halaman </span>{pagination.pages.length ? pagination.index + 1 : 0} / {pagination.pages.length}
            </p>
            <button
              type="button"
              aria-label="Halaman berikutnya"
              title="Halaman berikutnya"
              aria-controls="nakhoda-profile-page"
              disabled={!page || pagination.index === pagination.pages.length - 1}
              onClick={() => turnPage(1)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-brand-primary hover:bg-brand-primary/10 focus-visible:outline-2 focus-visible:outline-brand-primary disabled:cursor-default disabled:opacity-30"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
