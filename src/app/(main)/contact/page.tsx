export default function ContactPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-20 bg-[var(--background)]">
      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--on-surface)] font-h1">
            Bog&apos;lanish
          </h1>
          <p className="text-lg text-[var(--on-surface-variant)] leading-relaxed mb-8 font-body-md">
            Savollaringiz bormi? Bizga murojaat qiling, biz sizga yordam berishdan mamnunmiz.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-xl">📞</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">Telefon</p>
                <p className="font-bold">+998 71 123 45 67</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-xl">📧</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">Email</p>
                <p className="font-bold">info@vetclinic.uz</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[var(--outline-variant)] shadow-xl">
          <h3 className="text-xl font-bold mb-6 font-h3">Xabar yuboring</h3>
          <form className="space-y-4">
            <input className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all bg-[var(--surface-container-low)]" placeholder="Ismingiz" />
            <input className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all bg-[var(--surface-container-low)]" placeholder="Email" />
            <textarea className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all bg-[var(--surface-container-low)]" rows={4} placeholder="Xabaringiz" />
            <button className="w-full py-4 bg-[var(--primary)] text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg">
              Yuborish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
