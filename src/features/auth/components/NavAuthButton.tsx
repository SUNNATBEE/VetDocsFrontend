"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/src/features/auth/hooks/useCurrentUser";
import { useLogout } from "@/src/features/auth/hooks/useLogout";
import { IconLogin, IconLogout } from "@/src/features/auth/components/icons";

export function NavAuthButton() {
  const { user, isLoggedIn } = useCurrentUser();
  const { logout, isLoading } = useLogout();

  // Hydration mismatch ni oldini olish:
  // Server da auth holati noma'lum, shuning uchun mount bo'lguncha hech narsa ko'rsatmaymiz
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    // Server render va birinchi client render da bir xil bo'lishi uchun bo'sh joy
    return <div className="w-20 h-9" />;
  }

  if (isLoggedIn && user) {
    return (
      <div className="flex items-center gap-2">
        {/* Username → /profile ga o'tadi */}
        <Link
          href="/profile"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          {/* Avatar circle */}
          <div className="w-7 h-7 rounded-full bg-[#00685f] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {(user.fullName || user.email).slice(0, 1).toUpperCase()}
          </div>
          <span className="text-sm text-slate-700 font-medium max-w-[120px] truncate">
            {user.fullName || user.email}
          </span>
        </Link>

        {/* Mobile: faqat avatar */}
        <Link
          href="/profile"
          className="sm:hidden w-8 h-8 rounded-full bg-[#00685f] flex items-center justify-center text-white text-xs font-bold"
          aria-label="Profil"
        >
          {(user.fullName || user.email).slice(0, 1).toUpperCase()}
        </Link>

        <button
          onClick={logout}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700
            hover:bg-slate-100 transition-colors disabled:opacity-50"
        >
          <IconLogout className="w-4 h-4" />
          <span className="hidden sm:inline">{isLoading ? "..." : "Chiqish"}</span>
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex items-center gap-1.5 rounded-lg bg-[#00685f] px-4 py-2 text-sm font-semibold text-white
        hover:bg-[#005049] transition-colors shadow-sm"
    >
      <IconLogin className="w-4 h-4" />
      Kirish
    </Link>
  );
}
