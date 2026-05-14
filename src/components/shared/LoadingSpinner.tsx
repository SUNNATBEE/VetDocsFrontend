"use client";

import React from "react";

type SpinnerSize = "sm" | "md" | "lg";

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "w-5 h-5 border-2",
  md: "w-10 h-10 border-[3px]",
  lg: "w-16 h-16 border-4",
};

/**
 * LoadingSpinner component for visual feedback during asynchronous operations.
 * Uses the primary design color for the spinning arc.
 */
export default function LoadingSpinner({ 
  size = "md", 
  className = "" 
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div
        role="status"
        aria-label="Yuklanmoqda..."
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          border-[var(--outline-variant)]/30 
          border-t-[var(--primary)] 
          animate-spin
        `}
      />
    </div>
  );
}

