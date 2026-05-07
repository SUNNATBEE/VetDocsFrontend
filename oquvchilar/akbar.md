# Akbar uchun to'liq topshiriq (Profile + Reviews)

## Sening roling

Sen foydalanuvchining profil va sharh (review) qismini qilasan.

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

### Profile pages
- `src/app/(main)/profile/page.tsx`
- `src/app/(main)/profile/favorites/page.tsx`

## Nima qilasan? (oddiy tilda)

1. User klinikaga yulduz va komment yozadi.
2. Sharhlar ro'yxat bo'lib chiqadi.
3. O'z sharhini edit/delete qila oladi.
4. Profil sahifasini chiqaradi.
5. Favorites bo'limini ishlatadi.

## Swaggerdan qaysi endpointlar kerak?

- `POST /clinics/:id/reviews`
- (`GET /clinics/:id/reviews` bo'lsa) list uchun
- (`PATCH /reviews/:id` bo'lsa) edit uchun
- (`DELETE /reviews/:id` bo'lsa) delete uchun

## Qaysi faylga qanday kod yozasan?

### 1) `src/features/reviews/api/reviews.api.ts`

Eng kerakli endpoint:

```ts
import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";

export const reviewsApi = {
  create: (clinicId: string, rating: number, comment: string, token: string) =>
    apiClient.post(
      endpoints.clinics.reviews(clinicId),
      { rating, comment },
      token
    ),
};
```

### 2) `src/features/reviews/hooks/useReviews.ts`

Bu hook review listni chiqaradi.  
Agar backendda alohida list endpoint bo'lmasa, `GET /clinics/:id` ichidagi `reviews` ni oling.

### 3) `src/features/reviews/components/ReviewForm.tsx`

Komment yozing:

```ts
// User "Yuborish" tugmasini bosganda:
// 1) rating + comment backendga ketadi
// 2) muvaffaqiyat bo'lsa ro'yxatni qayta yangilaymiz
```

## Done checklist

- [ ] Review qo'shish ishlaydi
- [ ] Review list chiqadi
- [ ] O'z reviewini edit/delete qiladi
- [ ] Profil sahifasi ishlaydi
- [ ] Loading/Error/Empty bor
- [ ] `npm run lint` yashil

## 1-kun / 2-kun / 3-kun reja

### 1-kun
- `reviews.api.ts` da `POST /clinics/:id/reviews` ni ulagin.
- `useReviews.ts` ni klinika review list uchun tugat.
- `ReviewForm.tsx` va `RatingStars.tsx` (yo'q bo'lsa yarat) ni yoz.

### 2-kun
- `ReviewList.tsx` va `ReviewCard.tsx` (yo'q bo'lsa yarat) ni qil.
- `useCreateReview.ts`, `useUpdateReview.ts`, `useDeleteReview.ts` (yo'q bo'lsa yarat) ni yoz.
- Review qo'shishdan keyin list yangilanishini sozla.

### 3-kun
- `profile/page.tsx` ni yakunla.
- `profile/favorites/page.tsx` ni local holatda ishlat.
- O'z reviewini edit/delete va boshqa user reviewini edit qila olmaslikni tekshir.
