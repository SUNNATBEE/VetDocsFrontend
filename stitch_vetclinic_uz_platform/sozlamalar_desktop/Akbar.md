# Sozlamalar (Settings) — Desktop

> **Mas'ul:** Akbar (Profile & Reviews Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐

---

## 1. Sahifa haqida

Foydalanuvchining hisob va tizim sozlamalari. URL: `/profile/settings`. Bo'limlar: Hisob xavfsizligi, Bildirishnomalar, Ko'rinish, Xavfli zona.

**Diqqat:** `screen.png` da bu admin panelning sozlamasi (chap sidebar Admin Panel) — lekin bu **shaxsiy foydalanuvchi sozlamalari** sifatida qayta ishlatiladi. Layout farq qiladi (admin sidebar emas, balki profile sidebar).

## 2. Anatomiya (`screen.png`'dan)

```
Header

Layout 2 ustun:
- LEFT (240px): Profile sidebar
- MAIN: Settings content

Page header:
- H1: "Sozlamalar"
- Subtitle: "Profil va tizim parametrlarini boshqarish"

Tab navigation (chap):
- "🛡 Shaxsiy ma'lumotlar" (active card highlight)
- "🔒 Xavfsizlik"
- "🔔 Bildirishnomalar"
- "🎨 Ko'rinish"

CARDS (vertical stack):

1. 🔒 Hisob xavfsizligi:
   - Maxfiy so'z:
     - "Oxirgi marta 3 oy oldin o'zgartirilgan" muted
     - "O'zgartirish" outline button
   - Ikki bosqichli autentifikatsiya (2FA):
     - "Hisobingizga qo'shimcha himoya qatlami bilan ta'minlang" muted
     - Toggle switch (off)

2. 🔔 Bildirishnomalar:
   - Email bildirishnomalar (toggle on)
   - SMS xabarlar (toggle off)
   - Marketing va yangiliklar (toggle on)

3. 🎨 Ko'rinish:
   - Tilni tanlang:
     - ⚪ O'zbek (UZ) (selected)
     - ⚪ Русский (RU)
     - ⚪ English (EN)
   - Mavzu (right):
     - ☀ Yorug' (selected)
     - 🌙 Tungi

4. ⚠ Xavfli zona (red border):
   - "Hisobni o'chirish" red bold
   - "Hisobingiz o'chirilgandan so'ng barcha ma'lumotlar qayta tiklanmas darajada o'chib ketadi. Iltimos, qarorigizni qayta o'ylab ko'ring."
   - Outline red "Hisobni o'chirish" button
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(main)/profile/settings/page.tsx` | Sahifa |
| `src/features/profile/components/SecurityCard.tsx` | Parol + 2FA |
| `src/features/profile/components/NotificationsCard.tsx` | 3 ta toggle |
| `src/features/profile/components/AppearanceCard.tsx` | Til + tema |
| `src/features/profile/components/DangerZoneCard.tsx` | Hisobni o'chirish |
| `src/features/profile/components/ChangePasswordDialog.tsx` | Parol o'zgartirish modal |
| `src/features/profile/components/DeleteAccountDialog.tsx` | Tasdiqlash modal |

## 4. shadcn

```bash
npx shadcn@latest add card switch radio-group dialog form button alert
```

## 5. API endpointlar

```
PATCH /api/v1/users/me                  # Til, tema, bildirishnomalar
POST  /api/v1/auth/change-password      # Parol o'zgartirish
POST  /api/v1/auth/2fa/enable           # 2FA yoqish (Phase 2)
POST  /api/v1/auth/2fa/disable
DELETE /api/v1/users/me                 # Hisobni o'chirish
```

## 6. Theme switching

```tsx
import { useTheme } from 'next-themes'

const { theme, setTheme } = useTheme()

<RadioGroup value={theme} onValueChange={setTheme}>
  <RadioGroupItem value="light">☀ Yorug'</RadioGroupItem>
  <RadioGroupItem value="dark">🌙 Tungi</RadioGroupItem>
  <RadioGroupItem value="system">💻 Tizim</RadioGroupItem>
</RadioGroup>
```

## 7. Til o'zgartirish (next-intl)

```tsx
const router = useRouter()
const handleLocaleChange = (locale: 'uz' | 'ru' | 'en') => {
  document.cookie = `NEXT_LOCALE=${locale}; path=/`
  router.refresh()
}
```

## 8. Hisobni o'chirish UX

Bu **eng xavfli amal** — 3 qadam:
1. "Hisobni o'chirish" button bosish
2. ConfirmDialog: "Haqiqatan ham o'chirmoqchimisiz?" + matn yozdirish ("HISOBIMNI O'CHIR")
3. Final confirm + parol kiritish
4. API call + logout + redirect to home + toast

## 9. States

- ✅ **Default:** sozlamalar yuklangan
- ✅ **Toggle changing:** optimistic update (TanStack)
- ✅ **API error:** revert + toast "Xato yuz berdi"
- ✅ **Password dialog:** old/new/confirm
- ✅ **Delete account dialog:** 3-step destructive flow

## 10. Done checklist

- [ ] Theme switching ishlaydi (next-themes)
- [ ] Til switcher cookie'ni o'rnatadi
- [ ] Bildirishnoma toggle'lari API'ga jo'natadi
- [ ] Parol o'zgartirish — eski parol talab qilinadi
- [ ] Hisobni o'chirish — 3 qadamli destructive flow
- [ ] Xavfli zona red border + visual warning
- [ ] Mobile responsive (sidebar yashiriladi)
- [ ] Logout cache tozalaydi
- [ ] `screen.png` ga vizual mos
