# Doniyor — Clinics + Search + Map

## Roling

Sen foydalanuvchi klinika topadigan asosiy qismni yasaysan:
ro'yxat, detail sahifa, qidiruv va xarita.

## Qayerda kod yozasan?

### Clinics API va hooks

- `src/features/clinics/api/clinics.api.ts`
- `src/features/clinics/hooks/useClinics.ts`
- `src/features/clinics/hooks/useClinic.ts`
- `src/features/clinics/hooks/useNearbyClinics.ts`
- `src/features/clinics/types.ts`

### Clinics UI

- `src/features/clinics/components/ClinicCard.tsx`
- `src/features/clinics/components/ClinicList.tsx`
- `src/features/clinics/components/ClinicFilters.tsx`
- `src/features/clinics/components/ClinicDetail.tsx`
- `src/features/clinics/components/OpeningHours.tsx`
- `src/features/clinics/components/ClinicMap.tsx`
- `src/features/clinics/components/ImageGallery.tsx`

### Sahifalar

- `src/app/(main)/clinics/page.tsx`
- `src/app/(main)/clinics/[id]/page.tsx`
- `src/app/(main)/map/page.tsx`
- `src/app/(main)/search/page.tsx`

## Nima qilasan?

1. Backenddan klinikalarni olib chiqasan.
2. Kartochkada nom, manzil va rating ko'rinadi.
3. Klinikani bossang detail sahifa ochiladi.
4. Filter va qidiruv qo'shasan.
5. Xaritada markerlar chiqadi va marker bossa detailga o'tadi.

## Swaggerdan qaysi endpointlar kerak?

- `GET /clinics/nearby`
- `GET /clinics/:id`
- `GET /clinics` (mavjud bo'lsa) — umumiy ro'yxat va qidiruv uchun

## Asosiy fayllar

### `src/features/clinics/api/clinics.api.ts`

```ts
import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";

export const clinicsApi = {
  getNearby: (lat: number, lng: number, radiusKm = 10) =>
    apiClient.get(
      `${endpoints.clinics.nearby}?lat=${lat}&lng=${lng}&radiusKm=${radiusKm}`,
    ),

  getById: (id: string) => apiClient.get(endpoints.clinics.byId(id)),
};
```

### `src/features/clinics/hooks/useClinics.ts`

```ts
// Bu hook "klinika ro'yxatini olib keladigan kran".
// UI shu krandan suv olgandek data oladi.
```

### `src/app/(main)/clinics/page.tsx`

- `useClinics` ni chaqir.
- `loading`, `error`, `empty` holatlarni alohida ko'rsat (Numton'ning `EmptyState`, `LoadingSpinner`, `ErrorMessage` komponentlarini ishlat).
- So'ng `ClinicList` render qil.

## Done checklist

- [ ] Klinika ro'yxati chiqadi
- [ ] Klinik detail ochiladi
- [ ] Qidiruv va filter ishlaydi
- [ ] Xarita marker bilan ishlaydi
- [ ] Loading / Error / Empty holatlar bor
- [ ] `npm run lint` yashil

## 3 kunlik reja

### 1-kun
- `clinics.api.ts` da `GET /clinics/nearby` va `GET /clinics/:id` ni yoz.
- `useClinics.ts` va `useClinic.ts` ni yoz.
- `ClinicCard.tsx`, `ClinicList.tsx` ni boshlang.

### 2-kun
- `clinics/page.tsx` da listni chiqargin.
- `clinics/[id]/page.tsx` da detail sahifani ulagin.
- `ClinicFilters.tsx` va `search/page.tsx` ni qo'sh.

### 3-kun
- `ClinicMap.tsx` va `map/page.tsx` da markerlarni chiqargin.
- `useNearbyClinics.ts` bilan geolocation ulagin.
- Loading / error / empty holatlarni tekshir.
