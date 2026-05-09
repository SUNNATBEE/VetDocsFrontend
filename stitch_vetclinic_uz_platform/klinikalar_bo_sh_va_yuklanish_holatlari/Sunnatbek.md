# Admin — Klinikalar bo'sh va yuklanish holatlari

> **Mas'ul:** Sunnatbek (Tech Lead — Admin Panel)
> **Sprint:** 4-hafta
> **Prioritet:** ⭐ (UX polish)

---

## 1. Sahifa haqida

Admin klinikalar ro'yxati sahifasining 2 ta state'i:
1. **Loading** — yuklash skeleton
2. **Empty** — hali biror klinika qo'shilmagan

`screen.png` da empty state ko'rsatilgan: katta illustration + CTA + sticky bottom action.

## 2. Anatomiya (`screen.png`'dan — DARK)

### Loading state (yuqori qism):
```
- Page header: "Klinikalar boshqaruvi" + "+ Klinika qo'shish" coral
- Sub-title: "Klinikalar ro'yxati (Loading)"
- 2 ta dark gray pulse line (search + sort)

- Table header (dark):
  - KLINIKA | MANZIL | STATUS | REYTING | AMALLAR

- 1 ta loading row:
  - Pulse rectangles (image + name + city + status pill + rating + actions)

- Empty area (gray pulse rectangle takes space)
```

### Empty state (pastki qism):
```
Center card (dashed border):
- Top: search icon (square gray) + magnifier
- H2: "Hali klinika qo'shilmagan"
- Body: "Tizimga hozircha hech qanday veterinariya klinikasi mavjud emas. Yangi klinika qo'shish orqali ishni boshlang."
- Coral filled CTA: "+ Birinchi klinikani qo'shing"
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/admin/clinics/loading.tsx` | Next.js loading.tsx |
| `src/features/admin/components/AdminClinicsTableSkeleton.tsx` | Loading skeleton |
| `src/components/shared/EmptyState.tsx` | Numton'ning komponenti, qayta foydalanish |

## 4. Loading skeleton

```tsx
import { Skeleton } from '@/components/ui/skeleton'

export function AdminClinicsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-80" />  {/* search */}
        <Skeleton className="h-10 w-32" />  {/* sort */}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 bg-card border-b">
          {['KLINIKA', 'MANZIL', 'STATUS', 'REYTING', 'OXIRGI', 'AMALLAR'].map((label) => (
            <Skeleton key={label} className="h-4 w-20" />
          ))}
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-4 p-4 border-b">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 5. Empty state

```tsx
import { EmptyState } from '@/components/shared/EmptyState'
import { Building2, Plus } from 'lucide-react'

<EmptyState
  variant="admin-clinics"
  icon={<Building2 className="h-12 w-12" />}
  title="Hali klinika qo'shilmagan"
  description="Tizimga hozircha hech qanday veterinariya klinikasi mavjud emas. Yangi klinika qo'shish orqali ishni boshlang."
  action={{
    label: '+ Birinchi klinikani qo'shing',
    onClick: () => router.push('/admin/clinics/new')
  }}
/>
```

## 6. State decision tree

```tsx
const { data: clinics, isLoading, error } = useAdminClinics(filters)

if (isLoading) return <AdminClinicsTableSkeleton />
if (error) return <ErrorState onRetry={refetch} />
if (clinics.length === 0 && !filters.search && !filters.city) return <EmptyState variant="admin-clinics" />
if (clinics.length === 0) return <EmptyState variant="filter-no-results" />
return <AdminClinicsTable clinics={clinics} />
```

## 7. Variants taqiq

| Variant | Hach narsa qo'shilmagan | Filter natija yo'q |
|---|---|---|
| Title | "Hali klinika qo'shilmagan" | "Hech narsa topilmadi" |
| Description | "Yangi qo'shish orqali boshlang" | "Filtrlarni o'zgartiring" |
| CTA | "+ Birinchi klinikani qo'shing" | "Filtrlarni tozalash" |
| Icon | Building2 | Search |

## 8. Done checklist

- [ ] Loading skeleton table layoutga aniq mos
- [ ] Empty state illustration + CTA
- [ ] 2 ta variant — "hech narsa yo'q" vs "filter natija yo'q"
- [ ] CTA bosilsa `/admin/clinics/new` ga
- [ ] Filter empty state'da "Tozalash" filterlarni reset qiladi
- [ ] Mobile responsive
- [ ] Dark + light mode ikkalasi
- [ ] `screen.png` ga vizual mos
