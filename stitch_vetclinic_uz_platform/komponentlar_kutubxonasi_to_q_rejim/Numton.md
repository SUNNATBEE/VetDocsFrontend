# Komponentlar kutubxonasi (Dark Mode)

> **Mas'ul:** Numton (Shared Components Engineer)
> **Sprint:** 1-hafta (light mode bilan birga)
> **Prioritet:** ⭐⭐⭐ (admin panel default dark mode'da, shuning uchun bu shart)

---

## 1. Sahifa haqida

Bu — yorug' rejim kutubxonasining qorong'i variantasi. Admin panel default dark mode'da ishlaydi, shuning uchun barcha komponentlar dark mode'da ham mukammal ko'rinishi kerak.

## 2. Yorug' bilan farqi

Faqat ranglar farq qiladi. Layout, typography, shadcn primitives — hammasi bir xil. Tailwind `dark:` modifikatori va CSS variables orqali avtomatik almashadi.

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/globals.css` | `.dark` selectorida dark CSS variables |
| `src/providers/ThemeProvider.tsx` | `next-themes` setup, default `dark` admin uchun |
| `src/components/layout/ThemeToggle.tsx` | Light/Dark/System tugma |

## 4. Dark CSS variables (`globals.css`)

```css
.dark {
  --background: 222 47% 11%;     /* deep slate #0F172A */
  --foreground: 210 40% 98%;     /* slate-100 */
  --card: 217 33% 17%;           /* surface #1E293B */
  --primary: 174 100% 26%;       /* teal #00685f remains */
  --accent: 5 95% 70%;           /* coral #fd7369 remains */
  --border: 217 33% 22%;
  --muted-foreground: 215 20% 65%;
}
```

## 5. Done checklist

- [ ] `<html class="dark">` qo'shilganda butun sayt dark bo'ladi
- [ ] Admin panel default dark mode (middleware orqali yoki localStorage)
- [ ] ThemeToggle ikkita rejim orasida switching ishlaydi
- [ ] Hamma shadcn primitive dark mode'da to'g'ri ko'rinadi (border, text, hover)
- [ ] Klinika rasmlari dark fon'da ham yaxshi ko'rinadi
- [ ] `screen.png` ga vizual mos (admin sahifa fon = #0F172A)
