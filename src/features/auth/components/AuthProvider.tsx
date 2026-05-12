"use client";

import { useEffect } from "react";
import { hydrateSession } from "@/src/features/auth/store/auth.store";

/**
 * AuthProvider — app yuklanganda localStorage dan sessiyani tiklaydi.
 * Root layout ga bir marta o'rnatiladi.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    hydrateSession();
  }, []);

  return <>{children}</>;
}
