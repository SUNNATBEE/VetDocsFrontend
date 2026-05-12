"use client";

import { useState } from "react";
import { authApi } from "@/src/features/auth/api/auth.api";
import { setSession } from "@/src/features/auth/store/auth.store";

type RegisterInput = { email: string; password: string; name?: string };

type UseRegisterReturn = {
  register: (input: RegisterInput) => Promise<boolean>; // true = muvaffaqiyatli
  isLoading: boolean;
  error: string | null;
};

export function useRegister(): UseRegisterReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register(input: RegisterInput): Promise<boolean> {
    setIsLoading(true);
    setError(null);
    try {
      // 1) User ma'lumotlarini yuboramiz
      // 2) Backend token + user qaytaradi
      // 3) Sessiyani saqlaymiz — user darhol login bo'ladi
      const result = await authApi.register(input);
      setSession(result.accessToken, result.refreshToken, result.user);
      return true;
    } catch (err) {
      // TypeError (Failed to fetch) yoki ApiError
      const msg =
        (err as { message?: string })?.message ??
        "Ro'yxatdan o'tish amalga oshmadi";
      // "Failed to fetch" → foydalanuvchiga tushunarli xabar
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

  return { register, isLoading, error };
}
