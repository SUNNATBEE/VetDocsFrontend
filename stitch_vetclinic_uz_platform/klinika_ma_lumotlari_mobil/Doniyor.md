# Klinika ma'lumotlari (Detail) — Mobile

> **Mas'ul:** Doniyor (Clinics & Map Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐⭐

---

## 1. Sahifa haqida

`klinika_ma_lumotlari_desktop` ning mobile versiyasi. Sidebar yo'q — uning content'i tab orqali ko'rsatiladi yoki collapsible card'larga aylanadi.

## 2. Anatomiya (`screen.png`'dan)

```
Header (mobile):
- "←" back | "Vetlife Klinikasi" title | "↗" share

Image carousel (swipeable):
- Bitta katta rasm + dot indicators

Klinika info:
- "Vetlife Klinikasi" + "OCHIQ" green pill
- "★ 4.9 (124 sharh)"

Action cards (collapsible):
- "📞 Aloqa" + ›  (accordion)
- "🕐 Ish vaqti" + ›

Tabs (horizontal):
- "Ma'lumot" (active, teal underline) | "Xizmatlar" | "Sharhlar"

Tab content:
  Ma'lumot:
  - "Klinika haqida" — paragraflar
  - "Asosiy xizmatlar" + "Barchasi" link
    - "Umumiy ko'rik — 150,000 so'm"
    - "Vaksina qilish — 85,000 so'm"
  - "Bizning shifokorlar" — DoctorCard
  - "Sharhlar" preview:
    - ReviewCard (Sardor Azimov + 5★ + matn)
  - Mini map preview + "Xaritada ochish" button

Sticky bottom bar:
- "📞 Qo'ng'iroq" | "Yo'l" | "Sharh" (3 button)

Bottom nav:
- Klinikalar | Xizmatlar | Shifokorlar | Yordam
```

## 3. Qayerga kod yoziladi

Bu — `klinika_ma_lumotlari_desktop` ning Tailwind responsive variantlari.

| Fayl | Mobile-specific |
|---|---|
| `src/app/(main)/clinics/[id]/page.tsx` | Responsive |
| `src/features/clinics/components/MobileContactAccordion.tsx` | Aloqa + Ish vaqti accordion |
| `src/features/clinics/components/MobileBottomActionBar.tsx` | Sticky 3 tugma |

## 4. shadcn

```bash
npx shadcn@latest add accordion carousel
```

## 5. Mobile UX detallar

- **Image gallery** mobile'da swipeable carousel (`embla-carousel`)
- **Sidebar content** collapsible accordion'ga aylanadi
- **CTAs** sticky bottom bar bo'lib qoladi (3 tugma full-width split)
- **Tab content** scrollable, sticky tab header
- **Sharhlar** tab'i alohida route emas — qo'shimcha sahifa bo'lishi mumkin (`/clinics/[id]/reviews`)

## 6. Tailwind responsive misol

```tsx
{/* Sidebar — faqat desktop */}
<aside className="hidden lg:block lg:w-1/3">
  <ContactCard />
  <OpeningHoursCard />
</aside>

{/* Mobile accordion */}
<div className="lg:hidden">
  <Accordion type="single" collapsible>
    <AccordionItem value="contact">
      <AccordionTrigger>📞 Aloqa</AccordionTrigger>
      <AccordionContent><ContactCard /></AccordionContent>
    </AccordionItem>
    <AccordionItem value="hours">
      <AccordionTrigger>🕐 Ish vaqti</AccordionTrigger>
      <AccordionContent><OpeningHours /></AccordionContent>
    </AccordionItem>
  </Accordion>
</div>

{/* Mobile sticky bottom bar */}
<div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 grid grid-cols-3 gap-2">
  <Button>Qo'ng'iroq</Button>
  <Button variant="outline">Yo'l</Button>
  <Button variant="default" className="bg-accent">Sharh</Button>
</div>
```

## 7. Done checklist

- [ ] Image swipeable + dot indicators
- [ ] Accordion ochiq/yopiq smooth animatsiya
- [ ] Sticky bottom bar safe-area-inset bilan
- [ ] Tap-to-call ishlaydi
- [ ] Tablar swipe qilinadi
- [ ] Mini map "Xaritada ochish" → `/map?clinic=ID`
- [ ] iOS Safari'da scroll smooth
- [ ] `screen.png` ga vizual mos
