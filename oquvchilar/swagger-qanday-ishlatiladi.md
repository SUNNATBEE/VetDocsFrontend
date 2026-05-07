# Swagger qanday ishlatiladi (juda oson tushuntirish)

## Swagger nima?

Swagger bu backendning menyusi.
Restorandagi menyuda taomlar bo'lgani kabi, Swaggerda API yo'llar bo'ladi.

Masalan bilib olasiz:
- qaysi yo'lga uriladi (`/auth/login`)
- qaysi usul (`POST`, `GET`, `PATCH`, `DELETE`)
- nima yuboramiz (`body`)
- nima qaytadi (`response`)

## Bizning Swagger manzili

- `https://vetclinicbackend.up.railway.app/docs/`

## Swaggerga kirish

Agar login so'rasa, mana buni kiriting:
- Login: `mol`
- Parol: `molchi2026`

## 30 soniyada test qilish

1. `GET /health` ni oching.
2. `Try it out` bosing.
3. `Execute` bosing.
4. Agar `success: true` chiqsa - API tirik.

## Endpointni qayerdan olaman?

1. Swagger sahifani oching.
2. Kerakli bo'limni toping:
   - `auth`
   - `clinics`
   - `reviews`
   - `admin`
3. Kerakli endpointni bosing.
4. Endpoint nomini nusxa oling.

Misol:
- Swaggerda: `POST /api/v1/auth/login`
- Frontend faylda sizga kerak bo'ladigan qism: `/auth/login`

## Frontendda to'liq URL qanday yasaladi?

`.env.local` ichida base URL bo'ladi:

`NEXT_PUBLIC_API_URL=https://vetclinicbackend.up.railway.app/api/v1`

Keyin endpoint qo'shiladi:

- Base URL: `https://vetclinicbackend.up.railway.app/api/v1`
- Endpoint: `/auth/login`
- To'liq URL: `https://vetclinicbackend.up.railway.app/api/v1/auth/login`

## Tezkor endpoint ro'yxat

### Public
- `GET /health`
- `GET /clinics/nearby`
- `GET /clinics/:id`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

### User token bilan
- `POST /clinics/:id/reviews`

### Admin
- `GET /admin/dashboard`
- `GET/POST/PATCH/DELETE /admin/clinics...`
- `GET/DELETE /admin/reviews...`
- `GET/PATCH/DELETE /admin/users...`

## Xavfsizlik qoidasi

- Bu login/parolni faqat o'qish va test uchun ishlating.
- `.env.local` ni GitHubga push qilmang.
- Tokenni chatga yoki screenshotga tarqatmang.
