# Klinikalar ro'yxati — Desktop

> **Mas'ul:** Doniyor (Clinics & Map Engineer)
> **Sprint:** 2-3 hafta
> **Prioritet:** ⭐⭐⭐ (saytning asosiy listing sahifasi)

---

## 1. Sahifa haqida

Foydalanuvchi shahar va xizmat bo'yicha klinikalarni qidiradigan/filtrlaydigan asosiy ro'yxat sahifasi. URL: `/clinics?city=toshkent&open=true&rating=4`.

## 2. Anatomiya (`screen.png`'dan)

- Header (sticky)
- Breadcrumb: "Bosh sahifa › Klinikalar"
- H1: "Toshkent shahridagi klinikalar"
- Subtitle: "124 ta klinika topildi"
- **2 ustunli layout:**
  - **Chap (sidebar 280px sticky):**
    - "Filtrlar" sarlavha + "Tozalash" link
    - **Shahar** — multi-select checkbox (Toshkent ✓, Samarqand, Buxoro, Andijon, Namangan)
    - **Reyting** — yulduzlar bo'yicha (3+, 4+, 4.5+, 5)
    - **Holat** — toggle "Hozir ochiq"
    - **Xizmatlar** — chip cloud (Vaksinalash ✓, Xirurgiya ✓, Stomatologiya, Kosmetik, Laboratoriya)
    - **Masofa** — slider 1-50km
    - Coral "Qo'llash" button (sticky)
  - **O'ng (main):**
    - Top toolbar: aktiv filter chips (removable) + sort dropdown ("Reyting bo'yicha") + view toggle (grid/list/map)
    - 3-ustun grid:
      - ClinicCard: rasm, "Hozir ochiq" green pill, heart-favorite, klinika nomi, manzil, "★ 4.9 (2k+ sharh)", "1.2km", service tags (Vaksina, Terapiya), "Batafsil →"
    - Pagination: "‹ 1 2 3 ... 12 ›"

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(main)/clinics/page.tsx` | Server Component (SSR + searchParams) |
| `src/features/clinics/types.ts` | `Clinic`, `ClinicFilters` types |
| `src/features/clinics/api/clinics.api.ts` | `listClinics(filters)`, `getClinic(id)` |
| `src/features/clinics/hooks/useClinics.ts` | TanStack Query hook |
| `src/features/clinics/components/ClinicList.tsx` | Grid + pagination |
| `src/features/clinics/components/ClinicCard.tsx` | Bitta card (reusable) |
| `src/features/clinics/components/ClinicFilters.tsx` | Sidebar filter |
| `src/features/clinics/schemas/clinic.schema.ts` | Filter form schema |
| `src/lib/utils/opening-hours.ts` | "Hozir ochiq" mantiq |
| `src/components/shared/Pagination.tsx` | Reusable pagination |

## 4. shadcn

```bash
npx shadcn@latest add card badge button checkbox slider toggle separator pagination
```

## 5. API endpoint

```
GET /api/v1/clinics
Query: ?city=toshkent&services=vaksinalash,xirurgiya&rating=4&openNow=true&distance=10&sort=rating&page=1&limit=12

Response:
{
  success: true,
  data: {
    clinics: Clinic[],
    pagination: { page, total, totalPages }
  }
}
```

## 6. Clinic type

```ts
type Clinic = {
  id: string
  name: string
  slug: string
  description: string
  city: string
  district: string
  address: string
  latitude: number
  longitude: number
  phone: string
  rating: number          // 0-5
  reviewCount: number
  services: string[]
  images: string[]
  openingHours: OpeningHours
  status: 'ACTIVE' | 'PENDING' | 'BLOCKED'
}
```

## 7. URL sync (qo'sh muhim!)

Filterlar URL search params'ga sinkronlanadi (`useSearchParams` + `router.push`):
- `?city=toshkent&services=vaksinalash,xirurgiya&rating=4&openNow=true&page=2`
- Refresh qilganda filterlar saqlanadi
- Brauzer back tugmasi to'g'ri ishlaydi
- Linkni sharing qilish mumkin

## 8. States

- ✅ **Default:** 12 ta ClinicCard yuklangan
- ✅ **Loading:** Skeleton (`klinikalar_yuklanmoqda_skeleton` design'idan foydalan)
- ✅ **Empty (filter natijasi yo'q):** EmptyState — "Hech narsa topilmadi", "Filtrlarni o'zgartiring", "Tozalash" tugma
- ✅ **Error:** "Klinikalarni yuklashda xato. Qayta urinish"

## 9. Done checklist

- [ ] URL filterlar bilan sinkron
- [ ] Sort dropdown ishlaydi (rating, distance, newest)
- [ ] "Hozir ochiq" toggle real vaqt mantiqi (`getDay()`, `getHours()`)
- [ ] Pagination URL'ga `?page=N`
- [ ] Heart-favorite localStorage'da saqlanadi (Phase 1) yoki backend (Phase 2)
- [ ] ClinicCard hover'da subtle lift shadow
- [ ] Empty state komponenti integratsiya qilingan
- [ ] SSR ishlaydi (SEO uchun)
- [ ] `screen.png` ga vizual mos
