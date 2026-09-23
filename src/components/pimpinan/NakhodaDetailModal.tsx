"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = originalOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="nakhoda-modal-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-lg border border-zinc-200 bg-white p-0 text-zinc-900 shadow-xl backdrop:bg-zinc-950/60"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div>
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-zinc-200 bg-white px-5 py-3 sm:px-8">
          <p className="text-sm font-semibold text-brand-primary">Profil Nakhoda</p>
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

        <div className="space-y-7 px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative aspect-[3/4] w-28 shrink-0 overflow-hidden rounded-sm bg-zinc-100">
              <Image
                src={nakhoda.foto}
                alt={"Foto profil " + nakhoda.nama}
                fill
                sizes="112px"
                className={"object-cover " + (nakhoda.fotoPosition || "object-top")}
              />
            </div>
            <div className="min-w-0">
              <h2 id="nakhoda-modal-title" className="font-heading text-2xl font-semibold leading-snug">
                {nakhoda.nama}
              </h2>
              <p className="mt-2 text-sm font-medium leading-6 text-brand-primary">
                {nakhoda.jabatan}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{nakhoda.ringkasan}</p>
            </div>
          </div>

          <section aria-labelledby="nakhoda-biografi-heading" className="border-t border-zinc-200 pt-6">
            <h3 id="nakhoda-biografi-heading" className="font-heading text-lg font-semibold">Biografi</h3>
            <div className="mt-3 space-y-4 text-sm leading-7 text-zinc-600">
              {nakhoda.biografiLengkap.map((paragraf) => (
                <p key={paragraf}>{paragraf}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="nakhoda-peran-heading" className="border-t border-zinc-200 pt-6">
            <h3 id="nakhoda-peran-heading" className="font-heading text-lg font-semibold">Peran dan tanggung jawab</h3>
            <dl className="mt-4 space-y-5">
              {nakhoda.fokusKontribusi.map((item) => (
                <div key={item.judul}>
                  <dt className="text-sm font-semibold leading-6">{item.judul}</dt>
                  <dd className="mt-1 text-sm leading-7 text-zinc-600">{item.deskripsi}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="flex justify-end border-t border-zinc-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 cursor-pointer rounded-md border border-zinc-300 px-4 text-sm font-semibold text-brand-primary hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Tutup profil
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
