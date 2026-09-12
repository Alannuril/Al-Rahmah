"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CheckCircle, User, Phone, MapPin, School, BookOpen,
  Calendar, ShieldCheck, ArrowRight, Loader2, Sparkles, AlertCircle
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PsbSettings, PsbOpenStatus } from "@/lib/supabase/types";
import { useLoading } from "@/components/providers/LoadingProvider";

export default function PsbPage() {
  const { showLoading, hideLoading } = useLoading();
  const [settings, setSettings] = useState<Partial<PsbSettings>>({
    tahun_ajaran: "2026/2027",
    status: "Dibuka",
    biaya_formulir: "Rp 500.000",
    deskripsi: "Pondok Pesantren Al-Rahmah Walantaka membuka pendaftaran santri baru.",
  });
  const [loadingSettings, setLoadingSettings] = useState(true);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    nama: string;
    program: string;
    tahun: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    nama_lengkap: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "Laki-laki",
    program: "Tahfidz",
    nama_ayah: "",
    nama_ibu: "",
    no_hp: "",
    alamat: "",
    asal_sekolah: "",
    nisn: "",
  });

  useEffect(() => {
    async function loadSettings() {
      const supabase = createClient();
      const { data } = await supabase
        .from("psb_settings")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (data) setSettings(data);
      setLoadingSettings(false);
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama_lengkap.trim() || !form.no_hp.trim()) {
      setErrorMessage("Nama lengkap dan No. WhatsApp wajib diisi.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    showLoading(
      "Mengirim Formulir Pendaftaran",
      "Data sedang dicatat oleh sekretariat PSB Al-Rahmah..."
    );

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("pendaftar_psb")
        .insert({
          nama_lengkap: form.nama_lengkap,
          tempat_lahir: form.tempat_lahir || null,
          tanggal_lahir: form.tanggal_lahir || null,
          jenis_kelamin: form.jenis_kelamin,
          program: form.program,
          nama_ayah: form.nama_ayah || null,
          nama_ibu: form.nama_ibu || null,
          no_hp: form.no_hp,
          alamat: form.alamat || null,
          asal_sekolah: form.asal_sekolah || null,
          nisn: form.nisn || null,
          status: "Menunggu",
          tahun_ajaran: settings.tahun_ajaran || "2026/2027",
        })
        .select("id")
        .single();

      if (error) {
        setSubmitting(false);
        hideLoading();
        setErrorMessage(error.message || "Terjadi kesalahan saat mengirim pendaftaran.");
        return;
      }

      setSubmittedData({
        id: data?.id || "-",
        nama: form.nama_lengkap,
        program: form.program,
        tahun: settings.tahun_ajaran || "2026/2027",
      });
      setSubmitting(false);
      hideLoading();
    } catch {
      setSubmitting(false);
      hideLoading();
      setErrorMessage("Terjadi kesalahan sistem saat mengirim pendaftaran.");
    }
  };

  const isBuka = settings.status === "Dibuka";

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
        <SectionHeading
          title="Penerimaan Santri Baru"
          subtitle={`Tahun Ajaran ${settings.tahun_ajaran || "2026/2027"} ${
            isBuka ? "resmi dibuka. Kuota kelas unggulan terbatas!" : "saat ini belum dibuka."
          }`}
          centered
        />

        {/* Status Announcement Box */}
        <div className="mt-10 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
              isBuka ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
            }`}>
              {isBuka ? <CheckCircle size={32} /> : <AlertCircle size={32} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-gray-900 text-lg">
                  Status: Pendaftaran {settings.status || "Dibuka"}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isBuka ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}>
                  T.A. {settings.tahun_ajaran || "2026/2027"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Biaya Formulir: <strong className="text-brand-primary">{settings.biaya_formulir || "Rp 500.000"}</strong>
              </p>
            </div>
          </div>

          {isBuka && !showForm && !submittedData && (
            <button
              onClick={() => {
                setShowForm(true);
                setTimeout(() => {
                  document.getElementById("form-pendaftaran")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-sm rounded-2xl shadow-lg shadow-brand-primary/20 transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              Isi Formulir E-PSB Sekarang
            </button>
          )}
        </div>

        {/* Success Card */}
        {submittedData && (
          <div className="mt-8 bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 md:p-12 text-center shadow-lg">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <ShieldCheck size={36} />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-emerald-900 mb-2">
              Pendaftaran Berhasil Dikirim!
            </h3>
            <p className="text-emerald-700 max-w-lg mx-auto text-sm leading-relaxed mb-6">
              Alhamdulillah, data pendaftaran calon santri atas nama <strong>{submittedData.nama}</strong> ({submittedData.program}) telah tersimpan di sistem kami.
            </p>
            <div className="inline-flex flex-col items-center bg-white px-6 py-4 rounded-2xl border border-emerald-200 mb-6">
              <span className="text-xs text-gray-400 font-bold uppercase">Nomor Registrasi PSB</span>
              <span className="font-mono font-bold text-lg text-emerald-800">#{submittedData.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Panitia PSB Al-Rahmah akan menghubungi nomor WhatsApp yang didaftarkan untuk verifikasi berkas dan jadwal tes seleksi.
            </p>
          </div>
        )}

        {/* Online Registration Form */}
        {isBuka && showForm && !submittedData && (
          <div id="form-pendaftaran" className="mt-10 bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-gray-100">
            <div className="mb-8 pb-6 border-b border-gray-100">
              <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full">
                Formulir Online
              </span>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mt-2">
                Pendaftaran Calon Santri Baru E-PSB
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Silakan isi data calon santri dengan benar dan lengkap sesuai dokumen kependudukan (KK/Akta).
              </p>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-sm text-red-600 rounded-xl font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Bagian 1: Data Santri */}
              <div>
                <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2 mb-4 text-brand-primary">
                  <User size={16} /> 1. Identitas Calon Santri
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      value={form.nama_lengkap}
                      onChange={(e) => setForm({ ...form, nama_lengkap: e.target.value })}
                      placeholder="Nama lengkap calon santri sesuai Akta Kelahiran"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Tempat Lahir</label>
                    <input
                      type="text"
                      value={form.tempat_lahir}
                      onChange={(e) => setForm({ ...form, tempat_lahir: e.target.value })}
                      placeholder="Kota / Kabupaten lahir"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Tanggal Lahir</label>
                    <input
                      type="date"
                      value={form.tanggal_lahir}
                      onChange={(e) => setForm({ ...form, tanggal_lahir: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Jenis Kelamin</label>
                    <select
                      value={form.jenis_kelamin}
                      onChange={(e) => setForm({ ...form, jenis_kelamin: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                    >
                      <option value="Laki-laki">Laki-laki (Ikhwan)</option>
                      <option value="Perempuan">Perempuan (Akhwat)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Program Pilihan</label>
                    <select
                      value={form.program}
                      onChange={(e) => setForm({ ...form, program: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all font-semibold text-brand-primary"
                    >
                      <option value="Tahfidz">Program Tahfidz Al-Quran</option>
                      <option value="Reguler">Program Reguler / Madrasah Terpadu</option>
                      <option value="Tahfidz & Reguler">Program Unggulan Tahfidz &amp; Sains</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">NISN</label>
                    <input
                      type="text"
                      value={form.nisn}
                      onChange={(e) => setForm({ ...form, nisn: e.target.value })}
                      placeholder="Nomor Induk Siswa Nasional (10 digit)"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Asal Sekolah (SD/MI/SMP/MTs)</label>
                    <input
                      type="text"
                      value={form.asal_sekolah}
                      onChange={(e) => setForm({ ...form, asal_sekolah: e.target.value })}
                      placeholder="Nama sekolah sebelumnya"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Bagian 2: Data Orang Tua & Kontak */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2 mb-4 text-brand-primary">
                  <Phone size={16} /> 2. Data Orang Tua / Wali &amp; Kontak
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Nama Ayah Kandung</label>
                    <input
                      type="text"
                      value={form.nama_ayah}
                      onChange={(e) => setForm({ ...form, nama_ayah: e.target.value })}
                      placeholder="Nama lengkap ayah"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Nama Ibu Kandung</label>
                    <input
                      type="text"
                      value={form.nama_ibu}
                      onChange={(e) => setForm({ ...form, nama_ibu: e.target.value })}
                      placeholder="Nama lengkap ibu"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">No. WhatsApp Aktif (Wajib) *</label>
                    <input
                      type="tel"
                      required
                      value={form.no_hp}
                      onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
                      placeholder="Contoh: 081234567890 (Untuk konfirmasi dan info seleksi)"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all font-medium"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Alamat Lengkap Domisili</label>
                    <textarea
                      rows={3}
                      value={form.alamat}
                      onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                      placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten, Provinsi"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-400">
                  Dengan mengklik tombol kirim, data pendaftaran akan langsung dicatat oleh sekretariat PSB Al-Rahmah.
                </p>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-all"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-primary/20 transition-all hover:-translate-y-0.5 disabled:opacity-70 flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {submitting ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                    Kirim Formulir Pendaftaran
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Alur PSB Card */}
        <div className="mt-12 bg-brand-primary text-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_4px_24px_rgba(57,110,95,0.2)] relative overflow-hidden text-left border border-brand-primary">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-secondary/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <h3 className="font-heading text-3xl font-bold mb-8 text-center text-white drop-shadow-sm tracking-tight">
              Alur Pendaftaran E-PSB Al-Rahmah
            </h3>
            <ol className="w-full space-y-4 max-w-2xl mx-auto mb-10">
              {[
                "Mengisi formulir pendaftaran online E-PSB di atas secara lengkap.",
                "Menerima konfirmasi nomor registrasi pendaftaran melalui WhatsApp.",
                "Membayar biaya formulir pendaftaran via transfer rekening resmi pondok.",
                "Mengikuti Ujian Seleksi (Tahfidz/Wawancara/Akademik) secara terjadwal.",
                "Pengumuman kelulusan resmi dan daftar ulang santri baru.",
              ].map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm shadow-sm hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-secondary text-white flex shrink-0 items-center justify-center font-bold text-sm shadow-md">
                    {i + 1}
                  </div>
                  <p className="text-white/90 font-medium text-sm pt-1.5 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
