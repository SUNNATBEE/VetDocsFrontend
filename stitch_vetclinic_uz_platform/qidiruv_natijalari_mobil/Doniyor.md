# Qidiruv natijalari (Search Results) — Mobile

> **Mas'ul:** Doniyor (Clinics & Map Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐

---

## 1. Sahifa haqida

`qidiruv_natijalari_desktop` ning mobile versiyasi. Sidebar yo'q — filter button orqali bottom sheet ochiladi.

## 2. Anatomiya (`screen.png`'dan)

```
Header:
- "←" back | search input "vaksinatsiya toshkent" + ×

Pill tabs (horizontal scroll):
- Barchasi (active) | Klinikalar | Mutaxassislar | Doc...

Title:
- "14 ta natija topildi"
- "vaksinatsiya toshkent" so'rovi bo'yicha

Result cards (vertical stack, full-width):
- Card 1: "ZooWell Klinikasi"
  - Image left + heart-favorite right
  - "★ 4.9 (120+ sharhlar)"
  - "Har qanday turdagi hayvonlar uchun vaksinatsiya xizmati. Toshkent shahar markazida."
  - Manzil + "75,000 UZS dan"

- Card 2: "VetExpert Markazi"
  - "Kompleks vaksinatsiya va pasportlashtirish. Toshkent bo'ylab uyga chiqish."
  - "Uyga borish xizmati mavjud" + "120,000 UZS dan"

- Card 3: "HappyPets Vetserviz"
  - "Yevropa dori vositalari bilan vaksinatsiya. Arzon narxlar"
  - Floating "≣ Filtrlash" coral pill (sticky bottom-center)
  - "Chilonzor tumani, Toshkent" + "60,000 UZS dan"

- Card 4: "Central Vet Clinic"
  - "★ 5.0 (210 sharhlar)"
  - "Eng yuqori sifatli vaksinatsiya xizmatlari. Toshkentning markaziy klinikasi"
  - Mirobod tumani + "90,000 UZS dan"
```

## 3. Qayerga kod yoziladi

`qidiruv_natijalari_desktop` ning responsive variantlari.

| Fayl | Mobile-specific |
|---|---|
| `src/app/(main)/search/page.tsx` | Responsive |
| `src/features/search/components/MobileFilterButton.tsx` | Floating coral pill |

## 4. UX detallar

- **Search input** sticky top header'da
- **Pill tabs** horizontal scroll (`overflow-x-auto`)
- **Filter button** floating sticky bottom-center, bosilsa bottom sheet ochiladi (`filtrlar_mobil` design qayta foydalaniladi)
- **Cards** full-width, padding 16px
- **Heart-favorite** card top-right corner

## 5. Done checklist

- [ ] 375px width'da horizontal scroll yo'q
- [ ] Pill tabs swipe qilinadi
- [ ] Floating filter button kor'inadi
- [ ] Bottom nav (Klinikalar active) ko'rinadi
- [ ] Highlight matched terms ishlaydi
- [ ] Card hover/press feedback
- [ ] `screen.png` ga vizual mos
