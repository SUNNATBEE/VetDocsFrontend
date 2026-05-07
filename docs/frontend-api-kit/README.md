# Frontend API Kit (Student Edition)

Bu papka o'quvchilar uchun tayyor API qatlamini beradi. Maqsad: endpointlar bilan adashmaslik, bir xil standartda ishlash, va tezroq integratsiya qilish.

## Tez start

1. Fayllarni frontend loyihangizga ko'chiring:
   - `src/lib/api/apiClient.js`
   - `src/lib/api/auth.api.js`
   - `src/lib/api/clinics.api.js`
   - `src/lib/api/reviews.api.js`
2. `apiClient.js` ichida `BASE_URL`ni moslang:
   - local: `http://localhost:4000/api/v1`
   - prod: sizning backend URL
3. Login qilgach:
   - `setAccessToken(data.accessToken)`
   - `setRefreshToken(data.refreshToken)`
4. Har protected requestdan oldin token yuborish avtomatik ishlaydi.

## Team bo'yicha taqsimot

- O'quvchi A: `auth.api.js` (register/login/refresh/logout)
- O'quvchi B: `clinics.api.js` (nearby/detail)
- O'quvchi C: `reviews.api.js` (create/update/delete review)
- Tech Lead: `admin/*` endpointlar va role-protected flow

## Endpointlar (aniq)

### Public
- `GET /health`
- `GET /clinics/nearby?lat&lng&radiusKm`
- `GET /clinics/:id`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

### User token talab qiladi
- `POST /clinics/:id/reviews`

### Faqat admin panel uchun (sizga)
- `GET /admin/dashboard`
- `GET /admin/clinics`
- `POST /admin/clinics`
- `GET /admin/clinics/:id`
- `PATCH /admin/clinics/:id`
- `DELETE /admin/clinics/:id`
- `GET /admin/reviews`
- `DELETE /admin/reviews/:id`
- `GET /admin/users`
- `PATCH /admin/users/:id/role`
- `DELETE /admin/users/:id`

## Javob formati (backend contract)

- Success:
  - `{ success: true, data: ... }`
- Error:
  - `{ success: false, error: { code, message, details? }, meta: { requestId } }`

`apiClient.js` shu envelope'ni bir xil qayta ishlaydi va xatoda `ApiError` throw qiladi.

## Swagger source

- Swagger: `https://vetclinicbackend.up.railway.app/docs/`
- Endpoint pathlarni Swagger'dan oling, keyin `BASE_URL` bilan birlashtiring.
