"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogin } from "@/src/features/auth/hooks/useLogin";
import {
  validateLogin,
  type LoginFormValues,
  type FormErrors,
} from "@/src/features/auth/schemas/auth.schema";
import {
  IconArrowBack, IconMail, IconLock,
  IconVisibility, IconVisibilityOff,
  IconSend, IconStar, IconError,
} from "@/src/features/auth/components/icons";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useLogin();

  const [values, setValues] = useState<LoginFormValues>({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<FormErrors<LoginFormValues>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
    setFieldErrors((p) => ({ ...p, [name]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateLogin(values);
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }
    const ok = await login(values);
    if (ok) router.push("/");
  }

  return (
    <div className="flex min-h-screen">
      {/* ── Chap panel ─────────────────────────────────────────── */}
      <aside className="hidden md:flex w-[420px] shrink-0 vc-gradient flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <span className="text-lg font-bold tracking-tight">VetClinic UZ</span>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Vet illustration — Google hosted image */}
          <div className="w-64 h-64 rounded-2xl overflow-hidden mb-8 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi0Nhw-c3gQG1XxvYK972IwCew6Gr3J43J-sBi7AYFuHAkGXMZY-UWzALPzKRAxv2T1bc9tGTh-CHyAICXmDDDWdn7FidM9Pz1ytkfHcqPYDnHB-aw1ohCAHWwA78g8mFF13MDU7GDkACKUjX4Sz8qPxZcok3vnT_WAfractzZVSaShxGn_bogaygZwC5vtTI4T0m1oeyJm-igcxvHYtNYrfozwqJZJQvMA3JLnUWUHWGzLjoYUAh_LKb29VhkK8TQHrbnb9ay1R8"
              alt="Veterinariya mutaxassisi"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-2xl font-bold italic mb-3 leading-snug">
            &ldquo;Eng yaxshi veterinariya platformasi&rdquo;
          </p>
          <p className="text-sm opacity-80 mb-4">— Aziza, Toshkent</p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <IconStar key={i} className="w-5 h-5 text-[#ffdbce]" />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs opacity-60">
          © 2024 VetClinic UZ. Barcha huquqlar himoyalangan.
        </div>
      </aside>

      {/* ── O'ng panel ─────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center bg-[#f5faf8] p-6 md:p-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#3d4947] hover:text-[#00685f] transition-colors mb-10"
          >
            <IconArrowBack className="w-4 h-4" />
            Bosh sahifaga qaytish
          </Link>

          <h1 className="text-4xl font-extrabold text-[#171d1c] mb-8 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Hisobingizga kiring
          </h1>

          {/* Ijtimoiy login */}
          <div className="grid grid-cols-2 gap-3 mb-7">
            <button type="button"
              onClick={() => {
                alert("Google orqali kirish tez orada qo'shiladi. Hozircha email bilan kiring.");
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-[#bcc9c6] rounded-lg bg-white hover:bg-[#eaefed] transition-all active:scale-95 text-sm font-semibold">
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button type="button"
              onClick={() => {
                alert("Telegram orqali kirish tez orada qo'shiladi.");
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-[#bcc9c6] rounded-lg bg-white hover:bg-[#eaefed] transition-all active:scale-95 text-sm font-semibold">
              <IconSend className="w-5 h-5 text-[#00685f]" />
              Telegram
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center mb-7">
            <div className="flex-grow border-t border-[#bcc9c6]" />
            <span className="mx-4 text-xs text-[#3d4947]">yoki email orqali</span>
            <div className="flex-grow border-t border-[#bcc9c6]" />
          </div>

          {/* Server xatosi */}
          {error && (
            <div role="alert" className="mb-5 flex items-center gap-2 rounded-lg bg-[#ffdad6] px-4 py-3 text-sm text-[#ba1a1a]">
              <IconError className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="lf-email" className="block text-sm font-bold text-[#171d1c] mb-1.5">
                Email manzilingiz
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7a77] group-focus-within:text-[#00685f] pointer-events-none">
                  <IconMail className="w-5 h-5" />
                </span>
                <input
                  id="lf-email" name="email" type="email" autoComplete="email"
                  value={values.email} onChange={handleChange} disabled={isLoading}
                  placeholder="misol@pochta.uz"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border bg-white outline-none transition-all text-sm
                    focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] disabled:opacity-50
                    ${fieldErrors.email ? "border-[#ba1a1a]" : "border-[#bcc9c6]"}`}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-[#ba1a1a] flex items-center gap-1">
                  <IconError className="w-3.5 h-3.5" />{fieldErrors.email}
                </p>
              )}
            </div>

            {/* Parol */}
            <div>
              <label htmlFor="lf-password" className="block text-sm font-bold text-[#171d1c] mb-1.5">
                Parol
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7a77] group-focus-within:text-[#00685f] pointer-events-none">
                  <IconLock className="w-5 h-5" />
                </span>
                <input
                  id="lf-password" name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={values.password} onChange={handleChange} disabled={isLoading}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3 rounded-lg border bg-white outline-none transition-all text-sm
                    focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f] disabled:opacity-50
                    ${fieldErrors.password ? "border-[#ba1a1a]" : "border-[#bcc9c6]"}`}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6d7a77] hover:text-[#171d1c]"
                  aria-label={showPassword ? "Yashirish" : "Ko'rsatish"}>
                  {showPassword
                    ? <IconVisibilityOff className="w-5 h-5" />
                    : <IconVisibility className="w-5 h-5" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-[#ba1a1a] flex items-center gap-1">
                  <IconError className="w-3.5 h-3.5" />{fieldErrors.password}
                </p>
              )}
            </div>

            {/* Eslab qol */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-[#bcc9c6] text-[#00685f] focus:ring-[#00685f]" />
                <span className="text-sm text-[#3d4947]">Meni eslab qol</span>
              </label>
              <Link href="/forgot-password" className="text-sm font-semibold text-[#b05e3d] hover:underline">
                Parolni unutdingizmi?
              </Link>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full bg-[#b05e3d] text-white py-3.5 rounded-lg text-sm font-bold
                hover:bg-[#924628] active:scale-[0.98] transition-all shadow-md
                disabled:opacity-60 flex items-center justify-center gap-2">
              {isLoading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {isLoading ? "Kirish..." : "Kirish"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#3d4947]">
            Hisobingiz yo&apos;qmi?{" "}
            <Link href="/register" className="text-[#00685f] font-bold hover:underline">
              Ro&apos;yxatdan o&apos;ting
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
