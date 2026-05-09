import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Uzbekistan vet platform
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-tight text-slate-950">
            Yaqin veterinariya klinikasini tez toping.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Reyting, manzil, telefon, ish vaqti va xaritadagi joylashuv bir joyda.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/clinics"
              className="rounded-[8px] bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-800"
            >
              Klinikalarni ko&apos;rish
            </Link>
            <Link
              href="/map"
              className="rounded-[8px] border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-emerald-300"
            >
              Xaritani ochish
            </Link>
          </div>
        </div>

        <div className="rounded-[8px] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200">
          <div className="rounded-[8px] bg-slate-950 p-6 text-white">
            <div className="grid grid-cols-2 gap-3">
              {["24/7", "Rating", "Map", "Reviews"].map((item) => (
                <div key={item} className="rounded-[8px] bg-white/10 p-4">
                  <p className="text-2xl font-bold">{item}</p>
                  <p className="mt-2 text-sm text-slate-300">Real backend ma&apos;lumotlari</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[8px] bg-emerald-400 p-5 text-slate-950">
              <p className="font-semibold">Premium clinic finder</p>
              <p className="mt-2 text-sm">
                GET /clinics/nearby va GET /clinics/:id endpointlari bilan ishlaydi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
