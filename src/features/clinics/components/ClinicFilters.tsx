"use client";

import type { Clinic, ClinicFilters as ClinicFiltersValue } from "@/src/features/clinics/types";

type ClinicFiltersProps = {
  clinics: Clinic[];
  value: ClinicFiltersValue;
  onChange: (value: ClinicFiltersValue) => void;
};

export function ClinicFilters({ clinics, value, onChange }: ClinicFiltersProps) {
  const cities = Array.from(new Set(clinics.map((clinic) => clinic.city).filter(Boolean))).sort() as string[];
  const districts = Array.from(
    new Set(clinics.map((clinic) => clinic.district).filter((d): d is string => Boolean(d))),
  ).sort();

  const inputClasses = "h-12 w-full appearance-none rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-4 text-sm font-medium text-[var(--on-surface)] outline-none transition-all placeholder:text-[var(--on-surface-variant)]/50 focus:border-[var(--primary)] focus:bg-[var(--surface-container-highest)] focus:ring-4 focus:ring-[var(--primary)]/10";

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-1.5 shadow-sm">
      <div className="grid gap-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
        <div className="relative group">
          <input
            value={value.query}
            onChange={(event) => onChange({ ...value, query: event.target.value })}
            placeholder="Klinika nomi yoki manzili..."
            className={inputClasses + " pl-11"}
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]/60 group-focus-within:text-[var(--primary)] transition-colors"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>

        <div className="relative">
          <select
            value={value.city}
            onChange={(event) => onChange({ ...value, city: event.target.value })}
            className={inputClasses}
          >
            <option value="all">Barcha shaharlar</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"><path d="m6 9 6 6 6-6"/></svg>
        </div>

        <div className="relative">
          <select
            value={value.district}
            onChange={(event) => onChange({ ...value, district: event.target.value })}
            className={inputClasses}
            disabled={districts.length === 0}
          >
            <option value="all">Barcha tumanlar</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"><path d="m6 9 6 6 6-6"/></svg>
        </div>

        <div className="relative">
          <select
            value={value.minRating}
            onChange={(event) => onChange({ ...value, minRating: Number(event.target.value) })}
            className={inputClasses}
          >
            <option value={0}>Istalgan reyting</option>
            <option value={4}>4.0+ yulduzli</option>
            <option value={4.5}>4.5+ yulduzli</option>
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"><path d="m6 9 6 6 6-6"/></svg>
        </div>

        <button
          onClick={() => onChange({ ...value, openNow: !value.openNow })}
          className={`flex h-12 items-center gap-2 rounded-xl border px-5 text-sm font-bold transition-all active:scale-95 ${
            value.openNow 
              ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" 
              : "border-[var(--outline-variant)] bg-[var(--surface-container-low)] text-[var(--on-surface)] hover:bg-[var(--surface-container-high)]"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          Hozir ochiq
        </button>
      </div>
    </div>
  );
}

