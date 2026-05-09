"use client";

import { useCallback, useEffect, useState } from "react";
import { clinicsApi } from "@/src/features/clinics/api/clinics.api";
import type { Clinic } from "@/src/features/clinics/types";

export function useClinic(id: string) {
  const [data, setData] = useState<Clinic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadClinic = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setData(await clinicsApi.getById(id));
    } catch (unknownError) {
      const message =
        unknownError instanceof Error ? unknownError.message : "Klinika ma'lumotlari topilmadi";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let isActive = true;

    clinicsApi
      .getById(id)
      .then((clinic) => {
        if (!isActive) {
          return;
        }

        setData(clinic);
        setError(null);
      })
      .catch((unknownError) => {
        if (!isActive) {
          return;
        }

        const message =
          unknownError instanceof Error ? unknownError.message : "Klinika ma'lumotlari topilmadi";
        setError(message);
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [id]);

  return { data, isLoading, error, refetch: loadClinic };
}
