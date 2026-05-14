"use client";

import { useState } from "react";
import { authApi } from "@/src/features/auth/api/auth.api";
import { setSession } from "@/src/features/auth/store/auth.store";

type LoginInput = { email: string; password: string };

type UseLoginReturn = {
  login: (input: LoginInput) => Promise<boolean>; // true = muvaffaqiyatli
  isLoading: boolean;
  error: string | null;
};

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(input: LoginInput): Promise<boolean> {
    setIsLoading(true);
    setError(null);
    try {
      // 1) User email/parol yuboradi
      // 2) Backend accessToken qaytaradi
      // 3) Tokenni store/localStorage ga saqlaymiz
      const result = await authApi.login(input);
      setSession(result.accessToken, result.refreshToken, result.user);
      return true;
    } catch (err) {
      const msg =
        (err as { message?: string })?.message ?? "Login amalga oshmadi";
      setError(
        msg === "Failed to fetch"
          ? "Server bilan bog'lanib bo'lmadi. Internet aloqasini tekshiring."
          : msg
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading, error };
}
