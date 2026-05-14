"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MobileNavProps {
  links: { href: string; label: string }[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ links, isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <nav className="absolute right-0 top-0 bottom-0 w-72 bg-[var(--surface)] border-l border-[var(--outline-variant)] shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-200">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-bold text-[var(--primary)] font-h3">Menyu</span>
          <button onClick={onClose} className="text-2xl text-[var(--on-surface-variant)]">✕</button>
        </div>
        <ul className="space-y-4 flex-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose} className="text-lg font-medium text-[var(--on-surface)] hover:text-[var(--primary)] block transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="space-y-3 pt-6 border-t border-[var(--outline-variant)]">
          <Link href="/login" onClick={onClose} className="flex justify-center py-3 rounded-xl border border-[var(--primary)] text-[var(--primary)] font-bold text-sm hover:bg-[var(--primary)]/5 transition-colors">
            Kirish
          </Link>
          <Link href="/register" onClick={onClose} className="flex justify-center py-3 rounded-xl bg-[var(--primary)] text-[var(--on-primary)] font-bold text-sm hover:opacity-90 transition-opacity">
            Ro&apos;yxatdan o&apos;tish
          </Link>
        </div>
      </nav>
    </div>
  );
}

