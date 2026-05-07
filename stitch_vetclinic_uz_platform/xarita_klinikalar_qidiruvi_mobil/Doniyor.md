# Xarita — Klinikalar qidiruvi (Mobile)

> **Mas'ul:** Doniyor (Clinics & Map Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐⭐

---

## 1. Sahifa haqida

`xarita_klinikalar_qidiruvi_desktop` ning mobile versiyasi. Sidebar mobile'da bottom sheet bo'lib qoladi (peekable — qisman tortilgan holatda klinika ro'yxati).

## 2. Anatomiya (`screen.png`'dan)

```
Top:
- Search input "Klinikalarni qidirish..." + filter ikon (right)

Map (full-screen):
- Pinlar
- Selected coral pin "Happy Pets Klinikasi"
- Floating layer toggle (top-right)

Bottom sheet (peekable, drag handle yuqorida):
- "YAQIN ORADAGI"
- "Klinikalar" sarlavha
- ClinicCard horizontal scroll:
  - Selected: thick coral border
  - "Happy Pets Klinikasi"
  - "★ 4.9"
  - "0.8 km uzoqlikda"
  - "FAOL" green pill
  - Coral "Band qilish" button
- "Hammasini" link

Bottom nav:
- Asosiy | Xarita (active) | Uchrashuvlar | Profil
```

## 3. Qayerga kod yoziladi

`xarita_klinikalar_qidiruvi_desktop` ning responsive variantlari.

| Fayl | Mobile-specific |
|---|---|
| `src/app/(main)/map/page.tsx` | Responsive |
| `src/features/clinics/components/MobileMapBottomSheet.tsx` | 3 ta state (collapsed/half/full) |

## 4. Bottom sheet states

| State | Height | Content |
|---|---|---|
| **Collapsed** | 80px (handle bar + label) | "127 klinika · Ro'yxat ↑" |
| **Half** | 40vh | Top 3 klinika horizontal scroll |
| **Full** | 80vh | To'liq scrollable list |

## 5. UX detallar

- **Pin tap** → bottom sheet half-state'ga snap + tegishli card focus
- **Bottom sheet drag**: half va full o'rtasida snap
- **Filter button** (top-right) → full-screen filter modal (`filtrlar_mobil` bilan bir xil)
- **Map gestures:** pinch-zoom, pan ishlaydi

## 6. Dependencies

```bash
npm install framer-motion
```

```tsx
import { motion } from 'framer-motion'

<motion.div
  drag="y"
  dragConstraints={{ top: -300, bottom: 0 }}
  dragElastic={0.2}
  // ...
/>
```

## 7. Done checklist

- [ ] Bottom sheet 3 ta snap point (collapsed/half/full)
- [ ] Pin tap → half state + card highlight
- [ ] Filter button → modal
- [ ] Geolocation crosshair pastda
- [ ] Map smooth 60fps
- [ ] iOS safe-area-inset
- [ ] Bottom nav active state to'g'ri
- [ ] `screen.png` ga vizual mos
