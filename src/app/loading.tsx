import { AlRahmahLoader } from "@/components/ui/AlRahmahLoader";

export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface/40">
      <AlRahmahLoader
        size="xl"
        mode="block"
        label="Memuat Sistem Al-Rahmah"
        sublabel="Mohon tunggu sebentar..."
      />
    </div>
  );
}

