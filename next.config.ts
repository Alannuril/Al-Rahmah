import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
