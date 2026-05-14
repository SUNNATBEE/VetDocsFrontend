"use client";

import React from "react";
import type { Toast as ToastType } from "@/src/lib/toast/toast.store";

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div
      role="alert"
      className={`
        flex items-center gap-4 px-5 py-4 rounded-2xl shadow-2xl border
        animate-in slide-in-from-right-10 fade-in duration-300
        ${isSuccess ? "bg-emerald-50 border-emerald-100 text-emerald-900 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300" : ""}
        ${isError ? "bg-red-50 border-red-100 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300" : ""}
        ${!isSuccess && !isError ? "bg-white border-slate-100 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100" : ""}
      `}
    >
      <div className={`p-2 rounded-xl ${
        isSuccess ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-200" :
        isError ? "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-200" :
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200"
      }`}>
        {isSuccess && (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        )}
        {isError && (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg>
        )}
        {!isSuccess && !isError && (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        )}
      </div>

      <p className="text-sm font-semibold flex-1">
        {toast.message}
      </p>

      <button
        onClick={() => onClose(toast.id)}
        className="p-1 rounded-lg opacity-40 hover:opacity-100 transition-all hover:bg-black/5"
        aria-label="Yopish"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  );
}