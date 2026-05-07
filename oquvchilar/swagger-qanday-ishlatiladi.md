# Swagger qanday ishlatiladi

## Swagger nima?

Swagger — bu backendning menyusi.
Restorandagi menyuda taomlar bo'lgani kabi, Swaggerda API yo'llari tartibga solingan.

Swagger yordamida:

- qaysi yo'lga uriladi (masalan `/auth/login`)
- qaysi metod ishlatiladi (`GET`, `POST`, `PATCH`, `DELETE`)
- qanday `body` yuboriladi
- qanday `response` qaytadi

— shularning hammasini bir joydan ko'rasiz.

## Bizning Swagger manzili

- `https://vetclinicbackend.up.railway.app/docs/`

Login so'ralsa:

- Login: `mol`
- Parol: `molchi2026`

## 30 soniyada test qilish

1. `GET /health` ni oching.
2. `Try it out` tugmasini bosing.
3. `Execute` ni bosing.
4. `success: true` chiqsa — backend tirik.

## Endpointni qanday olaman?

1. Swagger sahifani oching.
2. Kerakli bo'limni toping:
   - `auth`
   - `clinics`
   - `reviews`
   - `admin`
3. Endpointni bosing va nomini nusxa oling.

Misol:

- Swaggerda: `POST /api/v1/auth/login`
- Frontendda kerak bo'ladigan qism: `/auth/login`

## Frontendda to'liq URL qanday yasaladi?

`.env.local` ichida:

```
NEXT_PUBLIC_API_URL=https://vetclinicbackend.up.railway.app/api/v1
```

So'ng:

- Base URL: `https://vetclinicbackend.up.railway.app/api/v1`
- Endpoint: `/auth/login`
- To'liq URL: `https://vetclinicbackend.up.railway.app/api/v1/auth/login`

## Tezkor endpoint ro'yxati

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
- `GET /admin/clinics`
- `POST /admin/clinics`
- `PATCH /admin/clinics/:id`
- `DELETE /admin/clinics/:id`
- `GET /admin/users`
- `PATCH /admin/users/:id/role`
- `GET /admin/reviews`
- `DELETE /admin/reviews/:id`

## Xavfsizlik qoidalari

- Yuqoridagi login va parolni faqat o'qish va lokal test uchun ishlating.
- `.env.local` ni hech qachon GitHub'ga push qilmang.
- Tokenni chatga, screenshotga yoki kommitga qo'shmang.
- Production token va dev token aralashmasin.
