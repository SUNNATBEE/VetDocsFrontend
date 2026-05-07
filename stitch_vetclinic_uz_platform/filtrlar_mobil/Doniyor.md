# Filtrlar — Mobile (Bottom Sheet)

> **Mas'ul:** Doniyor (Clinics & Map Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐ (mobile UX uchun muhim)

---

## 1. Sahifa haqida

Mobile'da klinikalar sahifasidagi "Filtrlar" tugmasi bosilganda chiqadigan bottom sheet. Foydalanuvchi shahar, holat, masofa, reyting, xizmat bo'yicha filtrlaydi.

## 2. Anatomiya (`screen.png`'dan)

```
Header:
- "× Filtrlar" left
- "TOZALASH" right (coral text)

Body (scrollable):
- "Shahar" sarlavha
  Grid 2x2 ni checkbox card:
  - ☑ Toshkent (selected, teal border)
  - ☐ Samarqand
  - ☐ Buxoro
  - ☐ Andijon

- "Holat" — card with toggle:
  - "Faqat hozirda ochiq klinikalar" + toggle off

- "Masofa" + "15 km gacha" pill (right)
  - Slider: 1km — 50km

- "Reyting" — chip group:
  - 3+ ★ | 4+ ★ (selected, coral border) | 4.5+ ★ | 5 ★

- "Xizmatlar" — chip group:
  - Vaksinalash | Jarrohlik (selected, teal filled) | Uzi
  - Pastda: "🗺 Xaritada ko'rish" link

Footer (sticky):
- Coral full-width "Qo'llash" button
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/features/clinics/components/ClinicFilters.tsx` | Reusable — desktop sidebar + mobile sheet |
| `src/features/clinics/components/MobileFilterSheet.tsx` | Mobile-specific wrapper |
| `src/features/clinics/store/filters.store.ts` | Zustand: filter state (localga saqlash) |
| `src/features/clinics/schemas/clinic.schema.ts` | Filter Zod schema |

## 4. shadcn

```bash
npx shadcn@latest add sheet checkbox slider toggle button
```

## 5. Filter state shape

```ts
type ClinicFilters = {
  cities: string[]           // ['toshkent', 'samarqand']
  openNow: boolean           // true
  distance: number           // 1-50 km
  rating: 3 | 4 | 4.5 | 5    // minimum
  services: string[]         // ['vaksinalash', 'jarrohlik']
}
```

## 6. UX detallar

- **Bottom sheet** swipe-down bilan yopiladi
- **"Tozalash"** bosilsa hamma filterlar reset
- **"Qo'llash"** — sheet yopiladi + URL params yangilanadi + ro'yxat refresh
- Slider drag paytida "X km gacha" pill real-time yangilanadi
- Selected chip: coral border + 1.5px (Vaksinalash chip da ko'rinadi)
- Service chip "selected": teal background + white text

## 7. Done checklist

- [ ] Bottom sheet smooth animation (300ms ease-out)
- [ ] Backdrop click → yopiladi
- [ ] Tozalash → barcha filterlar boshlang'ich holatga
- [ ] Qo'llash → sheet yopiladi + URL yangilanadi (Doniyor'ning useClinics'i fetch qiladi)
- [ ] Filter qiymatlari Zustand'da saqlanadi (sahifa qaytadan ochilganda)
- [ ] Slider qiymati real-time yangilanadi
- [ ] iOS safe-area-inset (bottom button uchun)
- [ ] `screen.png` ga vizual mos
