import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--surface-container)] border-t border-[var(--outline-variant)] mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        <div className="md:col-span-1">
          <Link href="/" className="text-2xl font-bold text-[var(--primary)] mb-6 block font-h3">
            VetClinic <span className="text-[var(--secondary-container)]">UZ</span>
          </Link>
          <p className="text-[var(--on-surface-variant)] leading-relaxed mb-6">
            Sizning uy hayvoningiz uchun g&apos;amxo&apos;rlik - bizning asosiy maqsadimiz.
          </p>
        </div>
        <div>
          <h5 className="text-[var(--primary)] font-bold mb-6 uppercase tracking-wider text-xs">Linklar</h5>
          <ul className="space-y-3 text-[var(--on-surface-variant)] font-medium">
            <li><Link href="/clinics" className="hover:text-[var(--secondary)]">Klinikalar</Link></li>
            <li><Link href="/services" className="hover:text-[var(--secondary)]">Xizmatlar</Link></li>
            <li><Link href="/about" className="hover:text-[var(--secondary)]">Biz haqimizda</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-[var(--primary)] font-bold mb-6 uppercase tracking-wider text-xs">Shaharlar</h5>
          <ul className="space-y-3 text-[var(--on-surface-variant)] font-medium">
            <li>Toshkent</li>
            <li>Samarqand</li>
            <li>Buxoro</li>
          </ul>
        </div>
        <div>
          <h5 className="text-[var(--primary)] font-bold mb-6 uppercase tracking-wider text-xs">Bog&apos;lanish</h5>
          <ul className="space-y-3 text-[var(--on-surface-variant)] font-medium">
            <li>📧 info@vetclinic.uz</li>
            <li>📞 +998 71 123 45 67</li>
            <li>📍 Toshkent sh., Yunusobod</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--outline-variant)] py-8 text-center text-[var(--on-surface-variant)] opacity-80">
        © {new Date().getFullYear()} VetClinic UZ. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
