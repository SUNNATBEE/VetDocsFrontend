# Komponentlar kutubxonasi (Light Mode)

> **Mas'ul:** Numton (Shared Components Engineer)
> **Sprint:** 1-hafta (eng birinchi qilinadi!)
> **Prioritet:** ⭐⭐⭐ (KRITIK — boshqa o'quvchilar shu kutubxonadan foydalanadi)

---

## 1. Sahifa haqida

Bu sahifa — **dizayn tizimining yagona manbai**. Loyihaning hamma komponentlari (button, card, input, badge, dialog) shu yerda dokumentlanadi. Boshqa o'quvchilar `screen.png` ga qarab "qaysi shadcn primitive'ni qo'shish kerak" deb tushunadi.

**Bu sahifa public emas** — `/styleguide` route'ida faqat dev mode'da ko'rinadi.

## 2. Komponentlar ro'yxati (DESIGN.md asosida)

| Bo'lim | Variantlar |
|---|---|
| Ranglar paletti | Primary, Coral, Surface, Error |
| Tipografiya | h1 (36px), h2 (28px), h3 (20px), body (16px) |
| Tugmalar | Primary, Secondary, Ghost, Destructive, Link, Icon-only |
| Inputlar | Text, Phone (+998), Search, Password, Select |
| Cards | ClinicCard, StatCard, ReviewCard, DoctorCard |
| Badges | "Ochiq" (green), "Yopiq" (red), "Faol", Service tag |
| Feedback | Toast (success/error), Empty state, Skeleton |
| Navigatsiya | Tabs, Breadcrumb, Pagination |
| Overlays | Dialog, Dropdown, Tooltip, Popover |

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/styleguide/page.tsx` | Bu sahifa |
| `src/components/ui/button.tsx` | shadcn Button (Primary = teal #00685f, CTA = coral #fd7369) |
| `src/components/ui/input.tsx` | shadcn Input |
| `src/components/ui/card.tsx` | shadcn Card |
| `src/components/ui/badge.tsx` | shadcn Badge |
| `src/components/ui/dialog.tsx` | shadcn Dialog |
| `src/components/ui/tabs.tsx` | shadcn Tabs |
| `src/components/ui/select.tsx` | shadcn Select |
| `src/components/ui/skeleton.tsx` | shadcn Skeleton |
| `tailwind.config.ts` | DESIGN.md ranglarini Tailwind tokenlarga aylantir |
| `src/app/globals.css` | CSS variables (light mode) |

## 4. shadcn install (hammasi)

```bash
npx shadcn@latest add button input card badge dialog tabs select skeleton avatar dropdown-menu sheet toast tooltip popover separator form label radio-group checkbox switch
```

## 5. Tailwind tokenlar (`tailwind.config.ts`)

```ts
// DESIGN.md'dan ranglarni shu yerga ko'chir:
colors: {
  primary: { DEFAULT: '#00685f', foreground: '#ffffff' },
  accent:  { DEFAULT: '#fd7369', foreground: '#ffffff' }, // Warm Coral
  surface: '#f5faf8',
  // ...
}
```

## 6. Done checklist

- [ ] Hamma 18+ shadcn primitive o'rnatilgan
- [ ] `tailwind.config.ts` da DESIGN.md ranglar token sifatida bor
- [ ] `globals.css` light mode CSS variables yozilgan
- [ ] Har bir komponent uchun barcha variantlar styleguide page'da ko'rinadi
- [ ] Boshqa o'quvchilar `<Button variant="primary">Kirish</Button>` deb yoza oladi
- [ ] `screen.png` ga vizual mos
