"use client";

import { useEffect, useRef, useState } from "react";
import type { Clinic } from "@/src/features/clinics/types";
import { configApi } from "@/src/lib/api/config.api";
import {
  esc,
  loadGoogleMaps,
  type GIcon,
  type GInfoWindow,
  type GMap,
  type GMapTypeStyle,
  type GMapsNamespace,
  type GMarker,
} from "@/src/lib/maps/googleMaps";

type ClinicMapProps = {
  clinics: Clinic[];
  activeId?: string;
};

type MappedClinic = Clinic & {
  latitude: number;
  longitude: number;
};

// Toshkent markazi — kalit yo'q yoki kordinatasiz holatlar uchun fallback.
const TASHKENT_CENTER = { lat: 41.3111, lng: 69.2797 };
const DEFAULT_ZOOM = 12;

function hasCoordinates(clinic: Clinic): clinic is MappedClinic {
  return (
    typeof clinic.latitude === "number" &&
    typeof clinic.longitude === "number" &&
    Number.isFinite(clinic.latitude) &&
    Number.isFinite(clinic.longitude)
  );
}

type LoadState =
  | { phase: "loading" }
  | { phase: "ready" }
  | { phase: "no-key" }
  | { phase: "error"; message: string };

export function ClinicMap({ clinics, activeId }: ClinicMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<GMap | null>(null);
  const markersRef = useRef<Map<string, GMarker>>(new Map());
  const infoRef = useRef<GInfoWindow | null>(null);
  const gmapsRef = useRef<GMapsNamespace | null>(null);
  const [load, setLoad] = useState<LoadState>({ phase: "loading" });

  const mappedClinics = clinics.filter(hasCoordinates);
  const skippedCount = clinics.length - mappedClinics.length;

  // 1) Bir marta: konfigni olib, Google Maps skriptini yuklab, xaritani yarat.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const cfg = await configApi.getPublic();
        if (cancelled) return;

        if (!cfg.googleMapsBrowserKey) {
          setLoad({ phase: "no-key" });
          return;
        }

        const google = await loadGoogleMaps(cfg.googleMapsBrowserKey);
        if (cancelled || !containerRef.current) return;

        gmapsRef.current = google;
        mapRef.current = new google.maps.Map(containerRef.current, {
          center: TASHKENT_CENTER,
          zoom: DEFAULT_ZOOM,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          gestureHandling: "greedy",
          clickableIcons: false,
          styles: MAP_STYLE,
        });
        infoRef.current = new google.maps.InfoWindow();
        setLoad({ phase: "ready" });
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Xarita yuklanmadi";
        setLoad({ phase: "error", message });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // 2) Klinikalar o'zgarganda markerlarni yangilash + fitBounds.
  useEffect(() => {
    if (load.phase !== "ready" || !mapRef.current || !gmapsRef.current) return;
    const map = mapRef.current;
    const google = gmapsRef.current;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current.clear();

    if (mappedClinics.length === 0) {
      map.setCenter(TASHKENT_CENTER);
      map.setZoom(DEFAULT_ZOOM);
      infoRef.current?.close();
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    mappedClinics.forEach((clinic) => {
      const position = { lat: clinic.latitude, lng: clinic.longitude };
      const marker: GMarker = new google.maps.Marker({
        position,
        map,
        title: clinic.name,
        animation: google.maps.Animation.DROP,
        icon: markerIcon(google, clinic.id === activeId),
      });

      marker.addListener("click", () => {
        if (!infoRef.current) return;
        infoRef.current.setContent(buildInfoContent(clinic));
        infoRef.current.open({ map, anchor: marker });
      });

      markersRef.current.set(clinic.id, marker);
      bounds.extend(position);
    });

    if (mappedClinics.length === 1) {
      const only = mappedClinics[0];
      map.setCenter({ lat: only.latitude, lng: only.longitude });
      map.setZoom(15);
    } else {
      map.fitBounds(bounds, 60);
    }
  }, [load.phase, mappedClinics, activeId]);

  // 3) Active klinika o'zgarganda — uning markerini ajratib ko'rsatish.
  useEffect(() => {
    if (load.phase !== "ready" || !mapRef.current || !gmapsRef.current || !activeId) return;
    const google = gmapsRef.current;
    const marker = markersRef.current.get(activeId);
    if (!marker) return;
    marker.setIcon(markerIcon(google, true));
    const pos = marker.getPosition?.();
    if (pos) mapRef.current.panTo(pos);

    markersRef.current.forEach((m, id) => {
      if (id !== activeId) m.setIcon(markerIcon(google, false));
    });
  }, [activeId, load.phase]);

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] shadow-sm">
      <div ref={containerRef} className="absolute inset-0" aria-label="Klinikalar xaritasi" />

      {load.phase === "loading" ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[var(--surface-container-low)]">
          <span className="material-symbols-outlined animate-spin-slow text-3xl text-[var(--primary)]">
            progress_activity
          </span>
          <p className="text-sm font-semibold text-[var(--on-surface-variant)]">
            Xarita yuklanmoqda...
          </p>
        </div>
      ) : null}

      {load.phase === "no-key" ? (
        <FallbackPanel
          icon="map"
          title="Xarita sozlanmagan"
          description="Google Maps brauzer kaliti hali biriktirilmagan. Klinikalar ro'yxat ko'rinishida mavjud."
        />
      ) : null}

      {load.phase === "error" ? (
        <FallbackPanel
          icon="error"
          tone="error"
          title="Xaritani yuklab bo'lmadi"
          description={load.message}
        />
      ) : null}

      {load.phase === "ready" && mappedClinics.length === 0 ? (
        <FallbackPanel
          icon="location_off"
          title="Xaritada marker yo'q"
          description="Tanlangan filtrlar bo'yicha koordinatali klinika topilmadi."
        />
      ) : null}

      {load.phase === "ready" && mappedClinics.length > 0 ? (
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-end justify-between gap-3">
          <div className="pointer-events-auto rounded-2xl border border-[var(--outline-variant)] bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--on-surface-variant)]">
              Xaritada
            </p>
            <p className="mt-0.5 text-base font-extrabold text-[var(--on-surface)]">
              {mappedClinics.length} ta klinika
            </p>
            {skippedCount > 0 ? (
              <p className="text-[11px] text-amber-700">
                {skippedCount} ta klinika koordinatasiz
              </p>
            ) : null}
          </div>
          <Legend />
        </div>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Marker dizayni — vector SVG (anchor pastdagi nuqtada).
   ───────────────────────────────────────────────────────────────────── */

function markerIcon(google: GMapsNamespace, active: boolean): GIcon {
  const color = active ? "#b05e3d" : "#00685f"; // tertiary | primary
  const stroke = "#ffffff";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
      <defs>
        <filter id="s" x="-30%" y="-10%" width="160%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity=".35"/>
        </filter>
      </defs>
      <path filter="url(#s)" fill="${color}" stroke="${stroke}" stroke-width="2"
        d="M18 1.5C9.44 1.5 2.5 8.44 2.5 17c0 11.7 13.5 28.5 14.07 29.21a1.85 1.85 0 0 0 2.86 0C20 45.5 33.5 28.7 33.5 17 33.5 8.44 26.56 1.5 18 1.5z"/>
      <circle cx="18" cy="17" r="6" fill="${stroke}"/>
      <circle cx="18" cy="17" r="3" fill="${color}"/>
    </svg>`;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new google.maps.Size(36, 48),
    anchor: new google.maps.Point(18, 46),
  } as GIcon;
}

function buildInfoContent(clinic: MappedClinic): string {
  const open = clinic.isOpenNow
    ? '<span style="color:#0a7d4a;font-weight:700">● Hozir ochiq</span>'
    : '<span style="color:#a93530;font-weight:700">● Hozir yopiq</span>';
  const rating =
    typeof clinic.averageRating === "number"
      ? `★ ${clinic.averageRating.toFixed(1)} <span style="color:#6d7a77">(${clinic.reviewCount})</span>`
      : '<span style="color:#6d7a77">Sharhsiz</span>';
  const distance =
    typeof clinic.distanceKm === "number"
      ? `<span style="color:#6d7a77">· ${clinic.distanceKm.toFixed(1)} km</span>`
      : "";
  const district = clinic.district
    ? `<div style="color:#3d4947;font-size:12px;margin-top:2px">${esc(clinic.district)} tumani</div>`
    : "";
  const phone = clinic.phone
    ? `<div style="margin-top:6px;font-size:12px">📞 <a href="tel:${esc(clinic.phone)}" style="color:#00685f;text-decoration:none;font-weight:600">${esc(clinic.phone)}</a></div>`
    : "";

  return `
    <div style="font-family:Inter,system-ui,sans-serif;color:#171d1c;max-width:260px;padding:4px 2px">
      <div style="font-weight:800;font-size:15px;line-height:1.25">${esc(clinic.name)}</div>
      ${district}
      <div style="color:#3d4947;font-size:12px;margin-top:6px;line-height:1.4">${esc(clinic.address || "")}</div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:8px;font-size:12px">
        ${open}<span style="color:#bcc9c6">|</span>${rating}${distance}
      </div>
      ${phone}
      <div style="margin-top:10px">
        <a href="/clinics/${esc(clinic.id)}" style="display:inline-block;background:#00685f;color:#fff;padding:6px 12px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none">Batafsil ko'rish →</a>
      </div>
    </div>
  `;
}

/* ─────────────────────────────────────────────────────────────────────
   Fallback va legenda
   ───────────────────────────────────────────────────────────────────── */

type FallbackPanelProps = {
  icon: string;
  title: string;
  description: string;
  tone?: "default" | "error";
};

function FallbackPanel({ icon, title, description, tone = "default" }: FallbackPanelProps) {
  const isError = tone === "error";
  return (
    <div className="absolute inset-4 z-10 flex animate-fade-in items-center justify-center rounded-2xl border border-dashed border-[var(--outline-variant)] bg-white/95 p-6 text-center backdrop-blur">
      <div className="max-w-sm">
        <div
          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
            isError ? "bg-red-100 text-red-600" : "bg-[var(--primary)]/10 text-[var(--primary)]"
          }`}
        >
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <p className="mt-3 text-base font-bold text-[var(--on-surface)]">{title}</p>
        <p className="mt-1 text-sm text-[var(--on-surface-variant)]">{description}</p>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-[var(--outline-variant)] bg-white/95 px-3.5 py-2 text-[11px] font-semibold text-[var(--on-surface-variant)] shadow-lg backdrop-blur">
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)] ring-2 ring-white" />
        Klinika
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--tertiary)] ring-2 ring-white" />
        Tanlangan
      </span>
    </div>
  );
}

/* Map style — kamroq band, klinika markerlari aniqroq ko'rinadi. */
const MAP_STYLE: GMapTypeStyle[] = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
];
