# Hayot uchun to'liq topshiriq (Content + Static Pages)

## Sening roling

Sen endi eng oson va tartibli vazifani qilasan:
saytdagi matnlar, oddiy sahifalar va reusable content bloklarini tayyorlaysan.

## Qayerda kod yozasan?

### Static sahifalar
- `src/app/(main)/about/page.tsx`
- `src/app/(main)/contact/page.tsx`

### Reusable content komponentlar
- `src/components/shared/EmptyState.tsx`
- `src/components/shared/LoadingSpinner.tsx`
- `src/components/shared/ErrorMessage.tsx`

### Content constants (yo'q bo'lsa yarat)
- `src/lib/constants/cities.ts`
- `src/lib/constants/routes.ts`
- `src/config/site.ts`

## Nima qilasan? (oddiy tilda)

1. About sahifasiga loyiha haqida oddiy matn yozasan.
2. Contact sahifasiga telefon, email, manzil blokini qo'yasan.
3. `EmptyState`, `LoadingSpinner`, `ErrorMessage` ni hamma sahifada ishlatsa bo'ladigan qilasan.
4. Shaharlar ro'yxatini bitta joyga (`cities.ts`) yozib qo'yasan.
5. Sayt nomi va qisqa ta'rifni `site.ts` ichiga yozasan.

## Swaggerdan qaysi endpointlar kerak?

Bu vazifada API juda kam:
- `GET /health` (backend ishlayotganini bilish uchun)

Asosiy ish UI va matn bilan bo'ladi.

## Qaysi faylga qanday komment yozasan?

### `src/app/(main)/about/page.tsx`

```ts
// Bu sahifada loyiha nima uchun yaratilganini oddiy tilda tushuntiramiz.
```

### `src/app/(main)/contact/page.tsx`

```ts
// User bizga bog'lanishi uchun telefon/email/manzilni ko'rsatamiz.
```

### `src/components/shared/ErrorMessage.tsx`

```ts
// Xato bo'lsa user qo'rqmasin, oddiy va tushunarli xabar beramiz.
```

## Done checklist

- [ ] About sahifa tayyor
- [ ] Contact sahifa tayyor
- [ ] `EmptyState`, `LoadingSpinner`, `ErrorMessage` reusable
- [ ] `cities.ts` va `site.ts` to'ldirilgan
- [ ] Barcha matnlar o'zbek tilida
- [ ] `npm run lint` yashil

## 1-kun / 2-kun / 3-kun reja

### 1-kun
- `about/page.tsx` va `contact/page.tsx` ni chiroyli qilib yoz.
- Matnlarni oddiy va tushunarli qil.

### 2-kun
- `EmptyState.tsx`, `LoadingSpinner.tsx`, `ErrorMessage.tsx` ni tayyorla.
- Har biriga props bilan qayta ishlatish imkoni qo'sh.

### 3-kun
- `cities.ts`, `routes.ts`, `site.ts` ni to'ldir.
- Barcha matnlarni bir marta o'qib, xatolarini to'g'rila.
- `npm run lint` qilib topshir.
