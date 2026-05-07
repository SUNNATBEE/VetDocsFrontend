# Foydalanuvchi profili — Desktop

> **Mas'ul:** Akbar (Profile & Reviews Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐⭐ (foydalanuvchi shaxsiy kabineti)

---

## 1. Sahifa haqida

Login qilgan foydalanuvchining shaxsiy kabineti. URL: `/profile`. Tabs orqali ma'lumotlar, sevimlilar, sharhlar, sozlamalar bo'limlariga bo'linadi.

**Auth talab qilinadi:** Middleware orqali login bo'lmagan foydalanuvchi `/login?redirect=/profile` ga jo'natiladi.

## 2. Anatomiya (`screen.png`'dan)

```
Header (saytning standart)

Profil header card:
- Cover banner (160px, soft teal gradient)
- Avatar circle (96px) overlapping banner edge:
  - Initials "AK" + teal background (no photo holatida)
- Name: "Aziz Karimov"
- "✉ aziz@example.com · 📅 A'zo bo'lgan: 2026 yil mart"
- Right: "VIP MIJOZ" coral pill
- Right top: "✏ Profilni tahrirlash" outline button

Tab nav (underlined active):
- "Ma'lumotlarim" (active) | "Sevimlilar (12)" | "Sharhlarim (8)" | "Sozlamalar"

Body — 2 ustun:
- LEFT (60%) — Shaxsiy ma'lumotlar card:
  - Inputlar grid 2x3:
    - Ism: Aziz / Familiya: Karimov
    - Telefon raqami: +998 90 123 45 67 / Email: aziz@example.com
    - Manzil (full-width): "Toshkent shahri, Yunusobod tumani, 4-kvartal"
  - "🔒 Parolni yangilash" link tugma

- RIGHT (40%):
  - Statistika card:
    - "14 Tashriflar" (teal)
    - "3 Uy hayvonlari" (coral)
  - Mening hayvonlarim card (Phase 2):
    - Empty state: paw + "Hayvonlar qo'shilmagan"
    - "Ularni qo'shing va salomatlik tarixini kuzatib boring"
    - Coral "Yangi qo'shish" button
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(main)/profile/page.tsx` | Asosiy profil sahifa |
| `src/app/(main)/profile/layout.tsx` | Tabs wrapper (faqat profile route'lar uchun) |
| `src/features/profile/components/ProfileHeader.tsx` | Banner + avatar + name + edit button |
| `src/features/profile/components/PersonalInfoCard.tsx` | Inputlar grid |
| `src/features/profile/components/StatsCard.tsx` | 2 ta statistika |
| `src/features/profile/components/PetsCard.tsx` | Phase 2 (hozir empty state) |
| `src/features/profile/api/profile.api.ts` | `updateProfile`, `changePassword` |
| `src/features/profile/hooks/useProfile.ts` | Query + mutation |
| `src/features/profile/schemas/profile.schema.ts` | Zod schema |

## 4. shadcn

```bash
npx shadcn@latest add tabs card input label avatar button badge
```

## 5. API endpointlar

```
GET  /api/v1/users/me           # Profil ma'lumotlari
PATCH /api/v1/users/me          # Yangilash
POST /api/v1/auth/change-password  # Parol o'zgartirish
```

## 6. Avatar fallback (initials)

```tsx
<Avatar className="h-24 w-24 border-4 border-white">
  <AvatarImage src={user.avatarUrl} alt={user.name} />
  <AvatarFallback className="bg-primary text-white text-2xl">
    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
  </AvatarFallback>
</Avatar>
```

## 7. States

- ✅ **Default:** ma'lumotlar yuklangan
- ✅ **Loading:** skeleton
- ✅ **Editing:** input'lar enabled, "Saqlash" button paydo bo'ladi
- ✅ **Saving:** button disabled + spinner
- ✅ **Error:** field-level red helper
- ✅ **Success:** toast "Profil yangilandi"

## 8. Auth guard

```tsx
// src/features/auth/hooks/useRequireAuth.ts
export function useRequireAuth() {
  const router = useRouter()
  const { user, isLoading } = useCurrentUser()
  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/login?redirect=${pathname}`)
    }
  }, [user, isLoading])
  return user
}
```

## 9. Done checklist

- [ ] Auth guard ishlaydi (login bo'lmagan → /login)
- [ ] Tab navigation URL hash bilan
- [ ] Edit modal alohida sahifa (`profilni_tahrirlash_modal` design)
- [ ] Avatar fallback initials ko'rsatiladi
- [ ] VIP MIJOZ badge faqat 5+ tashrif bo'lsa
- [ ] "Parolni yangilash" alohida modal/sahifa
- [ ] Mobile responsive (`foydalanuvchi_profili_mobil` design)
- [ ] `screen.png` ga vizual mos
