"use client";

import { ClinicFilters } from "@/src/features/clinics/components/ClinicFilters";
import { ClinicList } from "@/src/features/clinics/components/ClinicList";
import { ClinicMap } from "@/src/features/clinics/components/ClinicMap";
import { useClinics } from "@/src/features/clinics/hooks/useClinics";

export default function ClinicsPage() {
  const { data, filteredData, filters, setFilters, isLoading, error, refetch } = useClinics();
  const hasActiveFilters =
    filters.query.trim() !== "" ||
    filters.city !== "all" ||
    filters.openNow ||
    filters.minRating > 0;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Clinics
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-950">Klinikalar ro&apos;yxati</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Backenddan kelgan klinikalarni qidiring, filtrlang va xaritada ko&apos;ring.
            </p>
          </div>
          <div className="rounded-[8px] bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
            {filteredData.length} / {data.length} klinika
          </div>
        </div>

        <div className="mt-6">
          <ClinicFilters clinics={data} value={filters} onChange={setFilters} />
        </div>

        {isLoading ? (
          <div className="mt-6 rounded-[8px] border border-slate-200 bg-white p-8 text-slate-600">
            Klinikalar yuklanmoqda...
          </div>
        ) : error ? (
          <div className="mt-6 rounded-[8px] border border-red-200 bg-white p-8">
            <h2 className="text-xl font-semibold text-red-800">Xatolik</h2>
            <p className="mt-2 text-sm text-slate-600">{error}</p>
            {/* TODO: Numton Button komponenti tayyor bo'lganda shu native button almashtiriladi. */}
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-[8px] bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
            >
              Qayta yuklash
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="mt-6 rounded-[8px] border border-slate-200 bg-white p-8 text-slate-600">
            {hasActiveFilters
              ? "Bu filter bo'yicha klinika topilmadi."
              : "Hozircha klinikalar yo'q."}
          </div>
        ) : (
          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
            <ClinicList clinics={filteredData} />
            <div className="xl:sticky xl:top-24 xl:self-start">
              <ClinicMap clinics={filteredData} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
