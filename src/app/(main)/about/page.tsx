export default function AboutPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-20 bg-[var(--background)]">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--on-surface)] font-h1">
          Biz haqimizda
        </h1>
        <p className="text-lg md:text-xl text-[var(--on-surface-variant)] leading-relaxed mb-12 font-body-lg">
          VetClinic UZ — O&apos;zbekistondagi eng yirik veterinariya klinikalar platformasi. 
          Bizning maqsadimiz — uy hayvonlari egalariga sifatli va ishonchli tibbiy yordamni 
          tezkor topishda ko&apos;maklashishdir.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Sifat", icon: "⭐", desc: "Faqat tekshirilgan klinikalar" },
            { title: "Tezkorlik", icon: "⚡", desc: "Bir zumda band qilish" },
            { title: "Ishonch", icon: "🤝", desc: "Minglab haqiqiy sharhlar" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-[var(--outline-variant)] shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-bold mb-2 font-h3">{item.title}</h3>
              <p className="text-sm text-[var(--on-surface-variant)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
