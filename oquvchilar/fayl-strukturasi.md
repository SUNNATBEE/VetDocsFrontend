# Frontend fayl strukturasi

Qisqa qoida: har narsa o'z papkasida bo'lsa, kod yo'qolmaydi va konflikt kamayadi.

```txt
src/
  app/                      # Sahifalar (App Router)
    (auth)/                 # login / register
    (main)/                 # foydalanuvchi ko'radigan sahifalar
    admin/                  # admin panel sahifalari

  features/                 # Har bir modulning "uyi"
    auth/
      api/                  # auth.api.ts
      hooks/
      schemas/
      store/
      components/
      types.ts
    clinics/
      api/                  # clinics.api.ts
      hooks/
      components/
      types.ts
    reviews/
      api/                  # reviews.api.ts
      hooks/
      components/
      types.ts
    admin/
      api/                  # admin.api.ts
      hooks/
      components/
      types.ts

  components/
    layout/                 # Header, Footer, MobileNav, ThemeToggle
    shared/                 # EmptyState, LoadingSpinner, ErrorMessage, ConfirmDialog, Toast
    home/                   # Landing bloklari (Hero, Features, ...)
    contact/                # ContactInfo, ContactForm

  lib/
    api/
      client.ts             # umumiy fetch wrapper
      endpoints.ts          # barcha endpoint yo'llari
      error.ts              # xatoni bitta formatga keltiradi
    auth/
      token.ts              # access / refresh token saqlash
      jwt.ts                # token decode helper
    toast/
      toast.store.ts        # toast state
      useToast.ts           # toast.success / toast.error / toast.info
    constants/
      cities.ts
      routes.ts

  config/
    env.ts                  # NEXT_PUBLIC_API_URL
    site.ts                 # sayt nomi, slogan, ijtimoiy tarmoqlar
```

## Qaysi kod qayerga yoziladi?

| Tip | Joy |
| --- | --- |
| Endpoint stringlar | `src/lib/api/endpoints.ts` |
| Umumiy fetch logikasi (GET/POST/PATCH/DELETE) | `src/lib/api/client.ts` |
| Modulga tegishli API funksiya | `src/features/<modul>/api/*.api.ts` |
| Type lar | `src/features/<modul>/types.ts` |
| UI chaqiradigan hook | `src/features/<modul>/hooks/*.ts` |
| Modulga tegishli komponent | `src/features/<modul>/components/*.tsx` |
| Loyiha bo'yicha umumiy komponent | `src/components/shared/*.tsx` |
| Layout (Header / Footer / Mobile menyu) | `src/components/layout/*.tsx` |
| Sayt konfiguratsiyasi | `src/config/site.ts`, `src/config/env.ts` |

## Oltin qoidalar

1. Bir xil fetch kodini qayta yozmang — `apiClient` dan foydalaning.
2. Endpointni har joyda string sifatida yozmang — `endpoints.ts` dan oling.
3. Har API funksiya bitta ish qilsin (masalan faqat `login`, faqat `getById`).
4. Komponent papkasi modulga tegishli bo'lsa `features/<modul>/components` da, hammaga umumiy bo'lsa `components/shared` da yashasin.
5. Konstantani magic string sifatida yozmang — `lib/constants` ga olib chiqing.
