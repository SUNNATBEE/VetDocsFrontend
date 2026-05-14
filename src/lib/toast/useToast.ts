"use client";

import { useToastStore } from "./toast.store";

/**
 * Global hook to display toast notifications.
 * Usage:
 *   const { success, error, info } = useToast();
 *   success("Action completed!");
 */
export function useToast() {
  const { addToast } = useToastStore();

  return {
    success: (message: string) => addToast(message, "success"),
    error: (message: string) => addToast(message, "error"),
    info: (message: string) => addToast(message, "info"),
  };
}