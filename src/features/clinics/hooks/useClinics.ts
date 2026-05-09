"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clinicsApi } from "@/src/features/clinics/api/clinics.api";
import type { Clinic, ClinicFilters, NearbyClinicsParams } from "@/src/features/clinics/types";

const DEFAULT_LOCATION: NearbyClinicsParams = {
  lat: 41.31,
  lng: 69.25,
  radiusKm: 200,
};

type ClinicsState = {
  data: Clinic[];
  filteredData: Clinic[];
  isLoading: boolean;
  error: string | null;
  filters: ClinicFilters;
  setFilters: (filters: ClinicFilters) => void;
  refetch: () => void;
};

const initialFilters: ClinicFilters = {
  query: "",
  city: "all",
  openNow: false,
  minRating: 0,
};

// Bu hook "klinika ro'yxatini olib keladigan kran"ga o'xshaydi.
// UI shu krandan suv olgandek data oladi.
export function useClinics(params: NearbyClinicsParams = DEFAULT_LOCATION): ClinicsState {
  const { lat, lng, radiusKm } = params;
  const [data, setData] = useState<Clinic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ClinicFilters>(initialFilters);
  const [refetchTick, setRefetchTick] = useState(0);

  // Aktiv so'rovni kuzatib boramiz: yangi so'rov boshlansa, eski natijalar
  // kech kelganda ham UI'ga ta'sir qilmaydi.
  const activeRequestRef = useRef(0);

  const refetch = useCallback(() => {
    setRefetchTick((tick) => tick + 1);
  }, []);

  useEffect(() => {
    const requestId = activeRequestRef.current + 1;
    activeRequestRef.current = requestId;

    const isStillActive = () => activeRequestRef.current === requestId;

    const promise = clinicsApi.getNearby({ lat, lng, radiusKm });

    // setState'ni sinxron ravishda effect ichida chaqirmaslik uchun
    // microtask'ga qoldiramiz (React 19 lintining talabi).
    Promise.resolve().then(() => {
      if (!isStillActive()) return;
      setIsLoading(true);
      setError(null);
    });

    promise
      .then((clinics) => {
        if (!isStillActive()) return;
        setData(clinics);
      })
      .catch((unknownError: unknown) => {
        if (!isStillActive()) return;
        const message =
          unknownError instanceof Error ? unknownError.message : "Klinikalarni yuklab bo'lmadi";
        setError(message);
      })
      .finally(() => {
        if (!isStillActive()) return;
        setIsLoading(false);
      });

    return () => {
      // Effect tozalansa, bu requestId endi aktiv emas
      activeRequestRef.current += 1;
    };
  }, [lat, lng, radiusKm, refetchTick]);

  const filteredData = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();

    return data.filter((clinic) => {
      const matchesQuery =
        !normalizedQuery ||
        clinic.name.toLowerCase().includes(normalizedQuery) ||
        clinic.address.toLowerCase().includes(normalizedQuery) ||
        clinic.city.toLowerCase().includes(normalizedQuery);
      const matchesCity = filters.city === "all" || clinic.city === filters.city;
      const matchesOpen = !filters.openNow || clinic.isOpenNow;
      const rating = clinic.averageRating ?? 0;
      const matchesRating = rating >= filters.minRating;

      return matchesQuery && matchesCity && matchesOpen && matchesRating;
    });
  }, [data, filters]);

  return {
    data,
    filteredData,
    isLoading,
    error,
    filters,
    setFilters,
    refetch,
  };
}
