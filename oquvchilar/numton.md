# Numton — Reusable shared komponentlar + Toast + Constants

## Roling

Sen jamoaning "yordam beruvchi qo'li"sansan.
Sening yozgan komponentlaring loyihaning **har bir sahifasida** ishlatiladi.
Shu sababli ular kichik, sodda va qayta ishlatilishga mos bo'lishi kerak.

Diqqat: Header / Footer / mobile menyu — Yahyoda.
Home / About / Contact / FAQ — Hayotda.
Sen "ichki yordam komponentlari" bilan ishlaysan: bo'sh holat, yuklanish, xato, tasdiq, toast.

## Qayerda kod yozasan?

### Reusable shared komponentlar

- `src/components/shared/EmptyState.tsx`
- `src/components/shared/LoadingSpinner.tsx`
- `src/components/shared/ErrorMessage.tsx`
- `src/components/shared/ConfirmDialog.tsx`
- `src/components/shared/Toast.tsx`
- `src/components/shared/ToastContainer.tsx`

### Toast / Notification tizimi

- `src/lib/toast/toast.store.ts` — Zustand yoki context store
- `src/lib/toast/useToast.ts` — qulay hook (`toast.success`, `toast.error`, `toast.info`)

### Content constants

- `src/lib/constants/cities.ts` — O'zbekiston shaharlari
- `src/lib/constants/routes.ts` — frontend route nomlari

## Nima qilasan?

1. `EmptyState` — data bo'lmaganda chiqadigan toza blok (icon + matn + ixtiyoriy tugma).
2. `LoadingSpinner` — yuklanayotganini ko'rsatuvchi aylana (kichik / o'rta / katta o'lchamlar).
3. `ErrorMessage` — xato bo'lganda chiqadigan tushunarli xabar (qayta urinish tugmasi bilan).
4. `ConfirmDialog` — xavfli amal oldidan tasdiq so'rovchi modal (delete uchun).
5. `Toast` — sahifa burchagida chiqadigan qisqa xabar (success / error / info).
6. `useToast` hook orqali butun loyihada bir xil ishlatish:
   ```ts
   const toast = useToast();
   toast.success("Saqlandi");
   toast.error("Xatolik yuz berdi");
   ```
7. `cities.ts` va `routes.ts` ni to'ldir — boshqa o'quvchilar bir xil manbadan oladi.

## Swaggerdan nima kerak?

Bu vazifada API kerak emas — sen umumiy UI infratuzilmasini yasaysan.
Lekin boshqa o'quvchilar API chaqirayotganda sening komponentlaringni ishlatadi:

- Doniyor klinikalarni yuklayotganda `LoadingSpinner` va `EmptyState`.
- Akbar review yuborganda `Toast` (success/error).
- Sunnatbek admin panelda delete tugmasi uchun `ConfirmDialog`.

## Misol kommentlar va API

### `src/components/shared/EmptyState.tsx`

```ts
// Data bo'lmaganda userga "hech narsa yo'q" emas,
// "shu yerga nimadir qo'shing" qabilida tushunarli xabar beramiz.
//
// Props:
//   - title: string
//   - description?: string
//   - icon?: ReactNode
//   - action?: { label: string; onClick: () => void }
```

### `src/components/shared/LoadingSpinner.tsx`

```ts
// Yuklanayotganini ko'rsatuvchi aylana.
// Props: size = "sm" | "md" | "lg"
```

### `src/components/shared/ErrorMessage.tsx`

```ts
// Xato bo'lsa user qo'rqmasin -
// oddiy va tushunarli xabar + "Qayta urinish" tugmasi.
//
// Props:
//   - message: string
//   - onRetry?: () => void
```

### `src/components/shared/ConfirmDialog.tsx`

```ts
// Xavfli amal (masalan delete) oldidan tasdiq so'raymiz.
// Props:
//   - open: boolean
//   - title: string
//   - description?: string
//   - confirmLabel?: string  // default: "Tasdiqlash"
//   - cancelLabel?: string   // default: "Bekor qilish"
//   - onConfirm: () => void
//   - onCancel: () => void
```

### `src/lib/toast/useToast.ts`

```ts
// Loyiha bo'yicha yagona toast API:
//   toast.success(message)
//   toast.error(message)
//   toast.info(message)
//
// Ichida store ga push qiladi, ToastContainer esa ekranda chiqaradi.
```

### `src/lib/constants/cities.ts`

```ts
// O'zbekiston shaharlari ro'yxati.
// Filter va manzil tanlovida shu manbadan foydalanamiz.
export const cities = ["Toshkent", "Samarqand", "Buxoro", "Andijon" /* ... */];
```

## Done checklist

- [ ] `EmptyState`, `LoadingSpinner`, `ErrorMessage`, `ConfirmDialog` tayyor
- [ ] `Toast` va `ToastContainer` ishlaydi (success / error / info)
- [ ] `useToast` hook orqali ishlatish oson
- [ ] `cities.ts` va `routes.ts` to'ldirilgan
- [ ] Komponentlar Storybook talab qilmaydi — har biri sodda props bilan ishlaydi
- [ ] `npm run lint` yashil

## 3 kunlik reja

### 1-kun — Asosiy reusable komponentlar
- `EmptyState.tsx`, `LoadingSpinner.tsx`, `ErrorMessage.tsx` ni yoz.
- Har biriga props bilan qayta ishlatish imkoni qo'sh.
- Bitta `examples/` sahifa yoki Storybook bo'lmasa, izohli oddiy demoda sinov qil.

### 2-kun — Toast tizimi
- `toast.store.ts` ni yarating (Zustand yoki Context).
- `Toast.tsx` va `ToastContainer.tsx` ni yoz va `app/layout.tsx` da bir marta render qiladigan qil (Sunnatbek bilan kelishib).
- `useToast` hookini yoz va boshqa o'quvchilar uchun foydalanish ko'rsatmasini README'ga yoz.

### 3-kun — ConfirmDialog va constants
- `ConfirmDialog.tsx` ni qil va Sunnatbek admin delete tugmasiga ulashga tayyorla.
- `cities.ts`, `routes.ts` ni to'ldir.
- Hamma reusable komponentlar bir xil dizaynda ekanini tekshir.
