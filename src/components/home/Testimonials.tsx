export function Testimonials() {
  const testimonials = [
    { name: "Anvar Karimov", text: "Klinika tanlashda sharhlar juda yordam berdi. Mushugimizni o'z vaqtida davolashga muvaffaq bo'ldik. Raxmat!", stars: 5 },
    { name: "Madina Aliyeva", text: "Samarqandda eng yaxshi vet-doktorni shu platforma orqali topdik. Juda qulay ekan!", stars: 5 },
    { name: "Dilshod Bekmirzayev", text: "Onlayn band qilish funksiyasi vaqtni juda tejaydi. Navbat kutishga hojat qolmadi.", stars: 5 },
  ];

  return (
    <section className="py-20 bg-[var(--primary)] text-[var(--on-primary)] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-16" style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>
          Pet egalari biz haqimizda
        </h2>
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8">
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[400px] bg-white text-[var(--on-surface)] p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--primary)]/10 flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <h5 className="font-bold">{t.name}</h5>
                  <div className="flex text-[#facc15]">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="italic text-[var(--on-surface-variant)] text-sm md:text-base leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
