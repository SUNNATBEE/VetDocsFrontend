export function StatsBar() {
  const stats = [
    { value: "200+", label: "klinika" },
    { value: "12", label: "shahar" },
    { value: "5,000+", label: "sharh" },
  ];

  return (
    <section className="border-y border-[var(--outline-variant)] bg-[var(--surface)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-wrap justify-around gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold text-[var(--primary)]" style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>
                  {stat.value}
                </span>
                <span className="text-[var(--on-surface-variant)] text-sm">{stat.label}</span>
              </div>
              {i < stats.length - 1 && (
                <div className="h-12 w-px bg-[var(--outline-variant)] hidden md:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
