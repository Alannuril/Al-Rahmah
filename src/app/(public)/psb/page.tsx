"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  ExternalLink,
  Copy,
  Check,
  Phone,
  Maximize2,
  X,
  CreditCard,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Clock,
  ClipboardList,
  GraduationCap,
  Sparkles,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import { DUMMY_PSB_DATA, PsbAnnouncementData } from "@/lib/constants/psbData";
import { createClient } from "@/lib/supabase/client";
import {
  parsePsbSettings,
  configToAnnouncementData,
  findActiveGelombang,
  formatDateRangeDisplay,
  formatIndoDate,
} from "@/lib/utils/psbHelper";

export default function PsbInformationPage() {
  const [data, setData] = useState<PsbAnnouncementData>(DUMMY_PSB_DATA);

  // Interaction states
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Fetch dynamic settings from Supabase
  useEffect(() => {
    async function loadPsbSettings() {
      try {
        const supabase = createClient();
        const { data: dbData } = await supabase
          .from("psb_settings")
          .select("*")
          .limit(1)
          .maybeSingle();

        if (dbData) {
          const config = parsePsbSettings(dbData);
          setData(configToAnnouncementData(config));
        }
      } catch (err) {
        console.warn("Could not fetch real-time PSB settings, using baseline:", err);
      }
    }
    loadPsbSettings();
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(data.googleFormUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(data.biayaFormulir.rekening.nomor);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2200);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const isClosed = data.status === "Ditutup";
  const activeWave = findActiveGelombang(data.gelombang);
  const heroPeriodLabel =
    activeWave && "tanggalMulai" in activeWave && activeWave.tanggalMulai && activeWave.tanggalSelesai
      ? `${formatDateRangeDisplay(activeWave.tanggalMulai, activeWave.tanggalSelesai)} M`
      : data.periodeLabel;
  const activeWaveName = activeWave && "nama" in activeWave ? activeWave.nama : "";

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F2F7F4] via-white to-[#F2F7F4] pt-28 sm:pt-32 pb-20 text-zinc-800">
      
      {/* ============================================================ */}
      {/* 1. HEADER UTAMA (FONT STANDAR KONSISTEN)                     */}
      {/* ============================================================ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-[32px] font-bold text-zinc-900 tracking-tight">
          Penerimaan Santri Baru (PSB)
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-1.5">
          Tahun Ajaran {data.tahunAjaran} — Pondok Pesantren Al-Rahmah Walantaka
        </p>
      </section>

      {/* ============================================================ */}
      {/* 2. PENERIMAAN SANTRI BARU & LINE PROCESS GELOMBANG           */}
      {/* ============================================================ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-14 sm:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Poster Flyer Interaktif (5 Kolom) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="group relative w-full max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden bg-white border border-zinc-200/90 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-[#396E5F]/50"
            >
              {/* Overlay Zoom */}
              <div className="absolute inset-0 z-10 bg-[#1E3F35]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[1px]">
                <div className="flex items-center gap-1.5 text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-full">
                  <Maximize2 size={14} />
                  <span>Perbesar Poster</span>
                </div>
              </div>

              {/* Poster Gambar */}
              <div className="relative w-full aspect-[326/456]">
                <Image
                  src={data.flyerUrl}
                  alt={`Poster Pengumuman Pendaftaran Santri Baru Al-Rahmah ${data.tahunAjaran}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 280px, 320px"
                  className="object-contain p-2"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="mt-2.5 inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[#396E5F] hover:text-[#1E3F35] transition-colors cursor-pointer"
            >
              <Maximize2 size={12} />
              <span>Klik poster untuk memperbesar</span>
            </button>
          </div>

          {/* Informasi & Tombol Pendaftaran (7 Kolom) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            
            {/* Status Badge & Active Wave Indicator */}
            <div className="flex flex-wrap items-center gap-2">
              {isClosed ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  <AlertTriangle size={13} className="text-amber-600" />
                  <span>Pendaftaran Periode Ini Sedang Ditutup</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Pendaftaran Sedang Dibuka</span>
                </span>
              )}

              {activeWaveName && !isClosed && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#396E5F]/10 text-[#1E3F35] border border-[#396E5F]/20">
                  <Layers size={13} className="text-[#396E5F]" />
                  <span>Fokus: <strong>{activeWaveName}</strong></span>
                </span>
              )}
            </div>

            {/* Judul & Jenjang */}
            <div className="space-y-1.5">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-zinc-900 leading-snug">
                {data.judul}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Pendaftaran santri baru terbuka untuk jenjang <strong>Madrasah Tsanawiyah (MTs)</strong> dan <strong>Madrasah Aliyah (MA)</strong> melalui formulir online resmi.
              </p>
            </div>

            {/* Batas Waktu Pendaftaran (Clean Inline, Tanpa Card) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700">
              <Calendar size={16} className="text-[#396E5F] shrink-0" />
              <span>
                {activeWaveName && !isClosed
                  ? `Batas Waktu (${activeWaveName}): `
                  : "Batas Waktu: "}
                <strong className="text-zinc-900 font-semibold">{heroPeriodLabel}</strong>
              </span>
            </div>

            {/* Aksi Utama: Tombol Google Form / Status Ditutup */}
            <div className="pt-2 space-y-2.5">
              {isClosed ? (
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-900">
                    <AlertTriangle size={16} className="text-amber-600 shrink-0" />
                    <span>Pendaftaran Sementara Ditutup</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Penerimaan santri baru untuk periode ini telah ditutup atau belum dibuka kembali. Calon wali santri dapat menghubungi narahubung panitia di bagian bawah halaman ini untuk informasi gelombang selanjutnya.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <a
                      href={data.googleFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-5 rounded-xl bg-[#396E5F] hover:bg-[#2A5C4E] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-[#396E5F]/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-center"
                    >
                      <span>Isi Formulir (Google Form)</span>
                      <ExternalLink size={15} />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="py-3 px-4 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 hover:border-zinc-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      {copiedLink ? (
                        <>
                          <Check size={14} className="text-[#396E5F]" />
                          <span className="font-bold text-[#396E5F]">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Salin Link</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-500 font-mono break-all">
                    Tautan resmi: {data.googleFormUrl}
                  </p>
                </>
              )}
            </div>

          </div>

        </div>

        {/* Line Process Gelombang (Langsung tergabung, Clean & Modern, Tanpa Card, Tanpa Subjudul) */}
        <div className="border-t border-[#ABD8B1]/40 pt-10 sm:pt-12 mt-10 sm:mt-12">
          <div className="relative max-w-4xl mx-auto">
            <div className="flex flex-col md:grid md:grid-cols-3">
              {data.gelombang.map((wave, idx) => {
                const isOpen = wave.status === "Dibuka";
                const isUpcoming = wave.status === "Akan Datang";
                const isClosed = wave.status === "Ditutup";
                const isLast = idx === data.gelombang.length - 1;

                return (
                  <div key={wave.id || idx} className="contents md:block">
                    <div className="relative flex flex-col items-center text-center px-4">
                      {/* Node Indicator Row with Desktop Connecting Line */}
                      <div className="relative flex items-center justify-center w-full mb-3">
                        {/* Desktop connecting line to next wave */}
                        {!isLast && (
                          <div
                            className={`hidden md:block absolute top-1/2 left-1/2 w-full h-[2px] -translate-y-1/2 -z-0 transition-colors ${
                              isClosed ? "bg-[#396E5F]" : "bg-zinc-200"
                            }`}
                          />
                        )}

                        {/* Node circle */}
                        <div
                          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                            isOpen
                              ? "bg-[#396E5F] text-white ring-4 ring-[#396E5F]/20 shadow-xs"
                              : isClosed
                              ? "bg-emerald-50 text-[#396E5F] border border-[#ABD8B1]"
                              : "bg-white text-zinc-400 border-2 border-zinc-200"
                          }`}
                        >
                          {isClosed ? (
                            <Check size={16} strokeWidth={2.5} />
                          ) : (
                            `0${idx + 1}`
                          )}
                        </div>
                      </div>

                      {/* Wave Name */}
                      <h3 className="font-heading font-bold text-base text-zinc-900 mb-1">
                        {wave.nama}
                      </h3>

                      {/* Registration Period Range */}
                      <p className="text-xs sm:text-sm font-semibold text-[#1E3F35] mb-1">
                        {formatDateRangeDisplay(wave.tanggalMulai, wave.tanggalSelesai)}
                      </p>

                      {/* Test Date Only */}
                      {wave.tanggalTes && (
                        <p className="text-xs text-zinc-600 font-medium">
                          Tes: <span className="font-semibold text-zinc-800">{wave.tanggalTes}</span>
                        </p>
                      )}

                      {/* CTA Button / Subtle Status */}
                      <div className="mt-3">
                        {isOpen ? (
                          <a
                            href={data.googleFormUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#396E5F] hover:bg-[#2A5C4E] text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
                          >
                            <span>Daftar Sekarang</span>
                            <ArrowRight size={13} />
                          </a>
                        ) : isUpcoming ? (
                          <span className="text-[11px] text-zinc-400 font-medium">
                            Belum Dibuka
                          </span>
                        ) : (
                          <span className="text-[11px] text-zinc-400 font-medium">
                            Pendaftaran Ditutup
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mobile connecting vertical line */}
                    {!isLast && (
                      <div className="md:hidden flex justify-center py-2.5">
                        <div
                          className={`w-[2px] h-7 transition-colors ${
                            isClosed ? "bg-[#396E5F]" : "bg-zinc-200"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. ALUR PENDAFTARAN 3 LANGKAH (LANGSUNG PADA INTINYA)         */}
      {/* ============================================================ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-12 sm:mb-14">
        <div className="border-t border-[#ABD8B1]/40 pt-8 sm:pt-10">
          
          <h2 className="font-heading text-lg sm:text-xl font-bold text-center text-zinc-900 mb-6 sm:mb-8">
            Alur Pendaftaran
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {data.tahapan.map((item) => (
              <div
                key={item.step}
                className="relative flex flex-col p-5 rounded-2xl bg-white border border-[#ABD8B1]/50 shadow-2xs hover:border-[#396E5F]/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#396E5F]/10 text-[#396E5F] font-heading font-bold text-sm flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-zinc-900 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. BIAYA PENDAFTARAN & REKENING RESMI (UNIFIED SOFT GREEN)   */}
      {/* ============================================================ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-12 sm:mb-14">
        <div className="border-t border-[#ABD8B1]/40 pt-8 sm:pt-10">
          
          <h2 className="font-heading text-lg sm:text-xl font-bold text-center text-zinc-900 mb-6 sm:mb-8">
            Ketentuan Biaya &amp; Rekening Resmi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Non Yatim */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#ABD8B1]/60 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100">
                <span className="font-heading font-bold text-xs sm:text-sm text-zinc-900 flex items-center gap-2">
                  <CreditCard size={17} className="text-[#396E5F]" />
                  <span>Kategori Non-Yatim</span>
                </span>
                <span className="font-bold text-[#396E5F] text-xs sm:text-sm bg-[#396E5F]/10 px-2.5 py-0.5 rounded-full">
                  {data.biayaFormulir.nonYatim}
                </span>
              </div>

              <p className="text-xs text-zinc-600">
                Ditransfer ke rekening resmi pondok sebelum mengisi formulir:
              </p>

              {/* Box Rekening Bank */}
              <div className="p-3.5 rounded-xl bg-[#F0F8F3] border border-[#ABD8B1]/70 space-y-1 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Bank:</span>
                  <strong className="text-zinc-900">{data.biayaFormulir.rekening.bank}</strong>
                </div>
                <div className="flex justify-between text-zinc-600 items-center">
                  <span>No. Rekening:</span>
                  <strong className="font-mono text-sm sm:text-base font-bold text-[#396E5F]">
                    {data.biayaFormulir.rekening.nomor}
                  </strong>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Atas Nama:</span>
                  <strong className="text-zinc-900">{data.biayaFormulir.rekening.atasNama}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyAccount}
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#F2F7F4] text-[#396E5F] border border-[#ABD8B1] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedAccount ? (
                  <>
                    <Check size={13} className="text-[#396E5F]" />
                    <span className="font-bold">Nomor Rekening Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Salin Nomor Rekening ({data.biayaFormulir.rekening.bank})</span>
                  </>
                )}
              </button>
            </div>

            {/* Yatim */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#F0F8F3] to-white border border-[#ABD8B1]/60 shadow-2xs space-y-3.5 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#ABD8B1]/40">
                  <span className="font-heading font-bold text-xs sm:text-sm text-zinc-900">
                    Kategori Yatim
                  </span>
                  <span className="font-bold text-[#1E3F35] text-xs sm:text-sm bg-[#8AC77F]/30 px-2.5 py-0.5 rounded-full">
                    {data.biayaFormulir.yatim}
                  </span>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  {data.biayaFormulir.catatanYatim}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#ABD8B1]/50 text-xs text-[#396E5F] font-medium">
                Pondok Pesantren Al-Rahmah membebaskan biaya formulir &amp; pendaftaran 100% untuk santri yatim.
              </div>
            </div>

          </div>

          {/* Checklist Berkas yang Perlu Disiapkan */}
          <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-white border border-[#ABD8B1]/50 shadow-2xs">
            <h3 className="font-heading font-bold text-xs sm:text-sm text-zinc-900 mb-2.5">
              Berkas yang Perlu Disiapkan (Foto/Scan):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
              {data.persyaratanUmum.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#396E5F] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. NARAHUBUNG RESMI WHATSAPP                                 */}
      {/* ============================================================ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-12 sm:mb-14">
        <div className="rounded-3xl bg-[#1E3F35] text-white p-5 sm:p-7 lg:p-8 shadow-xs border border-[#396E5F]">
          
          <div className="max-w-2xl mb-5">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
              Narahubung Panitia PSB
            </h2>
            <p className="text-xs text-[#AED69F] mt-1">
              Hubungi panitia via WhatsApp jika ada pertanyaan atau kendala seputar pendaftaran:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.kontakPanitia.map((kontak, idx) => (
              <a
                key={idx}
                href={kontak.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-[#8AC77F] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#8AC77F]/20 text-[#AED69F] group-hover:bg-[#8AC77F] group-hover:text-[#1E3F35] flex items-center justify-center transition-colors shrink-0">
                    <Phone size={15} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-xs sm:text-sm">
                      {kontak.nama}
                    </h3>
                    <p className="text-[11px] text-[#AED69F]/80">
                      {kontak.peran}
                    </p>
                    <p className="font-mono text-[11px] text-[#AED69F] mt-0.5">
                      {kontak.nomor}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[#AED69F] group-hover:text-white group-hover:translate-x-0.5 transition-all">
                  Chat &rarr;
                </span>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FAQ (TANYA JAWAB SINGKAT)                                 */}
      {/* ============================================================ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mb-10">
        <h2 className="font-heading text-lg sm:text-xl font-bold text-center text-zinc-900 mb-5">
          Pertanyaan Umum (FAQ)
        </h2>

        <div className="space-y-2">
          {data.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-white border border-[#ABD8B1]/50 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F2F7F4]/60 transition-colors"
                >
                  <span className="font-semibold text-xs sm:text-sm text-zinc-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`text-[#396E5F] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100">
                    {idx === 0 && activeWaveName
                      ? `Pendaftaran santri baru dibuka dalam beberapa tahapan gelombang (Gelombang 1 - 3). Saat ini dibuka untuk ${activeWaveName} dengan periode ${heroPeriodLabel}. Kami menyarankan calon wali santri menyelesaikan pendaftaran sebelum kuota gelombang terpenuhi.`
                      : faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. HIMBAUAN KEAMANAN SINGKAT                                 */}
      {/* ============================================================ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Waspada Penipuan:</strong> Pembayaran biaya formulir resmi hanya melalui rekening <strong>{data.biayaFormulir.rekening.bank} {data.biayaFormulir.rekening.nomor}</strong> a.n. <strong>{data.biayaFormulir.rekening.atasNama}</strong>. Panitia tidak pernah meminta transfer ke rekening pribadi.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. MODAL LIGHTBOX FLYER                                      */}
      {/* ============================================================ */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-sm sm:max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-3 flex flex-col items-center max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="w-full flex items-center justify-between pb-2 px-1 border-b border-zinc-100 mb-2">
              <h3 className="font-heading font-bold text-xs sm:text-sm text-[#1E3F35]">
                Poster Resmi PSB {data.tahunAjaran}
              </h3>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Tutup preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Gambar Poster Full */}
            <div className="relative w-full aspect-[326/456] max-h-[70vh]">
              <Image
                src={data.flyerUrl}
                alt={`Poster Resmi PSB Al-Rahmah ${data.tahunAjaran}`}
                fill
                sizes="(max-width: 640px) 90vw, 420px"
                className="object-contain"
              />
            </div>

            {/* Footer Modal Action */}
            <div className="w-full pt-3 px-1 border-t border-zinc-100 flex items-center justify-between gap-2">
              <span className="text-[11px] text-zinc-500">
                Pondok Pesantren Al-Rahmah Walantaka
              </span>
              <a
                href={data.flyerUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#396E5F] hover:underline"
              >
                <span>Unduh Gambar</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
