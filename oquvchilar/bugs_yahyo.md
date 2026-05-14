# 🐛 Yahyo — buglar (Layout audit)

**Status:** UI tomonidan ishlaring chiroyli, lekin **integratsiya va
funksionallikda 4 ta HIGH va 4 ta MEDIUM bug bor**.
Pastdagilarni production'ga chiqarishdan oldin tuzatish SHART.

> Tartibi bo'yicha bajar: Y1 → Y2 → Y3 → Y4 → keyin MEDIUMlar.

---

## 🔴 Y1 — HIGH — `MobileNav.tsx` da 404 marshrutlari

**Fayl:** `src/components/layout/MobileNav.tsx` (39, 42 qatorlar)

**Muammo:** Mobile menyu ichidagi "Kirish" va "Ro'yxatdan o'tish" tugmalari
`/auth/login` va `/auth/register` ga olib boradi. Real marshrut **boshqacha**:

| Sen yozgan | To'g'risi |
|------------|-----------|
| `/auth/login` | `/login` |
| `/auth/register` | `/register` |

Suhrob `src/app/(auth)/login/page.tsx` va `src/app/(auth)/register/page.tsx`
yaratgan. `(auth)` route group'da, URL'da `/auth/` segmenti **YO'Q**.

**Test:** mobil ekranda hamburger → "Kirish" → 404 sahifa.

**Fix:**

```tsx
<Link href="/login" onClick={onClose} className="...">Kirish</Link>
<Link href="/register" onClick={onClose} className="...">Ro'yxatdan o'tish</Link>
```

Yana yaxshisi — Suhrob'ning `NavAuthButton` komponentini bu yerda ham
ishlatish (login bo'lgan userga "Profil" tugmasi chiqsin):

```tsx
import { NavAuthButton } from "@/src/features/auth/components/NavAuthButton";
// ...
<div className="space-y-3 pt-6 border-t border-[var(--outline-variant)]">
  <NavAuthButton />
</div>
```

---

## 🔴 Y2 — HIGH — `/services` marshruti mavjud emas

**Fayllar:**
- `src/components/layout/Header.tsx` (NAV_LINKS, 12-qator)
- `src/components/layout/Footer.tsx` (19-qator)

**Muammo:** Sen "Xizmatlar" linkini `/services` ga qo'ygansan, lekin
`src/app/(main)/services/page.tsx` **yo'q**. Foydalanuvchi 404 oladi.

**Hozir mavjud marshrutlar:** `/clinics`, `/map`, `/search`, `/about`,
`/contact`, `/profile`, `/login`, `/register`.

**2 ta tanlov:**

### Tanlov A — `/services` ni olib tashla

`Header.tsx` da:

```ts
const NAV_LINKS = [
  { href: "/clinics", label: "Klinikalar"   },
  { href: "/map",     label: "Shaharlar"    },
  { href: "/about",   label: "Yordam"       },
];
```

`Footer.tsx` da ham "Xizmatlar" qatorini o'chir.

### Tanlov B — placeholder sahifa yarat

`src/app/(main)/services/page.tsx`:

```tsx
export default function ServicesPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-20">
      <h1 className="text-4xl font-bold mb-4">Xizmatlar</h1>
      <p className="text-[var(--on-surface-variant)]">
        Bu bo'lim tez orada to'ldiriladi.
      </p>
    </div>
  );
}
```

**Tavsiya:** Tanlov A (kerakmas linkni olib tashla — keyin Numton/PM xizmatlar
sahifasini real content bilan yaratadi).

---

## 🔴 Y3 — HIGH — `font-h1`/`font-body-lg` klasslari hech narsa qilmaydi

**Fayllar:** Header, Footer, MobileNav, `(main)/page.tsx`, about, contact.

**Muammo:** Sen `className="font-h1"`, `font-h2`, `font-h3`, `font-body-md`,
`font-body-lg` deb yozgansan, lekin **bu klasslar hech qayerda
aniqlanmagan** — `globals.css`'da yo'q, `tailwind.config` yo'q.

Tailwind 4'da bu klasslarni `@theme inline` ichida tarjima qilish kerak.

**Test:** Browser DevTools → Headings'ni inspect qil → bu klasslarda hech
qanday CSS yo'qligini ko'rasan. Hozir headinglar faqat `text-4xl font-bold`
orqali ishlayapti.

**Fix — `src/app/globals.css` ga qo'sh** (`@import "tailwindcss";` dan keyin):

```css
@theme inline {
  /* Sarlavhalar */
  --font-h1: 800 3rem/1.1 'Plus Jakarta Sans', sans-serif;
  --font-h2: 700 2.25rem/1.2 'Plus Jakarta Sans', sans-serif;
  --font-h3: 700 1.5rem/1.3 'Plus Jakarta Sans', sans-serif;

  /* Body matn */
  --font-body-md: 500 0.875rem/1.5 'Inter', sans-serif;
  --font-body-lg: 500 1rem/1.6 'Inter', sans-serif;
}
```

Yoki **soddaroq variant** — har bir klassni alohida CSS:

```css
.font-h1     { font: 800 3rem/1.1 'Plus Jakarta Sans', sans-serif; }
.font-h2     { font: 700 2.25rem/1.2 'Plus Jakarta Sans', sans-serif; }
.font-h3     { font: 700 1.5rem/1.3 'Plus Jakarta Sans', sans-serif; }
.font-body-md{ font: 500 0.875rem/1.5 'Inter', sans-serif; }
.font-body-lg{ font: 500 1rem/1.6 'Inter', sans-serif; }
```

---

## 🔴 Y4 — HIGH — `ThemeToggle.tsx` implement qilinmagan

**Fayl:** `src/components/layout/ThemeToggle.tsx`

**Muammo:** Hozir komponenta `return null` qaytaradi. Spec'da:

> 4. `ThemeToggle` orqali light / dark rejimini almashtirasan.
> - [ ] Theme toggle light / dark almashadi va saqlanadi

**`next-themes` shart emas** — `.dark { }` bloki `globals.css`'da allaqachon
tayyor. Sen shunchaki `<html>` ga `dark` klassi qo'shadigan oddiy tugma
yozasan.

**Fix — to'liq implementatsiya:**

```tsx
"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Mount paytida localStorage'dan o'qiymiz
  useEffect(() => {
    const saved = (typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEY)
      : null) as "light" | "dark" | null;
    const initial =
      saved ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Yorug' rejim" : "Qorong'i rejim"}
      className="p-2 rounded-lg hover:bg-[var(--surface-container)] transition-colors text-[var(--on-surface)]"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
```

Keyin `Header.tsx` da Actions ichiga qo'sh:

```tsx
import { ThemeToggle } from "./ThemeToggle";
// ...
<div className="flex items-center space-x-4">
  <ThemeToggle />
  <NavAuthButton />
  {/* ... */}
</div>
```

**Hydration mismatch'ning oldini olish uchun**, `<html>`'ni server'da ham
to'g'ri belgilash uchun `src/app/layout.tsx` da `<script>` ishlat
(blocking, FOUC yo'q):

```tsx
<html lang="uz" suppressHydrationWarning>
  <head>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var t = localStorage.getItem('theme')
                || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              if (t === 'dark') document.documentElement.classList.add('dark');
            } catch (e) {}
          })();
        `,
      }}
    />
  </head>
  <body>...</body>
</html>
```

---

## 🟡 Y5 — MEDIUM — `useAuth.ts` o'lik kod

**Fayl:** `src/features/auth/hooks/useAuth.ts`

**Muammo:** Sen yaratgan stub:

```ts
export function useAuth() {
  return { user: null, isAuthenticated: false, logout: () => {} };
}
```

Endi Suhrob `useCurrentUser`, `useAuthStore`, `useLogout`'ni yozdi.
Bu fayl **hech qayerdan import qilinmaydi** va doim `user: null` qaytaradi —
xato xulosa berishi mumkin.

**Fix:** Faylni o'chir:

```bash
rm src/features/auth/hooks/useAuth.ts
```

---

## 🟡 Y6 — MEDIUM — Accessibility (a11y) muammolari

**Fayllar:** `Header.tsx`, `MobileNav.tsx`

**Hozir yetishmayotgan narsalar:**

1. Hamburger tugmasida `aria-label` va `aria-expanded` yo'q.
2. `MobileNav` drawer'da `role="dialog"` va `aria-modal="true"` yo'q.
3. Escape klavishi drawer'ni yopmaydi.
4. Drawer ochilganda focus drawer ichiga olib o'tilmaydi (focus trap).
5. Yopish ✕ tugmasida `aria-label="Yopish"` yo'q.

**Header.tsx fix:**

```tsx
<button
  className="md:hidden flex flex-col gap-1.5 p-1"
  onClick={() => setMobileOpen(true)}
  aria-label="Menyu"
  aria-expanded={mobileOpen}
  aria-controls="mobile-nav"
>
  {/* ... */}
</button>
```

**MobileNav.tsx fix:**

```tsx
useEffect(() => {
  function onKey(e: KeyboardEvent) {
    if (e.key === "Escape") onClose();
  }
  if (isOpen) document.addEventListener("keydown", onKey);
  return () => document.removeEventListener("keydown", onKey);
}, [isOpen, onClose]);

// JSX:
<nav
  id="mobile-nav"
  role="dialog"
  aria-modal="true"
  aria-label="Asosiy menyu"
  className="..."
>
  {/* ... */}
  <button
    onClick={onClose}
    aria-label="Yopish"
    className="text-2xl text-[var(--on-surface-variant)]"
  >
    ✕
  </button>
```

---

## 🟡 Y7 — MEDIUM — Footer emoji ikonlar (brand consistency)

**Fayl:** `src/components/layout/Footer.tsx`

**Muammo:** `📧`, `📞`, `📍` — unicode emoji. Suhrob loyihaga
**Material Symbols** font qo'shgan va `globals.css`'da
`.material-symbols-outlined` aniqlangan. Brand consistency uchun
emoji o'rniga ikonlardan foydalanish kerak.

**Fix:**

```tsx
<li className="flex items-center gap-2">
  <span className="material-symbols-outlined text-base">mail</span>
  info@vetclinic.uz
</li>
<li className="flex items-center gap-2">
  <span className="material-symbols-outlined text-base">call</span>
  +998 71 123 45 67
</li>
<li className="flex items-center gap-2">
  <span className="material-symbols-outlined text-base">location_on</span>
  Toshkent sh., Yunusobod
</li>
```

---

## 🟡 Y8 — MEDIUM — Header'da `NavAuthButton` ulanishi (allaqachon men fix qildim)

**Status:** ✅ Bajarildi (men `Header.tsx` da static "Kirish" tugmasi
o'rniga `<NavAuthButton/>` qo'ydim).

Lekin **kelgusi vazifa uchun bil:** Spec'ning aniq talabi shu edi —
*"User bor bo'lsa Header'da 'Profile' tugmasi, yo'q bo'lsa 'Kirish'"*.
Sen bu integratsiyani qilmagan eding.

---

## ✅ Done checklist (qo'shimcha)

- [ ] Y1 — MobileNav login/register linklari to'g'rilandi
- [ ] Y2 — `/services` marshruti olib tashlandi (yoki page yaratildi)
- [ ] Y3 — `font-h1`..`font-body-lg` klasslari aniqlandi
- [ ] Y4 — ThemeToggle to'liq implement qilindi va Header'ga ulandi
- [ ] Y5 — `useAuth.ts` o'chirildi
- [ ] Y6 — Header/MobileNav a11y qo'shildi
- [ ] Y7 — Footer emoji'lar Material Symbols ga almashtirildi
- [ ] `npm run lint` yashil
- [ ] `npm run build` yashil
- [ ] 375px / 768px / 1280px ekranlarda test qilindi

Push qilganda branch nomi: `Yahyo`.
