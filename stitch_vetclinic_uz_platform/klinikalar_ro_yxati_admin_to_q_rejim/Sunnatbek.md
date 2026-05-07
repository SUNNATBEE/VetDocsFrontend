# Admin — Klinikalar ro'yxati (Dark Mode)

> **Mas'ul:** Sunnatbek (Tech Lead — Admin Panel)
> **Sprint:** 4-hafta
> **Prioritet:** ⭐⭐⭐ (admin asosiy CRUD sahifa)

---

## 1. Sahifa haqida

Admin barcha klinikalarni boshqaradi: ko'radi, qidiradi, filtrlaydi, tahrirlaydi, o'chiradi. URL: `/admin/clinics`.

## 2. Anatomiya (`screen.png`'dan — DARK)

```
LEFT SIDEBAR (Dashboard sahifa bilan bir xil)

TOP BAR:
- "Admin" + "Boshqaruv tizimi"
- Right: search + 🔄 + "Band qilish" coral

MAIN:
- H1: "Klinikalar"
- Subtitle: "247 ta klinika boshqaruvda"
- Action buttons (right):
  - "📤 CSV eksport" outline
  - "📥 CSV import" outline
  - "+ Yangi klinika qo'shish" coral

Toolbar card (dark):
- Search input "Klinika nomi, shahar yoki ID bo'yicha qidirish..."
- "≣ Filtrlar" button + count badge "3"
- Sort dropdown: "Saralash: Yangi"
- Filter chips below: "Shahar: Toshkent ×" "Holat: Faol ×" "Reyting: 4+ ×" "Tozalash"

Data table:
- Columns: ☐ | RASM | KLINIKA NOMI | SHAHAR | REYTING | HOLAT | OXIRGI YANGILANISH | "" (3-dots)
- Sortable columns ↕

Rows (10):
- ☐ | 40x40 image | "Vetlife Toshkent #CLN-1023" | "Toshkent, Yunusobod" | "★ 4.9" | green "Faol" pill | "24 Okt, 2025" | ⋮
- "ZooWell Samarqand #CLN-1024" | "Samarqand, Markaz" | "★ 4.7" | amber "Auto-tasdiq" | "23 Okt"
- "PetCare Elite" | "Toshkent, Ulug'bek" | "★ 4.8" | red "Bloklangan" | "22 Okt"
- "MedVet Lab (Draft) #CLN-1027" | "Buxoro, ..." | "—" | gray "Qoralama" | "20 Okt"
- "Shifo Vet Markazi" | "Namangan" | "★ 4.5" | "Faol" | ⋮
- "Animal Hospital UZ" | "Toshkent, Chilonzor" | "★ 4.6" | "Faol" | ⋮

Pagination:
- "1 dan 10 gacha, jami 247" left
- "← 1 2 3 ... 25 →" right
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/admin/clinics/page.tsx` | Klinikalar ro'yxati |
| `src/features/admin/components/AdminClinicsTable.tsx` | Data table |
| `src/features/admin/components/ClinicTableRow.tsx` | Bitta row |
| `src/features/admin/components/ClinicStatusPill.tsx` | Status pill (Faol/Qoralama/Bloklangan) |
| `src/features/admin/components/ClinicTableToolbar.tsx` | Search + filter + chips |
| `src/features/admin/components/BulkActionBar.tsx` | Tanlangan rowlar uchun action |
| `src/features/admin/components/ExportButton.tsx` | CSV export |
| `src/features/admin/api/admin-clinics.api.ts` | List/update/delete |

## 4. shadcn

```bash
npx shadcn@latest add table checkbox button input dropdown-menu select pagination
```

Yoki TanStack Table:
```bash
npm install @tanstack/react-table
```

## 5. API endpointlar

```
GET /api/v1/admin/clinics?search=&city=&status=&sort=updated&page=1&limit=10
GET /api/v1/admin/clinics/export?format=csv
PATCH /api/v1/admin/clinics/:id/status
DELETE /api/v1/admin/clinics/:id
POST /api/v1/admin/clinics/bulk-action  # bulk delete, bulk status change
```

## 6. Bulk action

Rowlarni checkbox bilan tanlash:
- Tanlanganda top'da bar paydo bo'ladi: "3 ta klinika tanlandi"
- Actions: "Holatni o'zgartirish", "Eksport qilish", "O'chirish" (red)

## 7. Status pill

```tsx
const STATUS_CONFIG = {
  ACTIVE: { label: 'Faol', class: 'bg-emerald-500/10 text-emerald-400' },
  PENDING: { label: 'Auto-tasdiq', class: 'bg-amber-500/10 text-amber-400' },
  BLOCKED: { label: 'Bloklangan', class: 'bg-rose-500/10 text-rose-400' },
  DRAFT: { label: 'Qoralama', class: 'bg-slate-500/10 text-slate-400' },
}
```

## 8. Action menu (3-dots)

Har bir row'da:
- 👁 Ko'rish (sayt sahifasiga o'tadi)
- ✏ Tahrirlash (`/admin/clinics/[id]/edit`)
- 🔄 Holatni o'zgartirish (modal)
- ──────
- 🗑 O'chirish (red, ConfirmDialog)

## 9. States

- ✅ **Default:** ro'yxat yuklangan
- ✅ **Loading:** Skeleton row'lar
- ✅ **Empty:** "Hali klinika qo'shilmagan" + CTA (`klinikalar_bo_sh_va_yuklanish_holatlari` design)
- ✅ **Selected rows:** bulk action bar
- ✅ **Delete confirm:** ConfirmDialog (`klinikalar_ro_yxati_admin_yorug_rejim` da ko'rinadi)
- ✅ **Filter applied:** chips ko'rinadi

## 10. Done checklist

- [ ] Search debounced (300ms)
- [ ] Sort qiymati URL'da `?sort=name&order=asc`
- [ ] Pagination URL'da `?page=2`
- [ ] Filter chips removable
- [ ] Bulk select bar paydo bo'ladi
- [ ] Action menu 3-dots ishlaydi
- [ ] Delete ConfirmDialog'siz o'chmaydi
- [ ] CSV eksport ishlaydi (file download)
- [ ] Status pill rangi to'g'ri
- [ ] Mobile'da horizontal scroll table
- [ ] `screen.png` ga vizual mos
