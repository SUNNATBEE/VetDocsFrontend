"use client";

import { useEffect, useState } from "react";
import { useClinics } from "@/src/features/clinics/hooks/useClinics";
import type { NearbyClinicsParams } from "@/src/features/clinics/types";

const FALLBACK_LOCATION: NearbyClinicsParams = {
  lat: 41.31,
  lng: 69.25,
  radiusKm: 200,
};

export function useNearbyClinics(params: Partial<NearbyClinicsParams> = {}) {
  const requestedLat = params.lat;
  const requestedLng = params.lng;
  const requestedRadiusKm = params.radiusKm ?? FALLBACK_LOCATION.radiusKm;
  const hasRequestedLocation = typeof requestedLat === "number" && typeof requestedLng === "number";
  const [location, setLocation] = useState<NearbyClinicsParams | null>(
    hasRequestedLocation
      ? {
          lat: requestedLat,
          lng: requestedLng,
          radiusKm: requestedRadiusKm,
        }
      : null,
  );
  const [isLocating, setIsLocating] = useState(!hasRequestedLocation);
  const [geoError, setGeoError] = useState<string | null>(null);
  const clinicsState = useClinics(location);

  useEffect(() => {
    let isActive = true;

    if (hasRequestedLocation) {
      queueMicrotask(() => {
        if (!isActive) {
          return;
        }

        setLocation({
          lat: requestedLat,
          lng: requestedLng,
          radiusKm: requestedRadiusKm,
        });
        setGeoError(null);
        setIsLocating(false);
      });

      return () => {
        isActive = false;
      };
    }

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      queueMicrotask(() => {
        if (!isActive) {
          return;
        }

        setGeoError("Brauzer geolokatsiyani qo'llab-quvvatlamaydi. Toshkent fallback ishlatildi.");
        setIsLocating(false);
      });

      return () => {
        isActive = false;
      };
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!isActive) {
          return;
        }

        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          radiusKm: requestedRadiusKm,
        });
        setGeoError(null);
        setIsLocating(false);
      },
      () => {
        if (!isActive) {
          return;
        }

        setLocation({ ...FALLBACK_LOCATION, radiusKm: requestedRadiusKm });
        setGeoError("Joylashuv olinmadi. Toshkent markazi fallback sifatida ishlatildi.");
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60_000,
        timeout: 8_000,
      },
    );

    return () => {
      isActive = false;
    };
  }, [hasRequestedLocation, requestedLat, requestedLng, requestedRadiusKm]);

  return {
    ...clinicsState,
    location,
    isLocating,
    geoError,
  };
}
