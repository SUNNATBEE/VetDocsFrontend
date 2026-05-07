# Admin — Yangi klinika qo'shish (Bo'sh shakl)

> **Mas'ul:** Hayot (Admin Panel Engineer)
> **Sprint:** 4-hafta
> **Prioritet:** ⭐⭐⭐ (admin asosiy CRUD)

---

## 1. Sahifa haqida

Admin yangi klinika qo'shadi. URL: `/admin/clinics/new`. Forma juda katta — 6 ta bo'lim. Saqlanmagan o'zgarishlar bilan tark etganda warning chiqadi.

## 2. Anatomiya (`screen.png`'dan — bo'sh DARK)

```
Page header:
- H1: "Yangi klinika qo'shish"
- Right: search + UZ language

LAYOUT 70/30:

LEFT (main, 70%):
- Card 1 "○ Asosiy ma'lumot":
  - Cover image dropzone "Asosiy rasm (Cover)" — empty dashed border
  - Galereya: "+" 2 ta empty slot
  - "Rasm yuklang (JPG, PNG)" placeholder
  - Klinika nomi: "Masalan: Happy Pets" placeholder
  - Slug (URL): coral "happy-pets" auto-generated
  - Tavsif: "Klinika haqida batafsil ma'lumot..."
  - Xizmatlar: chips "Vaksina ✓" "Stomatologiya ✓" + "Qo'shish" outline
  - Shifokorlar: "Shifokorni tanlang" select

- Card 2 "Manzil va xarita":
  - Shahar: "Toshkent" select
  - Ko'cha va uy: input
  - Map preview (read-only joylanuv)

RIGHT (sidebar 30%):
- Card "Holat":
  - ⚪ Faol (active, green pill)
  - ⚪ Qoralama (gray)
  - ⚪ Yashirin (red)

- Card "SEO sozlamalari":
  - Meta title: "Title here" placeholder
  - Meta keywords: "Kalit so'z..."
  - Search preview: "Happy Pets | Toshkentdagi..."

- Card "Eslatmalar":
  - Internal admin notes textarea

Sticky bottom bar:
- Left: amber dot + "Saqlanmagan o'zgarishlar"
- Right: "Bekor qilish" outline + "Qoralama saqlash" outline + "Saqlash" coral
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/admin/clinics/new/page.tsx` | Yangi klinika sahifa |
| `src/features/admin/components/ClinicForm.tsx` | Asosiy reusable forma (new + edit) |
| `src/features/admin/components/BasicInfoSection.tsx` | Card 1 |
| `src/features/admin/components/ImageUploader.tsx` | Cover + galereya |
| `src/features/admin/components/AddressMapSection.tsx` | Card 2 (Doniyor'ning ClinicMap'ini reuse) |
| `src/features/admin/components/OpeningHoursEditor.tsx` | 7-day grid editor |
| `src/features/admin/components/StatusSection.tsx` | Sidebar status |
| `src/features/admin/components/SeoSection.tsx` | Sidebar SEO |
| `src/features/admin/components/StickyFormBar.tsx` | Pastdagi action bar |
| `src/features/admin/schemas/clinic-form.schema.ts` | Zod schema |
| `src/features/admin/api/admin-clinics.api.ts` | Create endpoint |

## 4. shadcn

```bash
npx shadcn@latest add form input textarea select radio-group card button
```

## 5. API endpoint

```
POST /api/v1/admin/clinics
Body: {
  name, slug, description,
  city, district, address, latitude, longitude,
  phone, email, website,
  services: string[],
  doctorIds: string[],
  openingHours: { Du: { open, close }, ... },
  images: string[],
  status: 'ACTIVE' | 'DRAFT' | 'HIDDEN',
  seo: { title, description, keywords },
  internalNotes: string,
}
```

## 6. Zod schema (parchasi)

```ts
export const clinicFormSchema = z.object({
  name: z.string().min(2, "Klinika nomi kamida 2 ta belgi"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Faqat kichik harf, raqam, defis"),
  description: z.string().min(20, "Tavsif kamida 20 ta belgi").max(500),
  city: z.enum(['toshkent', 'samarqand', 'buxoro', 'andijon', 'namangan', 'fargona', 'qarshi', 'nukus']),
  address: z.string().min(5),
  latitude: z.number().min(37).max(46),
  longitude: z.number().min(56).max(74),
  phone: z.string().regex(/^\+998\d{9}$/),
  services: z.array(z.string()).min(1, "Kamida 1 ta xizmat"),
  openingHours: z.record(z.object({ open: z.string(), close: z.string() }).or(z.null())),
  status: z.enum(['ACTIVE', 'DRAFT', 'HIDDEN']),
  seo: z.object({ title: z.string().max(60), description: z.string().max(160), keywords: z.string().optional() }),
})
```

## 7. Auto-generate slug

```tsx
import { useEffect } from 'react'

useEffect(() => {
  const name = form.watch('name')
  if (name && !form.formState.dirtyFields.slug) {
    form.setValue('slug', slugify(name))
  }
}, [form.watch('name')])

function slugify(s: string) {
  return s.toLowerCase()
    .replace(/[ʻ']/g, '')   // Uzbek apostrof
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
```

## 8. Image uploader

- Drag-drop zone
- File picker (click)
- Multipart upload to backend (`POST /upload`)
- Progress indicator
- Preview thumbnail
- Reorder via drag-drop (galereya)
- Validate: max 5MB, jpg/png/webp

## 9. Saqlanmagan o'zgarishlar warning

```tsx
useEffect(() => {
  const handler = (e: BeforeUnloadEvent) => {
    if (form.formState.isDirty) {
      e.preventDefault()
      e.returnValue = ''
    }
  }
  window.addEventListener('beforeunload', handler)
  return () => window.removeEventListener('beforeunload', handler)
}, [form.formState.isDirty])
```

## 10. Done checklist

- [ ] Forma 6 ta bo'limga ajratilgan
- [ ] Slug auto-generate name'dan
- [ ] Image uploader drag-drop + reorder
- [ ] Map orqali koordinata tanlanadi (Doniyor'ning ClinicMap)
- [ ] OpeningHoursEditor 7 kun
- [ ] Status radio working
- [ ] Sticky bottom bar always visible
- [ ] Saqlanmagan o'zgarishlar warning
- [ ] Validation client + server
- [ ] Successful create → toast + redirect to list
- [ ] `screen.png` ga vizual mos
