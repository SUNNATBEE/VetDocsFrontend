"use client";

import Link from "next/link";
import type { Clinic } from "@/src/features/clinics/types";

type ClinicMapProps = {
  clinics: Clinic[];
  activeId?: string;
};

type Bounds = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

function computeBounds(clinics: Clinic[]): Bounds {
  const minLat = Math.min(...clinics.map((c) => c.latitude));
  const maxLat = Math.max(...clinics.map((c) => c.latitude));
  const minLng = Math.min(...clinics.map((c) => c.longitude));
  const maxLng = Math.max(...clinics.map((c) => c.longitude));
  return { minLat, maxLat, minLng, maxLng };
}

function markerStyle(clinic: Clinic, bounds: Bounds) {
  const latRange = bounds.maxLat - bounds.minLat;
  const lngRange = bounds.maxLng - bounds.minLng;

  // Bitta marker bo'lsa yoki barcha klinikalar bir nuqtada bo'lsa — markazga qo'yamiz.
  if (latRange === 0 || lngRange === 0) {
    return { left: "50%", top: "50%" };
  }

  const left = 8 + ((clinic.longitude - bounds.minLng) / lngRange) * 84;
  const top = 8 + (1 - (clinic.latitude - bounds.minLat) / latRange) * 84;

  return {
    left: `${left}%`,
    top: `${top}%`,
  };
}

export function ClinicMap({ clinics, activeId }: ClinicMapProps) {
  const mappedClinics = clinics.filter(
    (clinic) => Number.isFinite(clinic.latitude) && Number.isFinite(clinic.longitude),
  );

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[8px] border border-slate-200 bg-slate-950 shadow-sm">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,.35),transparent_28%),radial-gradient(circle_at_70%_75%,rgba(56,189,248,.24),transparent_28%)]" />

      {mappedClinics.length > 0 ? (
        (() => {
          const bounds = computeBounds(mappedClinics);
          return mappedClinics.map((clinic) => (
            <Link
              key={clinic.id}
              href={`/clinics/${clinic.id}`}
              style={markerStyle(clinic, bounds)}
              className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 p-2 shadow-xl transition hover:scale-110 ${
                activeId === clinic.id
                  ? "border-amber-200 bg-amber-400"
                  : "border-white bg-emerald-400"
              }`}
              title={clinic.name}
            >
              <span className="block h-3 w-3 rounded-full bg-slate-950" />
            </Link>
          ));
        })()
      ) : (
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <p className="rounded-[8px] bg-white/95 px-4 py-3 text-sm font-semibold text-slate-700">
            Xaritada ko&apos;rsatish uchun koordinatali klinika topilmadi.
          </p>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 z-20 rounded-[8px] border border-white/15 bg-white/95 p-4 shadow-xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-950">Interaktiv klinika xaritasi</p>
            <p className="mt-1 text-xs text-slate-600">
              Marker bosilsa klinika detail sahifasi ochiladi.
            </p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            {mappedClinics.length} marker
          </span>
        </div>
      </div>
    </div>
  );
}
