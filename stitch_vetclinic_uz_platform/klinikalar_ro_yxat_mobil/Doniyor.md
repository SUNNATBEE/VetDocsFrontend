# Klinikalar ro'yxati — Mobile

> **Mas'ul:** Doniyor (Clinics & Map Engineer)
> **Sprint:** 2-3 hafta
> **Prioritet:** ⭐⭐⭐

---

## 1. Sahifa haqida

`klinikalar_ro_yxat_desktop` ning mobile versiyasi. Sidebar filter mobile'da bottom sheet bo'lib ochiladi.

## 2. Anatomiya (`screen.png`'dan)

```
- Header: "VetClinic UZ" logo + Search + Bell ikon
- Filtrlar bar (sticky):
  - "≣ Filtrlar (3)" coral outlined pill
  - "Narx ›" dropdown
  - "🗺" xarita ikon (right)
- Tab chips (horizontal scroll):
  - Barchasi (active, coral background)
  - Terapevt
  - Xirurgiya
  - Vaks...
- ClinicCard'lar (vertical stack):
  - Cover rasm + "Ochiq" green pill (top-left) + "★ 4.9" rating (top-right)
  - "Zooland Clinic" + "2.4 km" right
  - "Toshkent, Mirobod tumani, Nukus ko'chasi, 24"
  - Service chips: Rentgen, Laboratoriya
  - "KONSULTATSIYA" + "120,000 UZS"
  - Coral "Band qilish" button
- Bottom nav (sticky):
  - Bosh sahifa | Klinikalar (active) | Xarita | Profil
```

## 3. Qayerga kod yoziladi

Aslida bu **alohida sahifa emas** — `src/app/(main)/clinics/page.tsx` ning Tailwind responsive variantlari.

| Fayl | Mobile-specific |
|---|---|
| `src/app/(main)/clinics/page.tsx` | `md:` breakpoint'larda sidebar yashiriladi, bottom sheet ochiladi |
| `src/features/clinics/components/ClinicFilters.tsx` | `<Sheet>` (mobile) yoki sidebar (desktop) |
| `src/components/layout/MobileBottomNav.tsx` | 4 ikon nav (Yahyo bilan birga) |

## 4. shadcn

```bash
npx shadcn@latest add sheet
```

## 5. Mobile-specific UX

- Filter button bosilsa `<Sheet side="bottom">` ochiladi (bu `filtrlar_mobil` design'i — alohida TASK.md bor)
- Service chips horizontal scroll — `overflow-x-auto`
- Bottom nav 4 ta ikon: Bosh sahifa | Klinikalar | Xarita | Profil
- Card'lar full-width, padding 16px

## 6. Tailwind responsive misol

```tsx
{/* Sidebar - faqat desktop */}
<aside className="hidden lg:block w-72">
  <ClinicFilters />
</aside>

{/* Mobile filter button */}
<Sheet>
  <SheetTrigger className="lg:hidden">
    Filtrlar (3)
  </SheetTrigger>
  <SheetContent side="bottom" className="h-[80vh]">
    <ClinicFilters />
  </SheetContent>
</Sheet>

{/* Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {clinics.map(c => <ClinicCard key={c.id} clinic={c} />)}
</div>
```

## 7. Done checklist

- [ ] 375px width'da horizontal scroll yo'q
- [ ] Touch target'lar ≥44px
- [ ] Bottom sheet drag bilan yopiladi
- [ ] Bottom nav active state to'g'ri
- [ ] Service chips swipe qilinadi
- [ ] iOS Safari safe-area-inset hisobga olingan
- [ ] `screen.png` ga vizual mos
