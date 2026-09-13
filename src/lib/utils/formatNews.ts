/**
 * Utility functions for formatting news, publication dates, and read times
 */

export function formatTimeAgo(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) {
      return "Baru saja";
    }
    if (diffMin < 60) {
      return `${diffMin} menit yang lalu`;
    }
    if (diffHours < 24) {
      return `${diffHours} jam yang lalu`;
    }
    if (diffDays < 7) {
      return `${diffDays} hari yang lalu`;
    }
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} minggu yang lalu`;
    }

    // Default formatted date
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function calculateReadTime(contentOrExcerpt?: string | null): string {
  if (!contentOrExcerpt || contentOrExcerpt.trim() === "") {
    return "3 menit baca";
  }
  const wordCount = contentOrExcerpt.trim().split(/\s+/).length;
  // Average reading speed: 180 words/min
  const minutes = Math.max(1, Math.ceil(wordCount / 100));
  return `${minutes} menit baca`;
}

export function getAuthorInitials(author?: string | null): string {
  if (!author) return "AR";
  const parts = author.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

