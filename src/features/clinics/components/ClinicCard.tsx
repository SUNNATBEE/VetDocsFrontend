"use client";

import Link from "next/link";
import type { Clinic } from "@/src/features/clinics/types";

type ClinicCardProps = {
  clinic: Clinic;
};

export function ClinicCard({ clinic }: ClinicCardProps) {
  const rating = clinic.averageRating?.toFixed(1) ?? "0.0";

  return (
    <Link
      href={`/clinics/${clinic.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--primary)]/30"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
             <span className="inline-flex items-center rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
               {clinic.city || "O'zbekiston"}
             </span>
             {clinic.isOpenNow && (
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </span>
             )}
          </div>
          <h3 className="text-xl font-bold text-[var(--on-surface)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
            {clinic.name}
          </h3>
        </div>
        
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>{rating}</span>
          </div>
          <span className="text-[10px] font-medium text-[var(--on-surface-variant)]">{clinic.reviewCount} sharh</span>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-sm text-[var(--on-surface-variant)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 opacity-60"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <p className="line-clamp-1">{clinic.address}</p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {clinic.phone && (
             <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)]">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
               {clinic.phone}
             </div>
          )}
        </div>
        
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--on-surface-variant)] bg-[var(--surface-container)] px-2.5 py-1 rounded-lg">
          {typeof clinic.distanceKm === "number" ? (
             <>{clinic.distanceKm.toFixed(1)} km masofada</>
          ) : (
             <>Ko'rish</>
          )}
        </div>
      </div>

      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
         <div className="p-1.5 bg-white text-[var(--primary)] rounded-full shadow-lg border border-[var(--primary)]/10">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
         </div>
      </div>
    </Link>
  );
}

