# Qidiruv natijalari (Search Results) — Desktop

> **Mas'ul:** Doniyor (Clinics & Map Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐ (qidiruv funksionalligi)

---

## 1. Sahifa haqida

Foydalanuvchi qidiruv input'ida so'z kiritib, "Qidirish" tugmasini bossa, bu sahifaga olib keladi. URL: `/search?q=vaksinatsiya+toshkent`.

Natijalar bir necha kategoriyaga bo'linadi: Klinikalar, Mutaxassislar, Sharhlar, Shaharlar.

## 2. Anatomiya (`screen.png`'dan)

```
Header — search input prominently:
- "vaksinatsiya toshkent" filled + clear (×)

Page header:
- H1: "Qidiruv natijalari"
- Subtitle: "vaksinatsiya toshkent" uchun natijalar, 23 ta natija

Tab pills:
- "Hammasi" (active) | "Klinikalar" | "Mutaxassislar" | "Shaharlar"

Results section:
- Green CTA card: "Kompleks vaksinatsiya — 4 oy ichki uchun pillik vaksinatsiya paketi. 15% chegirma bor"
- Klinika natijalari (cards):
  - "Central Pet Clinic — 24/7 ON DUTY · ★ 4.9"
  - "VetExpert Toshkent · ★ 4.8"
  - "Happy Pets Center · ★ 4.7"
- Sharh natijalari:
  - "Asror K. — Doktor men Vaksinatsiya so'zi ichida..." (matched yellow)

O'NG SIDEBAR (280px):
- "Filtrlash" card (filter groups)
- "Qidiruv kengaytirish" — suggestion chips:
  - "Vaksinatsiya samarqand"
  - "Veterinariya toshkent"
  - "Tez yordam"
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(main)/search/page.tsx` | Server Component (SSR) |
| `src/app/(main)/search/loading.tsx` | Skeleton (alohida design) |
| `src/features/search/api/search.api.ts` | `globalSearch(query)` |
| `src/features/search/hooks/useSearch.ts` | Query hook |
| `src/features/search/components/SearchTabs.tsx` | Kategoriya tablari |
| `src/features/search/components/SearchResultCard.tsx` | Variant card (clinic/specialist/city) |
| `src/features/search/components/HighlightMatch.tsx` | Matched terms yellow highlight |
| `src/hooks/useDebounce.ts` | Debounce input |

## 4. shadcn

```bash
npx shadcn@latest add input tabs card badge
```

## 5. API endpoint

```
GET /api/v1/search?q=vaksinatsiya+toshkent&category=clinics&page=1
Response:
{
  success: true,
  data: {
    clinics: { items: [], total: 12 },
    specialists: { items: [], total: 5 },
    cities: { items: [], total: 3 },
    reviews: { items: [], total: 3 }
  }
}
```

## 6. Highlight matched terms

```tsx
function HighlightMatch({ text, query }: { text: string, query: string }) {
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
          ? <mark key={i} className="bg-yellow-200 px-0.5">{part}</mark>
          : part
      )}
    </>
  )
}
```

## 7. States

- ✅ **Default:** natijalar yuklangan
- ✅ **Loading:** Skeleton (`qidiruv_yuklanmoqda` design)
- ✅ **Empty:** EmptyState (`natija_topilmadi_desktop` design — Numton'ning komponenti)
- ✅ **Error:** "Qidiruvda xato. Qayta urining"

## 8. URL sync

- `/search?q=vaksinatsiya+toshkent&category=clinics`
- Tab almashganda URL yangilanadi (`router.push`)

## 9. Done checklist

- [ ] Server Component SSR (SEO uchun)
- [ ] Tab almashtirilganda content yangilanadi
- [ ] Highlight matched terms (`<mark>` yellow bg)
- [ ] Empty state'da suggestion chips bosilsa input'iga to'ldiradi
- [ ] Suggestion chips → yangi qidiruv
- [ ] Mobile responsive (`qidiruv_natijalari_mobil` bilan bir xil sahifa)
- [ ] `screen.png` ga vizual mos
