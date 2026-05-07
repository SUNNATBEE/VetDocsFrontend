# Yahyo — Layout (Header / Footer / Mobile / Theme)

## Roling

Sen saytning umumiy "ramka"sini yasaysan.
Foydalanuvchi har sahifada birinchi bo'lib sening Header va Footer'ingni ko'radi.

Diqqat: static sahifalar (Home / About / Contact / FAQ) Hayotda;
reusable shared komponentlar (`EmptyState`, `LoadingSpinner`, `ConfirmDialog`, `ErrorMessage`, Toast) Numtonda.
Sen faqat **layout** ga e'tibor berasan.

## Qayerda kod yozasan?

### Layout komponentlar

- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/MobileNav.tsx`
- `src/components/layout/ThemeToggle.tsx`

### Theme yordamchi (kerak bo'lsa)

- `src/components/layout/ThemeProvider.tsx`

## Nima qilasan?

1. Header yasaysan:
   - logo
   - asosiy menyu (Clinics / Map / About / Contact)
   - login holatiga qarab "Kirish" yoki "Profile" tugmasi
2. Footer yasaysan:
   - sayt navigatsiyasi
   - kontaktlar
   - copyright
3. Telefon uchun `MobileNav` (drawer / hamburger menyu) qilasan.
4. `ThemeToggle` orqali light / dark rejimini almashtirasan.
5. Layout 375px dan 1280px gacha responsive bo'lsin.

## Swaggerdan nima kerak?

To'g'ridan-to'g'ri API qo'llamaysan, lekin auth holatini bil:

- Suhrob'ning `useCurrentUser` hooki orqali userni ol.
- User bor bo'lsa Header'da "Profile" tugmasi, yo'q bo'lsa "Kirish" tugmasi chiqadi.

## Misol kommentlar

### `src/components/layout/Header.tsx`

```ts
// Header - saytning bosh menyusi.
// Har sahifada bir xil ko'rinadi va auth holatiga qarab tugmalar o'zgaradi.
```

### `src/components/layout/MobileNav.tsx`

```ts
// 768px dan kichik ekranlarda asosiy menyu shu drawer orqali ochiladi.
```

### `src/components/layout/ThemeToggle.tsx`

```ts
// Light / dark rejimni almashtiruvchi tugma.
// Tanlov localStorage ga saqlanadi.
```

## Done checklist

- [ ] Header tayyor (logo + menyu + auth tugmasi)
- [ ] Footer tayyor (linklar + kontakt + copyright)
- [ ] Mobile menyu drawer ishlaydi
- [ ] Theme toggle light / dark almashadi va saqlanadi
- [ ] 375px - 1280px gacha responsive
- [ ] `npm run lint` yashil

## 3 kunlik reja

### 1-kun
- `Header.tsx` va `Footer.tsx` ni yasab chiq.
- Desktop menyu va asosiy navigatsiya tugmalarini qo'sh.

### 2-kun
- `MobileNav.tsx` (drawer / overlay) ni qil.
- `ThemeToggle.tsx` va `ThemeProvider.tsx` ni ulagin.

### 3-kun
- Auth holatiga qarab Header'da tugmalar o'zgarsin (Suhrob hooki orqali).
- Mobile va desktopda tekshir, animatsiya va focus ringlarni polish qil.
