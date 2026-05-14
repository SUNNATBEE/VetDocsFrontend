"use client";

import React from "react";
import { useToastStore } from "@/src/lib/toast/toast.store";
import Toast from "./Toast";

/**
 * ToastContainer renders all active toast notifications.
 * It should be placed at the root of the application (layout.tsx).
 */
export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      aria-label="Bildirishnomalar"
      className="fixed bottom-0 right-0 z-[110] flex flex-col gap-3 p-6 pointer-events-none w-full max-w-sm"
    >
      <div className="flex flex-col gap-3 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            toast={toast} 
            onClose={removeToast} 
          />
        ))}
      </div>
    </div>
  );
}