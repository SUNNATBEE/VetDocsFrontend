"use client";

import { ClinicMap } from "@/src/features/clinics/components/ClinicMap";
import { ClinicList } from "@/src/features/clinics/components/ClinicList";
import { useNearbyClinics } from "@/src/features/clinics/hooks/useNearbyClinics";

export default function MapPage() {
  const { filteredData, isLoading, error, geoError, isLocating, location, refetch } = useNearbyClinics({
    radiusKm: 200,
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-950">Klinikalar xaritasi</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Markerlar backend koordinatalari asosida joylashadi.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm">
            {isLocating ? "Joylashuv aniqlanmoqda" : "Joylashuv tayyor"}
          </span>
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm">
            {location ? `${location.lat.toFixed(3)}, ${location.lng.toFixed(3)}` : "Koordinata kutilmoqda"}
          </span>
          {geoError ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-800">
              {geoError}
            </span>
          ) : null}
        </div>

        {isLoading || isLocating ? (
          <div className="mt-6 rounded-[8px] border border-slate-200 bg-white p-8">
            Xarita ma&apos;lumotlari yuklanmoqda...
          </div>
        ) : error ? (
          <div className="mt-6 rounded-[8px] border border-red-200 bg-white p-8">
            <p className="text-red-800">{error}</p>
            {/* TODO: Numton Button komponenti tayyor bo'lganda shu native button almashtiriladi. */}
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-[8px] bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
            >
              Qayta yuklash
            </button>
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
