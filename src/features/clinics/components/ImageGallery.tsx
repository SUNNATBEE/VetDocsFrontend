import type { Clinic } from "@/src/features/clinics/types";

type ImageGalleryProps = {
  clinic: Clinic;
};

export function ImageGallery({ clinic }: ImageGalleryProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="min-h-44 rounded-[8px] bg-[linear-gradient(135deg,#0f766e,#14b8a6_48%,#f8fafc_48%)] p-5 text-white sm:col-span-2">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-50">
          Vet clinic
        </p>
        <h1 className="mt-3 max-w-xl text-3xl font-bold">{clinic.name}</h1>
        <p className="mt-3 max-w-lg text-sm text-emerald-50">{clinic.address}</p>
      </div>
      <div className="rounded-[8px] border border-emerald-100 bg-emerald-50 p-5">
        <p className="text-sm font-semibold text-emerald-800">Tezkor aloqa</p>
        <p className="mt-3 text-2xl font-bold text-slate-950">{clinic.phone || "Noma'lum"}</p>
        <p className="mt-3 text-sm text-slate-600">
          {clinic.isOpenNow ? "Hozir bemor qabul qilishi mumkin." : "Ish vaqti jadvalini tekshiring."}
        </p>
      </div>
    </div>
  );
}
