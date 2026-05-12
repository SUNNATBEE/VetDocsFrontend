"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clinicsApi } from "@/src/features/clinics/api/clinics.api";
import type { Clinic } from "@/src/features/clinics/types";
import { getApiErrorMessage } from "@/src/lib/api/error";

export function useClinic(id: string) {
  const requestIdRef = useRef(0);
  const [data, setData] = useState<Clinic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runRequest = useCallback(async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    if (!id.trim()) {
      setData(null);
      setError("Klinika ID topilmadi. Klinikalar ro'yxatidan qayta tanlang.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const clinic = await clinicsApi.getById(id);
      if (requestId !== requestIdRef.current) {
        return;
      }

      setData(clinic);
    } catch (unknownError) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      setError(getApiErrorMessage(unknownError, "Klinika ma'lumotlari topilmadi"));
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    queueMicrotask(() => {
      void runRequest();
    });
  }, [runRequest]);

  return { data, isLoading, error, refetch: runRequest };
}
