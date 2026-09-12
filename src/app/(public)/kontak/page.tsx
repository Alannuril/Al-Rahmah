"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Phone, Mail, MapPin, Send, MessageCircle, ExternalLink, Compass } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PengaturanWebsite } from "@/lib/supabase/types";

export default function KontakPage() {
  const [setting, setSetting] = useState<Partial<PengaturanWebsite>>({
    alamat: "Jl. Raya Walantaka No. 1, Kecamatan Walantaka, Kota Serang, Provinsi Banten 42183",
    no_whatsapp: "+62 812-3456-7890",
  });

  const [form, setForm] = useState({
    nama: "",
    no_hp: "",
    pesan: "",
  });

  useEffect(() => {
    async function loadSetting() {
      const supabase = createClient();
      const { data } = await supabase
        .from("pengaturan_website")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (data) setSetting(data);
    }
    loadSetting();
  }, []);

  const handleSendWa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.pesan.trim()) {
      alert("Mohon isi nama dan pesan Anda.");
      return;
    }

    const cleanWa = (setting.no_whatsapp || "6281234567890").replace(/[^0-9]/g, "");
    const text = `Assalamu'alaikum Warahmatullahi Wabarakatuh,

Perkenalkan saya: *${form.nama}*
No. HP/WA: ${form.no_hp || "-"}

Pesan/Pertanyaan:
${form.pesan}

Terima kasih.`;
    const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  const cleanWaNumber = (setting.no_whatsapp || "").replace(/[^0-9]/g, "");

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-paper">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Hubungi Kami"
          subtitle="Kami siap membantu Anda. Silakan hubungi kami untuk informasi lebih lanjut mengenai pendaftaran atau merencanakan kunjungan langsung."
          badge="Kontak Official"
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
                      Alamat Kampus
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
                      Hotline &amp; WhatsApp Resmi
                    </h4>
                    {cleanWaNumber ? (
                      <a
                        href={`https://wa.me/${cleanWaNumber}`}
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
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-lime text-xs mb-1.5 uppercase tracking-widest">
                      Email Resmi
                    </h4>
                    <p className="text-white/90 font-medium text-sm">info@alrahmah.sch.id</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative z-10 w-full rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col">
              <div className="relative w-full h-[220px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6912405338826!2d106.2131152!3d-6.172079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e421e377265e6c5%3A0xdc894d9c993a8e4f!2sPondok%20Pesantren%20Al%20Rahmah%20Walantaka!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
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
                href="https://maps.app.goo.gl/J1PeZhP9SzcFiC3M8"
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
