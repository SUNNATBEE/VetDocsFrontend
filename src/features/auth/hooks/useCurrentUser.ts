"use client";

import { useAuthStore } from "@/src/features/auth/hooks/useAuthStore";
import type { AuthUser } from "@/src/features/auth/types";

type UseCurrentUserReturn = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
};

/**
 * Joriy login bo'lgan userni qaytaradi.
 * user === null bo'lsa — login qilinmagan.
 */
export function useCurrentUser(): UseCurrentUserReturn {
  const { user } = useAuthStore();

  return {
    user,
    isLoggedIn: user !== null,
    isAdmin: user?.role === "ADMIN",
  };
}
