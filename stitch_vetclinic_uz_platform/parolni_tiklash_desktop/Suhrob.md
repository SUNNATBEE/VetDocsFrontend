# Parolni tiklash (Forgot Password) — Desktop

> **Mas'ul:** Suhrob (Authentication Engineer)
> **Sprint:** 2-hafta (yoki Phase 2 — backend tayyor bo'lganda)
> **Prioritet:** ⭐⭐ (MVP'da bo'lmasligi mumkin, lekin UI tayyorlanadi)

---

## 1. Sahifa haqida

Foydalanuvchi parolini esidan chiqarib qo'yganda email kiritib, tiklash havolasi oladi. Bu sahifa faqat email so'raydi. Email bo'yicha kelgan link `/reset-password/[token]` sahifasiga olib boradi (alohida sahifa, Phase 2).

## 2. Anatomiya (`screen.png`'dan)

- VetClinic UZ logo (markazda yuqorida)
- Markazlangan card (440px max-width):
  - Yumaloq teal background + reload ikon
  - H2: "Parolni tiklash"
  - Subheading: "Sizga tiklash havolasi yuboriladi"
  - Email input ("Email kiriting" placeholder)
  - Coral full-width button: "Parolni tiklash"
  - "← Kirishga qaytish" link
- Fon'da it rasmi (decorative, low opacity)

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(auth)/forgot-password/page.tsx` | Asosiy sahifa |
| `src/app/(auth)/reset-password/[token]/page.tsx` | Token bo'yicha yangi parol kiritish (Phase 2) |
| `src/features/auth/components/ForgotPasswordForm.tsx` | Email forma |
| `src/features/auth/api/auth.api.ts` | `requestPasswordReset(email)` |

## 4. shadcn

```bash
npx shadcn@latest add form input label button card
```

## 5. API endpoint

```
POST /api/v1/auth/forgot-password
Body: { email: string }
Response: { success: true } (har doim — email mavjudligini sir saqlaydi)
```

**Xavfsizlik:** Email mavjud bo'lsa ham, bo'lmasa ham `success: true` qaytariladi. Bu enumeration attack'dan himoya. UI shunchaki "Agar email ro'yxatdan o'tgan bo'lsa, sizga xat keldi" deydi.

## 6. Zod schema

```ts
export const forgotPasswordSchema = z.object({
  email: z.string().email("Email noto'g'ri formatda"),
})
```

## 7. States

- ✅ **Default:** bo'sh email input
- ✅ **Validation error:** noto'g'ri email format
- ✅ **Loading:** button disabled + spinner
- ✅ **Success:** card o'rniga success message:
  > "Email yuborildi! Pochta qutingizni tekshiring va havola orqali parolni yangilang."
  - "Kirishga qaytish" link
- ✅ **Rate limit:** "Juda ko'p urinish. 5 daqiqadan keyin qayta urining"

## 8. Done checklist

- [ ] Email Zod orqali validatsiya
- [ ] Submit muvaffaqiyatli → success state ko'rsatiladi
- [ ] "Kirishga qaytish" link `/login` ga olib boradi
- [ ] Backend xato kodlari Uzbekcha tarjima
- [ ] Rate limiting UI'da ko'rsatiladi
- [ ] Mobile responsive (375px)
- [ ] `screen.png` ga vizual mos
