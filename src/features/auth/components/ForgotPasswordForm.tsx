"use client";

import { useState } from "react";

/**
 * ForgotPasswordForm — hozircha UI tayyor, backend endpoint
 * qo'shilganda authApi ga ulanadi.
 */
export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError("Email kiritilishi shart");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Email noto'g'ri formatda");
      return;
    }

    // TODO: authApi.forgotPassword(email) — backend endpoint tayyor bo'lganda ulang
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded bg-green-100 p-4 text-sm text-green-800">
        Agar bu email ro&apos;yxatdan o&apos;tgan bo&apos;lsa, parolni tiklash
        havolasi yuborildi.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <h1 className="text-2xl font-bold">Parolni tiklash</h1>

      <div className="flex flex-col gap-1">
        <label htmlFor="forgot-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="forgot-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(null);
          }}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? "forgot-email-error" : undefined}
          className="rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="email@example.com"
        />
        {emailError && (
          <span id="forgot-email-error" className="text-xs text-red-600">
            {emailError}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Havolani yuborish
      </button>

      <a href="/login" className="text-center text-sm text-blue-600 hover:underline">
        Kirishga qaytish
      </a>
    </form>
  );
}
