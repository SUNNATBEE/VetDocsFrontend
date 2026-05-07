# Admin — Klinikani tahrirlash (To'ldirilgan)

> **Mas'ul:** Hayot (Admin Panel Engineer)
> **Sprint:** 4-hafta
> **Prioritet:** ⭐⭐⭐

---

## 1. Sahifa haqida

Admin mavjud klinikani tahrirlaydi. URL: `/admin/clinics/[id]/edit`. Forma `yangi_klinika_bo_sh_shakl_to_q_rejim` bilan **bir xil** — faqat `defaultValues` API'dan to'ldirilgan.

`screen.png` da to'ldirilgan forma + success toast ko'rsatilgan.

## 2. Anatomiya (`screen.png`'dan)

```
Page header:
- H2: "Klinikani tahrirlash"
- Right: green pill "✓ Klinika muvaffaqiyatli saqlandi" (toast)

LAYOUT 70/30:

LEFT (main):

- Card "Umumiy ma'lumotlar":
  - Klinika nomi: "Vetlife Toshkent"
  - Slug (URL): "vetlife-toshkent"
  - Tavsif: "Vetlife Toshkent — bu zamonaviy veterinariya markazi bo'lib, biz eng yaxshi mutaxassislar va 24/7 ishlaydigan tez tibbiy yordam xizmatini taqdim etamiz. Bizda tajribali mutaxassislar va zamonaviy texnologiyaga ega."

- Card "Fotogalereya":
  - 3 ta rasm (klinika rasmlar)
  - 4-chi: dashed "+" upload more
  - Drag-drop reorder

- Card "Xizmatlar":
  - Checkbox grid:
    - ✓ Vaksinalash
    - ✓ Xirurgiya
    - ☐ Terapiya
    - ☐ Stomatologiya
    - ☐ Laboratoriya
    - ☐ Diftologiya

RIGHT sidebar:

- Card "Aloqa":
  - "+998 90 123 45 67" muted
  - "Toshkent shahri, Yunusobod"

- Card "Xaritadagi joylashuv":
  - Static map preview
  - Coordinate inputs (read-only)
  - "📍" pin

- Card "Ish vaqti":
  - 7 day grid
  - "Dam olish kuni" pill (Yakshanba uchun)
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/admin/clinics/[id]/edit/page.tsx` | Edit sahifa (Server Component, fetch initial data) |
| `src/features/admin/components/ClinicForm.tsx` | **Aynan bir xil komponent — `defaultValues` props bilan** |
| `src/features/admin/hooks/useUpdateClinic.ts` | Mutation |

## 4. Yangi va Edit ishlatish

```tsx
// new/page.tsx
export default function NewClinicPage() {
  return <ClinicForm mode="create" />
}

// [id]/edit/page.tsx
export default async function EditClinicPage({ params }) {
  const clinic = await getClinic(params.id)
  return <ClinicForm mode="edit" defaultValues={clinic} clinicId={params.id} />
}
```

## 5. Mutation hook

```ts
export function useUpdateClinic(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ClinicFormData) => updateClinic(id, data),
    onSuccess: (updatedClinic) => {
      queryClient.invalidateQueries({ queryKey: ['admin-clinics'] })
      queryClient.setQueryData(['clinic', id], updatedClinic)
      toast.success('Klinika muvaffaqiyatli saqlandi')
    },
  })
}
```

## 6. UX detallar

- **Initial load:** SSR bilan klinika ma'lumotlari yuklanadi
- **Form dirty tracking:** `formState.isDirty` — agar saqlanmagan o'zgarishlar bo'lsa, sticky bar amber dot
- **Success toast** (yuqori-o'ng) 3 soniya
- **Image gallery:** mavjud rasmlar ko'rsatiladi, x ikon orqali o'chiriladi
- **Versiya:** "Oxirgi yangilanish: 23 Okt 2025, 14:32" footer'da

## 7. Done checklist

- [ ] SSR bilan initial data
- [ ] Forma `defaultValues` bilan to'ldiriladi
- [ ] Image gallery existing rasmlar bilan to'ldiriladi
- [ ] Save → Success toast 3s
- [ ] Cache invalidate (admin list + public detail)
- [ ] Saqlanmagan o'zgarishlar warning
- [ ] Mavjud OpeningHours to'ldirilgan
- [ ] "Yana ko'rish" link `/clinics/[id]` ga
- [ ] `screen.png` ga vizual mos
