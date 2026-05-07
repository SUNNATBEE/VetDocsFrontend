# Qidiruv yuklanmoqda (Search Loading)

> **Mas'ul:** Doniyor (Clinics & Map Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐ (UX polish)

---

## 1. Sahifa haqida

Qidiruv natijalari yuklanayotgan paytda foydalanuvchi ko'radigan skeleton variant. Real natija layoutiga aniq mos pulse placeholder'lar.

## 2. Anatomiya (`screen.png`'dan)

```
- Header (yuklangan, statik)
- Title pulse line (40% width)
- Subtitle pulse line (60%)
- Tab pulses (4 ta pill)
- Sidebar (chap):
  - 1 ta filter card pulse
  - 1 ta suggestion card pulse
- Main area (o'ng):
  - 4 ta result card pulse:
    - Image rectangle
    - 2-3 satr text pulse
    - Tag chips pulse
    - Button pulse
- Pagination (yuklanmaydi)
- Footer (yuklangan)
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(main)/search/loading.tsx` | Next.js avtomatik ishlatadi |
| `src/features/search/components/SearchSkeleton.tsx` | Reusable skeleton |

## 4. shadcn

```bash
npx shadcn@latest add skeleton
```

## 5. Misol

```tsx
import { Skeleton } from '@/components/ui/skeleton'

export function SearchSkeleton() {
  return (
    <div className="container py-6">
      <Skeleton className="h-8 w-1/3 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-6" />
      <div className="flex gap-2 mb-6">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-9 w-24 rounded-full" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border rounded-xl p-4 flex gap-4">
              <Skeleton className="h-24 w-32 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
```

## 6. Done checklist

- [ ] `loading.tsx` route'da ishlaydi
- [ ] Skeleton real layoutga aniq mos (no layout shift)
- [ ] Pulse animatsiya smooth
- [ ] Mobile va desktop ikkalasi
- [ ] `screen.png` ga vizual mos
