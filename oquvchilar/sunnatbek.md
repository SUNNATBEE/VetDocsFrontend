# Sunnatbek uchun to'liq topshiriq (Tech Lead + Admin Panel)

## Sening roling

Sen "yo'l ochuvchi"san.
Boshqa hamma o'quvchi kod yozishi uchun poydevorni tayyorlaysan.
Endi admin panel ham to'liq senga biriktirildi.

## Qayerda kod yozasan?

### Core API
- `src/lib/api/client.ts`
- `src/lib/api/error.ts`
- `src/lib/api/endpoints.ts`

### Auth core helpers
- `src/lib/auth/token.ts`
- `src/lib/auth/jwt.ts`

### App core
- `src/config/env.ts`
- `src/app/layout.tsx`
- `src/app/error.tsx`
- `src/app/not-found.tsx`
- `src/app/loading.tsx`
- `src/middleware.ts`

### Admin panel (to'liq)
- `src/features/admin/api/admin.api.ts`
- `src/features/admin/hooks/useAdminStats.ts`
- `src/features/admin/hooks/useAdminClinics.ts`
- `src/features/admin/hooks/useAdminUsers.ts`
- `src/features/admin/hooks/useAdminReviews.ts`
- `src/features/admin/components/AdminSidebar.tsx`
- `src/features/admin/components/StatsCards.tsx`
- `src/features/admin/components/ClinicForm.tsx`
- `src/features/admin/components/OpeningHoursEditor.tsx`
- `src/features/admin/components/UserTable.tsx`
- `src/features/admin/components/ExportButton.tsx`
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/clinics/page.tsx`
- `src/app/admin/clinics/new/page.tsx`
- `src/app/admin/clinics/[id]/edit/page.tsx`
- `src/app/admin/users/page.tsx`
- `src/app/admin/reviews/page.tsx`

## Nima qilasan? (oddiy tilda)

1. Bitta API client qilasan.
   - Hamma endpoint shu orqali ishlasin.
2. Token tugasa refresh ishlaydigan qilasan.
3. Xatolarni bitta formatga keltirasan (`ApiError`).
4. App global layout, error, loading holatlarini to'g'ri qilasan.
5. `admin` sahifaga faqat admin kirishini tekshiradigan guard yozasan.
6. Admin dashboard va barcha admin CRUD sahifalarni qilasan.

## Swaggerdan qaysi endpointlar kerak?

- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /health`
- `GET /admin/dashboard` (guard test uchun)
- `GET /admin/clinics`
- `POST /admin/clinics`
- `PATCH /admin/clinics/:id`
- `DELETE /admin/clinics/:id`
- `GET /admin/users`
- `PATCH /admin/users/:id/role`
- `GET /admin/reviews`
- `DELETE /admin/reviews/:id`

## Core fayllar (eng muhimlari)

### 1) `src/lib/api/endpoints.ts`

Hamma endpointni bitta joyga yig'ing.  
Shunda xato kamayadi.

### 2) `src/lib/api/client.ts`

Bitta umumiy client bo'lsin:
- `get`
- `post`
- `patch`
- `delete`

Komment yozing:

```ts
// Shu client - butun loyihaning yagona API eshigi.
// Boshqa joyda to'g'ridan-to'g'ri fetch yozmaymiz.
```

### 3) `src/features/admin/api/admin.api.ts`

Kamida shu funksiyalar bo'lsin:
- `getDashboard(token)`
- `listClinics(token)`
- `createClinic(body, token)`
- `updateClinic(id, body, token)`
- `deleteClinic(id, token)`

## Juniorlar uchun qoidani yozib qo'ying

`features/*/api/*.api.ts` ichida izoh qoldiring:

```ts
// QOIDA:
// 1) Endpointni endpoints.ts dan ol
// 2) So'rovni apiClient orqali yubor
// 3) Javobni oddiy typega map qil
```

## Done checklist

- [ ] `api client` ichida base URL ishlaydi
- [ ] 401 bo'lsa refresh urinadi
- [ ] refresh bo'lmasa logout qiladi
- [ ] admin route guard ishlaydi
- [ ] Admin dashboard ishlaydi
- [ ] Admin CRUD endpointlar ulanadi
- [ ] `npm run lint` yashil

## 1-kun / 2-kun / 3-kun reja

### 1-kun
- `src/lib/api/client.ts` ichida base URL va request wrapper yoz.
- `src/lib/api/error.ts` ichida `ApiError` formatini tugat.
- `GET /health` bilan backendga ulanishni test qil.

### 2-kun
- 401 bo'lganda `POST /auth/refresh` oqimini qo'sh.
- Refresh ishlamasa logout qilishni ulab qo'y.
- `src/lib/api/endpoints.ts` ni to'ldir.

### 3-kun
- `src/middleware.ts` da admin/profile guard qo'sh.
- `src/app/error.tsx`, `src/app/loading.tsx`, `src/app/not-found.tsx` ni polish qil.
- `src/app/admin/page.tsx` va admin routingni ishga tushir.

### 4-kun
- `admin.api.ts` da clinics/users/reviews endpointlarini tugat.
- `ClinicForm.tsx`, `UserTable.tsx`, `StatsCards.tsx` ni ulab chiq.

### 5-kun
- `admin/clinics/*`, `admin/users`, `admin/reviews` sahifalarini yakunla.
- Non-admin bloklanishi va CRUD to'liq ishlashini tekshir.
- Jamoaga "Admin panel + API core tayyor" deb topshir.
