"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  IconArrowBack, 
  IconMail, 
  IconError, 
  IconSend 
} from "./icons";
import { useToast } from "@/src/lib/toast/useToast";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { success, error: showError } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSent(true);
      success("Parolni tiklash havolasi emailingizga yuborildi!");
    } catch (err) {
      showError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel (reuse Suhrob's gradient) */}
      <aside className="hidden md:flex w-[420px] shrink-0 vc-gradient flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <span className="text-lg font-bold tracking-tight">VetClinic UZ</span>
        </div>

        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/30 shadow-xl">
             <IconMail className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Xavfsiz tiklash</h2>
          <p className="text-sm opacity-80 leading-relaxed max-w-xs mx-auto">
            Xavotir olmang! Emailingizni kiriting va biz sizga parolni tiklash bo'yicha ko'rsatmalarni yuboramiz.
          </p>
        </div>

        <div className="relative z-10 text-xs opacity-60">
          © 2024 VetClinic UZ. Xavfsizlik markazi.
        </div>
      </aside>

      {/* Right panel */}
      <main className="flex-1 flex items-center justify-center bg-[#f5faf8] p-6 md:p-12">
        <div className="w-full max-w-md">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-[#3d4947] hover:text-[#00685f] transition-colors mb-10"
          >
            <IconArrowBack className="w-4 h-4" />
            Kirish sahifasiga qaytish
          </Link>

          {!isSent ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-4xl font-extrabold text-[#171d1c] mb-3 leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Parolni unutdingizmi?
              </h1>
              <p className="text-slate-500 mb-8">
                Parolni tiklash havolasini yuborishimiz uchun emailingizni kiriting.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fp-email" className="block text-sm font-bold text-[#171d1c] mb-1.5">
                    Email manzilingiz
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7a77] group-focus-within:text-[#00685f] pointer-events-none">
                      <IconMail className="w-5 h-5" />
                    </span>
                    <input
                      id="fp-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="misol@pochta.uz"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#bcc9c6] bg-white outline-none transition-all text-sm focus:ring-2 focus:ring-[#00685f]/20 focus:border-[#00685f]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-[#00685f] text-white py-4 rounded-xl text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-emerald-700/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <IconSend className="w-4 h-4" />
                  )}
                  {isLoading ? "Yuborilmoqda..." : "Havolani yuborish"}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <IconSend className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Email yuborildi!</h2>
              <p className="text-slate-600 mb-8 max-w-sm mx-auto leading-relaxed">
                Biz <b>{email}</b> manziliga parolni tiklash bo'yicha ko'rsatmalarni yubordik. Iltimos, pochtangizni tekshiring.
              </p>
              <Link
                href="/login"
                className="inline-block px-8 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
              >
                Kirish sahifasiga qaytish
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
