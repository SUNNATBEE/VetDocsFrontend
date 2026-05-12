"use client";

import { useEffect, useState } from "react";
import { useClinics } from "@/src/features/clinics/hooks/useClinics";

type Coords = { lat: number; lng: number };

type UseNearbyOptions = {
  radiusKm?: number;
  // Geolocation taqiqlanganda yoki mavjud bo'lmaganda ishlatiladigan koordinatalar.
  // Default — Toshkent markazi.
  fallback?: Coords;
};

const TASHKENT: Coords = { lat: 41.31, lng: 69.25 };

// Foydalanuvchining geolocation'ini olib, shu joydagi klinikalarni qaytaradi.
// Brauzer ruxsat bermasa yoki SSR holatida fallback (Toshkent) ishlatiladi.
export function useNearbyClinics(options: UseNearbyOptions = {}) {
  const fallback = options.fallback ?? TASHKENT;
  const radiusKm = options.radiusKm ?? 10;

  const [coords, setCoords] = useState<Coords>(fallback);
  const [isLocating, setIsLocating] = useState(true);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      // setState'ni effect ichida sinxron chaqirmaslik uchun microtask
      Promise.resolve().then(() => setIsLocating(false));
      return;
    }

    let cancelled = false;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (cancelled) return;
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (error) => {
        if (cancelled) return;
        setGeoError(error.message || "Joylashuvni aniqlab bo'lmadi");
        setIsLocating(false);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const clinics = useClinics({
    lat: coords.lat,
    lng: coords.lng,
    radiusKm,
  });

  return {
    ...clinics,
    coords,
    isLocating,
    geoError,
  };
}
