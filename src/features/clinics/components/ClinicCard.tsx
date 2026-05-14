import Link from "next/link";
import type { Clinic } from "@/src/features/clinics/types";

type ClinicCardProps = {
  clinic: Clinic;
};

export function ClinicCard({ clinic }: ClinicCardProps) {
  const rating = clinic.averageRating?.toFixed(1) ?? "Yangi";

  return (
    <Link
      href={`/clinics/${clinic.id}`}
      className="group block rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
            {clinic.city || "Uzbekiston"}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950 group-hover:text-emerald-800">
            {clinic.name}
          </h3>
        </div>
        <div className="rounded-[8px] bg-amber-50 px-3 py-2 text-right">
          <div className="text-sm font-semibold text-amber-700">Rating</div>
          <div className="text-lg font-bold text-amber-900">{rating}</div>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>{clinic.address}</p>
        {clinic.phone ? <p>{clinic.phone}</p> : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            clinic.isOpenNow ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
          }`}
        >
          {clinic.isOpenNow ? "Hozir ochiq" : "Yopiq yoki noma'lum"}
        </span>
        {typeof clinic.distanceKm === "number" ? (
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
            {clinic.distanceKm.toFixed(1)} km
          </span>
        ) : null}
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {clinic.reviewCount} sharh
        </span>
      </div>
    </Link>
  );
}
