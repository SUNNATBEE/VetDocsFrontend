// Header - bu saytning bosh menyusi.
// Har sahifada bir xil ko'rinadi.
"use client";

import Link from "next/link";
import { useState } from "react";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/clinics",  label: "Klinikalar"   },
  { href: "/services", label: "Xizmatlar"    },
  { href: "/map",      label: "Shaharlar"    },
  { href: "/about",    label: "Yordam"       },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="bg-[var(--surface)]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[var(--outline-variant)] shadow-sm">
        <div className="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-[1280px] mx-auto">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold text-[var(--primary)] tracking-tight hover:opacity-80 transition-all font-h3">
            VetClinic <span className="text-[var(--secondary-container)]">UZ</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 font-body-md">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-[var(--primary)] font-semibold hover:opacity-80 transition-all text-sm">
              Kirish
            </button>
            <Link 
              href="/clinics" 
              className="bg-[var(--primary)] text-[var(--on-primary)] px-5 py-2.5 rounded-lg font-bold hover:opacity-90 active:scale-95 transition-all text-sm shadow-sm"
            >
              Band qilish
            </Link>

            {/* Hamburger */}
            <button 
              className="md:hidden flex flex-col gap-1.5 p-1" 
              onClick={() => setMobileOpen(true)}
            >
              <span className="block w-6 h-0.5 bg-[var(--on-surface)] rounded-full transition-all" />
              <span className="block w-4 h-0.5 bg-[var(--on-surface)] rounded-full transition-all ml-auto" />
              <span className="block w-6 h-0.5 bg-[var(--on-surface)] rounded-full transition-all" />
            </button>
          </div>
        </div>
      </nav>

      <MobileNav 
        links={NAV_LINKS} 
        isOpen={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
      />
    </>
  );
}
