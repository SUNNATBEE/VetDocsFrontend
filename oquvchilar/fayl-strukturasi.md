# Frontend fayl strukturasi (professional + oson)

Qisqa gap: har narsa o'z papkasida bo'lsa, kod yo'qolmaydi.

```txt
src/
  app/                      # Sahifalar (routing)
    (auth)/                 # login/register
    (main)/                 # user ko'radigan sahifalar
    admin/                  # admin panel sahifalari

  features/                 # Har bir modulning "uyi"
    auth/
      api/                  # auth.api.ts
      hooks/
      types.ts
    clinics/
      api/                  # clinics.api.ts
      hooks/
      types.ts
    reviews/
      api/                  # reviews.api.ts
      hooks/
      types.ts
    admin/
      api/                  # admin.api.ts
      hooks/
      types.ts

  lib/
    api/
      client.ts             # umumiy fetch wrapper
      endpoints.ts          # barcha endpoint yo'llari
      error.ts              # xatoni bitta formatga keltiradi

  config/
    env.ts                  # NEXT_PUBLIC_API_URL
```

## Qaysi kod qayerga yoziladi?

- Endpoint stringlar -> `src/lib/api/endpoints.ts`
- Fetch/POST/PATCH/DELETE umumiy logika -> `src/lib/api/client.ts`
- Modulga tegishli API funksiya -> `src/features/<modul>/api/*.api.ts`
- Type lar -> `src/features/<modul>/types.ts`
- UI chaqirishi (hook) -> `src/features/<modul>/hooks/*.ts`

## Oltin qoida

1. Bir xil fetch kodini qayta yozmang, `apiClient`dan foydalaning.
2. Endpointni har joyda qo'lda yozmang, `endpoints.ts`dan oling.
3. Har API funksiya bitta ish qilsin (masalan faqat login).
