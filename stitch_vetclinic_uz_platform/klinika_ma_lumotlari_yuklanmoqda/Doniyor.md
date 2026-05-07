# Klinika ma'lumotlari yuklanmoqda (Skeleton)

> **Mas'ul:** Doniyor (Clinics & Map Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐ (UX — SSR streaming uchun)

---

## 1. Sahifa haqida

Klinika detail sahifasi yuklanayotgan paytda foydalanuvchi ko'radigan skeleton variant. Next.js'ning `loading.tsx` mexanizmidan foydalanadi (parallel SSR streaming).

## 2. Anatomiya (`screen.png`'dan)

Real sahifa layoutiga aniq mos pulse placeholder'lar:

```
- Header skeleton (logo + nav lines + auth buttons)
- Title pulse (40% width)
- Subtitle pulses (2 line)
- Image gallery: katta block chap + 2 ta o'ng
- Info bar pulses (3 ta column + 1 sidebar)
- Tabs skeleton (4 ta short pulse)
- Body pulses (paragraph lines)
- Service grid (4 ta card pulse)
- Sidebar (2 ta card pulse)
- Similar clinics (3 ta card pulse)
- Footer skeleton
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(main)/clinics/[id]/loading.tsx` | Next.js avtomatik ishlatadi |
| `src/features/clinics/components/ClinicDetailSkeleton.tsx` | Reusable skeleton |

## 4. Misol

```tsx
// loading.tsx
import { ClinicDetailSkeleton } from '@/features/clinics/components/ClinicDetailSkeleton'

export default function Loading() {
  return <ClinicDetailSkeleton />
}
```

```tsx
// ClinicDetailSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton'

export function ClinicDetailSkeleton() {
  return (
    <div className="container mx-auto py-6">
      {/* Title */}
      <Skeleton className="h-8 w-1/2 mb-2" />
      <Skeleton className="h-4 w-1/3" />

      {/* Image gallery */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        <Skeleton className="col-span-2 h-96 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
        </div>
      </div>

      {/* ... */}
    </div>
  )
}
```

## 5. shadcn

```bash
npx shadcn@latest add skeleton
```

## 6. Done checklist

- [ ] Skeleton real sahifa layoutiga **aniq** mos (no layout shift)
- [ ] Pulse animation smooth (Tailwind `animate-pulse`)
- [ ] Mobile + desktop ikkalasi qo'shilgan
- [ ] Next.js streaming bilan ishlaydi
- [ ] Image rectangle 16:9 aspect ratio
- [ ] `screen.png` ga vizual mos
