# Klinika ma'lumotlari (Detail) — Desktop

> **Mas'ul:** Doniyor (Clinics & Map Engineer) + **Akbar** (Reviews tab)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐⭐ (saytning ENG MUHIM sahifasi — konversiya bu yerda)

---

## 1. Sahifa haqida

Bitta klinika haqida to'liq ma'lumot: rasmlar, tavsif, xizmatlar, shifokorlar, sharhlar, joylashuv, ish vaqti. URL: `/clinics/[id]` yoki `/clinics/[slug]`.

**SEO muhim:** Server-side render qilinadi (`generateMetadata` bilan og:image, description).

## 2. Anatomiya (`screen.png`'dan)

```
Header (sticky)

Image gallery hero (480px):
- Katta rasm chap (60%)
- 2x2 grid mayda rasmlar o'ng (40%)
- "Barcha rasmlar (12)" overlay button bottom-right

Sticky info bar:
- Klinika nomi: "Vetlife Klinikasi"
- "★ 4.9 (124 sharh) · Hozir ochiq · Toshkent, Yunusobod"
- 3 ta CTA: "Qo'ng'iroq qilish" (coral) | "Yo'l ko'rsatish" | "Sharh yozish"
- Right: Share + Heart (favorite) + Report ikonlar

Two-column body:

CHAP (65%):
- Tabs: "Ma'lumot" | "Xizmatlar" | "Sharhlar" | "Joylashuv"

  Ma'lumot tab:
  - "Klinika haqida" — paragraflar
  - "Bizning shifokorlar":
    - DoctorCard: "Dr. Jasur Alimov, Xirurg, 12 yillik tajriba"

  Xizmatlar tab (gridda):
  - "Umumiy ko'rik — 150,000 so'm"
  - "Vaksina qilish — 85,000 so'm"
  - va h.k.

  Sharhlar tab:
  - Rating overview (4.8 katta + bar chart 5/4/3/2/1)
  - Sort: "Eng foydali", "Yangi", "Eng yuqori"
  - ReviewCard'lar (RatingStars + ism + sana + matn + helpful count)
  - "Sharh yozish" coral CTA

  Joylashuv tab:
  - Embedded Leaflet map + marker
  - Manzil card + "Yo'l ko'rsatish"

O'NG SIDEBAR (35%, sticky):
- Aloqa card:
  - "+998 90 123 45 67" (tap-to-call)
  - Email
  - Telegram link
- Ish vaqti card:
  - "Ish vaqti" + green dot "Ochiq"
  - 7-day jadval (bugun teal highlight)

Pastda:
- "O'xshash klinikalar" — 4 ta ClinicCard horizontal
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(main)/clinics/[id]/page.tsx` | Server Component (SSR) |
| `src/app/(main)/clinics/[id]/loading.tsx` | Skeleton (alohida design) |
| `src/app/(main)/clinics/[id]/not-found.tsx` | 404 |
| `src/features/clinics/components/ClinicDetail.tsx` | Asosiy detail komponenti |
| `src/features/clinics/components/ClinicHero.tsx` | Image gallery hero |
| `src/features/clinics/components/ClinicTabs.tsx` | 4 ta tab |
| `src/features/clinics/components/ImageGallery.tsx` | Lightbox |
| `src/features/clinics/components/OpeningHours.tsx` | 7-day jadval |
| `src/features/clinics/components/DoctorCard.tsx` | Shifokor card |
| `src/features/clinics/components/ServiceList.tsx` | Xizmatlar narxi |
| `src/features/clinics/components/ContactCard.tsx` | Aloqa sidebar |
| `src/features/clinics/components/SimilarClinics.tsx` | Pastdagi 4 card |
| **Akbar yozadi:** | |
| `src/features/reviews/components/ReviewList.tsx` | Sharhlar ro'yxati |
| `src/features/reviews/components/ReviewCard.tsx` | Bitta sharh |
| `src/features/reviews/components/ReviewForm.tsx` | Sharh yozish formasi |
| `src/features/reviews/components/RatingStars.tsx` | Yulduzlar |

## 4. shadcn

```bash
npx shadcn@latest add tabs card button avatar separator dialog
```

## 5. API endpointlar

```
GET /api/v1/clinics/:id            # Klinika detaillari
GET /api/v1/clinics/:id/reviews    # Sharhlar (paginated)
GET /api/v1/clinics?similar=:id    # O'xshash klinikalar
```

## 6. SSR + Metadata

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const clinic = await getClinic(params.id)
  return {
    title: `${clinic.name} - VetClinic UZ`,
    description: clinic.description.slice(0, 160),
    openGraph: {
      images: [clinic.images[0]],
    },
  }
}
```

## 7. "Hozir ochiq" mantiq (`opening-hours.ts`)

```ts
export function isOpenNow(openingHours: OpeningHours): {
  isOpen: boolean
  closesAt?: string
  opensAt?: string
} {
  const now = new Date()
  const day = ['Yak', 'Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha'][now.getDay()]
  const today = openingHours[day]
  if (!today || today.closed) return { isOpen: false, opensAt: '...' }
  const currentTime = now.getHours() * 60 + now.getMinutes()
  // ...
}
```

## 8. States

- ✅ **Default:** to'liq yuklangan
- ✅ **Loading:** skeleton (`klinika_ma_lumotlari_yuklanmoqda` design)
- ✅ **404:** klinika topilmadi (`not-found.tsx`)
- ✅ **Error:** retry CTA

## 9. Done checklist

- [ ] SSR — view-source da klinika nomi va ma'lumot bor (SEO)
- [ ] `generateMetadata` to'g'ri ishlaydi
- [ ] Tab navigation hash bilan (`/clinics/123#sharhlar`)
- [ ] Image gallery lightbox (Esc + swipe)
- [ ] Phone tap-to-call (`tel:` link)
- [ ] "Yo'l ko'rsatish" Google Maps yoki Yandex Maps'ga
- [ ] OpeningHours bugun highlight + real-time "Ochiq/Yopiq"
- [ ] Sharhlar tab Akbar bilan integratsiya
- [ ] Heart-favorite ishlaydi
- [ ] O'xshash klinikalar 4 ta
- [ ] `screen.png` ga vizual mos
