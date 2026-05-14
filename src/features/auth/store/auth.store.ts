/**
 * Auth store — localStorage orqali sessiyani saqlaydi.
 * Zustand yo'q, shuning uchun oddiy modul-level state ishlatamiz.
 * Komponentlar useAuthStore() hook orqali o'qiydi.
 */

import type { AuthUser } from "@/src/features/auth/types";

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
};

// ─── In-memory state ──────────────────────────────────────────────────────────
let _state: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

// ─── Listeners (React useState bilan sinxronlash uchun) ───────────────────────
type Listener = (state: AuthState) => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((fn) => fn({ ..._state }));
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Tokenlar va userni saqlaydi (localStorage + cookie + memory) */
export function setSession(
  accessToken: string,
  refreshToken: string,
  user: AuthUser,
) {
  _state = { accessToken, refreshToken, user };
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem("authUser", JSON.stringify(user));
    // Middleware cookie dan o'qiydi — SameSite=Strict, HTTPS da Secure bo'ladi
    document.cookie = `accessToken=${accessToken}; path=/; SameSite=Strict`;
  }
  notify();
}

/** Tokenlar va userni tozalaydi */
export function clearSession() {
  _state = { accessToken: null, refreshToken: null, user: null };
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem("authUser");
    // Cookie ni o'chiramiz (max-age=0)
    document.cookie = "accessToken=; path=/; max-age=0; SameSite=Strict";
  }
  notify();
}

/** localStorage dan state ni tiklaydi (app yuklanganda bir marta chaqiriladi) */
export function hydrateSession() {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem(ACCESS_KEY);
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  const raw = localStorage.getItem("authUser");
  if (accessToken && refreshToken && raw) {
    try {
      const user: AuthUser = JSON.parse(raw);
      _state = { accessToken, refreshToken, user };
      notify();
    } catch {
      clearSession();
    }
  }
}

/** Joriy state ni qaytaradi */
export function getSession(): AuthState {
  return { ..._state };
}

/** Listener qo'shadi, unmount da qaytarilgan fn ni chaqiring */
export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
