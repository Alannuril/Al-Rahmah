"use client";

import { useEffect } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "visi-misi", label: "Visi & Misi" },
  { id: "sejarah", label: "Sejarah" },
  { id: "nakhoda", label: "Nakhoda" },
];

export function TentangNavigation() {
  useEffect(() => {
    // Restore deep-link positioning after the streamed page has hydrated.
    const frame = requestAnimationFrame(() => {
      const id = window.location.hash.slice(1);
      if (id === "panca-jiwa" || SECTIONS.some((section) => section.id === id)) {
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <nav aria-label="Bagian Tentang Al-Rahmah" className="mt-6 flex flex-wrap gap-x-6 gap-y-1 border-b border-zinc-200 text-sm font-medium text-brand-primary">
      {SECTIONS.map((section) => (
        <Link
          key={section.id}
          href={`#${section.id}`}
          className="inline-flex min-h-11 items-center border-b-2 border-transparent hover:border-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          {section.label}
        </Link>
      ))}
    </nav>
  );
}
