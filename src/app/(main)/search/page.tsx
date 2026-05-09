"use client";

import { ClinicFilters } from "@/src/features/clinics/components/ClinicFilters";
import { ClinicList } from "@/src/features/clinics/components/ClinicList";
import { useClinics } from "@/src/features/clinics/hooks/useClinics";

export default function SearchPage() {
  const { data, filteredData, filters, setFilters, isLoading, error } = useClinics();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-950">Klinika qidiruv</h1>
        <p className="mt-3 text-slate-600">
          Nom, manzil, shahar, ochiq holat va reyting bo&apos;yicha filtrlang.
        </p>

        <div className="mt-6">
          <ClinicFilters clinics={data} value={filters} onChange={setFilters} />
        </div>

        {isLoading ? (
          <div className="mt-6 rounded-[8px] border border-slate-200 bg-white p-8">
            Qidiruv ma&apos;lumotlari yuklanmoqda...
          </div>
        ) : error ? (
          <div className="mt-6 rounded-[8px] border border-red-200 bg-white p-8 text-red-800">
            {error}
          </div>
        ) : filteredData.length ? (
          <div className="mt-6">
            <ClinicList clinics={filteredData} />
          </div>
        ) : (
          <div className="mt-6 rounded-[8px] border border-slate-200 bg-white p-8 text-slate-600">
            Qidiruv bo&apos;yicha natija yo&apos;q.
          </div>
        )}
      </section>
    </main>
  );
}
