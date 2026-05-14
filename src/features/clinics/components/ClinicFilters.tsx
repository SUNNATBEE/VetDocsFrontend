"use client";

import type { Clinic, ClinicFilters as ClinicFiltersValue } from "@/src/features/clinics/types";

type ClinicFiltersProps = {
  clinics: Clinic[];
  value: ClinicFiltersValue;
  onChange: (value: ClinicFiltersValue) => void;
};

export function ClinicFilters({ clinics, value, onChange }: ClinicFiltersProps) {
  const cities = Array.from(new Set(clinics.map((clinic) => clinic.city).filter(Boolean))).sort();

  return (
    <div className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Qidiruv
          </span>
          <input
            value={value.query}
            onChange={(event) => onChange({ ...value, query: event.target.value })}
            placeholder="Nom, manzil yoki shahar"
            className="mt-2 h-11 w-full rounded-[8px] border border-slate-200 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Shahar
          </span>
          <select
            value={value.city}
            onChange={(event) => onChange({ ...value, city: event.target.value })}
            className="mt-2 h-11 w-full rounded-[8px] border border-slate-200 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          >
            <option value="all">Hammasi</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Reyting
          </span>
          <select
            value={value.minRating}
            onChange={(event) => onChange({ ...value, minRating: Number(event.target.value) })}
            className="mt-2 h-11 w-full rounded-[8px] border border-slate-200 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          >
            <option value={0}>Istalgan</option>
            <option value={4}>4+</option>
            <option value={4.5}>4.5+</option>
          </select>
        </label>

        <label className="mt-6 flex h-11 items-center gap-2 rounded-[8px] border border-slate-200 px-3 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={value.openNow}
            onChange={(event) => onChange({ ...value, openNow: event.target.checked })}
            className="h-4 w-4 accent-emerald-700"
          />
          Ochiq
        </label>
      </div>
    </div>
  );
}
