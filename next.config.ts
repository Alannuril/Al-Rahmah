import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Keep old public URLs working after consolidating their pages.
      { source: "/profil", destination: "/tentang", permanent: true },
      { source: "/media/berita", destination: "/media", permanent: true },
      { source: "/media/kegiatan", destination: "/media?kategori=Kegiatan", permanent: true },
      { source: "/media/kejuaraan", destination: "/media?kategori=Kejuaraan", permanent: true },
      {
        source: "/tentang/visi-misi",
        destination: "/tentang#visi-misi",
        permanent: false,
      },
      {
        source: "/tentang/sejarah",
        destination: "/tentang#sejarah",
        permanent: false,
      },
      {
        source: "/tentang/pimpinan",
        destination: "/tentang#nakhoda",
        permanent: false,
      },
      {
        source: "/tentang/badan-wakaf",
        destination: "/tentang#panca-jiwa",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
