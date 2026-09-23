"use client";

import { useEffect } from "react";

const SECTION_IDS = ["visi-misi", "sejarah", "nakhoda", "panca-jiwa"];

export function TentangHashScroll() {
  useEffect(() => {
    // Restore deep-link positioning after the streamed page has hydrated.
    const frame = requestAnimationFrame(() => {
      const id = window.location.hash.slice(1);
      if (SECTION_IDS.includes(id)) {
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
}
