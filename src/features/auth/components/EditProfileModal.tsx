"use client";

import { useState } from "react";
import { getSession, setSession } from "@/src/features/auth/store/auth.store";
import { IconError } from "@/src/features/auth/components/icons";

type Props = {
  onClose: () => void;
};

export function EditProfileModal({ onClose }: Props) {
  const { user, accessToken, refreshToken } = getSession();

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!user) return null;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) { setError("Ism bo'sh bo'lishi mumkin emas"); return; }

    setSaving(true);
    setError(null);

    // Backend da PATCH /users/me endpoint yo'q (openapi.yaml da ko'rsatilmagan)
    // Shuning uchun faqat local store va localStorage ni yangilaymiz
    await new Promise((r) => setTimeout(r, 400)); // UI feedback uchun

    const updated = { ...user!, fullName: fullName.trim() };
    setSession(accessToken!, refreshToken!, updated);
    setSuccess(true);
    setTimeout(onClose, 800);
    setSaving(false);
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f0f5f2] text-[#6d7a77] transition-colors"
          aria-label="Yopish"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-[#171d1c] mb-1">Profilni tahrirlash</h2>
        <p className="text-sm text-[#3d4947] mb-6">Ma&apos;lumotlaringizni yangilang</p>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-[#ffdad6] px-4 py-3 text-sm text-[#ba1a1a]">
            <IconError className="w-4 h-4 shrink-0" />{error}
          </div>
        )}

        {success && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-[#e8f5e9] px-4 py-3 text-sm text-[#2e7d32]">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Muvaffaqiyatli saqlandi!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          {/* To'liq ism */}
          <div>
            <label htmlFor="ep-name" className="block text-sm font-bold text-[#171d1c] mb-1.5">
              To&apos;liq ism
            </label>
            <input
              id="ep-name"
              type="text"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setError(null); }}
              disabled={saving || success}
              placeholder="Ism Familiya"
              className="w-full px-4 py-3 rounded-lg border border-[#bcc9c6] bg-white outline-none text-sm
                focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] disabled:opacity-50 transition-all"
            />
          </div>

          {/* Email — faqat ko'rsatish (o'zgartirib bo'lmaydi) */}
          <div>
            <label className="block text-sm font-bold text-[#171d1c] mb-1.5">
              Email <span className="text-xs font-normal text-[#6d7a77]">(o&apos;zgartirib bo&apos;lmaydi)</span>
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-[#bcc9c6] bg-[#f0f5f2] outline-none text-sm text-[#6d7a77]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 py-3 rounded-lg border border-[#bcc9c6] text-sm font-semibold text-[#3d4947]
                hover:bg-[#f0f5f2] transition-colors disabled:opacity-50"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={saving || success}
              className="flex-1 py-3 rounded-lg bg-[#00685f] text-white text-sm font-bold
                hover:bg-[#005049] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {saving ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
