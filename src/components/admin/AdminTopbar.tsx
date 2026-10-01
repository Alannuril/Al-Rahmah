"use client";

import { ArrowUpRight, Menu } from "lucide-react";

interface AdminTopbarProps {
  title: string;
  subtitle?: string;
  onMenuToggle: () => void;
}

export function AdminTopbar({ title, subtitle, onMenuToggle }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white">
      <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            aria-label="Buka menu admin"
            title="Buka menu admin"
            className="-ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 lg:hidden"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <div className="min-w-0 py-2">
            <h1 className="truncate font-heading text-base font-semibold leading-tight text-zinc-900 sm:text-lg">{title}</h1>
            {subtitle && (
              <p className="mt-0.5 hidden truncate text-xs text-zinc-500 sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          aria-label="Lihat situs publik"
          title="Lihat situs publik"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-zinc-200 px-2.5 text-sm font-medium text-zinc-700 hover:border-brand-primary hover:text-brand-primary sm:px-3"
        >
          <span className="hidden sm:inline">Lihat Situs</span>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
