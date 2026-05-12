/**
 * useAuthStore — auth.store.ts ni React state bilan bog'laydi.
 * Komponentlar shu hookni ishlatadi.
 */

"use client";

import { useEffect, useState } from "react";
import {
  getSession,
  subscribe,
  type AuthState,
} from "@/src/features/auth/store/auth.store";

export function useAuthStore(): AuthState {
  const [state, setState] = useState<AuthState>(getSession);

  useEffect(() => {
    // Store o'zgarganda re-render qilish uchun subscribe qilamiz
    const unsub = subscribe(setState);
    return unsub;
  }, []);

  return state;
}
