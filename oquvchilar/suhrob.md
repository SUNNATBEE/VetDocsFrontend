# Suhrob uchun to'liq topshiriq (Auth)

## Sening roling

yangi narsa qoshdim

Sen "kirish-chiqish eshigi"ni qilasan.
Foydalanuvchi account ochadi, login qiladi, logout qiladi.

## Qayerda kod yozasan?

### Auth API va state
- `src/features/auth/api/auth.api.ts`
- `src/features/auth/store/auth.store.ts`
- `src/features/auth/types.ts`

### Auth hooks
- `src/features/auth/hooks/useLogin.ts`
- `src/features/auth/hooks/useRegister.ts`
- `src/features/auth/hooks/useLogout.ts`
- `src/features/auth/hooks/useCurrentUser.ts`
- `src/features/auth/hooks/useRequireAuth.ts`

### Auth schema va UI
- `src/features/auth/schemas/auth.schema.ts`
- `src/features/auth/components/LoginForm.tsx`
- `src/features/auth/components/RegisterForm.tsx`
- `src/features/auth/components/ForgotPasswordForm.tsx`

### Auth pages
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`

## Nima qilasan? (oddiy tilda)

1. Register endpointni ulang.
2. Login endpointni ulang.
3. Tokenni storega yozing.
4. Logout bo'lganda token va userni tozalang.
5. Login bo'lmagan user protected sahifaga kira olmasin.

## Swaggerdan qaysi endpointlar kerak?

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- (`GET /auth/me` bo'lsa) userni olish uchun ishlating

## Qaysi faylga qanday kod yozasan? (copy-paste yo'l)

### 1) `src/features/auth/api/auth.api.ts`

Bu faylda backendga so'rov yuborasiz.

```ts
import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";

export const authApi = {
  register: (body: { email: string; password: string; name?: string }) =>
    apiClient.post(endpoints.auth.register, body),

  login: (body: { email: string; password: string }) =>
    apiClient.post(endpoints.auth.login, body),

  refresh: (refreshToken: string) =>
    apiClient.post(endpoints.auth.refresh, { refreshToken }),

  logout: (refreshToken?: string) =>
    apiClient.post(endpoints.auth.logout, refreshToken ? { refreshToken } : undefined),
};
```

### 2) `src/features/auth/hooks/useLogin.ts`

Bu faylda `authApi.login` ni chaqirib, kelgan tokenni saqlaysiz.

Kod yoniga shunaqa komment yozing:



```ts
// 1) User email/parol yuboradi
// 2) Backend accessToken qaytaradi
// 3) Tokenni store/localStoragega saqlaymiz
```

### 3) `src/features/auth/store/auth.store.ts` (yo'q bo'lsa yarating)

Ichida kamida shular bo'lsin:
- `accessToken`
- `refreshToken`
- `user`
- `setSession`
- `clearSession`

## Juda oddiy tekshiruv

1. Register bo'ling.
2. Login qiling.
3. Sahifani refresh qiling.
4. Agar user chiqib ketmasa -> yaxshi.
5. Logout bosing.
6. Protected sahifa ochilmasa -> yaxshi.

## Done checklist

- [ ] Register ishlaydi
- [ ] Login ishlaydi
- [ ] Refresh flow ishlaydi
- [ ] Logout ishlaydi
- [ ] Protected sahifa guard ishlaydi
- [ ] `npm run lint` yashil

## 1-kun / 2-kun / 3-kun reja

### 1-kun
- `auth.api.ts` da `register` va `login` endpointlarini yoz.
- `auth.schema.ts` da login/register validatsiya yoz.
- `LoginForm.tsx` ni backendga ulab test qil.

### 2-kun
- `RegisterForm.tsx` ni tugat.
- `auth.store.ts` (yo'q bo'lsa yarat) ichida token+user saqlashni qil.
- `useLogin.ts` va `useRegister.ts` (yo'q bo'lsa yarat) hooklarni yoz.

### 3-kun
- `useLogout.ts`, `useCurrentUser.ts`, `useRequireAuth.ts` (yo'q bo'lsa yarat) ni qil.
- `login/page.tsx` va `register/page.tsx` ni to'liq ishlaydigan qil.
- Refresh va logout flowni tekshir.
