# Kirish (Login) — Desktop

> **Mas'ul:** Suhrob (Authentication Engineer)
> **Sprint:** 2-hafta
> **Prioritet:** ⭐⭐⭐ (auth yo'q bo'lsa, hech narsa ishlamaydi)

---

## 1. Sahifa haqida

Foydalanuvchi tizimga kirish uchun email + parol kiritadi. Muvaffaqiyatli kirgandan keyin bosh sahifaga (yoki `?redirect=` parametri bo'yicha) qaytariladi.

## 2. Sahifa anatomiyasi (`screen.png`'dan)

- **Split-screen layout** (50/50)
- **Chap tomon (decorative):** teal-coral gradient fon + veterinariya rassom illustratsiyasi + testimonial quote (5 yulduz)
- **O'ng tomon (forma):**
  - "← Bosh sahifaga qaytish" link
  - H1: "Hisobingizga kiring"
  - Subheading
  - Social auth: "Google" + "Telegram" buttons
  - Divider: "yoki email orqali"
  - Email input (mail ikon)
  - Parol input (show/hide ikon)
  - Row: "Meni eslab qol" checkbox + "Parolni unutdingizmi?" coral link
  - Coral submit button: "Kirish"
  - Pastda: "Hisobingiz yo'qmi? Ro'yxatdan o'ting"
- **Success toast:** "Muvaffaqiyatli! Tizimga muvaffaqiyatli kirdingiz" (yuqori-o'ng)

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(auth)/layout.tsx` | Split-screen wrapper, chap dekorativ blok |
| `src/app/(auth)/login/page.tsx` | Login sahifa |
| `src/features/auth/components/LoginForm.tsx` | RHF + Zod forma |
| `src/features/auth/schemas/auth.schema.ts` | Zod schemas (loginSchema) |
| `src/features/auth/api/auth.api.ts` | `loginApi(data)` axios call |
| `src/features/auth/hooks/useLogin.ts` | TanStack mutation hook |
| `src/features/auth/store/auth.store.ts` | Zustand: user, accessToken |

## 4. shadcn

```bash
npx shadcn@latest add form input label button checkbox separator
```

## 5. API endpoint

```
POST /api/v1/auth/login
Body: { email: string, password: string }
Response: { success: true, data: { user, accessToken } }
         + httpOnly refreshToken cookie (backend o'rnatadi)
```

## 6. Zod schema

```ts
export const loginSchema = z.object({
  email: z.string().email("Email noto'g'ri formatda"),
  password: z.string().min(8, "Parol kamida 8 ta belgi bo'lishi kerak"),
})
```

## 7. States

- ✅ **Default:** bo'sh forma
- ✅ **Focused:** input'da teal border + soft glow
- ✅ **Validation error:** red border + "Email noto'g'ri formatda" helper
- ✅ **Loading:** button disabled + spinner + "Kirish..."
- ✅ **API error:**
  - `INVALID_CREDENTIALS` → "Email yoki parol noto'g'ri"
  - `USER_BLOCKED` → "Hisobingiz bloklangan, admin bilan bog'laning"
  - Network → "Internet aloqasi yo'q. Qayta urinib ko'ring"
- ✅ **Success:** toast + `router.push('/')`

## 8. Backend xato kodlari → O'zbekcha (`src/lib/api/error.ts`)

```ts
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Email yoki parol noto'g'ri",
  USER_BLOCKED: "Hisobingiz bloklangan",
  VALIDATION_ERROR: "Ma'lumotlarni to'g'ri kiriting",
  // ...
}
```

## 9. Done checklist

- [ ] Email + parol Zod orqali validatsiya
- [ ] Login muvaffaqiyatli → access token Zustand store'ga, refresh httpOnly cookie
- [ ] `localStorage.setItem('token', ...)` **YOZILMAGAN** (XSS xavfi)
- [ ] Show/hide password toggle ishlaydi
- [ ] "Parolni unutdingizmi?" → `/forgot-password`
- [ ] Loading state'da button qayta bosib bo'lmaydi
- [ ] Tab navigation tartibi to'g'ri (a11y)
- [ ] `screen.png` ga vizual mos
