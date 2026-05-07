# Natija topilmadi (Empty State)

> **Mas'ul:** Yahyo (UI/UX Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐ (har bir bo'sh holat uchun ishlatiluvchi komponent)

---

## 1. Sahifa haqida

Foydalanuvchi qidirgan natija topilmaganda ko'rsatiladigan **reusable empty state komponenti**. Faqat search uchun emas — sevimlilar bo'sh, sharhlar yo'q, klinikalar topilmadi — barchasida ishlatiladi.

## 2. Komponent props

```tsx
type EmptyStateProps = {
  icon?: ReactNode;          // default: Search icon
  title: string;             // "xyz uchun hech narsa topilmadi"
  description?: string;      // helper matn
  action?: {
    label: string;           // "Barcha klinikalar"
    onClick: () => void;
  };
  suggestions?: string[];    // chip suggestions
  variant?: 'search' | 'favorites' | 'reviews' | 'clinics';
}
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/components/shared/EmptyState.tsx` | Reusable komponent |
| `public/illustrations/empty-search.svg` | Magnifier + ? illustration |
| `public/illustrations/empty-favorites.svg` | Broken heart |
| `public/illustrations/empty-reviews.svg` | Empty speech bubble |

## 4. Qayerda ishlatiladi

- `src/app/(main)/search/page.tsx` — qidiruv natijasi yo'q
- `src/app/(main)/profile/favorites/page.tsx` — sevimlilar yo'q
- `src/app/(main)/clinics/page.tsx` — filter natijasi yo'q
- `src/app/admin/clinics/page.tsx` — hali klinika qo'shilmagan

## 5. Anatomiya (`screen.png`'dan)

```
- Markazlangan layout
- Yuqorida: katta rasmli icon (gray rounded-full bg + magnifier + coral ? badge)
- Sarlavha h2: "xyz" uchun hech narsa topilmadi
- Body matn (3 satr): tushunarli yo'l-yo'riq
- Coral CTA button: "Barcha klinikalar"
- Pastda 2 ta yon-yonma card:
  - Maslahatlar (ampul ikon)
  - Mashhur qidiruvlar (chips: Vaksina, 24/7 Tezyordam, Stomatologiya...)
```

## 6. shadcn

```bash
npx shadcn@latest add button card badge
```

## 7. Done checklist

- [ ] Komponent 4 ta variantda ishlatiladi (search/favorites/reviews/clinics)
- [ ] Illustration SVG'lar accessible (`role="img"` + `aria-label`)
- [ ] Mobile'da rasm va matn markazda
- [ ] Suggestion chip'lar bosilganda search input'iga to'ldiradi
- [ ] Storybook story yoki styleguide page'da ko'rinadi
- [ ] `screen.png` ga vizual mos
