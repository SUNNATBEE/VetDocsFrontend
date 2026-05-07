# Klinikalar yuklanmoqda (Skeleton)

> **Mas'ul:** Yahyo (UI/UX Engineer)
> **Sprint:** 2-hafta
> **Prioritet:** ⭐⭐ (UX — loading bo'sh ekran emas, skeleton ko'rsatadi)

---

## 1. Sahifa haqida

Klinikalar ro'yxati yuklanayotgan paytda foydalanuvchi bo'sh ekran ko'rmasligi uchun **skeleton placeholder** ko'rsatamiz. Bu — UX best practice (Next.js `loading.tsx` mexanizmi).

## 2. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/components/shared/LoadingSpinner.tsx` | Centered spinner (small/medium/large) |
| `src/components/shared/Skeleton.tsx` | shadcn Skeleton wrapper |
| `src/components/clinics/ClinicCardSkeleton.tsx` | ClinicCard'ning skeleton variantasi |
| `src/components/clinics/ClinicListSkeleton.tsx` | 6 ta ClinicCardSkeleton grid |
| `src/app/(main)/clinics/loading.tsx` | Klinika listini ulash uchun |

## 3. Skeleton anatomiyasi (screen.png'dan)

```
- Header (yuklangan, statik)
- Sarlavha pulse line (40% width)
- Ostida 2 satrli pulse lines
- Filter sidebar (chap):
  - 1 ta search box pulse
  - 3 ta filter group pulse
- Grid (o'ng):
  - 6 ta card pulse
  - Har card: rasm pulse 16:9, 2 satr text pulse, button pulse
- Pagination dots
- Footer (yuklangan)
```

## 4. shadcn Skeleton komponenti

```bash
npx shadcn@latest add skeleton
```

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-48 w-full rounded-t-xl" />  // rasm
<Skeleton className="h-4 w-3/4 mt-3" />            // sarlavha
<Skeleton className="h-3 w-1/2 mt-2" />            // qo'shimcha
```

## 5. Done checklist

- [ ] `loading.tsx` clinics route'ida ishlaydi
- [ ] Skeleton rasmiy data tuzilishiga mos (8 ta card grid)
- [ ] Pulse animatsiyasi smooth (Tailwind `animate-pulse`)
- [ ] Mobile'da 1 ustun, tablet 2, desktop 3
- [ ] Layout shift yo'q (skeleton va real card bir xil o'lchamda)
- [ ] `screen.png` ga vizual mos
