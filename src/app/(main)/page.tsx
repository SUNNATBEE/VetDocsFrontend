import Link from "next/link";
import { clinicsApi } from "@/src/features/clinics/api/clinics.api";
import { EmptyState } from "@/src/components/shared/EmptyState";
import type { Clinic } from "@/src/features/clinics/types";

// ===================== CLINIC CARD =====================
function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <Link
      href={`/clinics/${clinic.id}`}
      className="group min-w-[300px] md:min-w-[340px] bg-white rounded-xl border border-[var(--outline-variant)] shadow-sm hover:shadow-md transition-all cursor-pointer flex-shrink-0"
    >
      <div className="h-48 overflow-hidden rounded-t-xl relative bg-[var(--primary-container)] flex items-center justify-center">
        <span className="text-white text-4xl opacity-30">🏥</span>
        {clinic.rating > 0 && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="text-[#facc15]">★</span>
            <span className="font-bold text-sm text-[var(--on-surface)]">{clinic.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold mb-1 group-hover:text-[var(--primary)] transition-colors line-clamp-1 font-h3">
          {clinic.name}
        </h3>
        <p className="text-[var(--on-surface-variant)] text-sm flex items-center gap-1 mb-4 line-clamp-1">
          📍 {clinic.address}
        </p>
        <button className="w-full py-3 border border-[var(--primary)] text-[var(--primary)] font-bold rounded-lg group-hover:bg-[var(--primary)] group-hover:text-white transition-all text-sm">
          Batafsil
        </button>
      </div>
    </Link>
  );
}

// ===================== PAGE =====================
export default async function HomePage() {
  let clinics: Clinic[] = [];
  try {
    clinics = await clinicsApi.getNearby({ lat: 41.2995, lng: 69.2401, radiusKm: 50 });
    clinics = clinics.slice(0, 6);
  } catch (err) {
    console.error("Home clinics fetch error:", err);
  }

  return (
    <div className="bg-[var(--background)] text-[var(--on-surface)]">
      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-background to-[var(--secondary)]/5 -z-10"></div>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center text-on-surface">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-h1 leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
            Uy hayvoningiz uchun <span className="text-[var(--primary)]">ishonchli shifokor</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--on-surface-variant)] mb-12 max-w-2xl mx-auto font-body-lg">
            O&apos;zbekiston bo&apos;ylab eng yaxshi veterinariya klinikalarini toping va bir zumda qabulga yoziling.
          </p>

          <div className="bg-white p-2 md:p-3 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto border border-[var(--outline-variant)]">
            <div className="flex-1 flex items-center px-4 gap-3 bg-[var(--surface-container-low)] rounded-xl">
              <span className="text-[var(--primary)]">📍</span>
              <input 
                className="bg-transparent border-none focus:ring-0 w-full py-4 text-[var(--on-surface)] outline-none font-body-md" 
                placeholder="Shahar yoki xizmat nomi..." 
                type="text"
              />
            </div>
            <button className="bg-[var(--primary)] text-[var(--on-primary)] px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
              🔍 Qidirish
            </button>
          </div>
        </div>
      </section>

      {/* ───── MASHHUR KLINIKALAR ───── */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 font-h2">Mashhur klinikalar</h2>
            <p className="text-[var(--on-surface-variant)]">Mijozlar tomonidan eng yuqori baholangan shifo maskanlari</p>
          </div>
          <Link href="/clinics" className="text-[var(--primary)] font-bold flex items-center gap-1 hover:gap-2 transition-all">
            Hammasi →
          </Link>
        </div>

        {clinics.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto hide-scrollbar px-4 md:px-8 pb-6">
            {clinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        ) : (
          <div className="px-4 md:px-8">
            <EmptyState 
              title="Klinikalar topilmadi"
              description="Hozirda sizning hududingizda faol klinikalar mavjud emas."
            />
          </div>
        )}
      </section>

      {/* ───── QANDAY ISHLAYDI ───── */}
      <section className="py-20 bg-[var(--surface-container)]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-16 font-h2">Qanday ishlaydi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {[
              { title: "Qidir", desc: "Shahar yoki xizmatni tanlang", icon: "🔍" },
              { title: "Tanla", desc: "Reytinglarga qarab tanlang", icon: "📋" },
              { title: "Bog'lan", desc: "Bir zumda band qiling", icon: "📅" },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-3xl mb-6 shadow-lg">
                  {step.icon}
                </div>
                <h4 className="text-lg font-bold mb-2 font-h3">{step.title}</h4>
                <p className="text-[var(--on-surface-variant)] max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
