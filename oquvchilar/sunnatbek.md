# Sunnatbek — Tech Lead + API Core + Admin Panel

## Roling

Sen jamoaning Tech Leadi sansan.
Boshqa hamma o'quvchi sening tayyorlagan poydevoring ustida ishlaydi.
Shu sababli admin panel ham to'liq senga biriktirilgan.

Sening uchta yo'nalishing bor:

1. **API core** — `apiClient`, error format, endpoint katalogi.
2. **Auth core** — token saqlash, refresh oqimi, middleware guard.
3. **Admin panel** — sahifalar, hooks, formlar, CRUD.

## Qayerda kod yozasan?

### API core

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

## Nima qilasan?

1. Bitta `apiClient` yasaysan — hamma endpoint shu orqali yuriladi.
2. 401 bo'lsa avtomatik `refresh` ishlaydigan qilasan.
3. Xatolarni bitta `ApiError` formatga keltiradigan helper yozasan.
4. Global `layout`, `error`, `loading`, `not-found` holatlarini polish qilasan.
5. `middleware.ts` da admin va profile route guard yozasan.
6. Admin dashboard, klinikalar CRUD, foydalanuvchilar va sharhlar boshqaruvini qilasan.

## Swaggerdan qaysi endpointlar kerak?

- `GET /health`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /admin/dashboard`
- `GET /admin/clinics`
- `POST /admin/clinics`
- `PATCH /admin/clinics/:id`
- `DELETE /admin/clinics/:id`
- `GET /admin/users`
- `PATCH /admin/users/:id/role`
- `GET /admin/reviews`
- `DELETE /admin/reviews/:id`

## Eng muhim fayllar

### `src/lib/api/endpoints.ts`

Hamma endpoint stringi shu yerda. Boshqa joyda string yozilmasin.

### `src/lib/api/client.ts`

Bitta umumiy client: `get`, `post`, `patch`, `delete`. Yo'l boshida shu kommentni qoldiring:

```ts
// Shu client - butun loyihaning yagona API eshigi.
// Boshqa joyda to'g'ridan-to'g'ri fetch yozmaymiz.
```

### `src/features/admin/api/admin.api.ts`

Kamida shu funksiyalar bo'lsin:

- `getDashboard(token)`
- `listClinics(token)`
- `createClinic(body, token)`
- `updateClinic(id, body, token)`
- `deleteClinic(id, token)`
- `listUsers(token)`
- `updateUserRole(id, role, token)`
- `listReviews(token)`
- `deleteReview(id, token)`

## Juniorlar uchun qoida (har bir `*.api.ts` ichida)

```ts
// QOIDA:
// 1) Endpointni endpoints.ts dan ol
// 2) So'rovni apiClient orqali yubor
// 3) Javobni oddiy typega map qil
```

## Done checklist

- [ ] `apiClient` ichida base URL ishlaydi
- [ ] 401 bo'lsa refresh urinadi
- [ ] Refresh ishlamasa logout qiladi
- [ ] `ApiError` bitta formatda
- [ ] Admin route guard ishlaydi
- [ ] Admin dashboard ishlaydi
- [ ] Admin CRUD endpointlar ulanadi
- [ ] `npm run lint` yashil
- [ ] `npm run build` yashil

## 5 kunlik reja

### 1-kun — API core
- `src/lib/api/client.ts` — base URL va request wrapper.
- `src/lib/api/error.ts` — `ApiError` formatini tugat.
- `GET /health` orqali backendga ulanishni test qil.

### 2-kun — Auth core
- 401 bo'lganda `POST /auth/refresh` oqimini qo'sh.
- Refresh muvaffaqiyatsiz bo'lsa logout.
- `src/lib/api/endpoints.ts` ni to'liq to'ldir.

### 3-kun — App core
- `src/middleware.ts` da admin / profile guard.
- `src/app/error.tsx`, `loading.tsx`, `not-found.tsx` ni polish qil.
- `src/app/admin/layout.tsx` va `admin/page.tsx` ni ishga tushir.

### 4-kun — Admin API + komponentlar
- `admin.api.ts` da clinics / users / reviews funksiyalarini tugat.
- `StatsCards.tsx`, `ClinicForm.tsx`, `UserTable.tsx` ni ulab chiq.

### 5-kun — Admin sahifalar va sinov
- `admin/clinics/*`, `admin/users`, `admin/reviews` sahifalarini yakunla.
- Non-admin user kira olmasligini tekshir.
- Jamoaga "Admin panel + API core tayyor" deb topshir.
