# Sevimlilar (Favorites) — Desktop

> **Mas'ul:** Akbar (Profile & Reviews Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐

---

## 1. Sahifa haqida

Foydalanuvchi saqlagan klinikalar ro'yxati. URL: `/profile/favorites`.

**MVP (Phase 1):** localStorage'da saqlanadi (clinic ID array).
**Phase 2:** Backend `POST /favorites` API'siga ko'chiriladi.

## 2. Anatomiya (`screen.png`'dan)

```
Header (saytning standart)

Sidebar (chap, 240px):
- User avatar + "Jasur Alimov" + "Toshkent, O'zbekiston"
- Menu:
  - 👤 Profil
  - 📅 Uchrashuvlarim
  - ❤ Sevimlilar (active, teal)
  - 🐾 Mening hayvonlarim
  - → Chiqish (red)

Main:
- H1: "Sevimlilar"
- Subtitle: "Sizga yoqqan va saqlab qo'yilgan veterinariya klinikalari"

- Klinikalar grid (3 ustun):
  - ClinicCard:
    - "VetExpert Markazi" + "★ 4.8"
    - "Chilonzor tumani, 8-kvartal"
    - Service tags: "Terapiya", "Vaksina"
    - Coral "Band qilish" button
  - "Shifo Pet" — "Yunusobod tumani, 2-mavze"
  - "ZooMed Plus" — "Mirzo Ulug'bek tumani"

- Empty state (alohida design):
  - Pink heart broken icon (centered)
  - H3: "Hali sevimli klinikangiz yo'q"
  - Body: "Sizga yoqqan har qanday klinikani saqlab qo'ying va undan keyingi tashriflar vaqtida osongina topish"
  - Coral "Klinikalarni ko'rish" button
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(main)/profile/favorites/page.tsx` | Sahifa |
| `src/features/favorites/store/favorites.store.ts` | Zustand persist (localStorage) |
| `src/features/favorites/hooks/useFavorites.ts` | Hook (Phase 2 da API'ga) |
| `src/features/favorites/components/FavoriteButton.tsx` | Heart toggle (ClinicCard'da) |
| `src/components/shared/EmptyState.tsx` | Yahyo'ning komponenti, qayta ishlatiladi |

## 4. shadcn

```bash
npx shadcn@latest add card button
```

## 5. Zustand store (MVP)

```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FavoritesStore = {
  clinicIds: string[]
  add: (id: string) => void
  remove: (id: string) => void
  toggle: (id: string) => void
  has: (id: string) => boolean
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      clinicIds: [],
      add: (id) => set((s) => ({ clinicIds: [...new Set([...s.clinicIds, id])] })),
      remove: (id) => set((s) => ({ clinicIds: s.clinicIds.filter(x => x !== id) })),
      toggle: (id) => get().has(id) ? get().remove(id) : get().add(id),
      has: (id) => get().clinicIds.includes(id),
    }),
    { name: 'favorites' }
  )
)
```

## 6. Sahifada klinikalarni yuklash

```tsx
const { clinicIds } = useFavoritesStore()
const { data: clinics } = useQuery({
  queryKey: ['clinics', 'favorites', clinicIds],
  queryFn: () => fetchClinicsByIds(clinicIds),
  enabled: clinicIds.length > 0,
})

if (clinicIds.length === 0) return <EmptyState variant="favorites" />
return <ClinicGrid clinics={clinics} onRemove={(id) => useFavoritesStore.getState().remove(id)} />
```

## 7. States

- ✅ **Default:** Klinikalar grid (3 ustun)
- ✅ **Empty:** Sevimlilar yo'q (illustration + CTA)
- ✅ **Loading:** Skeleton
- ✅ **Card hover:** "×" remove button paydo bo'ladi

## 8. Done checklist

- [ ] localStorage'da saqlanadi (Zustand persist)
- [ ] Sahifa qaytadan ochilganda saqlangan
- [ ] Heart toggle istalgan ClinicCard'da ishlaydi
- [ ] Card hover'da remove "×" paydo bo'ladi
- [ ] Empty state komponenti integratsiya qilingan
- [ ] Phase 2 da backend API'ga oson ko'chirish (interface bir xil)
- [ ] Mobile responsive (1 ustun)
- [ ] `screen.png` ga vizual mos
