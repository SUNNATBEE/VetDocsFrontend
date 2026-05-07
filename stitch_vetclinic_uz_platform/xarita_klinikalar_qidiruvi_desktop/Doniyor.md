# Xarita — Klinikalar qidiruvi (Desktop)

> **Mas'ul:** Doniyor (Clinics & Map Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐⭐ (kompetitiv afzallik — barcha klinikalarni xaritada)

---

## 1. Sahifa haqida

Full-screen Leaflet xarita + chap tomonda klinika ro'yxati. Xarita pinlari klinikalarni belgilaydi. Foydalanuvchi pin ustiga bossa, popup ko'rinadi va "Batafsil ko'rish" tugmasi orqali detail sahifaga o'tadi.

## 2. Anatomiya (`screen.png`'dan)

```
Header (saytning standart)

Search bar (top center over map):
- "Klinika yoki manzil qidiring" + search ikon

Filter chips row:
- "Hozir ochiq" (selected, coral border)
- "4+ reyting"
- "Jarrohlik"
- "Tez yordam"

CHAP SIDEBAR (380px, scrollable):
- "Toshkent" header + dropdown
- "127 klinika topildi" muted
- "Saralash" dropdown right (filter ikon)
- Compact ClinicCard'lar:
  - Mini thumbnail + "Happy Pets Clinic ★ 4.9 0.8 km" + "HOZIR OCHIQ"
  - "Central Vet Markazi ★ 4.7 1.5 km" + "HOZIR OCHIQ"
  - "Shifo Pet Diagnostic ★ 4.5 3.2 km" + "YOPIQ"
  - Selected card: teal left border

XARITA (asosiy):
- Tashkent koordinatalarida markazlangan
- Pinlar: teal yumaloq + paw ikon
- Selected pin: katta coral
- Cluster pinlar: number ("12")

POPUP (pin click):
- Floating card map ustida
- Klinika rasm thumbnail
- "Happy Pets Clinic ★ 4.9"
- "Hozir ochiq · 0.8 km uzoqlikda"
- Coral "Batafsil ko'rish" button

Bottom-right floating buttons:
- "Mening joylashuvim" (crosshair)
- Zoom + / Zoom – (vertical stack)
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(main)/map/page.tsx` | Map sahifa (Client Component — SSR yo'q) |
| `src/features/clinics/components/ClinicMap.tsx` | Asosiy Leaflet map |
| `src/features/clinics/components/MapSidebar.tsx` | Chap klinika ro'yxati |
| `src/features/clinics/components/MapPin.tsx` | Custom pin (teal/coral) |
| `src/features/clinics/components/MapPopup.tsx` | Pin popup card |
| `src/features/clinics/components/MapControls.tsx` | Zoom + geolocation |
| `src/hooks/useGeolocation.ts` | Geolocation hook |

## 4. Dependencies

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

## 5. API endpoint

```
GET /api/v1/clinics/nearby?lat=41.31&lng=69.27&radius=10
Response: { success: true, data: { clinics: Clinic[] } }
```

## 6. Leaflet setup

```tsx
'use client'

import dynamic from 'next/dynamic'

// SSR yo'q — Leaflet window object talab qiladi
const ClinicMap = dynamic(() => import('@/features/clinics/components/ClinicMap'), {
  ssr: false,
  loading: () => <Skeleton className="h-screen w-full" />
})
```

## 7. UX detallar

- **Sidebar ↔ Map sync:** sidebar card hover → pin highlight; pin click → sidebar card scroll-into-view
- **Cluster:** `react-leaflet-markercluster` — bir hududda 10+ klinika bo'lsa cluster
- **Geolocation:** "Mening joylashuvim" → `navigator.geolocation` → map fly-to user
- **URL sync:** `?lat=X&lng=Y&zoom=Z&clinic=ID`

## 8. Performance

- Faqat viewport ichidagi klinikalarni render qilish
- Pin'larda lazy-load images (popup ochilganda)
- Debounce zoom/pan API calls (300ms)

## 9. Done checklist

- [ ] Leaflet to'g'ri yuklanadi (dynamic import, no SSR)
- [ ] Pinlar va cluster ishlaydi
- [ ] Sidebar va map sync (hover/click)
- [ ] Geolocation graceful fallback (foydalanuvchi rad etsa)
- [ ] Popup card "Batafsil ko'rish" → `/clinics/[id]`
- [ ] Filter chips ishlaydi (xarita pinlarini filtrlaydi)
- [ ] 60fps smooth scroll/zoom
- [ ] `screen.png` ga vizual mos
