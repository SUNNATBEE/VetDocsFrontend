# Yahyo uchun to'liq topshiriq (UI/UX)

## Sening roling

Sen saytni chiroyli, toza va qulay qilasan.
Odam saytga kirganda birinchi bo'lib sening ishingni ko'radi.

## Qayerda kod yozasan?

### Layout komponentlar
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/MobileNav.tsx`
- `src/components/layout/ThemeToggle.tsx`

### Shared komponentlar
- `src/components/shared/EmptyState.tsx`
- `src/components/shared/LoadingSpinner.tsx`
- `src/components/shared/ConfirmDialog.tsx`

### Main pages
- `src/app/(main)/page.tsx`
- `src/app/(main)/about/page.tsx`
- `src/app/(main)/contact/page.tsx`

## Nima qilasan? (oddiy tilda)

1. Header yasaysan:
   - logo
   - menu
   - login/profile tugmasi
2. Footer yasaysan:
   - kontaktlar
   - linklar
3. Telefon uchun mobile menyu qilasan.
4. `Loading`, `Empty`, `Confirm` componentlarni reusable qilasan.
5. Home/About/Contact sahifalarni chiroyli qilasan.

## Swaggerdan nima kerak?

To'g'ridan-to'g'ri API ko'p emas, lekin quyilarni UI holati uchun bil:
- `GET /health` (backend ishlayaptimi tekshirish uchun)
- Clinics endpointlar chiqadigan joylarga loading/empty UI tayyorlash

## Qaysi faylga qanday "sodda komment" yozish kerak?

### `src/components/shared/LoadingSpinner.tsx`

```ts
// Bu aylana userga "kuting, ma'lumot kelmoqda" degan signal beradi.
```

### `src/components/shared/EmptyState.tsx`

```ts
// Data bo'lmasa xafa bo'lmasin deb, tushunarli xabar chiqaramiz.
```

### `src/components/shared/ConfirmDialog.tsx`

```ts
// Xavfli amal oldidan userdan yana bir marta tasdiq so'raymiz.
```

### `src/components/layout/Header.tsx`

```ts
// Header - bu saytning bosh menyusi.
// Har sahifada bir xil ko'rinadi.
```

## Done checklist

- [ ] Header va Footer tayyor
- [ ] Mobil menyu ishlaydi
- [ ] Loading/Error/Empty ko'rinishlar bor
- [ ] 375px dan 1280px gacha responsive
- [ ] `npm run lint` yashil

## 1-kun / 2-kun / 3-kun reja

### 1-kun
- `Header.tsx` va `Footer.tsx` ni yasab chiq.
- Desktop menyu va oddiy navigatsiya tugmalarini qo'sh.

### 2-kun
- `MobileNav.tsx` va `ThemeToggle.tsx` qil.
- `LoadingSpinner.tsx` va `EmptyState.tsx` ni reusable qilib yoz.

### 3-kun
- `ConfirmDialog.tsx` tayyorla.
- `src/app/(main)/page.tsx`, `about/page.tsx`, `contact/page.tsx` ni chiroyli qil.
- Mobil va desktopda ko'rinishni tekshir.
