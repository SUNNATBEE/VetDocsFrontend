"use client";

export function useAuth() {
  // Yahyo faqat UI/UX uchun foydalanadi, mantiq Suhrobga tegishli.
  return { user: null, isAuthenticated: false, logout: () => {} };
}
