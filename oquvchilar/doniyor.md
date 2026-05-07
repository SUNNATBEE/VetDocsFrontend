# Doniyor uchun to'liq topshiriq (Clinics + Map)

## Sening roling

Sen foydalanuvchi klinika topadigan eng katta qismni qilasan.
Ya'ni ro'yxat, detail, qidiruv va xarita.

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

## Nima qilasan? (oddiy tilda)

1. Backenddan klinikalarni olib chiqasan.
2. Kartochkada klinika nomi, manzili, rating ko'rinadi.
3. Klinikani bossak detail sahifa ochiladi.
4. Filter va qidiruv qo'shasan.
5. Xaritada markerlar chiqadi.

## Swaggerdan qaysi endpointlar kerak?

- `GET /clinics/nearby`
- `GET /clinics/:id`
- (`GET /clinics` bo'lsa) umumiy list uchun ishlat

## Qaysi faylga qanday kod yozasan? (juda oson)

### 1) `src/features/clinics/api/clinics.api.ts`

Bu fayl klinikalarni olib keladi:

```ts
import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";

export const clinicsApi = {
  getNearby: (lat: number, lng: number, radiusKm = 10) =>
    apiClient.get(`${endpoints.clinics.nearby}?lat=${lat}&lng=${lng}&radiusKm=${radiusKm}`),

  getById: (id: string) => apiClient.get(endpoints.clinics.byId(id)),
};
```

### 2) `src/features/clinics/hooks/useClinics.ts`

Shu hook API chaqiradi va listni UIga beradi.

Komment yozing:

```ts
// Bu hook "klinika ro'yxatini olib keladigan kran"ga o'xshaydi.
// UI shu krandan suv olgandek data oladi.
```

### 3) `src/app/(main)/clinics/page.tsx`

- `useClinics` ni chaqiring.
- `loading`, `error`, `empty` holatni alohida ko'rsating.
- Keyin `ClinicList` render qiling.

## Done checklist

- [ ] Klinika ro'yxati chiqadi
- [ ] Klinik detail ochiladi
- [ ] Qidiruv/filter ishlaydi
- [ ] Xarita marker bilan ishlaydi
- [ ] Loading/Error/Empty holatlar bor
- [ ] `npm run lint` yashil

## 1-kun / 2-kun / 3-kun reja

### 1-kun
- `clinics.api.ts` da `GET /clinics/nearby` va `GET /clinics/:id` ni yoz.
- `useClinics.ts` va `useClinic.ts` (yo'q bo'lsa yarat) ni yoz.
- `ClinicCard.tsx` va `ClinicList.tsx` (yo'q bo'lsa yarat) boshlang.

### 2-kun
- `clinics/page.tsx` da listni chiqargin.
- `clinics/[id]/page.tsx` da detail sahifani ulagin.
- `ClinicFilters.tsx` va `search/page.tsx` ni qo'sh.

### 3-kun
- `ClinicMap.tsx` va `map/page.tsx` da markerlarni chiqargin.
- `useNearbyClinics.ts` bilan geolocation ulagin.
- Loading/error/empty holatlarni tekshir.
