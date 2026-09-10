"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Calendar, ImageIcon, Loader2, ImagePlus, X, FolderPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { GaleriAlbum, GaleriFoto } from "@/lib/supabase/types";

const anim = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function KelolaGaleriPage() {
  const [albums, setAlbums] = useState<GaleriAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Modal states
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>("");
  const [saving, setSaving] = useState(false);

  // Album form
  const [albumForm, setAlbumForm] = useState({ judul: "", tanggal: "" });

  // Photo form
  const [photoForm, setPhotoForm] = useState({ foto_url: "", keterangan: "" });

  const fetchGaleri = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("galeri_album")
      .select("*, foto:galeri_foto(*)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setAlbums(data);
      if (data.length > 0 && !selectedAlbumId) {
        setSelectedAlbumId(data[0].id);
      }
    }
    setLoading(false);
  }, [selectedAlbumId]);

  useEffect(() => {
    fetchGaleri();
  }, [fetchGaleri]);

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumForm.judul.trim()) return;
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("galeri_album")
      .insert({
        judul: albumForm.judul,
        tanggal: albumForm.tanggal || null,
      })
      .select()
      .single();

    if (!error && data) {
      setAlbumForm({ judul: "", tanggal: "" });
      setShowAlbumModal(false);
      setSelectedAlbumId(data.id);
      fetchGaleri();
    }
    setSaving(false);
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoForm.foto_url.trim() || !selectedAlbumId) return;
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("galeri_foto").insert({
      album_id: selectedAlbumId,
      foto_url: photoForm.foto_url,
      keterangan: photoForm.keterangan || null,
    });

    if (!error) {
      setPhotoForm({ foto_url: "", keterangan: "" });
      setShowPhotoModal(false);
      fetchGaleri();
    }
    setSaving(false);
  };

  const handleDeleteAlbum = async (id: string, title: string) => {
    if (!confirm(`Hapus album "${title}" beserta semua foto di dalamnya?`)) return;
    setDeletingId(id);
    const supabase = createClient();
    await supabase.from("galeri_album").delete().eq("id", id);
    setAlbums((prev) => prev.filter((a) => a.id !== id));
    setDeletingId(null);
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm("Hapus foto ini?")) return;
    const supabase = createClient();
    await supabase.from("galeri_foto").delete().eq("id", photoId);
    fetchGaleri();
  };

  const totalPhotos = albums.reduce((acc, a) => acc + (a.foto?.length || 0), 0);

  return (
    <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.06 }} className="space-y-6">
      {/* Top action header */}
      <motion.div variants={anim} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-heading font-bold text-gray-900">Manajemen Galeri</h1>
          <p className="text-sm text-gray-500">
            {albums.length} album · {totalPhotos} foto tersimpan
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAlbumModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl shadow-sm transition-all hover:-translate-y-0.5"
          >
            <FolderPlus size={16} className="text-brand-primary" />
            Buat Album
          </button>
          <button
            onClick={() => {
              if (albums.length === 0) {
                alert("Silakan buat album terlebih dahulu sebelum menambahkan foto.");
                return;
              }
              setShowPhotoModal(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold rounded-xl shadow-sm shadow-brand-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shrink-0"
          >
            <ImagePlus size={16} />
            Tambah Foto
          </button>
        </div>
      </motion.div>

      {/* Album Modal */}
      {showAlbumModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-heading font-bold text-gray-800 text-lg">Buat Album Baru</h3>
              <button onClick={() => setShowAlbumModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateAlbum} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Nama Album</label>
                <input
                  type="text"
                  required
                  value={albumForm.judul}
                  onChange={(e) => setAlbumForm({ ...albumForm, judul: e.target.value })}
                  placeholder="Contoh: Wisuda Santri 2026"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Tanggal Kegiatan (Opsional)</label>
                <input
                  type="date"
                  value={albumForm.tanggal}
                  onChange={(e) => setAlbumForm({ ...albumForm, tanggal: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAlbumModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-200 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary/90 transition-all disabled:opacity-70"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : "Simpan Album"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-heading font-bold text-gray-800 text-lg">Tambah Foto ke Album</h3>
              <button onClick={() => setShowPhotoModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Pilih Album</label>
                <select
                  value={selectedAlbumId}
                  onChange={(e) => setSelectedAlbumId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                >
                  {albums.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.judul} ({a.foto?.length || 0} foto)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">URL Foto</label>
                <input
                  type="url"
                  required
                  value={photoForm.foto_url}
                  onChange={(e) => setPhotoForm({ ...photoForm, foto_url: e.target.value })}
                  placeholder="https://images.unsplash.com/... atau URL foto lainnya"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Keterangan / Caption (Opsional)</label>
                <input
                  type="text"
                  value={photoForm.keterangan}
                  onChange={(e) => setPhotoForm({ ...photoForm, keterangan: e.target.value })}
                  placeholder="Momen prosesi wisuda tahfidz"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:bg-white focus:border-brand-primary/30 transition-all"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-200 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary/90 transition-all disabled:opacity-70"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : "Tambah Foto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Album List Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-white rounded-2xl border border-gray-100 animate-pulse" />
          ))}
        </div>
      ) : albums.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-3" />
          <h3 className="font-bold text-gray-800 mb-1">Belum Ada Album Galeri</h3>
          <p className="text-sm text-gray-400 mb-4">
            Mulai dengan membuat album kegiatan untuk menyimpan foto-foto dokumentasi.
          </p>
          <button
            onClick={() => setShowAlbumModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl"
          >
            <FolderPlus size={16} /> Buat Album Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {albums.map((g) => {
              const coverPhoto = g.foto?.[0]?.foto_url;
              const photoCount = g.foto?.length || 0;
              return (
                <motion.div
                  key={g.id}
                  variants={anim}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-100/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 overflow-hidden">
                    {coverPhoto ? (
                      <img src={coverPhoto} alt={g.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={36} />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedAlbumId(g.id);
                          setShowPhotoModal(true);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-2.5 bg-white/90 rounded-xl text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-200 shadow-lg transform scale-75 group-hover:scale-100"
                        title="Tambah Foto ke Album"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteAlbum(g.id, g.judul)}
                        disabled={deletingId === g.id}
                        className="opacity-0 group-hover:opacity-100 p-2.5 bg-white/90 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-lg transform scale-75 group-hover:scale-100 disabled:opacity-50"
                        title="Hapus Album"
                      >
                        {deletingId === g.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <ImageIcon size={12} className="text-white/80" />
                      <span className="text-xs text-white font-medium">{photoCount} foto</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">{g.judul}</h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Calendar size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-400">
                        {g.tanggal ? new Date(g.tanggal).toLocaleDateString("id-ID") : "-"}
                      </span>
                    </div>

                    {/* Quick photo preview bar */}
                    {photoCount > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-1.5 overflow-x-auto py-1">
                        {g.foto?.slice(0, 5).map((f) => (
                          <div key={f.id} className="relative group/photo shrink-0 w-8 h-8 rounded-md overflow-hidden border border-gray-200">
                            <img src={f.foto_url} alt="" className="w-full h-full object-cover" />
                            <button
                              onClick={() => handleDeletePhoto(f.id)}
                              className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity"
                              title="Hapus foto ini"
                            >
                              <Trash2 size={10} />
                            </button>
                          </div>
                        ))}
                        {photoCount > 5 && (
                          <span className="text-[10px] text-gray-400 font-medium pl-1">+{photoCount - 5}</span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
