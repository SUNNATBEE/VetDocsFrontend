# Foydalanuvchi profili — Mobile

> **Mas'ul:** Akbar (Profile & Reviews Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐⭐

---

## 1. Sahifa haqida

`foydalanuvchi_profili_desktop` ning mobile versiyasi. Layout vertical stack — sidebar yo'q, hammasi 1 ustunga to'planadi.

## 2. Anatomiya (`screen.png`'dan)

```
Header (mobile):
- "VetClinic UZ" logo + 🔍 search + 🔔 bell

Profile cover:
- Teal banner with leafy decoration (140px)

Avatar (overlapping banner):
- Centered, 96px, rasm bilan
- Coral camera ikon overlay (rasmni o'zgartirish)

Name section:
- "Jasur Alimov" (centered, bold)
- "Toshkent, O'zbekiston" muted

CTA button (full-width):
- Coral "✏ Profilni tahrirlash"

Tabs (horizontal scroll):
- "Ma'lumotlar" (active, teal underline) | "Mening uy hayvonlarim" | "Tashrifle..."

Stats (2 ta card grid):
- "3 Hayvonlar" (coral text)
- "12 Tashriflar" (teal text)

Shaxsiy ma'lumotlar card:
- "Telefon raqam: +998 90 123 45 67"
- "Elektron pochta: jasur.alimov@email.uz"
- "Manzil: Yunusobod tumani, 4-mavze"

Faol uy hayvonlari card:
- "Hammasini" link right
- 3 ta avatar:
  - Oskar (it rasmi)
  - Mimi (mushuk rasmi)
  - "+" Qo'shish (dashed border)

Logout button:
- Outline red "→ Chiqish"

Bottom nav (sticky):
- Bosh sahifa | Klinikalar | Tarix | Profil (active, teal)
```

## 3. Qayerga kod yoziladi

`foydalanuvchi_profili_desktop` ning responsive variantlari.

| Fayl | Mobile-specific |
|---|---|
| `src/app/(main)/profile/page.tsx` | Responsive |
| `src/features/profile/components/MobileProfileHeader.tsx` | Vertical stack |
| `src/features/profile/components/PetsCarousel.tsx` | 3 ta avatar |

## 4. shadcn

```bash
npx shadcn@latest add tabs avatar card button
```

## 5. UX detallar

- **Banner + avatar** mobile'da centered
- **Tabs** horizontal scroll (`overflow-x-auto`)
- **Stats grid** 2 ustun
- **Pet avatars** 3 ta yumaloq + "+" pet qo'shish
- **Logout** outline red button (visual warning)
- **Bottom nav** safe-area-inset

## 6. Done checklist

- [ ] 375px width'da chiroyli ko'rinadi
- [ ] Avatar uploader ikon bosilsa file picker ochiladi
- [ ] Pet avatars carousel'da swipe qilinadi
- [ ] "Profilni tahrirlash" → modal yoki alohida sahifa
- [ ] "Chiqish" → confirm dialog → logout + cache clear
- [ ] Bottom nav active state to'g'ri
- [ ] iOS Safari safe-area-inset
- [ ] `screen.png` ga vizual mos
