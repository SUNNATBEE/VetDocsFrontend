import Link from "next/link";

export function CitiesGrid() {
  const cities = [
    { name: "Toshkent", count: 84, icon: "🏙️" },
    { name: "Samarqand", count: 32, icon: "🕌" },
    { name: "Buxoro", count: 18, icon: "🏛️" },
    { name: "Farg'ona", count: 22, icon: "🌿" },
  ];

  return (
    <section className="py-20 bg-[var(--surface-container)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--on-surface)] mb-4" style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>
            Shaharlar bo&apos;yicha
          </h2>
          <p className="text-[var(--on-surface-variant)]">Sizga eng yaqin hududdan mutaxassis toping</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={`/clinics?city=${city.name}`}
              className="bg-white p-6 rounded-2xl border border-[var(--outline-variant)] hover:border-[var(--primary)] transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors text-2xl">
                {city.icon}
              </div>
              <h4 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>{city.name}</h4>
              <p className="text-[var(--on-surface-variant)] text-sm">{city.count} ta klinika</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
