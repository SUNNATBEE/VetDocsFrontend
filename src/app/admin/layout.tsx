"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_NAV = [
  { href: "/admin", icon: "📊", label: "Dashboard" },
  { href: "/admin/clinics", icon: "🏥", label: "Klinikalar" },
  { href: "/admin/doctors", icon: "👨‍⚕️", label: "Shifokorlar" },
  { href: "/admin/appointments", icon: "📅", label: "Uchrashuvlar" },
  { href: "/admin/users", icon: "👥", label: "Foydalanuvchilar" },
  { href: "/admin/settings", icon: "⚙️", label: "Sozlamalar" },
];

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-[#1e293b] text-slate-300 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } hidden md:block`}
      >
        <div className="flex h-16 items-center px-6 border-b border-slate-700/50">
          <Link href="/" className="flex items-center gap-3">
             <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center text-white font-bold">V</div>
             {sidebarOpen && <span className="font-bold text-white tracking-tight">AdminPanel</span>}
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20" 
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-4 text-center">
           <button 
             onClick={() => setSidebarOpen(!sidebarOpen)}
             className="w-full py-2 bg-slate-800/50 rounded-lg text-xs hover:bg-slate-800"
           >
             {sidebarOpen ? "« Menu yopish" : "»"}
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            {ADMIN_NAV.find(n => n.href === pathname)?.label || "Boshqaruv"}
          </h2>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
               <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white text-[10px] flex items-center justify-center font-bold">A</div>
               <span className="text-sm font-semibold text-slate-700">Administrator</span>
             </div>
          </div>
        </header>

        <main className="p-6 md:p-8 animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}

