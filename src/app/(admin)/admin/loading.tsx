import { AlRahmahLoader } from "@/components/ui/AlRahmahLoader";

export default function AdminLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <AlRahmahLoader
        size="lg"
        mode="block"
        label="Memuat Data Admin"
        sublabel="Menghubungkan ke database..."
      />
    </div>
  );
}

