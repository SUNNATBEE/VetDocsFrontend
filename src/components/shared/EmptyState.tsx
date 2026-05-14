"use client";

import React from "react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

/**
 * EmptyState component displays a friendly message when no data is available.
 * Designed to be premium, responsive, and supportive of dark mode.
 */
export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-3xl bg-[var(--surface-container-high)] text-[var(--outline)] shadow-inner">
        {icon || (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="opacity-50"
          >
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        )}
      </div>
      
      <h3 className="text-2xl font-bold tracking-tight text-[var(--on-surface)] mb-3">
        {title}
      </h3>
      
      {description && (
        <p className="text-[var(--on-surface-variant)] text-lg mb-8 max-w-md leading-relaxed">
          {description}
        </p>
      )}
      
      {action && (
        <>
          {action.href ? (
            <Link
              href={action.href}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--primary)] text-[var(--on-primary)] rounded-[8px] font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--primary)] text-[var(--on-primary)] rounded-[8px] font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              {action.label}
            </button>
          )}
        </>
      )}
    </div>
  );
}


