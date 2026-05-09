# VetClinic UZ — Stitch design'lar bo'yicha topshiriqlar

Stitch chiqargan UI design'lar shu papkada (`stitch_vetclinic_uz_platform/`).
Har bir o'quvchi o'z ro'yxatidagi design'larni ko'rib, kodga o'tkazadi.

> **Asosiy qoida:** Stitch'ning HTML kodi *referens* — kelishish uchun.
> Buni `Next.js 15 + Tailwind CSS v4 + shadcn/ui` ga moslab qaytadan yozasan.
> To'g'ridan-to'g'ri nusxa olma.

## Design tokens (`vetclinic_uz/DESIGN.md` dan)

- Primary: Deep Teal `#00685f`
- Accent (CTA): Warm Coral `#fd7369`
- Background: `#f5faf8`
- Cards: 12px radius, Buttons: 8px radius, Badges: 999px (pill)
- Headings: Plus Jakarta Sans, Body: Inter
- Iconlar: Lucide React (1.5px stroke)

## Jamoa va vazifalar (qisqacha)

| O'quvchi | Rol | Designlar | Asosiy domen |
| --- | --- | --- | --- |
| Sunnatbek | Tech Lead — Admin Panel | 9 | Admin paneli + API core |
| Suhrob | Authentication Engineer | 4 | Login / Register / Forgot password |
| Doniyor | Clinics & Map Engineer | 11 | Klinikalar, qidiruv, xarita |
| Akbar | Profile & Reviews Engineer | 5 | Profil, sevimlilar, sozlamalar |
| Yahyo | Layout Engineer | global | Header / Footer / Mobile menyu / Theme toggle |
| Hayot | Landing Engineer | 1 | Bosh sahifa (Hero + bloklar) |
| Numton | Shared Components Engineer | 4 | Komponentlar kutubxonasi + skeleton + empty state |

---

## Sunnatbek (Tech Lead — Admin Panel) — 9 ta design

Admin panel butun loyihaning boshqaruv markazi.
Default tema: dark; foydalanuvchi `next-themes` orqali yorug'ga o'tkaza oladi.
Sunnatbek shuningdek API core, auth helpers va RBAC middleware'ni yozadi (UI design'siz qism — `oquvchilar/sunnatbek.md` da batafsil).

| # | Design papka | Nima qilinadi | Qayerga kod |
| --- | --- | --- | --- |
| 1 | `admin_dashboard_to_q_rejim` | Admin Dashboard (DARK) — KPI cards, sparkline, area chart, bar chart, "So'nggi faollik", "Tezkor amallar" | `src/app/admin/page.tsx` |
| 2 | `admin_dashboard_yorug_rejim` | Admin Dashboard (LIGHT) — yuqoridagining yorug' rejimi (theme tokens orqali) | `globals.css` + theme tokens |
| 3 | `klinikalar_ro_yxati_admin_to_q_rejim` | Admin Klinikalar table (DARK) — checkbox, image, status pill, actions, pagination | `src/app/admin/clinics/page.tsx` |
| 4 | `klinikalar_ro_yxati_admin_yorug_rejim` | Yuqoridagi LIGHT + delete confirmation dialog | Numton'ning `ConfirmDialog` integratsiyasi |
| 5 | `yangi_klinika_bo_sh_shakl_to_q_rejim` | Yangi klinika qo'shish — Asosiy ma'lumot, Manzil + xarita, SEO, Holat sidebar | `src/app/admin/clinics/new/page.tsx` + `ClinicForm.tsx` |
| 6 | `klinikani_tahrirlash_to_ldirilgan_to_q_rejim` | Tahrirlash — to'ldirilgan forma + success toast + Fotogalereya + Xizmatlar | `src/app/admin/clinics/[id]/edit/page.tsx` |
| 7 | `klinika_shakli_saqlanmoqda_to_q_rejim` | Saving state — disabled inputs + spinner + "Saqlanmoqda..." button | `ClinicForm.tsx` loading state |
| 8 | `klinika_shakli_xatolik_holati_yorug_rejim` | Validation error — "5 ta xato bor" banner + red borders + helper textlar | RHF + Zod error UI |
| 9 | `klinikalar_bo_sh_va_yuklanish_holatlari` | Admin empty state — "Hali klinika qo'shilmagan" + "+ Birinchi klinikani qo'shing" | Numton'ning `EmptyState` orqali |

**Diqqat:** `OpeningHoursEditor.tsx` (7 kunlik grid + "Tanaffus qo'shish") — Sunnatbek yozadi. Xarita orqali koordinata tanlash — Doniyor'ning `ClinicMap.tsx` ni qayta ishlatadi.

**DOD:** Non-admin foydalanuvchi `/admin` ga kira olmaydi (RBAC middleware), har bir destruktiv amal `ConfirmDialog` ko'rsatadi, dark/light global ishlaydi.

---

## Suhrob (Authentication Engineer) — 4 ta design

Autentifikatsiya oqimi to'liq Suhrob'da: kirish, ro'yxatdan o'tish, parol tiklash.

| # | Design papka | Nima qilinadi | Qayerga kod |
| --- | --- | --- | --- |
| 1 | `kirish_login_desktop` | Login — split-screen, email + parol, social, "Parolni unutdingizmi?" | `src/app/(auth)/login/page.tsx` + `LoginForm.tsx` |
| 2 | `ro_yxatdan_o_tish_desktop` | Register — F.I.SH, +998 telefon mask, parol kuchi indikatori, terms checkbox | `src/app/(auth)/register/page.tsx` + `RegisterForm.tsx` |
| 3 | `kirish_va_ro_yxatdan_o_tish_mobil` | Login + Register mobil versiyalari (bitta sahifa, ikki forma) | yuqoridagilarning responsive variantlari |
| 4 | `parolni_tiklash_desktop` | Email kiritib, parol tiklash havolasini olish | `src/app/(auth)/forgot-password/page.tsx` + `ForgotPasswordForm.tsx` |

**Diqqat:** Stitch design'da xato states (red border + "Email noto'g'ri formatda") allaqachon ko'rsatilgan — Zod schema'ga moslab UI'da chiqaring.

**DOD:** Login → bosh sahifaga redirect, refresh token avtomatik, logout cache tozalaydi.

---

## Doniyor (Clinics & Map Engineer) — 11 ta design

Eng katta hajmli vazifa Doniyor'da: klinikalar listingi, tafsilot, xarita, qidiruv.

| # | Design papka | Nima qilinadi | Qayerga kod |
| --- | --- | --- | --- |
| 1 | `klinikalar_ro_yxat_desktop` | Klinikalar ro'yxati — filtrlar sidebar + 3-column grid + "Qo'llash" coral button | `src/app/(main)/clinics/page.tsx` + `ClinicList.tsx` + `ClinicFilters.tsx` |
| 2 | `klinikalar_ro_yxat_mobil` | Mobile — Filtrlar pill + Narx dropdown + xarita ikon + cards | yuqoridagining responsive |
| 3 | `filtrlar_mobil` | Mobile bottom-sheet filter — Shahar, Holat, Masofa slider, Reyting, Xizmatlar | `ClinicFilters.tsx` mobile variant |
| 4 | `klinika_ma_lumotlari_desktop` | Klinika tafsiloti — image gallery, sticky info bar, tabs (Ma'lumot/Xizmatlar/Sharhlar/Joylashuv), Aloqa + Ish vaqti sidebar | `src/app/(main)/clinics/[id]/page.tsx` + `ClinicDetail.tsx` |
| 5 | `klinika_ma_lumotlari_mobil` | Mobile — collapsible cards, swipeable gallery, sticky bottom action bar | yuqoridagining responsive |
| 6 | `klinika_ma_lumotlari_yuklanmoqda` | Detail page skeleton holati | `[id]/loading.tsx` |
| 7 | `xarita_klinikalar_qidiruvi_desktop` | Full-screen Leaflet xarita + chap sidebar (klinika listi) + filter chips | `src/app/(main)/map/page.tsx` + `ClinicMap.tsx` |
| 8 | `xarita_klinikalar_qidiruvi_mobil` | Mobile xarita + bottom sheet (peekable) | yuqoridagining responsive |
| 9 | `qidiruv_natijalari_desktop` | Search results — kategoriyalar tab (Klinikalar/Mutaxassislar/Sharhlar) + highlighted matched terms | `src/app/(main)/search/page.tsx` |
| 10 | `qidiruv_natijalari_mobil` | Mobile search — sticky search bar + scrollable tabs + cards | yuqoridagining responsive |
| 11 | `qidiruv_yuklanmoqda` | Search loading skeleton | `search/loading.tsx` |

**Diqqat:** `OpeningHours.tsx` ("Hozir ochiq" mantiqi bilan) — Doniyor yozadi.

**DOD:** Klinika sahifasi SEO-friendly (`generateMetadata`), xarita 60fps, geolocation graceful fallback.

---

## Akbar (Profile & Reviews Engineer) — 5 ta design

Foydalanuvchi profili va sharhlar tizimi.
Sharhlar UI'si Doniyor'ning klinika tafsilot sahifasi ichiga integratsiya qilinadi.

| # | Design papka | Nima qilinadi | Qayerga kod |
| --- | --- | --- | --- |
| 1 | `foydalanuvchi_profili_desktop` | Profil header (avatar + banner + VIP badge), tabs (Ma'lumot/Sevimlilar/Sharhlar/Sozlamalar), Statistika + Hayvonlar cards | `src/app/(main)/profile/page.tsx` |
| 2 | `foydalanuvchi_profili_mobil` | Mobile profil — vertical stack, "Faol uy hayvonlari" carousel, bottom nav | yuqoridagining responsive |
| 3 | `profilni_tahrirlash_modal` | Edit Profile dialog — avatar uploader, ism / familiya / telefon / email | `EditProfileDialog.tsx` |
| 4 | `sevimlilar_desktop` | Sevimlilar — saqlangan klinikalar grid + empty state | `src/app/(main)/profile/favorites/page.tsx` |
| 5 | `sozlamalar_desktop` | Sozlamalar — Hisob xavfsizligi, Bildirishnomalar, Ko'rinish (til + tema), Xavfli zona | `src/app/(main)/profile/settings/page.tsx` |

**Sharhlar (Doniyor bilan birga):** klinika tafsilot sahifasidagi "Sharhlar" tab uchun `ReviewList.tsx`, `ReviewCard.tsx`, `ReviewForm.tsx`, `RatingStars.tsx` — Akbar yozadi, Doniyor sahifaga integratsiya qiladi.

**DOD:** Sharh yuborish < 500ms (optimistic), o'z sharhini tahrirlay/o'chira oladi, boshqaning sharhini emas.

---

## Yahyo (Layout Engineer) — global

Yahyoda alohida Stitch papkasi yo'q — sening ishing **butun loyihada ko'rinadi**.
Header, Footer, Mobile menyu, Theme toggle — har bir sahifaning ramkasi.

| Komponent | Joy |
| --- | --- |
| Header (logo + nav + Kirish/Profil tugmasi) | `src/components/layout/Header.tsx` |
| Footer (linklar + kontakt + copyright) | `src/components/layout/Footer.tsx` |
| Mobile menyu (drawer) | `src/components/layout/MobileNav.tsx` |
| Mobile bottom nav (Doniyor bilan birga) | `src/components/layout/MobileBottomNav.tsx` |
| Theme toggle (light / dark) | `src/components/layout/ThemeToggle.tsx` |
| Theme provider | `src/components/layout/ThemeProvider.tsx` |

**Referens:** Header / Footer ko'rinishi `vetclinic_uz_bosh_sahifa` design'idan.

**DOD:** 375px - 1280px gacha responsive, light / dark global almashinadi, focus ring va a11y to'g'ri.

---

## Hayot (Landing Engineer) — 1 ta design

Bosh sahifa va landing tajribasi (About / Contact / FAQ ham senda — design'siz, oddiy content sahifalar).

| # | Design papka | Nima qilinadi | Qayerga kod |
| --- | --- | --- | --- |
| 1 | `vetclinic_uz_bosh_sahifa` | Bosh sahifa — Hero, Stats, Mashhur klinikalar, Shaharlar, "Qanday ishlaydi", Testimonials | `src/app/(main)/page.tsx` + `src/components/home/*` |

**Qo'shimcha (design'siz):**
- `src/app/(main)/about/page.tsx`
- `src/app/(main)/contact/page.tsx` + `ContactForm.tsx`
- `src/app/(main)/faq/page.tsx`
- `src/config/site.ts` (sayt nomi, slogan, social linklar)

**DOD:** Bosh sahifa mobile (375px) + desktop (1280px), Lighthouse Accessibility ≥ 95, barcha matnlar imlo xatosiz.

---

## Numton (Shared Components Engineer) — 4 ta design

Sening komponentlaring loyihaning **har bir sahifasida** ishlatiladi.
Kichik, sodda, qayta ishlatish uchun mos.

| # | Design papka | Nima qilinadi | Qayerga kod |
| --- | --- | --- | --- |
| 1 | `komponentlar_kutubxonasi_yorug_rejim` | Light mode dizayn tizimi — buttons, inputs, cards, badges | `src/components/ui/*` (shadcn primitives) |
| 2 | `komponentlar_kutubxonasi_to_q_rejim` | Dark mode varianti — yuqoridagi komponentlar dark theme uchun | shadcn theme tokens (`globals.css`) |
| 3 | `klinikalar_yuklanmoqda_skeleton` | Loading skeleton (clinic list uchun) | `src/components/shared/LoadingSpinner.tsx` + Skeleton variantlari |
| 4 | `natija_topilmadi_desktop` | "Hech narsa topilmadi" empty state | `src/components/shared/EmptyState.tsx` |

**Qo'shimcha (design'siz):**
- `src/components/shared/ErrorMessage.tsx`
- `src/components/shared/ConfirmDialog.tsx`
- `src/components/shared/Toast.tsx` + `ToastContainer.tsx`
- `src/lib/toast/toast.store.ts` + `useToast.ts`
- `src/lib/constants/cities.ts`, `routes.ts`

**DOD:** Har bir komponent props bilan qayta ishlatiladi, light va dark rejimda ishlaydi, `useToast` hook orqali butun loyihada bir xil API.

---

## Umumiy ish tartibi (har bir o'quvchi uchun)

1. **O'rgan:** Stitch papkasidagi `code.html` ni VS Code'da och, qaysi Tailwind class'lar ishlatilganiga qara.
2. **Brauzerda och:** `screen.png` ni ko'rib, real natijani tushun.
3. **shadcn add:** Kerakli primitive'larni o'rnat (`npx shadcn@latest add button card dialog ...`).
4. **Schemalar avval:** TypeScript types va Zod schema'larni boshlang'ich qil.
5. **API hook:** TanStack Query hooklarini yoz.
6. **Komponent:** loading / error / empty holatlari bilan birga yoz.
7. **Sahifa:** komponentlarni ulang.
8. **Responsive:** DevTools'da 375px va 1280px da tekshir.
9. **Sifat:** `npm run typecheck && npm run lint && npm run build` — uchchalasi yashil.
10. **PR och:** screenshot bilan, kichik va o'qiladigan diff.

## O'chirilgan dublikatlar (audit log)

Quyidagilar dublikat sifatida olib tashlangan:

- `klinika_ma_lumotlari/` — `klinika_ma_lumotlari_desktop/` ning eski versiyasi
- `klinikalar_qidiruv_natijalari/` — `klinikalar_ro_yxat_desktop/` bilan bir xil layout
- `admin_panel_dashboard/` — `admin_dashboard_yorug_rejim/` ning zaifroq nusxasi (alohida dark + light pair yaxshiroq)

**Jami:** 38 → 35 ta design papka (`vetclinic_uz/` design system referens sifatida saqlanadi).
