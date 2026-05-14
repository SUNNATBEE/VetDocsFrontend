"use client";

import React, { useEffect } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "primary";
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Tasdiqlash",
  cancelLabel = "Bekor qilish",
  onConfirm,
  onCancel,
  variant = "danger",
}: ConfirmDialogProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onCancel}
        aria-hidden="true"
      />
      
      {/* Container */}
      <div 
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        className="relative w-full max-w-md overflow-hidden bg-[var(--surface-container-highest)] border border-[var(--outline-variant)] rounded-3xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
         {/* Close button for accessibility */}
         <button 
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--surface-container-high)] text-[var(--outline)] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="p-8">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl ${
              variant === "danger" 
                ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" 
                : "bg-[var(--primary-container)] text-[var(--on-primary-container)]"
            }`}>
              {variant === "danger" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              ) : (
                <div className="material-symbols-outlined">help</div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 id="dialog-title" className="text-xl font-bold text-[var(--on-surface)] leading-tight">
                {title}
              </h2>
              {description && (
                <p id="dialog-description" className="mt-3 text-[var(--on-surface-variant)] leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 rounded-xl border border-[var(--outline-variant)] font-semibold text-[var(--on-surface)] hover:bg-[var(--surface-container-high)] active:scale-[0.98] transition-all"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-6 py-3 rounded-xl font-bold text-white shadow-lg active:scale-[0.98] transition-all ${
                variant === "danger"
                  ? "bg-red-600 hover:bg-red-700 shadow-red-500/20"
                  : "bg-[var(--primary)] hover:opacity-90 shadow-[var(--primary)]/20"
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


