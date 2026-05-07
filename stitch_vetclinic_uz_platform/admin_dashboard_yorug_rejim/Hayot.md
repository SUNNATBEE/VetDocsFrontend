# Admin Dashboard — Yorug' rejim (Light Mode)

> **Mas'ul:** Hayot (Admin Panel Engineer)
> **Sprint:** 4-hafta
> **Prioritet:** ⭐⭐ (foydalanuvchi tanlovi)

---

## 1. Sahifa haqida

`admin_dashboard_to_q_rejim` ning yorug' rejim varianti. **Alohida sahifa emas** — bu shu sahifaning theme variantasi (`next-themes` `light` mode).

## 2. Anatomiya (`screen.png`'dan — LIGHT)

To'q rejim bilan **bir xil layout, faqat ranglar farq qiladi**:

```
LEFT SIDEBAR (240px, teal dark green - light mode'da ham dark sidebar):
- Logo "VetClinic UZ" + "Admin Panel" + "Boshqaruv tizimi"
- Menu (light teal active state):
  - 📊 Dashboard (active)
  - 🏥 Klinikalar
  - 👥 Foydalanuvchilar
  - ⭐ Sharhlar
  - ⚙ Sozlamalar

TOP BAR (white):
- "VetClinic UZ" logo + main nav (Klinikalar/Xizmatlar/Shaharlar/Yordam)
- Search input
- 🔔 + "Band qilish" coral CTA

MAIN (off-white #f5faf8 background):
- H1 dark "Boshqaruv paneli"
- Pill toggle "Bugun · Hafta · Oy"

KPI cards (4 ta, white surface):
- Yashil pill ikonlari + qiymat + trend %
  - "Jami foydalanuvchilar 12,482" +12%
  - "Klinikalar 184" +5%
  - "Oylik bandlar 3,120" -2%
  - "Oylik tushum $42.5k" +18%

Charts row:
- "Foydalanuvchilar o'sishi" + "OYLIK · HAFTALIK" toggle (teal active)
  - Area chart (teal gradient)
- "Klinikalar (Shaharlar kesimida)":
  - Horizontal bars (teal)

Bottom row:
- "So'nggi faollik" feed
- "Tizim holati" — "Hamma tizimlar barqaror" + green dot
- "Hisobot yuklash" coral button
- "Tezkor harakatlar":
  - "Klinika qo'shish" + "Admin qo'shish"
  - "Xabarnoma yuborish" + "Yordam xatlari"

Footer (light gray):
- 4 ustunli (logo + Hududlar + Kompaniya + Huquqiy)
```

## 3. Qayerga kod yoziladi

**Yangi fayl yo'q!** Yuqoridagi `admin_dashboard_to_q_rejim` ning **bir xil komponentlar** foydalaniladi. Faqat:

- Tailwind `dark:` modifikatorlari to'g'ri yozilgan bo'lishi
- CSS variables (`--background`, `--card`, `--foreground`) light va dark uchun alohida

```css
/* globals.css */
:root {
  --background: 168 33% 97%;   /* #f5faf8 */
  --foreground: 192 11% 10%;   /* #171d1c */
  --card: 0 0% 100%;
  --primary: 174 100% 21%;     /* #00685f */
  --accent: 5 96% 70%;         /* #fd7369 */
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --card: 217 33% 17%;
  --primary: 174 100% 26%;
  --accent: 5 95% 70%;
}
```

## 4. ThemeToggle integratsiya

```tsx
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const { theme, setTheme } = useTheme()

<Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  <Sun className="hidden dark:block" />
  <Moon className="block dark:hidden" />
</Button>
```

## 5. Diqqat — light mode farqlari

| Element | Dark | Light |
|---|---|---|
| Sidebar fon | dark slate | dark teal (sidebar ham yorug' bo'lib qolmaydi — admin'da sidebar har doim dark teal) |
| Main fon | `#0F172A` | `#f5faf8` |
| Card fon | `#1E293B` | `#ffffff` |
| Text | `slate-100` | `slate-900` |
| Border | `slate-700` | `slate-200` |
| Primary | `#00685f` (bir xil) | `#00685f` (bir xil) |

## 6. Done checklist

- [ ] ThemeToggle dark ↔ light almashadi
- [ ] localStorage'da tanlov saqlanadi
- [ ] Hamma KPI card'lar light mode'da chiroyli
- [ ] Charts'da to'g'ri ranglar (recharts theme)
- [ ] Sidebar admin'da har doim dark teal qoladi (visual identity)
- [ ] No flash of unstyled content (FOUC)
- [ ] Hydration mismatch yo'q
- [ ] `screen.png` ga vizual mos
