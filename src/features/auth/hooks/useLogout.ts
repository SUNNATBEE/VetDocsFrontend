"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/src/features/auth/api/auth.api";
import {
  clearSession,
  getSession,
} from "@/src/features/auth/store/auth.store";

type UseLogoutReturn = {
  logout: () => Promise<void>;
  isLoading: boolean;
};

export function useLogout(): UseLogoutReturn {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function logout() {
    setIsLoading(true);
    const { refreshToken } = getSession();

    try {
      // Backendga logout so'rovi yuboramiz (token blacklist uchun)
      await authApi.logout(refreshToken ?? undefined);
    } catch {
      // Backend xato qaytarsa ham local sessiyani tozalaymiz
    } finally {
      clearSession();
      setIsLoading(false);
      router.push("/login");
    }
  }

  return { logout, isLoading };
}
