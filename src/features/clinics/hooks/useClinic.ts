"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clinicsApi } from "@/src/features/clinics/api/clinics.api";
import type { Clinic } from "@/src/features/clinics/types";

export function useClinic(id: string) {
  const [data, setData] = useState<Clinic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTick, setRefetchTick] = useState(0);

  const activeRequestRef = useRef(0);

  const refetch = useCallback(() => {
    setRefetchTick((tick) => tick + 1);
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }

    const requestId = activeRequestRef.current + 1;
    activeRequestRef.current = requestId;

    const isStillActive = () => activeRequestRef.current === requestId;

    const promise = clinicsApi.getById(id);

    Promise.resolve().then(() => {
      if (!isStillActive()) return;
      setIsLoading(true);
      setError(null);
      setData(null);
    });

    promise
      .then((clinic) => {
        if (!isStillActive()) return;
        setData(clinic);
      })
      .catch((unknownError: unknown) => {
        if (!isStillActive()) return;
        const message =
          unknownError instanceof Error ? unknownError.message : "Klinika ma'lumotlari topilmadi";
        setError(message);
      })
      .finally(() => {
        if (!isStillActive()) return;
        setIsLoading(false);
      });

    return () => {
      activeRequestRef.current += 1;
    };
  }, [id, refetchTick]);

  return { data, isLoading, error, refetch };
}
