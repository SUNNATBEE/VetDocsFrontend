"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/features/auth/hooks/useAuthStore";

/**
 * Protected sahifalar uchun guard.
 * Login bo'lmagan user /login ga redirect qilinadi.
 *
 * Ishlatish:
 *   export default function ProfilePage() {
 *     useRequireAuth();
 *     return <div>...</div>;
 *   }
 */
export function useRequireAuth(redirectTo = "/login") {
  const { user, accessToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || !accessToken) {
      router.replace(redirectTo);
    }
  }, [user, accessToken, redirectTo, router]);

  return { user, isLoggedIn: !!user };
}
