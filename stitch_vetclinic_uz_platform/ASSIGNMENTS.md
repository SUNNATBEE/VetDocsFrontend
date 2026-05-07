# VetClinic UZ — Stitch Design'lar bo'yicha o'quvchilar topshirig'i

Stitch chiqargan UI design'lar `f:/Desktop/stitch_vetclinic_uz_platform/` papkasida.
Har bir o'quvchi o'z ro'yxatidagi design'larni ko'rib, kodga o'tkazadi.

**Asosiy qoida:** Stitch'ning HTML kodi — *referens* (faqat kelishish uchun). Buni `Next.js 15 + Tailwind CSS v4 + shadcn/ui` ga moslab qaytadan yozasan. To'g'ridan-to'g'ri nusxa olma.

**Design tokens (DESIGN.md'dan):**
- Primary: Deep Teal `#00685f`
- Accent (CTA): Warm Coral `#fd7369`
- Background: `#f5faf8`
- Cards: 12px radius, Buttons: 8px radius, Badges: 999px (pill)
- Headings: Plus Jakarta Sans, Body: Inter
- Iconlar: Lucide React (1.5px stroke)

---

## Yahyo (UI/UX Engineer) — 5 ta design

Sen butun loyihaning vizual poydevorini quyasan. Header/Footer/Layout va shared komponentlar — hammasi sendan boshlanadi.

| # | Design papka | Nima qilinadi | Qayerga kod |
|---|---|---|---|
| 1 | `vetclinic_uz_bosh_sahifa` | Bosh sahifa — Hero, Stats, Mashhur klinikalar, Shaharlar, "Qanday ishlaydi", Testimonials, Footer | `src/app/(main)/page.tsx` |
| 2 | `komponentlar_kutubxonasi_yorug_rejim` | Light mode dizayn tizimi — buttons, inputs, cards, badges | `src/components/ui/*` (shadcn primitives) |
| 3 | `komponentlar_kutubxonasi_to_q_rejim` | Dark mode varianti — yuqoridagi komponentlar dark theme uchun | shadcn theme tokens (`globals.css`) |
| 4 | `klinikalar_yuklanmoqda_skeleton` | Loading skeleton komponenti (clinic list uchun) | `src/components/shared/LoadingSpinner.tsx` + `Skeleton` variantlar |
| 5 | `natija_topilmadi_desktop` | "Hech narsa topilmadi" empty state | `src/components/shared/EmptyState.tsx` |

**Qo'shimcha:** Header (logo + nav + Kirish/Band qilish), Footer, MobileNav, ThemeToggle — barcha sahifalarda ko'ringan komponentlarni ham sen yozasan.

**DOD:** Bosh sahifa mobile (375px) + desktop (1280px), Lighthouse Accessibility ≥95.

---

## Suhrob (Authentication Engineer) — 4 ta design

Sen autentifikatsiya oqimini to'liq qilasan: kirish, ro'yxatdan o'tish, parol tiklash.

| # | Design papka | Nima qilinadi | Qayerga kod |
|---|---|---|---|
| 1 | `kirish_login_desktop` | Login — split-screen, email + parol, "Google/Telegram" social, parolni unutdingizmi? | `src/app/(auth)/login/page.tsx` + `LoginForm.tsx` |
| 2 | `ro_yxatdan_o_tish_desktop` | Register — F.I.SH, +998 telefon mask, parol kuchi indikatori, terms checkbox | `src/app/(auth)/register/page.tsx` + `RegisterForm.tsx` |
| 3 | `kirish_va_ro_yxatdan_o_tish_mobil` | Login + Register mobil versiyalari (bitta sahifa, ikki forma) | yuqoridagilarning responsive variantlari |
| 4 | `parolni_tiklash_desktop` | Email kiritib, parol tiklash havolasini olish | `src/app/(auth)/forgot-password/page.tsx` + `ForgotPasswordForm.tsx` |

**Diqqat:** Stitch design'da xato states (red border + "Email noto'g'ri formatda") allaqachon ko'rsatilgan — Zod schema'ga moslab UI'da chiqar.

**DOD:** Login → bosh sahifa redirect, refresh token avtomatik, logout cache tozalaydi.

---

## Doniyor (Clinics & Map Engineer) — 11 ta design

Eng katta hajmli vazifa sendan. Klinikalar listingi, tafsilot, xarita, qidiruv — hammasi.

| # | Design papka | Nima qilinadi | Qayerga kod |
|---|---|---|---|
| 1 | `klinikalar_ro_yxat_desktop` | Klinikalar ro'yxati — filtrlar sidebar + 3-column grid + "Qo'llash" coral button | `src/app/(main)/clinics/page.tsx` + `ClinicList.tsx` + `ClinicFilters.tsx` |
| 2 | `klinikalar_ro_yxat_mobil` | Mobile — Filtrlar pill button + Narx dropdown + xarita ikon + cards | yuqoridagining responsive |
| 3 | `filtrlar_mobil` | Mobile bottom-sheet filter — Shahar, Holat, Masofa slider, Reyting, Xizmatlar, "Qo'llash" | `ClinicFilters.tsx` mobile variant |
| 4 | `klinika_ma_lumotlari_desktop` | Klinika tafsiloti — image gallery, sticky info bar, tabs (Ma'lumot/Xizmatlar/Sharhlar/Joylashuv), Aloqa+Ish vaqti sidebar | `src/app/(main)/clinics/[id]/page.tsx` + `ClinicDetail.tsx` |
| 5 | `klinika_ma_lumotlari_mobil` | Mobile — collapsible cards, swipeable gallery, sticky bottom action bar | yuqoridagining responsive |
| 6 | `klinika_ma_lumotlari_yuklanmoqda` | Detail page skeleton holati | `[id]/loading.tsx` |
| 7 | `xarita_klinikalar_qidiruvi_desktop` | Full-screen Leaflet xarita + chap sidebar (klinika listi) + filter chips | `src/app/(main)/map/page.tsx` + `ClinicMap.tsx` |
| 8 | `xarita_klinikalar_qidiruvi_mobil` | Mobile xarita + bottom sheet (peekable) | yuqoridagining responsive |
| 9 | `qidiruv_natijalari_desktop` | Search results — kategoriyalar tab (Klinikalar/Mutaxassislar/Sharhlar) + highlighted matched terms | `src/app/(main)/search/page.tsx` |
| 10 | `qidiruv_natijalari_mobil` | Mobile search — sticky search bar + scrollable tabs + cards | yuqoridagining responsive |
| 11 | `qidiruv_yuklanmoqda` | Search loading skeleton | `search/loading.tsx` |

**Diqqat:** `OpeningHours.tsx` (ish vaqti jadvali "Hozir ochiq" mantiqi bilan) — sen yozasan.

**DOD:** Klinika sahifasi SEO-friendly (`generateMetadata`), xarita 60fps, geolocation graceful fallback.

---

## Akbar (User Profile & Reviews Engineer) — 5 ta design

Sen foydalanuvchi profili va sharhlar tizimini qilasan. Sharhlar UI'si Doniyor'ning Klinika tafsilot sahifasi ichiga integratsiya qilinadi.

| # | Design papka | Nima qilinadi | Qayerga kod |
|---|---|---|---|
| 1 | `foydalanuvchi_profili_desktop` | Profil header (avatar+banner+VIP badge), tabs (Ma'lumotlarim/Sevimlilar/Sharhlarim/Sozlamalar), Statistika+Hayvonlar cards | `src/app/(main)/profile/page.tsx` |
| 2 | `foydalanuvchi_profili_mobil` | Mobile profil — vertical stack, "Faol uy hayvonlari" carousel, bottom nav | yuqoridagining responsive |
| 3 | `profilni_tahrirlash_modal` | Edit Profile dialog — avatar uploader, ism/familiya/telefon/email | `EditProfileDialog.tsx` |
| 4 | `sevimlilar_desktop` | Sevimlilar — saqlangan klinikalar grid + "Hali sevimli klinikangiz yo'q" empty state | `src/app/(main)/profile/favorites/page.tsx` |
| 5 | `sozlamalar_desktop` | Sozlamalar — Hisob xavfsizligi, Bildirishnomalar, Ko'rinish (til + tema), Xavfli zona (Hisobni o'chirish) | `src/app/(main)/profile/settings/page.tsx` |

**Sharhlar (Doniyor bilan birga):** Klinika tafsilot sahifasidagi "Sharhlar" tab uchun `ReviewList.tsx`, `ReviewCard.tsx`, `ReviewForm.tsx`, `RatingStars.tsx` — sen yozasan, lekin u sahifaga Doniyor integratsiya qiladi.

**DOD:** Sharh yuborish < 500ms (optimistic), o'z sharhini tahrirlay/o'chira oladi.

---

## Hayot (Admin Panel Engineer) — 9 ta design

Admin panel — dark theme default. Klinikalar CRUD, dashboard, formalar.

| # | Design papka | Nima qilinadi | Qayerga kod |
|---|---|---|---|
| 1 | `admin_dashboard_to_q_rejim` | Admin Dashboard (DARK) — KPI cards, sparkline, area chart, bar chart, "So'nggi faollik", "Tezkor amallar" | `src/app/admin/page.tsx` |
| 2 | `admin_dashboard_yorug_rejim` | Admin Dashboard (LIGHT) — yuqoridagining yorug' rejimi | theme tokens orqali |
| 3 | `klinikalar_ro_yxati_admin_to_q_rejim` | Admin Klinikalar table (DARK) — checkbox, image, status pill, actions, pagination | `src/app/admin/clinics/page.tsx` |
| 4 | `klinikalar_ro_yxati_admin_yorug_rejim` | Yuqoridagi LIGHT + delete confirmation dialog ("Klinikani o'chirishni tasdiqlaysizmi?") | `ConfirmDialog.tsx` integratsiyasi |
| 5 | `yangi_klinika_bo_sh_shakl_to_q_rejim` | Yangi klinika qo'shish — Asosiy ma'lumot, Manzil+xarita, SEO, Holat sidebar | `src/app/admin/clinics/new/page.tsx` + `ClinicForm.tsx` |
| 6 | `klinikani_tahrirlash_to_ldirilgan_to_q_rejim` | Tahrirlash holati — to'ldirilgan forma + "Klinika muvaffaqiyatli saqlandi" toast + Fotogalereya + Xizmatlar | `src/app/admin/clinics/[id]/edit/page.tsx` |
| 7 | `klinika_shakli_saqlanmoqda_to_q_rejim` | Saving state — disabled inputs + spinner + "Saqlanmoqda..." button | `ClinicForm.tsx` loading state |
| 8 | `klinika_shakli_xatolik_holati_yorug_rejim` | Validation error — "5 ta xato bor" banner + red borders + "Bu maydon majburiy" helper | RHF + Zod error UI |
| 9 | `klinikalar_bo_sh_va_yuklanish_holatlari` | Admin empty state — "Hali klinika qo'shilmagan" + "+ Birinchi klinikani qo'shing" | empty state komponenti |

**Diqqat:** `OpeningHoursEditor.tsx` (7-day grid + "Tanaffus qo'shish") — sen yozasan. Xarita orqali koordinata tanlash — Doniyor'ning `ClinicMap.tsx` ni qayta ishlatasan.

**DOD:** Non-admin foydalanuvchi `/admin` ga kira olmaydi, har bir destruktiv amal `ConfirmDialog` ko'rsatadi.

---

## Sunnatbek (Tech Lead) — UI design'lar yo'q, lekin

Sening vazifang infratuzilma. Lekin har bir o'quvchi PR'ida code review qilasan va quyidagilarni ta'minlaysan:

- Har bir Stitch design'ni o'quvchi to'g'ri yozayaptimi (Tailwind class'lari, shadcn primitive'lari, accessibility)
- `theme.ts` (Tailwind config) — DESIGN.md'dagi ranglar to'g'ri tokenlar bo'lib yozilgan
- Dark/Light tema almashishi global ishlaydi
- `loading.tsx` va `error.tsx` har bir route'da bor
- `not-found.tsx` global 404 — Stitch'da yo'q, sen yozasan (yoki Yahyo'ga topshir)

---

## Umumiy ish tartibi (har bir o'quvchi uchun)

1. **O'rgan:** Stitch papkasidagi `code.html` ni VS Code'da och, qanday Tailwind class'lar ishlatilganini ko'r
2. **Brauzerda och:** `screen.png` ni ko'rib, real natija nima ekanini tushun
3. **shadcn add:** Kerakli primitive'larni o'rnat (`npx shadcn@latest add button card dialog ...`)
4. **TypeScript types** + **Zod schema** ni avval yoz
5. **API hook** (TanStack Query) ni keyin yoz
6. **Component**'ni yoz — loading/error/empty state'lari bilan
7. **Page**'ni ulab tekshir
8. **Mobile (375px) + Desktop (1280px)** — DevTools'da test qil
9. **`npm run typecheck && npm run lint`** — yashil bo'lishi shart
10. **PR och** — screenshot bilan

---

## O'chirilgan dublikatlar (audit log)

Bu papkalar dublikat sifatida olib tashlandi:

- ❌ `klinika_ma_lumotlari/` — `klinika_ma_lumotlari_desktop/` ning eski versiyasi
- ❌ `klinikalar_qidiruv_natijalari/` — `klinikalar_ro_yxat_desktop/` bilan bir xil layout
- ❌ `admin_panel_dashboard/` — `admin_dashboard_yorug_rejim/` ning zaifroq nusxasi (alohida dark+light pair yaxshiroq)

**Jami:** 38 → 35 ta design papka.
