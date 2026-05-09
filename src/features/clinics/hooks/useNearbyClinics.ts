"use client";

import { useClinics } from "@/src/features/clinics/hooks/useClinics";
import type { NearbyClinicsParams } from "@/src/features/clinics/types";

export function useNearbyClinics(params: NearbyClinicsParams) {
  return useClinics(params);
}
