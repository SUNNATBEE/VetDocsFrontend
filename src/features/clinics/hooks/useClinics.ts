"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clinicsApi } from "@/src/features/clinics/api/clinics.api";
import type { Clinic, ClinicFilters, NearbyClinicsParams } from "@/src/features/clinics/types";
import { getApiErrorMessage } from "@/src/lib/api/error";

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
  refetch: () => Promise<void>;
};

const initialFilters: ClinicFilters = {
  query: "",
  city: "all",
  openNow: false,
  minRating: 0,
};

// Bu hook "klinika ro'yxatini olib keladigan kran"ga o'xshaydi.
// UI shu krandan suv olgandek data oladi.
export function useClinics(params: NearbyClinicsParams | null = DEFAULT_LOCATION): ClinicsState {
  const lat = params?.lat;
  const lng = params?.lng;
  const radiusKm = params?.radiusKm;
  const requestIdRef = useRef(0);
  const [data, setData] = useState<Clinic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ClinicFilters>(initialFilters);

  const runRequest = useCallback(async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    if (typeof lat !== "number" || typeof lng !== "number") {
      setData([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const clinics = await clinicsApi.getNearby({ lat, lng, radiusKm });
      if (requestId !== requestIdRef.current) {
        return;
      }

      setData(clinics);
    } catch (unknownError) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      setError(getApiErrorMessage(unknownError, "Klinikalarni yuklab bo'lmadi"));
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, [lat, lng, radiusKm]);

  useEffect(() => {
    queueMicrotask(() => {
      void runRequest();
    });
  }, [runRequest]);

  const filteredData = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();

    return data.filter((clinic) => {
      const matchesQuery =
        !normalizedQuery ||
        clinic.name.toLowerCase().includes(normalizedQuery) ||
        clinic.address.toLowerCase().includes(normalizedQuery) ||
        clinic.city.toLowerCase().includes(normalizedQuery);
      const matchesCity = filters.city === "all" || clinic.city === filters.city;
      const matchesOpen = !filters.openNow || clinic.isOpenNow === true;
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
    refetch: runRequest,
  };
}
