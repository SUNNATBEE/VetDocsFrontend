# Hayot — Home + Landing tajribasi (Home / About / Contact / FAQ)

## Roling

Sen saytning birinchi taassurotini yasaysan.
Foydalanuvchi domain'ga kirishi bilan sening sahifalaringni ko'radi.
Maqsad: tushunarli, sodda va professional landing tajribasi.

Diqqat: Header / Footer / mobile menyu — Yahyoda.
Reusable `EmptyState`, `LoadingSpinner`, `ErrorMessage` va Toast — Numtonda.
Sen faqat **content sahifalar** va ularning ichidagi bloklar bilan ishlaysan.

## Qayerda kod yozasan?

### Landing va static sahifalar

- `src/app/(main)/page.tsx` — Home (asosiy sahifa)
- `src/app/(main)/about/page.tsx`
- `src/app/(main)/contact/page.tsx`
- `src/app/(main)/faq/page.tsx`

### Home sahifa bloklari

- `src/components/home/HeroSection.tsx`
- `src/components/home/FeaturesSection.tsx`
- `src/components/home/HowItWorks.tsx`
- `src/components/home/CtaSection.tsx`

### Contact sahifa bloklari

- `src/components/contact/ContactInfo.tsx`
- `src/components/contact/ContactForm.tsx`

### Site konfiguratsiya

- `src/config/site.ts` — sayt nomi, qisqa ta'rifi, ijtimoiy tarmoq linklari

## Nima qilasan?

1. **Home** — Hero (sayt vazifasi va asosiy CTA), Features (3-4 ustun), HowItWorks (1-2-3 qadam), Cta (klinika qidir tugmasi).
2. **About** — loyiha nima uchun yaratilgan, kimlar uchun foydali.
3. **Contact** — telefon, email, manzil + oddiy `ContactForm` (lokal validatsiya bilan).
4. **FAQ** — eng ko'p so'raladigan 6-10 ta savol-javob (akkordeon ko'rinishida).
5. **`site.ts`** — sayt nomi, slogan, ijtimoiy tarmoqlar bitta joyda.

## Swaggerdan nima kerak?

Bu vazifada API juda kam:

- `GET /health` — backend ishlayotganini tekshirish (Home pastida statusni chiqarsangiz bo'ladi).

Hammasi UI va matn bilan bog'liq.

## Misol kommentlar

### `src/app/(main)/page.tsx`

```ts
// Home sahifa - userning birinchi taassuroti.
// Hero, Features, HowItWorks, Cta bloklarini tartib bilan ko'rsatamiz.
```

### `src/components/home/HeroSection.tsx`

```ts
// Hero - sayt nima qilishini bir qarashda tushuntiruvchi blok.
// Bitta katta sarlavha + CTA tugmasi.
```

### `src/app/(main)/contact/page.tsx`

```ts
// User biz bilan bog'lanishi uchun telefon / email / manzil + qisqa forma.
```

### `src/app/(main)/faq/page.tsx`

```ts
// Eng ko'p uchraydigan savollar.
// Javoblar akkordeon ichida ochilib-yopiladi.
```

## Done checklist

- [ ] Home sahifa Hero / Features / HowItWorks / Cta bilan tayyor
- [ ] About sahifasi tayyor
- [ ] Contact sahifasi va `ContactForm` ishlaydi
- [ ] FAQ akkordeon ko'rinishida ishlaydi
- [ ] `site.ts` to'ldirilgan
- [ ] Barcha matnlar o'zbek tilida va xatosiz
- [ ] 375px - 1280px da yaxshi ko'rinadi
- [ ] `npm run lint` yashil

## 3 kunlik reja

### 1-kun — Home
- `site.ts` ni to'ldir (sayt nomi, slogan, ijtimoiy tarmoqlar).
- `HeroSection`, `FeaturesSection`, `HowItWorks`, `CtaSection` bloklarini yoz.
- `app/(main)/page.tsx` da bloklarni tartib bilan render qil.

### 2-kun — About + Contact
- `about/page.tsx` — loyiha haqida 2-3 paragraf, qisqa tarix, qadriyatlar.
- `contact/page.tsx` — `ContactInfo` va `ContactForm` ni ulagin.
- Forma validatsiyasi (bo'sh maydon, noto'g'ri email) ishlasin.

### 3-kun — FAQ va polish
- `faq/page.tsx` — 6-10 ta savol-javob (akkordeon).
- Barcha matnlarni qayta o'qib, xato va imloni to'g'rila.
- Mobil va desktop ko'rinishlarini tekshir.
