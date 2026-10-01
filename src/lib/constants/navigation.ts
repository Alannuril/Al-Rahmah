export const PUBLIC_NAV_LINKS = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Al-Rahmah", href: "/tentang" },
  { name: "Pendidikan", href: "/pendidikan" },
  { name: "Berita", href: "/media" },
  { name: "PSB", href: "/psb" },
] as const;

export const FOOTER_NAV_LINKS = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/tentang" },
  { name: "Pendidikan", href: "/pendidikan" },
  { name: "Berita", href: "/media" },
  { name: "PSB Online", href: "/psb" },
  { name: "Kontak", href: "/kontak" },
] as const;

export const FOOTER_LINK_GROUPS = [
  {
    title: "Navigasi",
    links: [
      { name: "Beranda", href: "/" },
      { name: "Tentang Al-Rahmah", href: "/tentang" },
      { name: "Pendidikan", href: "/pendidikan" },
      { name: "Berita & Kabar", href: "/media" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { name: "Pendaftaran Santri Baru", href: "/psb" },
      { name: "Kontak Panitia PSB", href: "/psb#kontak-panitia" },
      { name: "Hubungi Kami", href: "/kontak" },
    ],
  },
];
