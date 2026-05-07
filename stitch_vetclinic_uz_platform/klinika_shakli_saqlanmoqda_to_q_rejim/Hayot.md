# Admin — Klinika shakli (Saqlanmoqda holati)

> **Mas'ul:** Hayot (Admin Panel Engineer)
> **Sprint:** 4-hafta
> **Prioritet:** ⭐ (UX state)

---

## 1. Sahifa haqida

Klinika formasi **saqlanayotgan** holati. Foydalanuvchi "Saqlash" tugmasini bosgandan keyin va API javob qaytguncha ko'rinadigan loading state.

`screen.png` da forma butunlay disabled, sticky bar'da "Saqlanmoqda..." tugma + spinner ko'rsatilgan.

## 2. Anatomiya (`screen.png`'dan)

```
Asosiy forma (disabled, opacity-50):
- Inputlar disabled (grayscale)
- Card'lar pointer-events-none

Sticky bottom bar:
- Left: green check + "✓ Barcha o'zgarishlar kiritildi"
- Right: "○ O'zgarish" outline (disabled) + "○ Saqlash" outline (disabled) + Coral spinner button "○ Saqlanmoqda..." disabled
```

## 3. Qayerga kod yoziladi

`yangi_klinika_bo_sh_shakl_to_q_rejim` va `klinikani_tahrirlash_to_ldirilgan_to_q_rejim` bilan **bir xil komponent**. Bu — `mutation.isPending` paytidagi state.

| Fayl | Tarkib |
|---|---|
| `src/features/admin/components/ClinicForm.tsx` | `disabled` prop |
| `src/features/admin/components/StickyFormBar.tsx` | Loading state |

## 4. Loading state mantiq

```tsx
const updateMutation = useUpdateClinic(id)
const isLoading = updateMutation.isPending

<form onSubmit={form.handleSubmit((data) => updateMutation.mutate(data))}>
  <fieldset disabled={isLoading} className="space-y-6">
    {/* All form fields */}
  </fieldset>

  <StickyFormBar
    isLoading={isLoading}
    isDirty={form.formState.isDirty}
    saveLabel={isLoading ? 'Saqlanmoqda...' : 'Saqlash'}
  />
</form>
```

## 5. Sticky bar variants

| State | Indicator | Buttons |
|---|---|---|
| Default (clean) | "Hech qanday o'zgarish yo'q" | All outline |
| Dirty (unsaved) | Amber dot + "Saqlanmagan o'zgarishlar" | Cancel + Save Draft + Save (coral) |
| **Loading (saqlanmoqda)** | **Green check + "Barcha o'zgarishlar kiritildi"** | **All disabled, Save → spinner + "Saqlanmoqda..."** |
| Saved | Green check + "Saqlandi" (3s ko'rsatadi, keyin yo'qoladi) | Hammasi qaytadan default |

## 6. Spinner button misol

```tsx
import { Loader2 } from 'lucide-react'

<Button disabled={isLoading} variant="default" className="bg-accent">
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Saqlanmoqda...
    </>
  ) : (
    'Saqlash'
  )}
</Button>
```

## 7. Loading paytida UX

- ❌ Tugmani qayta bosib bo'lmaydi (double-submit protection)
- ❌ Forma fieldlari edit qilinmaydi
- ❌ Bekor qilish tugmasi disabled (yarim saqlangan holatda chiqib ketmasin)
- ✅ Visual feedback aniq (spinner + matn o'zgaradi)

## 8. Done checklist

- [ ] `mutation.isPending` paytida `<fieldset disabled>`
- [ ] Save button spinner + "Saqlanmoqda..." matn
- [ ] Cancel button ham disabled
- [ ] Double-click protection
- [ ] Loading 5s dan ortsa "Internet aloqasi sekin..." warning
- [ ] Mutation success → button qaytadan default + toast
- [ ] Mutation error → button enabled + red helper
- [ ] `screen.png` ga vizual mos
