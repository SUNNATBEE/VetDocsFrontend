"use client";

import { ClinicMap } from "@/src/features/clinics/components/ClinicMap";
import { ClinicList } from "@/src/features/clinics/components/ClinicList";
import { useNearbyClinics } from "@/src/features/clinics/hooks/useNearbyClinics";

export default function MapPage() {
  const { filteredData, isLoading, isLocating, error, geoError } = useNearbyClinics({
    radiusKm: 200,
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-950">Klinikalar xaritasi</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          {isLocating
            ? "Joylashuvingiz aniqlanmoqda..."
            : geoError
              ? "Joylashuv ruxsat etilmadi — Toshkent markazi ko'rsatildi."
              : "Markerlar joylashuvingiz atrofidagi klinikalar uchun chiqadi."}
        </p>

        {isLoading ? (
          <div className="mt-6 rounded-[8px] border border-slate-200 bg-white p-8">
            Xarita ma&apos;lumotlari yuklanmoqda...
          </div>
        ) : error ? (
          <div className="mt-6 rounded-[8px] border border-red-200 bg-white p-8 text-red-800">
            {error}
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <ClinicMap clinics={filteredData} />
            <ClinicList clinics={filteredData.slice(0, 4)} />
          </div>
        )}
      </section>
    </main>
  );
}
