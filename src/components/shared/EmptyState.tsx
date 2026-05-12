// Data bo'lmasa xafa bo'lmasin deb, tushunarli xabar chiqaramiz.
"use client";

import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title = "Ma'lumot topilmadi",
  description = "Afsuski, hozircha bu bo'limda hech qanday ma'lumot yo'q.",
  icon = "📭",
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-[var(--on-surface)] mb-2">{title}</h3>
      <p className="text-[var(--on-surface-variant)] max-w-sm mb-8 leading-relaxed">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="bg-[var(--primary)] text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
