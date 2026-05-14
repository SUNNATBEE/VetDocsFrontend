"use client";

import { useRequireAuth } from "@/src/features/auth/hooks/useRequireAuth";
import { useLogout } from "@/src/features/auth/hooks/useLogout";
import { useAuthStore } from "@/src/features/auth/hooks/useAuthStore";
import { useState } from "react";
import Link from "next/link";
import { EditProfileModal } from "@/src/features/auth/components/EditProfileModal";
import {
  IconEdit, IconMail, IconCalendar, IconPerson,
  IconLockReset, IconLogout, IconAdd, IconPets,
  IconFavorite, IconRateReview, IconSearch, IconHospital,
} from "@/src/features/auth/components/icons";

type Tab = "info" | "favorites" | "reviews" | "settings";

export default function ProfilePage() {
  useRequireAuth(); // login bo'lmagan user → /login
  const { user } = useAuthStore(); // real-time store (edit dan keyin yangilanadi)
  const { logout, isLoading: logoutLoading } = useLogout();
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [showEdit, setShowEdit] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#00685f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const initials = user.fullName
    ? user.fullName.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : user.email.slice(0, 2).toUpperCase();

  const tabs: { key: Tab; label: string }[] = [
    { key: "info",      label: "Ma'lumotlarim" },
    { key: "favorites", label: "Sevimlilar" },
    { key: "reviews",   label: "Sharhlarim" },
    { key: "settings",  label: "Sozlamalar" },
  ];

  const inputCls = "w-full bg-[#f0f5f2] border border-[#bcc9c6] rounded-lg px-4 py-3 text-sm outline-none";

  return (
    <>
      {/* Edit modal */}
      {showEdit && <EditProfileModal onClose={() => setShowEdit(false)} />}

      <main className="max-w-[1100px] mx-auto px-4 md:px-0 py-8">

        {/* ── Profile Header ──────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#bcc9c6] mb-8">
          {/* Cover gradient */}
          <div className="h-40 w-full bg-gradient-to-r from-[#00685f]/20 to-[#008378]/30 relative">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowEdit(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#bcc9c6] rounded-lg text-sm font-semibold hover:bg-[#f0f5f2] transition-colors shadow-sm"
              >
                <IconEdit className="w-4 h-4" />
                Profilni tahrirlash
              </button>
            </div>
          </div>

          {/* Avatar + info */}
          <div className="px-8 pb-8 flex flex-col md:flex-row items-end gap-6 -mt-12 relative z-10">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-[#00685f] border-4 border-white flex items-center justify-center text-white font-bold text-3xl shadow-md shrink-0 select-none">
                {initials}
              </div>
              <button
                onClick={() => setShowEdit(true)}
                className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                aria-label="Profilni tahrirlash"
              >
                <IconEdit className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex-grow pb-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-[#171d1c]">
                  {user.fullName || "Foydalanuvchi"}
                </h1>
                <button
                  onClick={() => setShowEdit(true)}
                  className="text-[#6d7a77] hover:text-[#00685f] transition-colors"
                  aria-label="Ismni tahrirlash"
                >
                  <IconEdit className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#3d4947] text-sm">
                <span className="flex items-center gap-1.5">
                  <IconMail className="w-4 h-4" />{user.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconCalendar className="w-4 h-4" />A&apos;zo bo&apos;lgan: 2026 yil
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              {user.role === "ADMIN" && (
                <span className="px-3 py-1 rounded-full bg-[#fd7369]/20 text-[#a93530] text-xs font-bold uppercase tracking-wide">
                  Admin
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-[#6bd8cb]/30 text-[#005049] text-xs font-bold uppercase tracking-wide">
                VIP Mijoz
              </span>
            </div>
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────── */}
        <div className="sticky top-[73px] bg-[#f5faf8] z-40 border-b border-[#bcc9c6] mb-8 overflow-x-auto">
          <div className="flex items-center gap-8">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`pb-4 text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.key ? "profile-tab-active" : "text-[#3d4947] hover:text-[#00685f]"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Ma'lumotlarim ─────────────────────────────────────── */}
        {activeTab === "info" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Shaxsiy ma'lumotlar */}
            <div className="lg:col-span-8 bg-white rounded-xl p-8 border border-[#bcc9c6] shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#171d1c]">Shaxsiy ma&apos;lumotlar</h2>
                <div className="flex items-center gap-2">
                  <IconPerson className="w-5 h-5 text-[#00685f]" />
                  <button
                    onClick={() => setShowEdit(true)}
                    className="flex items-center gap-1.5 text-sm text-[#00685f] font-semibold hover:underline"
                  >
                    <IconEdit className="w-4 h-4" />
                    Tahrirlash
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-[#3d4947] font-bold text-sm">To&apos;liq ism</label>
                  <div className="relative">
                    <input readOnly type="text" value={user.fullName || "—"} className={inputCls} />
                    <button
                      onClick={() => setShowEdit(true)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d7a77] hover:text-[#00685f] transition-colors"
                    >
                      <IconEdit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[#3d4947] font-bold text-sm">Email</label>
                  <input readOnly type="email" value={user.email} className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[#3d4947] font-bold text-sm">Rol</label>
                  <input readOnly type="text"
                    value={user.role === "ADMIN" ? "Administrator" : "Foydalanuvchi"}
                    className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[#3d4947] font-bold text-sm">Foydalanuvchi ID</label>
                  <input readOnly type="text" value={user.id}
                    className={inputCls + " font-mono text-xs"} />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#bcc9c6] flex items-center justify-between">
                <button
                  onClick={() => setShowEdit(true)}
                  className="flex items-center gap-2 text-[#00685f] font-semibold text-sm hover:underline"
                >
                  <IconLockReset className="w-4 h-4" />Parolni yangilash
                </button>
                <button onClick={logout} disabled={logoutLoading}
                  className="flex items-center gap-2 text-[#ba1a1a] font-semibold text-sm hover:underline disabled:opacity-50">
                  <IconLogout className="w-4 h-4" />
                  {logoutLoading ? "Chiqilmoqda..." : "Chiqish"}
                </button>
              </div>
            </div>

            {/* Statistika + Hayvonlar */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white rounded-xl p-6 border border-[#bcc9c6] shadow-sm">
                <h3 className="text-lg font-bold text-[#171d1c] mb-5">Statistika</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#f0f5f2] p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#00685f]">0</div>
                    <div className="text-xs text-[#3d4947] mt-1">Tashriflar</div>
                  </div>
                  <div className="bg-[#f0f5f2] p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#a93530]">0</div>
                    <div className="text-xs text-[#3d4947] mt-1">Sharhlar</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#bcc9c6] shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#171d1c]">Mening hayvonlarim</h3>
                    <button className="w-8 h-8 rounded-full bg-[#00685f]/10 text-[#00685f] flex items-center justify-center hover:bg-[#00685f] hover:text-white transition-colors">
                      <IconAdd className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col items-center justify-center py-8 px-4 text-center bg-[#f0f5f2] rounded-lg border-2 border-dashed border-[#bcc9c6]">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
                      <IconPets className="w-8 h-8 text-[#6bd8cb]" />
                    </div>
                    <p className="font-semibold text-[#171d1c] text-sm mb-1">Hayvonlar qo&apos;shilmagan</p>
                    <p className="text-xs text-[#3d4947] max-w-[180px]">
                      Ularni qo&apos;shing va salomatlik tarixini kuzatib boring
                    </p>
                  </div>
                </div>
                <button className="block w-full py-3.5 bg-[#00685f] text-white text-center text-sm font-semibold hover:bg-[#005049] transition-colors">
                  Yangi qo&apos;shish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Sevimlilar ────────────────────────────────────────── */}
        {activeTab === "favorites" && (
          <div className="bg-white rounded-xl p-12 border border-[#bcc9c6] shadow-sm text-center">
            <IconFavorite className="w-16 h-16 text-[#bcc9c6] mx-auto" />
            <h3 className="text-xl font-bold text-[#171d1c] mt-4 mb-2">Sevimlilar bo&apos;sh</h3>
            <p className="text-[#3d4947] text-sm mb-6">Yoqtirgan klinikalaringizni shu yerda saqlang</p>
            <Link href="/clinics"
              className="inline-flex items-center gap-2 bg-[#00685f] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#005049] transition-colors">
              <IconSearch className="w-4 h-4" />Klinikalarni ko&apos;rish
            </Link>
          </div>
        )}

        {/* ── Sharhlarim ────────────────────────────────────────── */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-xl p-12 border border-[#bcc9c6] shadow-sm text-center">
            <IconRateReview className="w-16 h-16 text-[#bcc9c6] mx-auto" />
            <h3 className="text-xl font-bold text-[#171d1c] mt-4 mb-2">Sharhlar yo&apos;q</h3>
            <p className="text-[#3d4947] text-sm mb-6">Klinikaga tashrif buyurib, fikringizni qoldiring</p>
            <Link href="/clinics"
              className="inline-flex items-center gap-2 bg-[#00685f] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#005049] transition-colors">
              <IconHospital className="w-4 h-4" />Klinikalarni ko&apos;rish
            </Link>
          </div>
        )}

        {/* ── Sozlamalar ────────────────────────────────────────── */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-xl p-8 border border-[#bcc9c6] shadow-sm max-w-lg">
            <h2 className="text-xl font-bold text-[#171d1c] mb-6">Sozlamalar</h2>
            <div className="space-y-4">
              {/* Profil tahrirlash */}
              <button
                onClick={() => setShowEdit(true)}
                className="w-full flex items-center justify-between p-4 bg-[#f0f5f2] rounded-lg hover:bg-[#e4e9e7] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <IconEdit className="w-5 h-5 text-[#00685f]" />
                  <div className="text-left">
                    <p className="font-semibold text-sm text-[#171d1c]">Profilni tahrirlash</p>
                    <p className="text-xs text-[#3d4947]">Ism va ma&apos;lumotlarni yangilash</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-[#6d7a77]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                </svg>
              </button>

              <div className="flex items-center justify-between p-4 bg-[#f0f5f2] rounded-lg">
                <div>
                  <p className="font-semibold text-sm text-[#171d1c]">Bildirishnomalar</p>
                  <p className="text-xs text-[#3d4947]">Email orqali xabar olish</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[#00685f]" />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#f0f5f2] rounded-lg">
                <div>
                  <p className="font-semibold text-sm text-[#171d1c]">Til</p>
                  <p className="text-xs text-[#3d4947]">O&apos;zbek tili</p>
                </div>
                <span className="text-sm font-semibold text-[#00685f]">UZ</span>
              </div>

              <button onClick={logout} disabled={logoutLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-[#ba1a1a] text-[#ba1a1a] text-sm font-semibold hover:bg-[#ffdad6] transition-colors disabled:opacity-50">
                <IconLogout className="w-4 h-4" />
                {logoutLoading ? "Chiqilmoqda..." : "Hisobdan chiqish"}
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
