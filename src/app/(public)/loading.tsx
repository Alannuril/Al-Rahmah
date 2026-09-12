import { AlRahmahLoader } from "@/components/ui/AlRahmahLoader";

export default function PublicLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <AlRahmahLoader
        size="lg"
        mode="block"
        label="Memuat Al-Rahmah"
        sublabel="Menyiapkan konten untuk Anda..."
      />
    </div>
  );
}

