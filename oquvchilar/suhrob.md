# Suhrob — Auth (Register / Login / Logout)

## Roling

Sen saytning "kirish-chiqish eshigi"ni yasaysan.
Foydalanuvchi shu yerda hisob ochadi, kiradi, chiqadi va parolni tiklaydi.

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

### Validatsiya va UI

- `src/features/auth/schemas/auth.schema.ts`
- `src/features/auth/components/LoginForm.tsx`
- `src/features/auth/components/RegisterForm.tsx`
- `src/features/auth/components/ForgotPasswordForm.tsx`

### Auth sahifalar

- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`

## Nima qilasan?

1. Register endpointni ulang.
2. Login endpointni ulang va kelgan tokenni saqlang.
3. Logout bo'lganda token va `user` ni tozalang.
4. Refresh oqimi ishlashini ta'minlang (`apiClient` Sunnatbek tomonidan tayyorlangan).
5. Login bo'lmagan user protected sahifaga kira olmasligini tekshiring.

## Swaggerdan qaysi endpointlar kerak?

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me` (mavjud bo'lsa) — joriy userni olish uchun

## Asosiy fayllar

### `src/features/auth/api/auth.api.ts`

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
    apiClient.post(
      endpoints.auth.logout,
      refreshToken ? { refreshToken } : undefined,
    ),
};
```

### `src/features/auth/hooks/useLogin.ts`

```ts
// 1) User email/parol yuboradi
// 2) Backend accessToken qaytaradi
// 3) Tokenni store/localStorage ga saqlaymiz
// 4) Xato bo'lsa userga tushunarli xabar chiqaramiz
```

### `src/features/auth/store/auth.store.ts`

Ichida kamida shular bo'lsin:

- `accessToken`
- `refreshToken`
- `user`
- `setSession(...)`
- `clearSession()`

## Tezkor qo'lda test

1. Register bo'l.
2. Login qil.
3. Sahifani refresh qil — sessiya saqlanib tursin.
4. Logout bos — protected sahifa ochilmasligi kerak.

## Done checklist

- [ ] Register ishlaydi
- [ ] Login ishlaydi
- [ ] Refresh oqimi ishlaydi
- [ ] Logout ishlaydi
- [ ] Forgot password formasi tayyor
- [ ] Protected sahifa guard ishlaydi
- [ ] `npm run lint` yashil

## 3 kunlik reja

### 1-kun
- `auth.api.ts` da `register` va `login` ni ulang.
- `auth.schema.ts` da validatsiya yozing.
- `LoginForm.tsx` ni backendga ulab test qiling.

### 2-kun
- `RegisterForm.tsx` ni tugating.
- `auth.store.ts` ichida token va user saqlashni qiling.
- `useLogin.ts`, `useRegister.ts` ni yozing.

### 3-kun
- `useLogout.ts`, `useCurrentUser.ts`, `useRequireAuth.ts` ni qiling.
- `login/page.tsx` va `register/page.tsx` ni yakunlang.
- `ForgotPasswordForm.tsx` ni tayyorlang va refresh / logout oqimini tekshiring.
