"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Phone, MapPin, Send, MessageCircle, ExternalLink, Compass } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { resolveWebsiteInfo, GOOGLE_MAPS_URL, GOOGLE_MAPS_EMBED_URL } from "@/lib/utils/websiteInfo";
import { parsePsbSettings } from "@/lib/utils/psbHelper";

export default function KontakPage() {
  const [setting, setSetting] = useState(() => resolveWebsiteInfo());

  const [form, setForm] = useState({
    nama: "",
    no_hp: "",
    pesan: "",
  });

  useEffect(() => {
    let active = true;
    async function loadSetting() {
      try {
        const supabase = createClient();
        const [website, psb] = await Promise.all([
          supabase.from("pengaturan_website").select("*").limit(1).maybeSingle(),
          supabase.from("psb_settings").select("*").limit(1).maybeSingle(),
        ]);
        if (active) {
          setSetting(resolveWebsiteInfo(website.data, parsePsbSettings(psb.data).kontak_panitia));
        }
      } catch {
        // Retain the same fallback contacts used by the PSB page.
      }
    }
    loadSetting();
    return () => { active = false; };
  }, []);

  const handleSendWa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.pesan.trim()) {
      alert("Mohon isi nama dan pesan Anda.");
      return;
    }

    if (!setting.whatsapp_url) return;
    const text = `Assalamu'alaikum Warahmatullahi Wabarakatuh,

Perkenalkan saya: *${form.nama}*
No. HP/WA: ${form.no_hp || "-"}

Pesan/Pertanyaan:
${form.pesan}

Terima kasih.`;
    const waUrl = `${setting.whatsapp_url}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };


  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-paper">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Hubungi Kami"
          subtitle="Kami siap membantu Anda. Silakan hubungi kami untuk informasi lebih lanjut mengenai pendaftaran atau merencanakan kunjungan langsung."
          centered
        />

        <div className="mt-16 flex flex-col lg:flex-row gap-8 bg-white p-4 md:p-8 rounded-[3rem] shadow-xl shadow-brand-primary/5 border border-gray-50">
          {/* Form Side */}
          <div className="lg:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-brand-primary">
                Kirim Pesan Langsung
              </h3>
            </div>

            <form onSubmit={handleSendWa} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-secondary transition-all text-brand-primary text-sm font-medium"
                    placeholder="Bpk/Ibu/Sdr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">
                    No. WhatsApp Anda
                  </label>
                  <input
                    type="tel"
                    value={form.no_hp}
                    onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-secondary transition-all text-brand-primary text-sm font-medium"
                    placeholder="0812..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">
                  Pesan Anda *
                </label>
                <textarea
                  rows={5}
                  required
                  value={form.pesan}
                  onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-secondary transition-all text-brand-primary text-sm font-medium resize-none leading-relaxed"
                  placeholder="Tuliskan pertanyaan atau pesan Anda di sini..."
                />
              </div>

              <button
                type="submit"
                disabled={!setting.whatsapp_url}
                className="px-8 py-4 rounded-xl bg-brand-primary text-white hover:bg-brand-secondary font-bold text-sm tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all w-full md:w-fit mt-2 flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Kirim Via WhatsApp
              </button>
            </form>
          </div>

          {/* Info Side */}
          <div className="lg:w-1/2 rounded-[2.5rem] bg-brand-primary p-10 md:p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-inner border border-white/10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-secondary/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 mb-8">
              <h3 className="font-heading text-2xl font-bold mb-8">Informasi Center</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex shrink-0 items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors duration-300 shadow-lg">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-lime text-xs mb-1.5 uppercase tracking-widest">
                      Alamat Pondok Pesantren
                    </h4>
                    <p className="text-white/80 leading-relaxed font-medium text-sm">
                      {setting.alamat}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex shrink-0 items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors duration-300 shadow-lg">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-lime text-xs mb-1.5 uppercase tracking-widest">
                      {setting.whatsapp_label}
                    </h4>
                    {setting.whatsapp_url ? (
                      <a
                        href={setting.whatsapp_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/90 hover:text-brand-lime font-medium text-lg transition-colors"
                      >
                        {setting.no_whatsapp}
                      </a>
                    ) : (
                      <p className="text-white/90 font-medium text-lg">{setting.no_whatsapp}</p>
                    )}
                  </div>
                </li>

                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex shrink-0 items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors duration-300 shadow-lg">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-lime text-xs mb-1.5 uppercase tracking-widest">
                      Panitia Penerimaan Santri Baru
                    </h4>
                    <Link href="/psb#kontak-panitia" className="text-white/90 hover:text-brand-lime font-medium text-sm underline underline-offset-4">
                      Lihat seluruh kontak panitia PSB
                    </Link>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative z-10 w-full rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col">
              <div className="relative w-full h-[220px]">
                <iframe
                  src={GOOGLE_MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Pondok Pesantren Al-Rahmah Walantaka"
                  className="w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-brand-primary/95 hover:bg-brand-secondary text-white text-xs font-semibold tracking-wide uppercase transition-colors border-t border-white/10"
              >
                <Compass size={15} />
                <span>Buka Petunjuk Arah di Google Maps</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
