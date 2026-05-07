# Bosh sahifa (Home Page)

> **Mas'ul:** Yahyo (UI/UX Engineer)
> **Sprint:** 2-hafta
> **Prioritet:** ⭐⭐⭐ (yuqori — bu sayt yuzi)

---

## 1. Sahifa haqida

VetClinic UZ saytining marketing landing page'i. Mehmon (login qilmagan) foydalanuvchi birinchi ko'radigan sahifa. Maqsad — ishonch hosil qilish va qidiruv yoki ro'yxatdan o'tishga undash.

## 2. Sahifa qismlari

1. **Sticky Header** — Logo, navigatsiya (Klinikalar/Xizmatlar/Shaharlar/Yordam), Kirish + Band qilish CTA
2. **Hero** — sarlavha "Uy hayvoningiz uchun **ishonchli shifokor**", search bar, "Xaritada ko'rish" linki, gradient fon
3. **Stats bar** — 200+ klinika, 12 shahar, 5,000+ sharh
4. **Mashhur klinikalar** — gorizontal scroll, ClinicCard'lar
5. **Shaharlar bo'yicha** — 4 ta city tile (Toshkent, Samarqand, Buxoro, Farg'ona)
6. **Qanday ishlaydi** — 3 qadam (Qidir → Tanla → Bog'lan)
7. **Pet egalari biz haqimizda** — 3 ta testimonial card
8. **Footer** — Shaharlar, Kompaniya, Bog'lanish

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(main)/page.tsx` | Bu sahifaning o'zi (Server Component) |
| `src/app/(main)/layout.tsx` | Header + Footer wrapper |
| `src/components/layout/Header.tsx` | Logo + nav + auth tugmalar |
| `src/components/layout/Footer.tsx` | 4 ustunli footer |
| `src/components/layout/MobileNav.tsx` | Hamburger drawer |
| `src/components/home/HeroSection.tsx` | Hero blok |
| `src/components/home/StatsBar.tsx` | 3 ta statistika |
| `src/components/home/PopularClinics.tsx` | Gorizontal scroll |
| `src/components/home/CitiesGrid.tsx` | City tiles |
| `src/components/home/HowItWorks.tsx` | 3 qadam |
| `src/components/home/Testimonials.tsx` | Testimonial carousel |

## 4. shadcn primitivlar

```bash
npx shadcn@latest add button input card avatar separator
```

## 5. API endpointlar

- `GET /api/v1/clinics?limit=6&sort=rating` — Mashhur klinikalar
- `GET /api/v1/clinics/cities` — Shahar statistikasi (yoki `cities.ts` constants'dan)

Server Component'da `fetch` bilan SSR qil. Cache: `revalidate: 3600` (1 soat).

## 6. States

- ✅ **Default:** Hammasi to'liq yuklangan
- ✅ **Loading:** Skeleton variantlar (Yahyo'ning `klinikalar_yuklanmoqda_skeleton` design'idan foydalan)
- ✅ **Error:** Network xato bo'lsa "Qayta urinish" tugmali fallback
- ✅ **No-data:** Mashhur klinikalar yo'q bo'lsa, butun bo'lim ko'rinmasin

## 7. Responsivlik

- **Desktop (1280px):** 3 ustun grid, hero ikki tomonga
- **Tablet (768px):** 2 ustun, hero stack
- **Mobile (375px):** 1 ustun, hamburger menu, sticky bottom nav

## 8. Done checklist

- [ ] TypeScript xato yo'q (`npm run typecheck`)
- [ ] Mobile + tablet + desktop test qilingan
- [ ] Lighthouse Performance ≥85, Accessibility ≥95
- [ ] Hero search bar enter bosganda `/clinics?city=X&q=Y` ga o'tadi
- [ ] Klinika card hover state ishlaydi
- [ ] Footer linklar to'g'ri sahifaga olib boradi
- [ ] Dark mode'da to'g'ri ko'rinadi
- [ ] Server Component (no `'use client'` asosiy faylda)
- [ ] `screen.png` ga vizual mos
