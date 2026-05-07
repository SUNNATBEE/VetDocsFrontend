# Ro'yxatdan o'tish (Register) — Desktop

> **Mas'ul:** Suhrob (Authentication Engineer)
> **Sprint:** 2-hafta
> **Prioritet:** ⭐⭐⭐

---

## 1. Sahifa haqida

Yangi foydalanuvchi hisob yaratadi. Backend valid email + telefon (+998) talab qiladi. Parol kuchi indikatori mavjud. Muvaffaqiyatli ro'yxat → avtomatik login → bosh sahifa.

## 2. Sahifa anatomiyasi (`screen.png`'dan)

- **Split-screen layout** (chap dekorativ + o'ng forma)
- **Chap tomon:** teal gradient + paw logo "VetClinic UZ" + 2 ta xizmat card ("Ishonch", "24/7") + pastda welder bilan it rasmi
- **O'ng tomon:**
  - H1: "Ro'yxatdan o'ting"
  - Subheading
  - Inputlar:
    - F.I.SH (To'liq ismingiz)
    - Telefon raqamingiz (+998 mask)
    - Email manzilingiz — xato holati: red border + "Email noto'g'ri formatda"
    - Parol (kuchi indikatori 4 segment: Kuchsiz/O'rtacha kuchli)
    - Parolni tasdiqlang
  - Checkbox: "Men [Foydalanish shartlari]ga roziman"
  - Coral submit: "Kirish..." (loading state ham)
  - Pastda: "Sizda hisob bormi? Tizimga kirish"

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(auth)/register/page.tsx` | Register sahifa |
| `src/features/auth/components/RegisterForm.tsx` | RHF + Zod forma |
| `src/features/auth/components/PasswordStrengthMeter.tsx` | 4 segmentli indikator |
| `src/features/auth/hooks/useRegister.ts` | Mutation hook |
| `src/lib/utils/phone-mask.ts` | +998 mask helper |

## 4. shadcn

```bash
npx shadcn@latest add form input label button checkbox progress
```

## 5. API endpoint

```
POST /api/v1/auth/register
Body: {
  fullName: string,
  phone: string,    // +998901234567
  email: string,
  password: string
}
Response: { success: true, data: { user, accessToken } }
```

## 6. Zod schema

```ts
export const registerSchema = z.object({
  fullName: z.string().min(2, "Ism kamida 2 ta belgi"),
  phone: z.string().regex(/^\+998\d{9}$/, "+998 bilan boshlangan 9 raqam"),
  email: z.string().email("Email noto'g'ri formatda"),
  password: z.string()
    .min(8, "Kamida 8 ta belgi")
    .regex(/[A-Z]/, "Bitta katta harf bo'lishi kerak")
    .regex(/[0-9]/, "Bitta raqam bo'lishi kerak"),
  confirmPassword: z.string(),
  termsAccepted: z.literal(true, { errorMap: () => ({ message: "Shartlarga rozilik kerak" }) }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Parollar mos kelmaydi",
  path: ["confirmPassword"],
})
```

## 7. Parol kuchi indikatori mantiq

```ts
function calculatePasswordStrength(password: string): 0 | 1 | 2 | 3 | 4 {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score as 0 | 1 | 2 | 3 | 4
}

// 0-1: Kuchsiz (red)
// 2: O'rtacha (amber)
// 3: Yaxshi (teal)
// 4: Kuchli (emerald)
```

## 8. States

- ✅ Default
- ✅ Email validation error (`screen.png`'da ko'rsatilgan)
- ✅ Loading on submit ("Kirish..." button)
- ✅ Backend xato:
  - `EMAIL_TAKEN` → "Bu email allaqachon ro'yxatdan o'tgan"
  - `PHONE_TAKEN` → "Bu telefon allaqachon mavjud"
- ✅ Success toast + redirect

## 9. Done checklist

- [ ] +998 mask telefon input'ida
- [ ] Parol kuchi real-time hisoblanadi
- [ ] Confirm password mos emas → red helper
- [ ] Terms checkbox bosilmasa submit disabled
- [ ] Muvaffaqiyatli ro'yxat → avtomatik login → bosh sahifa
- [ ] Backend xato kodlari Uzbekcha tarjima
- [ ] `screen.png` ga vizual mos
