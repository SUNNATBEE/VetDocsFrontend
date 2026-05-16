"use client";

import { useMemo, useState } from "react";
import { ClinicMap } from "@/src/features/clinics/components/ClinicMap";
import { ClinicCard } from "@/src/features/clinics/components/ClinicCard";
import { useNearbyClinics } from "@/src/features/clinics/hooks/useNearbyClinics";
import { useDistricts } from "@/src/features/clinics/hooks/useDistricts";

export default function MapPage() {
  const [district, setDistrict] = useState<string>("");
  const { data: districts, isLoading: isLoadingDistricts } = useDistricts();
  const { filteredData, isLoading, error, geoError, isLocating, location, refetch } = useNearbyClinics({
    radiusKm: 200,
    district: district || undefined,
  });

  const totalClinicCount = useMemo(
    () => districts.reduce((sum, d) => sum + d.clinicCount, 0),
    [districts],
  );

  const selectedDistrict = useMemo(
    () => districts.find((d) => d.key === district) ?? null,
    [districts, district],
  );

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <header className="animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--primary)]" />
            </span>
            Jonli xarita
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--on-surface)] md:text-5xl">
            Klinikalar <span className="text-[var(--primary)]">xaritasi</span>
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-[var(--on-surface-variant)]">
            Toshkent tumanlari bo&apos;yicha veterinariya klinikalarini interaktiv xaritada toping.
          </p>
        </header>

        {/* ── Boshqaruv paneli ──────────────────────────────────────── */}
        <div
          className="mt-8 grid animate-slide-up gap-4 lg:grid-cols-[1.4fr_1fr]"
          style={{ animationDelay: ".08s" }}
        >
          {/* Status kartochkalari */}
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill
              icon={
                isLocating ? (
                  <span className="material-symbols-outlined animate-spin-slow text-base">
                    progress_activity
                  </span>
                ) : (
                  <span className="material-symbols-outlined fill-icon text-base text-[var(--primary)]">
                    my_location
                  </span>
                )
              }
              label={isLocating ? "Joylashuv aniqlanmoqda" : "Joylashuv tayyor"}
            />
            <StatusPill
              icon={
                <span className="material-symbols-outlined text-base text-[var(--on-surface-variant)]">
                  pin_drop
                </span>
              }
              label={
                location?.lat && location?.lng
                  ? `${location.lat.toFixed(3)}, ${location.lng.toFixed(3)}`
                  : "Koordinata kutilmoqda"
              }
            />
            <StatusPill
              icon={
                <span className="material-symbols-outlined text-base text-[var(--primary)]">
                  storefront
                </span>
              }
              label={`${filteredData.length} klinika`}
              accent
            />
            {geoError ? (
              <StatusPill
                icon={
                  <span className="material-symbols-outlined text-base text-amber-700">
                    warning
                  </span>
                }
                label={geoError}
                tone="warning"
              />
            ) : null}
          </div>

          {/* Tuman selektor */}
          <div className="rounded-2xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-1.5 shadow-sm transition-shadow hover:shadow-md">
            <label className="flex items-center gap-3 rounded-xl bg-[var(--surface-container-low)] px-4 py-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                <span className="material-symbols-outlined fill-icon text-lg">explore</span>
              </span>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--on-surface-variant)]">
                  Tumanni tanlang
                </p>
                <div className="relative mt-0.5">
                  <select
                    value={district}
                    onChange={(event) => setDistrict(event.target.value)}
                    disabled={isLoadingDistricts}
                    className="w-full appearance-none bg-transparent pr-7 text-sm font-bold text-[var(--on-surface)] outline-none disabled:opacity-50"
                  >
                    <option value="">
                      {isLoadingDistricts
                        ? "Yuklanmoqda..."
                        : `Barcha tumanlar (${totalClinicCount})`}
                    </option>
                    {districts.map((item) => (
                      <option key={item.key} value={item.key}>
                        {item.name} — {item.clinicCount} ta
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-base text-[var(--on-surface-variant)]/60">
                    expand_more
                  </span>
                </div>
              </div>
              {selectedDistrict ? (
                <button
                  type="button"
                  onClick={() => setDistrict("")}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--on-surface-variant)] transition hover:bg-[var(--surface-container-high)] hover:text-[var(--on-surface)] active:scale-95"
                  aria-label="Tanlovni tozalash"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              ) : null}
            </label>
          </div>
        </div>

        {/* ── Tumanlar chip qatori ─────────────────────────────────── */}
        {districts.length > 0 ? (
          <div
            className="mt-5 -mx-1 flex animate-fade-in flex-wrap gap-2 px-1"
            style={{ animationDelay: ".15s" }}
          >
            <DistrictChip
              active={district === ""}
              onClick={() => setDistrict("")}
              label="Barchasi"
              count={totalClinicCount}
            />
            {districts.map((item) => (
              <DistrictChip
                key={item.key}
                active={district === item.key}
                onClick={() => setDistrict(item.key)}
                label={item.name}
                count={item.clinicCount}
              />
            ))}
          </div>
        ) : null}

        {/* ── Asosiy mazmun ────────────────────────────────────────── */}
        {isLoading || isLocating ? (
          <MapSkeleton />
        ) : error ? (
          <div className="mt-8 animate-scale-in rounded-2xl border border-red-200 bg-red-50/60 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <span className="material-symbols-outlined text-2xl">error</span>
            </div>
            <p className="mt-4 text-base font-semibold text-red-900">{error}</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800 active:scale-95"
            >
              <span className="material-symbols-outlined text-base">refresh</span>
              Qayta urinish
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="mt-8 animate-scale-in rounded-2xl border border-dashed border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
              <span className="material-symbols-outlined text-2xl">search_off</span>
            </div>
            <p className="mt-4 text-base font-semibold text-[var(--on-surface)]">
              Tanlangan filtr bo&apos;yicha klinika topilmadi
            </p>
            <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
              Boshqa tumanni tanlab ko&apos;ring yoki barcha klinikalarni ko&apos;rsating.
            </p>
            {district ? (
              <button
                type="button"
                onClick={() => setDistrict("")}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[var(--outline-variant)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--on-surface)] transition hover:bg-[var(--surface-container-low)] active:scale-95"
              >
                <span className="material-symbols-outlined text-base">tune</span>
                Filtrlarni tozalash
              </button>
            ) : null}
          </div>
        ) : (
          <div
            className="mt-8 grid animate-slide-up gap-6 lg:grid-cols-[1.2fr_.8fr]"
            style={{ animationDelay: ".18s" }}
          >
            <div className="overflow-hidden rounded-3xl border border-[var(--outline-variant)] shadow-xl">
              <ClinicMap clinics={filteredData} />
            </div>
            <aside className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--on-surface-variant)]">
                  Eng yaqin klinikalar
                </h2>
                <span className="rounded-full bg-[var(--surface-container-high)] px-2.5 py-0.5 text-xs font-bold text-[var(--on-surface)]">
                  {Math.min(filteredData.length, 4)} / {filteredData.length}
                </span>
              </div>
              <div className="stagger-children grid gap-3">
                {filteredData.slice(0, 4).map((clinic) => (
                  <ClinicCard key={clinic.id} clinic={clinic} />
                ))}
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Yordamchi komponentlar
   ───────────────────────────────────────────────────────────────────── */

type StatusPillProps = {
  icon: React.ReactNode;
  label: string;
  accent?: boolean;
  tone?: "default" | "warning";
};

function StatusPill({ icon, label, accent, tone = "default" }: StatusPillProps) {
  const base = "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold shadow-sm transition-transform hover:-translate-y-0.5";
  const variant =
    tone === "warning"
      ? "border border-amber-200 bg-amber-50 text-amber-900"
      : accent
        ? "border border-[var(--primary)]/20 bg-[var(--primary)]/10 text-[var(--primary)]"
        : "border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--on-surface)]";
  return (
    <span className={`${base} ${variant}`}>
      {icon}
      <span className="truncate">{label}</span>
    </span>
  );
}

type DistrictChipProps = {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
};

function DistrictChip({ active, onClick, label, count }: DistrictChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-200 active:scale-95 ${
        active
          ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/25"
          : "border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--on-surface)] hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:bg-[var(--surface-container-low)]"
      }`}
    >
      <span>{label}</span>
      <span
        className={`rounded-full px-1.5 py-0.5 text-[10px] font-black transition-colors ${
          active
            ? "bg-white/20 text-white"
            : "bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function MapSkeleton() {
  return (
    <div className="mt-8 grid animate-fade-in gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <div className="shimmer h-[520px] rounded-3xl border border-[var(--outline-variant)]" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="shimmer h-32 rounded-2xl border border-[var(--outline-variant)]"
          />
        ))}
      </div>
    </div>
  );
}
