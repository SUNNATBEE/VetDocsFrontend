"use client";

import { useEffect, useRef, useState } from "react";
import { clinicsApi } from "@/src/features/clinics/api/clinics.api";
import type { DistrictCatalogItem } from "@/src/features/clinics/types";
import { getApiErrorMessage } from "@/src/lib/api/error";

type DistrictsState = {
  data: DistrictCatalogItem[];
  isLoading: boolean;
  error: string | null;
};

export function useDistricts(): DistrictsState {
  const [data, setData] = useState<DistrictCatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    let isActive = true;
    (async () => {
      try {
        const districts = await clinicsApi.getDistricts();
        if (!isActive) return;
        setData(districts);
      } catch (unknownError) {
        if (!isActive) return;
        setError(getApiErrorMessage(unknownError, "Tumanlarni yuklab bo'lmadi"));
      } finally {
        if (isActive) setIsLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
  }, []);

  return { data, isLoading, error };
}
