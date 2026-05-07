# Admin — Klinika shakli (Xatolik holati)

> **Mas'ul:** Hayot (Admin Panel Engineer)
> **Sprint:** 4-hafta
> **Prioritet:** ⭐⭐ (validation UX muhim)

---

## 1. Sahifa haqida

Klinika formasi **validation xatolik** holati. Foydalanuvchi to'g'ri to'ldirmagan, submit bosganda yoki realtime validation natijasida xatolar paydo bo'ladi.

`screen.png` da yorug' rejimda 5 ta xato + red helper'lar + xato banner ko'rsatilgan.

## 2. Anatomiya (`screen.png`'dan — LIGHT)

```
Top warning banner:
- Coral background pill
- "⚠ 5 ta xato bor — quyida ko'ring"

Forma:

- Card "○ Asosiy ma'lumot":
  - Klinika nomi *: "Masalan: Central Vet" (red border)
    - "○ Bu maydon majburiy" red helper

  - Telefon raqami *: "+998" (red border, half-filled)
    - "○ Noto'g'ri format kiritildi" red helper

  - Tavsif: empty textarea (grey, no error — optional)

- Card "🗺 Manzil va Joylashuv":
  - Shahar *: "Toshkent" select (filled, no error)

  - Manzil *: empty (red border)
    - "○ Bu maydon majburiy" red helper

  - Static map preview

- Card "Rasmlar":
  - 1 ta image preview "Rasm yuklash"
  - 2-chi: empty placeholder
```

Sticky bottom bar:
- Left: outline ⊘ red "Saqlanmagan o'zgarishlar mavjud"
- Right: "Bekor qilish" outline + "Saqlash" coral

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/features/admin/components/ClinicForm.tsx` | RHF + Zod errors |
| `src/features/admin/components/FormErrorBanner.tsx` | Top warning banner |
| `src/lib/api/error.ts` | Backend xato kodlari → o'zbekcha |

## 4. shadcn

```bash
npx shadcn@latest add form alert
```

## 5. Validation UX qoidalar

### Visual hierarchy

- **Field-level error:** input red border + red helper text below
- **Form-level summary:** top warning banner with count
- **Submit attempt:** scroll to first error

### Mantiq

```tsx
import { useFormContext } from 'react-hook-form'

const { formState: { errors }, handleSubmit } = useFormContext()
const errorCount = Object.keys(errors).length

const onSubmit = (data) => {
  // Submit
}

const onError = (errors) => {
  // Scroll to first error
  const firstErrorField = Object.keys(errors)[0]
  document.querySelector(`[name="${firstErrorField}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

<form onSubmit={handleSubmit(onSubmit, onError)}>
  {errorCount > 0 && (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>{errorCount} ta xato bor — quyida ko'ring</AlertTitle>
    </Alert>
  )}
  {/* ... */}
</form>
```

## 6. Field error misol

```tsx
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

<FormField
  control={form.control}
  name="name"
  render={({ field, fieldState }) => (
    <FormItem>
      <FormLabel>Klinika nomi *</FormLabel>
      <FormControl>
        <Input
          {...field}
          placeholder="Masalan: Central Vet"
          aria-invalid={!!fieldState.error}
          className={fieldState.error ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
      </FormControl>
      <FormMessage />  {/* "Bu maydon majburiy" red */}
    </FormItem>
  )}
/>
```

## 7. Backend xato'lar handling

```tsx
mutationFn: async (data) => {
  try {
    return await createClinic(data)
  } catch (err) {
    if (err.code === 'SLUG_ALREADY_EXISTS') {
      form.setError('slug', { message: "Bu URL allaqachon ishlatilgan" })
    } else if (err.code === 'VALIDATION_ERROR') {
      // Backend Zod errors -> field errors
      err.fields?.forEach(({ path, message }) => {
        form.setError(path, { message: ERROR_MESSAGES[message] || message })
      })
    } else {
      toast.error("Saqlashda xato yuz berdi")
    }
    throw err
  }
}
```

## 8. ERROR_MESSAGES dictionary

```ts
// src/lib/api/error.ts
export const ERROR_MESSAGES = {
  REQUIRED: "Bu maydon majburiy",
  INVALID_EMAIL: "Email noto'g'ri formatda",
  INVALID_PHONE: "Noto'g'ri format kiritildi",
  TOO_SHORT: "Juda qisqa",
  TOO_LONG: "Juda uzun",
  SLUG_ALREADY_EXISTS: "Bu URL allaqachon ishlatilgan",
  CITY_REQUIRED: "Shahar tanlanishi kerak",
  IMAGE_TOO_LARGE: "Rasm hajmi 5MB dan oshmasligi kerak",
  INVALID_IMAGE_TYPE: "Faqat JPG, PNG, WebP",
  // ...
}
```

## 9. Done checklist

- [ ] Field-level error: red border + helper
- [ ] Form-level summary: top banner with count
- [ ] Submit attempt → scroll to first error
- [ ] Aria-invalid for screen readers
- [ ] Backend xatolari field'larga map'lanadi
- [ ] Real-time validation (onBlur emas, onChange)
- [ ] Required maydonlar `*` bilan belgilanadi
- [ ] Validation o'tilganda red border yo'qoladi (live feedback)
- [ ] `screen.png` ga vizual mos
