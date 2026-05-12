import Link from "next/link";

export function HeroSection() {
  return (
    <header className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-32">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-[var(--background)] to-[var(--secondary)]/5 -z-10"></div>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-[48px] md:leading-[1.1] font-bold mb-6 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>
          Uy hayvoningiz uchun <span className="text-[var(--primary)]">ishonchli shifokor</span>
        </h1>
        <p className="text-[var(--on-surface-variant)] text-lg mb-12 max-w-2xl mx-auto">
          O&apos;zbekiston bo&apos;ylab eng yaxshi veterinariya klinikalarini toping va bir zumda qabulga yoziling.
        </p>
        
        <div className="bg-white p-2 md:p-3 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto border border-[var(--outline-variant)]">
          <div className="flex-1 flex items-center px-4 gap-3 bg-[var(--surface-container-low)] rounded-xl">
            <span className="text-[var(--primary)]">📍</span>
            <input 
              className="bg-transparent border-none focus:ring-0 w-full py-4 text-[var(--on-surface)] outline-none" 
              placeholder="Shahar yoki xizmat nomi..." 
              type="text"
            />
          </div>
          <button className="bg-[var(--primary)] text-[var(--on-primary)] px-8 py-4 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
            <span>🔍</span>
            Qidirish
          </button>
        </div>
        
        <div className="mt-8">
          <Link href="/map" className="flex items-center gap-2 mx-auto text-[var(--secondary)] font-semibold hover:gap-3 transition-all w-fit">
            <span>🗺️</span>
            Xaritada ko&apos;rish
          </Link>
        </div>
      </div>
    </header>
  );
}
