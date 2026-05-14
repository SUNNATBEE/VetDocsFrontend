"use client";

import React from "react";

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

/**
 * ErrorMessage component to handle error states gracefully.
 * Displays a descriptive message and an optional retry action.
 */
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center p-8 text-center bg-[var(--error-container)]/10 rounded-2xl border border-[var(--error)]/20 shadow-sm animate-in fade-in zoom-in-95 duration-300 max-w-lg mx-auto"
    >
      <div 
        className="w-16 h-16 mb-4 flex items-center justify-center rounded-2xl bg-[var(--error-container)] text-[var(--error)] shadow-inner"
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      
      <h3 className="text-lg font-bold text-[var(--on-error-container)] mb-2">
        Xato yuz berdi
      </h3>
      
      <p className="text-sm text-[var(--on-surface-variant)] mb-6 opacity-80 leading-relaxed">
        {message || "Noma'lum xatolik yuz berdi. Iltimos, sahifani yangilang yoki birozdan so'ng urinib ko'ring."}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-[var(--error)] text-[var(--on-error)] text-sm font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[var(--error)]/20"
        >
          Qayta urinish
        </button>
      )}
    </div>
  );
}