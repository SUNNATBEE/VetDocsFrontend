import Link from "next/link";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-emerald-700 font-bold text-white">
              V
            </span>
            <span>
              <span className="block text-sm font-bold leading-4">VetDocs</span>
              <span className="block text-xs text-slate-500">Clinic finder</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1 text-sm font-semibold text-slate-600">
            <Link href="/clinics" className="rounded-[8px] px-3 py-2 hover:bg-slate-100">
              Klinikalar
            </Link>
            <Link href="/search" className="rounded-[8px] px-3 py-2 hover:bg-slate-100">
              Qidiruv
            </Link>
            <Link href="/map" className="rounded-[8px] px-3 py-2 hover:bg-slate-100">
              Xarita
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
