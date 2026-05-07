# Kirish va Ro'yxatdan o'tish — Mobile

> **Mas'ul:** Suhrob (Authentication Engineer)
> **Sprint:** 2-hafta
> **Prioritet:** ⭐⭐⭐

---

## 1. Sahifa haqida

Login + Register sahifalarining mobile versiyasi. Bitta scrollable sahifada ikkala forma — yuqori `Hisobingizga kiring`, pastda `Ro'yxatdan o'tish` bo'limi.

**Eslatma:** Bu **alohida sahifa emas** — bu `kirish_login_desktop` va `ro_yxatdan_o_tish_desktop` design'larining responsive variantlari. Suhrob bitta TSX kodda ikkala breakpoint'ni qoplaydi.

## 2. Anatomiya (`screen.png`'dan)

```
LOGIN qism:
- Markazlangan paw logo + "VetClinic UZ"
- H1: "Hisobingizga kiring"
- Email input
- Parol input (eye toggle)
- "Parolni unutdingizmi?" coral link
- Coral "Kirish" full-width button
- Divider: "yoki"
- Outline "Google orqali kirish" button

— Ajratuvchi chiziq —

REGISTER qism:
- H1: "Ro'yxatdan o'tish"
- F.I.SH input
- Telefon (+998 mask) input
- Email input
- Parol yarating
- Parolni tasdiqlang
- Checkbox: "Foydalanish shartlari va Maxfiylik siyosatiga roziman"
- Coral "Ro'yxatdan o'tish" full-width button
- Pastda: gradient banner + welder rasm + "Sizning uy hayvoningiz — bizning g'amxo'rligimizda"
- Footer: VetClinic UZ + linklar
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/(auth)/login/page.tsx` | Mobile responsive variant (allaqachon yozilgan) |
| `src/app/(auth)/register/page.tsx` | Mobile responsive variant |
| `src/app/(auth)/layout.tsx` | Mobile'da chap dekorativ blok yashiriladi (`hidden md:flex`) |

## 4. Tailwind responsive class'lar

```tsx
// Layout
<div className="grid md:grid-cols-2 grid-cols-1">
  <div className="hidden md:flex">{/* dekorativ */}</div>
  <div>{/* forma */}</div>
</div>

// Logo
<div className="flex md:hidden flex-col items-center mb-8">
  <PawIcon size={48} className="text-primary" />
  <span className="font-bold mt-2">VetClinic UZ</span>
</div>
```

## 5. States

- Default
- Validation error
- Loading
- Backend error

(Desktop'da nima bo'lsa — mobilda ham bir xil, faqat layout farq qiladi)

## 6. Done checklist

- [ ] 375px width'da forma to'liq ko'rinadi (horizontal scroll yo'q)
- [ ] Mobile'da chap dekorativ blok yashirilgan
- [ ] Login va Register bitta sahifada (yoki ikkita route, lekin UI bir xil mantiqda)
- [ ] Touch target'lar ≥44px (Apple HIG)
- [ ] Keyboard'ni ochgan paytda input ko'rinarli (scroll qilinadi)
- [ ] iOS Safari'da ham normal ishlaydi
- [ ] `screen.png` ga vizual mos
