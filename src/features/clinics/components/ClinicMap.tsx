"use client";

import Link from "next/link";
import type { Clinic } from "@/src/features/clinics/types";

type ClinicMapProps = {
  clinics: Clinic[];
  activeId?: string;
};

type MappedClinic = Clinic & {
  latitude: number;
  longitude: number;
};

function hasCoordinates(clinic: Clinic): clinic is MappedClinic {
  return (
    typeof clinic.latitude === "number" &&
    typeof clinic.longitude === "number" &&
    Number.isFinite(clinic.latitude) &&
    Number.isFinite(clinic.longitude)
  );
}

function markerStyle(clinic: MappedClinic, clinics: MappedClinic[]) {
  if (clinics.length === 1) {
    return {
      left: "50%",
      top: "50%",
    };
  }

  const validClinics = clinics.filter(hasCoordinates);
  const latitudes = validClinics.map((item) => item.latitude);
  const longitudes = validClinics.map((item) => item.longitude);
  const minLat = Math.min(...latitudes, clinic.latitude);
  const maxLat = Math.max(...latitudes, clinic.latitude);
  const minLng = Math.min(...longitudes, clinic.longitude);
  const maxLng = Math.max(...longitudes, clinic.longitude);
  const latRange = maxLat - minLat || 1;
  const lngRange = maxLng - minLng || 1;
  const left = 8 + ((clinic.longitude - minLng) / lngRange) * 84;
  const top = 8 + (1 - (clinic.latitude - minLat) / latRange) * 84;

  return {
    left: `${left}%`,
    top: `${top}%`,
  };
}

export function ClinicMap({ clinics, activeId }: ClinicMapProps) {
  const mappedClinics = clinics.filter(hasCoordinates);
  const skippedCount = clinics.length - mappedClinics.length;

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[8px] border border-slate-200 bg-slate-950 shadow-sm">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,.35),transparent_28%),radial-gradient(circle_at_70%_75%,rgba(56,189,248,.24),transparent_28%)]" />

      {mappedClinics.length === 0 ? (
        <div className="absolute inset-4 z-10 flex items-center justify-center rounded-[8px] border border-white/15 bg-white/95 p-6 text-center">
          <div>
            <p className="text-lg font-semibold text-slate-950">Xaritada marker yo&apos;q</p>
            <p className="mt-2 max-w-md text-sm text-slate-600">
              Koordinatasiz klinikalar xaritada ko&apos;rsatilmaydi. Backend latitude/longitude
              yuborganda markerlar avtomatik ko&apos;rinadi.
            </p>
          </div>
        </div>
      ) : null}

      {mappedClinics.map((clinic) => (
        <Link
          key={clinic.id}
          href={`/clinics/${clinic.id}`}
          style={markerStyle(clinic, mappedClinics)}
          className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 p-2 shadow-xl transition hover:scale-110 ${
            activeId === clinic.id
              ? "border-amber-200 bg-amber-400"
              : "border-white bg-emerald-400"
          }`}
          aria-label={`${clinic.name} detail sahifasini ochish`}
          title={clinic.name}
        >
          <span className="block h-3 w-3 rounded-full bg-slate-950" />
        </Link>
      ))}

      <div className="absolute bottom-4 left-4 right-4 z-20 rounded-[8px] border border-white/15 bg-white/95 p-4 shadow-xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-950">Interaktiv klinika xaritasi</p>
            <p className="mt-1 text-xs text-slate-600">
              Marker bosilsa klinika detail sahifasi ochiladi.
              {skippedCount > 0 ? ` ${skippedCount} ta klinikada koordinata yo'q.` : ""}
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
