"use client";

import { ClinicFilters } from "@/src/features/clinics/components/ClinicFilters";
import { ClinicList } from "@/src/features/clinics/components/ClinicList";
import { ClinicMap } from "@/src/features/clinics/components/ClinicMap";
import { useClinics } from "@/src/features/clinics/hooks/useClinics";
import LoadingSpinner from "@/src/components/shared/LoadingSpinner";
import EmptyState from "@/src/components/shared/EmptyState";
import ErrorMessage from "@/src/components/shared/ErrorMessage";

export default function ClinicsPage() {
  const { data, filteredData, filters, setFilters, isLoading, error, refetch } = useClinics();
  
  const hasActiveFilters =
    filters.query.trim() !== "" ||
    filters.city !== "all" ||
    filters.district !== "all" ||
    filters.openNow ||
    filters.minRating > 0;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
              </span>
              Platforma kliniklari
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--on-surface)] tracking-tight leading-none mb-4 font-h1">
              Eng yaxshi <span className="text-[var(--primary)]">klinikalarni</span> toping
            </h1>
            <p className="text-lg text-[var(--on-surface-variant)] leading-relaxed">
              Bizning platformada sizga va sizning chorva do'stlaringizga g'amxo'rlik qiluvchi professional veterinariya markazlari jamlangan.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-[var(--surface-container-high)] border border-[var(--outline-variant)] px-5 py-3 rounded-2xl shadow-sm self-start">
             <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
             </div>
             <div>
               <p className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-tighter">Natijalar</p>
               <p className="text-xl font-black text-[var(--on-surface)]">{filteredData.length}</p>
             </div>
          </div>
        </header>

        <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <ClinicFilters clinics={data} value={filters} onChange={setFilters} />
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-[var(--surface-container-lowest)] rounded-3xl border border-[var(--outline-variant)] border-dashed">
            <LoadingSpinner size="lg" />
            <p className="mt-6 text-[var(--on-surface-variant)] font-medium animate-pulse">Klinikalar ma'lumotlari yuklanmoqda...</p>
          </div>
        ) : error ? (
          <ErrorMessage 
            message={error} 
            onRetry={() => void refetch()} 
          />
        ) : filteredData.length === 0 ? (
          <EmptyState 
            title={hasActiveFilters ? "Natija topilmadi" : "Hozircha klinikalar yo'q"}
            description={hasActiveFilters ? "Tanlangan filtrlar bo'yicha hech qanday klinika topilmadi. Iltimos, filtrlarni o'zgartirib ko'ring." : "Tizimda hali klinikalar ro'yxatga olinmagan."}
            action={hasActiveFilters ? { label: "Filtrlarni tozalash", onClick: () => setFilters({ query: "", city: "all", district: "all", minRating: 0, openNow: false }) } : undefined}
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px]">
            <div className="space-y-6">
              <ClinicList clinics={filteredData} />
            </div>
            
            <div className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
               <div className="rounded-3xl overflow-hidden border border-[var(--outline-variant)] shadow-2xl h-[calc(100vh-140px)] min-h-[500px]">
                 <ClinicMap clinics={filteredData} />
               </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

