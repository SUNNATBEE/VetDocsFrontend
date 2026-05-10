export function HowItWorks() {
  const steps = [
    { title: "Qidir", desc: "Shahar yoki kerakli xizmat turini tanlang", icon: "🔍" },
    { title: "Tanla", desc: "Reyting va sharhlarga qarab eng yaxshisini tanlang", icon: "📋" },
    { title: "Bog'lan", desc: "Onlayn band qiling va qabulga boring", icon: "📅" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--on-surface)] mb-16" style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>
          Qanday ishlaydi
        </h2>
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 relative">
          <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-[var(--outline-variant)] -z-10"></div>
          {steps.map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="w-20 h-20 bg-[var(--primary)] text-[var(--on-primary)] rounded-full flex items-center justify-center text-3xl mb-6 shadow-lg">
                {step.icon}
              </div>
              <h4 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>{step.title}</h4>
              <p className="text-[var(--on-surface-variant)] max-w-[200px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
