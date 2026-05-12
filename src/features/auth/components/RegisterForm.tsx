"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegister } from "@/src/features/auth/hooks/useRegister";
import {
  validateRegister,
  type RegisterFormValues,
  type FormErrors,
} from "@/src/features/auth/schemas/auth.schema";
import {
  IconVisibility, IconVisibilityOff,
  IconError, IconVerifiedUser, IconSchedule, IconPets,
} from "@/src/features/auth/components/icons";

export function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error } = useRegister();

  const [values, setValues] = useState<RegisterFormValues>({
    name: "", email: "", password: "", confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FormErrors<RegisterFormValues>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
    setFieldErrors((p) => ({ ...p, [name]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateRegister(values);
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }
    const ok = await register({ name: values.name, email: values.email, password: values.password });
    if (ok) router.push("/");
  }

  function getStrength(pw: string): { level: number; label: string } {
    if (!pw) return { level: 0, label: "" };
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^a-zA-Z0-9]/.test(pw)) s++;
    if (s <= 1) return { level: 1, label: "Zaif" };
    if (s === 2) return { level: 2, label: "O'rtacha" };
    if (s === 3) return { level: 3, label: "Yaxshi" };
    return { level: 4, label: "Kuchli" };
  }

  const strength = getStrength(values.password);

  const inputCls = (hasErr: boolean) =>
    `w-full px-4 py-3 rounded-lg border bg-white outline-none transition-all text-sm
     focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] disabled:opacity-50
     ${hasErr ? "border-[#ba1a1a]" : "border-[#bcc9c6]"}`;

  return (
    <div className="flex min-h-screen">
      {/* ── Chap panel ─────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-[480px] shrink-0 vc-gradient flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#b05e3d]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-[#89f5e7]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Pets icon box */}
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-xl shadow-lg mb-4">
            <IconPets className="w-12 h-12 text-[#00685f]" />
          </div>
          <h2 className="text-3xl font-extrabold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            VetClinic UZ
          </h2>
          <p className="text-base opacity-90 leading-relaxed max-w-md">
            Sizning sodiq do&apos;stlaringiz uchun professional g&apos;amxo&apos;rlik va zamonaviy tibbiy yordam.
            O&apos;zbekistonning eng yaxshi klinikalari bilan bir joyda bog&apos;laning.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
            <IconVerifiedUser className="w-6 h-6 text-[#89f5e7] mb-2" />
            <h4 className="font-bold text-sm mb-1">Ishonch</h4>
            <p className="text-xs opacity-70">Sertifikatlangan mutaxassislar</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
            <IconSchedule className="w-6 h-6 text-[#89f5e7] mb-2" />
            <h4 className="font-bold text-sm mb-1">24/7</h4>
            <p className="text-xs opacity-70">Tezkor tibbiy xizmat</p>
          </div>
        </div>

        <div className="relative z-10 text-xs opacity-60">
          © 2024 VetClinic UZ. Barcha huquqlar himoyalangan.
        </div>
      </aside>

      {/* ── O'ng panel ─────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center bg-[#f5faf8] p-6 md:p-12">
        <div className="w-full max-w-md bg-white p-8 rounded-xl border border-[#bcc9c6] shadow-sm">
          <div className="mb-7">
            <h1 className="text-4xl font-extrabold text-[#171d1c] mb-2 leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ro&apos;yxatdan o&apos;ting
            </h1>
            <p className="text-sm text-[#3d4947]">Yangi hisob yarating va xizmatlarimizdan foydalaning</p>
          </div>

          {error && (
            <div role="alert" className="mb-5 flex items-center gap-2 rounded-lg bg-[#ffdad6] px-4 py-3 text-sm text-[#ba1a1a]">
              <IconError className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Ism */}
            <div>
              <label htmlFor="rf-name" className="block text-sm font-bold text-[#171d1c] mb-1.5">
                To&apos;liq ismingiz
              </label>
              <input id="rf-name" name="name" type="text" autoComplete="name"
                value={values.name} onChange={handleChange} disabled={isLoading}
                placeholder="Ism familiya"
                className={inputCls(!!fieldErrors.name)} />
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-[#ba1a1a] flex items-center gap-1">
                  <IconError className="w-3.5 h-3.5" />{fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="rf-email" className="block text-sm font-bold text-[#171d1c] mb-1.5">
                Email manzilingiz
              </label>
              <input id="rf-email" name="email" type="email" autoComplete="email"
                value={values.email} onChange={handleChange} disabled={isLoading}
                placeholder="misol@pochta.uz"
                className={inputCls(!!fieldErrors.email)} />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-[#ba1a1a] flex items-center gap-1">
                  <IconError className="w-3.5 h-3.5" />{fieldErrors.email}
                </p>
              )}
            </div>

            {/* Parol */}
            <div>
              <label htmlFor="rf-password" className="block text-sm font-bold text-[#171d1c] mb-1.5">
                Parol
              </label>
              <div className="relative">
                <input id="rf-password" name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={values.password} onChange={handleChange} disabled={isLoading}
                  placeholder="••••••••"
                  className={inputCls(!!fieldErrors.password) + " pr-12"} />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6d7a77] hover:text-[#171d1c]"
                  aria-label={showPassword ? "Yashirish" : "Ko'rsatish"}>
                  {showPassword
                    ? <IconVisibilityOff className="w-5 h-5" />
                    : <IconVisibility className="w-5 h-5" />}
                </button>
              </div>
              {values.password && (
                <div className="mt-2">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map(seg => (
                      <div key={seg}
                        className={`h-1 flex-1 rounded-full transition-colors ${seg <= strength.level ? "bg-[#00685f]" : "bg-[#dee4e1]"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-[#3d4947] mt-1">Parol kuchi: {strength.label}</p>
                </div>
              )}
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-[#ba1a1a] flex items-center gap-1">
                  <IconError className="w-3.5 h-3.5" />{fieldErrors.password}
                </p>
              )}
            </div>

            {/* Tasdiqlash */}
            <div>
              <label htmlFor="rf-confirm" className="block text-sm font-bold text-[#171d1c] mb-1.5">
                Parolni tasdiqlang
              </label>
              <div className="relative">
                <input id="rf-confirm" name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={values.confirmPassword} onChange={handleChange} disabled={isLoading}
                  placeholder="••••••••"
                  className={inputCls(!!fieldErrors.confirmPassword) + " pr-12"} />
                <button type="button" onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6d7a77] hover:text-[#171d1c]"
                  aria-label={showConfirm ? "Yashirish" : "Ko'rsatish"}>
                  {showConfirm
                    ? <IconVisibilityOff className="w-5 h-5" />
                    : <IconVisibility className="w-5 h-5" />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-xs text-[#ba1a1a] flex items-center gap-1">
                  <IconError className="w-3.5 h-3.5" />{fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 py-1">
              <input type="checkbox" id="rf-terms"
                className="mt-0.5 w-4 h-4 rounded border-[#bcc9c6] text-[#00685f] focus:ring-[#00685f]" />
              <label htmlFor="rf-terms" className="text-xs text-[#3d4947]">
                Men{" "}
                <Link href="/terms" className="text-[#00685f] font-semibold hover:underline">
                  Foydalanish shartlari
                </Link>
                ga roziman
              </label>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full bg-[#fd7369] text-white py-3.5 rounded-lg text-sm font-bold
                hover:bg-[#a93530] active:scale-[0.98] transition-all shadow-md
                disabled:opacity-60 flex items-center justify-center gap-2">
              {isLoading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {isLoading ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#bcc9c6] text-center">
            <p className="text-sm text-[#3d4947]">
              Sizda hisob bormi?{" "}
              <Link href="/login" className="text-[#00685f] font-bold hover:underline">
                Tizimga kiring
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
