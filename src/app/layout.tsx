import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pondok Pesantren Al-Rahmah Walantaka | Islamic Boarding School",
  description: "Membentuk Generasi Qurani, Berakhlak, dan Berprestasi. Islamic Boarding School modern dengan pendidikan berkualitas tinggi dan fasilitas premium di Walantaka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans bg-brand-paper text-brand-primary">
        {children}
      </body>
    </html>
  );
}
