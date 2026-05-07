# O'quvchilar uchun yo'l xarita (juda sodda)

Bu papka sizga "qayerda kod yozaman?" degan savolga tez javob beradi.

## Avval nima o'qiladi?

1. `swagger-qanday-ishlatiladi.md`
2. `fayl-strukturasi.md`
3. O'zingizga tegishli fayl (`suhrob.md`, `doniyor.md`, ...)

## Ishlash qoidasi

1. Faqat o'zingizga berilgan fayllarda ishlang.
2. Har ish tugagach tekshiring:
   - `npm run lint`
   - `npm run build`
3. Branch nomi aniq bo'lsin:
   - `feature/ism-vazifa` (masalan: `feature/suhrob-auth`)

## Kim nima qiladi?

- `sunnatbek.md` -> Tech Lead + Admin API
- `suhrob.md` -> Auth (register/login/logout)
- `doniyor.md` -> Clinics (list/detail/map)
- `akbar.md` -> Reviews + Profile
- `yahyo.md` -> UI/UX + reusable komponentlar
- `hayot.md` -> Content va static sahifalar

## Muhim eslatma

- API base URL: `NEXT_PUBLIC_API_URL`
- Endpointlar: Swaggerdagi `/api/v1` dan keyingi qismni olamiz.
- Kodni oddiy yozing: kichik funksiya, tushunarli nom, ko'p murakkabliksiz.
