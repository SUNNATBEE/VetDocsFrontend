# Akbar — Reviews + Profile + Favorites

## Roling

Sen foydalanuvchining sharh (review) va profil qismini yasaysan.
User klinika haqida fikrini qoldiradi, o'z profilini ko'radi va sevimlilarini saqlaydi.

## Qayerda kod yozasan?

### Reviews API va hooks

- `src/features/reviews/api/reviews.api.ts`
- `src/features/reviews/hooks/useReviews.ts`
- `src/features/reviews/hooks/useCreateReview.ts`
- `src/features/reviews/hooks/useUpdateReview.ts`
- `src/features/reviews/hooks/useDeleteReview.ts`
- `src/features/reviews/types.ts`

### Reviews UI

- `src/features/reviews/components/ReviewForm.tsx`
- `src/features/reviews/components/ReviewCard.tsx`
- `src/features/reviews/components/ReviewList.tsx`
- `src/features/reviews/components/RatingStars.tsx`

### Profile sahifalar

- `src/app/(main)/profile/page.tsx`
- `src/app/(main)/profile/favorites/page.tsx`

## Nima qilasan?

1. User klinikaga yulduz va komment yozadi.
2. Sharhlar ro'yxat bo'lib chiqadi.
3. User o'z sharhini edit / delete qila oladi (boshqaning sharhini emas).
4. Profil sahifasida user ma'lumotlari ko'rinadi.
5. Favorites bo'limi (lokal yoki backend) ishlaydi.

## Swaggerdan qaysi endpointlar kerak?

- `POST /clinics/:id/reviews`
- `GET /clinics/:id/reviews` (mavjud bo'lsa) — list uchun
- `PATCH /reviews/:id` (mavjud bo'lsa) — edit uchun
- `DELETE /reviews/:id` (mavjud bo'lsa) — delete uchun

## Asosiy fayllar

### `src/features/reviews/api/reviews.api.ts`

```ts
import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";

export const reviewsApi = {
  create: (
    clinicId: string,
    rating: number,
    comment: string,
    token: string,
  ) =>
    apiClient.post(
      endpoints.clinics.reviews(clinicId),
      { rating, comment },
      token,
    ),
};
```

### `src/features/reviews/hooks/useReviews.ts`

Klinikaga tegishli review ro'yxatini chiqaradi.
Agar alohida list endpoint bo'lmasa, `GET /clinics/:id` javobidagi `reviews` maydonini oling.

### `src/features/reviews/components/ReviewForm.tsx`

```ts
// User "Yuborish" tugmasini bosganda:
// 1) rating + comment backendga ketadi
// 2) muvaffaqiyat bo'lsa ro'yxat yangilanadi
// 3) xato bo'lsa Numton'ning Toast komponenti orqali xabar chiqadi
```

## Done checklist

- [ ] Review qo'shish ishlaydi
- [ ] Review ro'yxati chiqadi
- [ ] O'z reviewini edit / delete qiladi
- [ ] Profil sahifasi ishlaydi
- [ ] Favorites bo'limi ishlaydi
- [ ] Loading / Error / Empty holatlar bor
- [ ] `npm run lint` yashil

## 3 kunlik reja

### 1-kun
- `reviews.api.ts` da `POST /clinics/:id/reviews` ni ulang.
- `useReviews.ts` ni klinika review listi uchun tugating.
- `ReviewForm.tsx` va `RatingStars.tsx` ni yozing.

### 2-kun
- `ReviewList.tsx` va `ReviewCard.tsx` ni qiling.
- `useCreateReview.ts`, `useUpdateReview.ts`, `useDeleteReview.ts` ni yozing.
- Review qo'shgandan keyin list yangilanishini sozlang.

### 3-kun
- `profile/page.tsx` ni yakunlang.
- `profile/favorites/page.tsx` ni ishlatib chiqing.
- O'z reviewini edit / delete va boshqa user sharhini o'zgartira olmaslikni tekshiring.
