1 # Vet Clinic Frontend — Loyiha Strukturasi va Komanda Vazifalari               2                                                                            
    3 > **Backend:** Express 5 + Prisma 6 + Postgres (`/api/v1`)                 
    4 > **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + 
 sh
      adcn/ui
    5 > **Til:** UI matnlari **o'zbek tilida** (backend response'lariga moslab)  
    6 > **Komanda:** 6 kishi — Yahyo, Suhrob, Doniyor, Akbar, Sunnatbek (Tech    
 Lea
      d), Hayot
    7 > **Repository:** GitHub — branch-based collaboration
    8 > **Loyiha boshlanishi:** 2026-05-06 | **Maqsad:** 5 hafta ichida MVP      
    9
   10 ---
   11
   12 ## Mundarija
   13
   14 1. [Texnologik stack](#1-texnologik-stack)
   15 2. [Loyiha strukturasi](#2-loyiha-strukturasi)
   16 3. [Hard konvensiyalar](#3-hard-konvensiyalar)
   17 4. [Backend ↔ Frontend mapping](#4-backend--frontend-endpoint-mapping)     
   18 5. [Komanda vazifalari](#5-komanda-vazifalari)
   19 6. [Git workflow](#6-git-workflow)
   20 7. [Setup va ishga tushirish](#7-setup-va-ishga-tushirish)
   21 8. [Sprint roadmap](#8-sprint-roadmap)
   22 9. [Definition of Done](#9-definition-of-done)
   23 10. [Resurslar](#10-resurslar)
   24
   25 ---
   26
   27 ## 1. Texnologik stack
   28
   29 | Qatlam | Tanlov | Sabab |
   30 |---|---|---|
   31 | Framework | **Next.js 15** (App Router) | SSR/ISR, SEO, file-based       
 routin
      g |
   32 | Til | **TypeScript** (strict mode) | Type-safety, IDE qo'llab-quvvatlovi 

      |
   33 | Styling | **Tailwind CSS v4** | Utility-first, tez prototip |
   34 | UI kit | **shadcn/ui** + Radix UI | Accessible, maxsus komponentlar |    
   35 | Server state | **TanStack Query v5** | Caching, refetching, mutations |  
   36 | Client state | **Zustand** | Yengil, boilerplate yo'q |
   37 | Forms | **React Hook Form** + **Zod** | Backend Zod schema'ga moslash |  
   38 | HTTP | **Axios** + interceptor | Auto refresh-token, response envelope | 
   39 | Icons | **Lucide React** | shadcn bilan mos |
   40 | Maps | **Leaflet** + `react-leaflet` | Bepul, OpenStreetMap |
   41 | i18n | **next-intl** | Uzbek + Rus + Ingliz (Phase 2) |
   42 | Lint/Format | ESLint + Prettier + Husky + lint-staged | CI darvoza |     
   43 | Testing | Vitest + RTL + Playwright (E2E) | Unit + integration + E2E |   
   44 | Deploy | **Vercel** | Next.js uchun nativ |
   45
   46 **Node.js:** `>=20.0.0` (backend bilan bir xil)
   47
   48 ---
   49
   50 ## 2. Loyiha strukturasi
   51
   52 ```
   53 vet-clinic-frontend/
   54 ├── public/
   55 │   ├── images/                       # Statik rasmlar (logo, banner)      
   56 │   ├── icons/                        # Favicon, manifest icons
   57 │   └── locales/                      # i18n JSON (uz, ru, en)
   58 │
   59 ├── src/
   60 │   ├── app/                          # Next.js App Router
   61 │   │   ├── (auth)/                   # Auth group — markazlangan layout   
   62 │   │   │   ├── layout.tsx
   63 │   │   │   ├── login/page.tsx
   64 │   │   │   ├── register/page.tsx
   65 │   │   │   ├── forgot-password/page.tsx
   66 │   │   │   └── reset-password/[token]/page.tsx
   67 │   │   │
   68 │   │   ├── (main)/                   # Asosiy layout (Header + Footer)    
   69 │   │   │   ├── layout.tsx
   70 │   │   │   ├── page.tsx              # Bosh sahifa
   71 │   │   │   ├── clinics/
   72 │   │   │   │   ├── page.tsx          # Klinikalar ro'yxati
   73 │   │   │   │   └── [id]/page.tsx     # Klinika tafsiloti
   74 │   │   │   ├── map/page.tsx          # Xarita ko'rinishi
   75 │   │   │   ├── search/page.tsx       # Qidiruv natijalari
   76 │   │   │   ├── profile/
   77 │   │   │   │   ├── page.tsx          # Mening profilim
   78 │   │   │   │   ├── pets/             # Phase 2
   79 │   │   │   │   ├── appointments/     # Phase 2
   80 │   │   │   │   └── favorites/page.tsx
   81 │   │   │   ├── about/page.tsx
   82 │   │   │   └── contact/page.tsx
   83 │   │   │
   84 │   │   ├── admin/                    # Admin panel (RBAC)
   85 │   │   │   ├── layout.tsx            # Sidebar + ADMIN guard
   86 │   │   │   ├── page.tsx              # Dashboard
   87 │   │   │   ├── clinics/
   88 │   │   │   │   ├── page.tsx
   89 │   │   │   │   ├── new/page.tsx
   90 │   │   │   │   └── [id]/edit/page.tsx
   91 │   │   │   ├── users/page.tsx
   92 │   │   │   └── reviews/page.tsx
   93 │   │   │
   94 │   │   ├── layout.tsx                # Root layout (Providers)
   95 │   │   ├── error.tsx                 # Global error boundary
   96 │   │   ├── not-found.tsx             # 404
   97 │   │   ├── loading.tsx               # Global loading UI
   98 │   │   └── globals.css               # Tailwind direktivlari
   99 │   │
  100 │   ├── components/
  101 │   │   ├── ui/                       # shadcn primitives
  102 │   │   ├── layout/
  103 │   │   │   ├── Header.tsx
  104 │   │   │   ├── Footer.tsx
  105 │   │   │   ├── Sidebar.tsx           # Admin
  106 │   │   │   ├── MobileNav.tsx
  107 │   │   │   └── ThemeToggle.tsx
  108 │   │   └── shared/
  109 │   │       ├── ErrorMessage.tsx
  110 │   │       ├── EmptyState.tsx
  111 │   │       ├── LoadingSpinner.tsx
  112 │   │       ├── ConfirmDialog.tsx
  113 │   │       └── Pagination.tsx
  114 │   │
  115 │   ├── features/                     # Domen modullari (4 fayl pattern)   
  116 │   │   ├── auth/
  117 │   │   │   ├── api/auth.api.ts
  118 │   │   │   ├── components/
  119 │   │   │   │   ├── LoginForm.tsx
  120 │   │   │   │   ├── RegisterForm.tsx
  121 │   │   │   │   └── ForgotPasswordForm.tsx
  122 │   │   │   ├── hooks/
  123 │   │   │   │   ├── useLogin.ts
  124 │   │   │   │   ├── useRegister.ts
  125 │   │   │   │   ├── useLogout.ts
  126 │   │   │   │   └── useCurrentUser.ts
  127 │   │   │   ├── schemas/auth.schema.ts
  128 │   │   │   ├── store/auth.store.ts
  129 │   │   │   └── types.ts
  130 │   │   │
  131 │   │   ├── clinics/
  132 │   │   │   ├── api/clinics.api.ts
  133 │   │   │   ├── components/
  134 │   │   │   │   ├── ClinicCard.tsx
  135 │   │   │   │   ├── ClinicList.tsx
  136 │   │   │   │   ├── ClinicDetail.tsx
  137 │   │   │   │   ├── ClinicMap.tsx
  138 │   │   │   │   ├── ClinicFilters.tsx
  139 │   │   │   │   ├── OpeningHours.tsx
  140 │   │   │   │   └── ImageGallery.tsx
  141 │   │   │   ├── hooks/
  142 │   │   │   ├── schemas/clinic.schema.ts
  143 │   │   │   └── types.ts
  144 │   │   │
  145 │   │   ├── reviews/
  146 │   │   │   ├── api/reviews.api.ts
  147 │   │   │   ├── components/
  148 │   │   │   │   ├── ReviewList.tsx
  149 │   │   │   │   ├── ReviewCard.tsx
  150 │   │   │   │   ├── ReviewForm.tsx
  151 │   │   │   │   └── RatingStars.tsx
  152 │   │   │   ├── hooks/
  153 │   │   │   ├── schemas/review.schema.ts
  154 │   │   │   └── types.ts
  155 │   │   │
  156 │   │   ├── appointments/             # Phase 2
  157 │   │   ├── pets/                     # Phase 2
  158 │   │   └── admin/
  159 │   │       ├── api/admin.api.ts
  160 │   │       ├── components/
  161 │   │       │   ├── AdminDashboard.tsx
  162 │   │       │   ├── ClinicForm.tsx
  163 │   │       │   ├── OpeningHoursEditor.tsx
  164 │   │       │   ├── UserTable.tsx
  165 │   │       │   └── StatsCards.tsx
  166 │   │       └── hooks/
  167 │   │
  168 │   ├── lib/
  169 │   │   ├── api/
  170 │   │   │   ├── client.ts             # Axios + interceptors
  171 │   │   │   ├── endpoints.ts          # URL konstantalar
  172 │   │   │   └── error.ts              # Backend envelope parser
  173 │   │   ├── auth/
  174 │   │   │   ├── token.ts              # Access (memory) + refresh (cookie) 
  175 │   │   │   └── jwt.ts                # JWT decode (role, exp)
  176 │   │   ├── utils/
  177 │   │   │   ├── cn.ts                 # tailwind-merge
  178 │   │   │   ├── format.ts             # Sana, telefon, narx
  179 │   │   │   ├── distance.ts           # Haversine
  180 │   │   │   └── opening-hours.ts      # "Hozir ochiq/yopiq"
  181 │   │   └── constants/
  182 │   │       ├── cities.ts             # O'zbekiston shaharlari
  183 │   │       └── routes.ts
  184 │   │
  185 │   ├── hooks/                        # Umumiy hook'lar
  186 │   │   ├── useDebounce.ts
  187 │   │   ├── useGeolocation.ts
  188 │   │   ├── useMediaQuery.ts
  189 │   │   └── useLocalStorage.ts
  190 │   │
  191 │   ├── providers/
  192 │   │   ├── QueryProvider.tsx         # TanStack Query
  193 │   │   ├── ThemeProvider.tsx         # next-themes
  194 │   │   └── ToastProvider.tsx         # sonner
  195 │   │
  196 │   ├── types/
  197 │   │   ├── api.ts                    # Response envelope tiplar
  198 │   │   ├── user.ts
  199 │   │   ├── clinic.ts
  200 │   │   └── review.ts
  201 │   │
  202 │   ├── config/
  203 │   │   ├── env.ts                    # Zod env validatsiya
  204 │   │   └── site.ts                   # Sayt nomi, meta tags
  205 │   │
  206 │   └── middleware.ts                 # Next.js middleware (auth)
  207 │
  208 ├── .env.example
  209 ├── .env.local                        # gitignored
  210 ├── .eslintrc.json
  211 ├── .prettierrc
  212 ├── .husky/
  213 │   └── pre-commit
  214 ├── next.config.ts
  215 ├── tailwind.config.ts
  216 ├── tsconfig.json                     # "strict": true
  217 ├── components.json                   # shadcn config
  218 ├── package.json
  219 ├── README.md
  220 └── CLAUDE.md
  221 ```
  222
  223 ---
  224
  225 ## 3. Hard konvensiyalar
  226
  227 Bu qoidalar **buzilmasligi shart**. Code review'da birinchi navbatda shu   
 qo
      idalar tekshiriladi.
  228
  229 1. **Response envelope.** Har bir API javobi `{ success, data }` yoki `{   
 su
      ccess: false, error: { code, message }, meta: { requestId } }` shaklida.   
 `l
      ib/api/client.ts`'dagi interceptor envelope'ni ochib, faqat `data`'ni      
 qayta
      radi. Xato bo'lsa typed `ApiError` throw qiladi.
  230
  231 2. **Validatsiya.** Forma validatsiyasi har doim
 `features/<modul>/schemas/
      `'da Zod orqali. Backend xato kodlari (`VALIDATION_ERROR`, `UNAUTHORIZED`, 

      `INVALID_CREDENTIALS`) UI'da O'zbekcha tarjimaga moslashadi.
  232
  233 3. **Server vs Client state.** Server ma'lumotlari (klinikalar, profil,    
 sha
      rhlar) — **TanStack Query**. UI holati (modal ochiq/yopiq, theme, sidebar) 

      — **Zustand** yoki `useState`. Bularni aralashtirmang.
  234
  235 4. **Token saqlash.**
  236    - Access token — **faqat xotirada** (Zustand store).
  237    - Refresh token — **httpOnly cookie** (backend o'rnatadi, JS o'qiy      
 olmay
      di).
  238    - `localStorage`'da TOKEN saqlamang (XSS xavfi).
  239
  240 5. **O'zbek tili.** Foydalanuvchi ko'radigan har bir matn (xato xabarlari, 

      tugmalar, tooltip'lar) o'zbekcha. Kod, commit, kommentariya — inglizcha.   
  241
  242 6. **Komponent nomlash.**
  243    - Komponentlar — PascalCase (`ClinicCard.tsx`)
  244    - Hook'lar — `use` bilan boshlanadi (`useLogin.ts`)
  245    - Util funksiyalar — camelCase (`formatPhone.ts`)
  246    - Konstantalar — UPPER_SNAKE_CASE
  247
  248 7. **`'use client'` direktivasi.** Faqat interaktiv komponentlarda.        
 Default
       — Server Component. Form, button onclick, useState bo'lganda — `'use      
 clien
      t'`.
  249
  250 8. **Import tartibi** (ESLint avtomatik tartiblaydi):
  251    ```
  252    1. External (react, next, axios)
  253    2. Internal absolute (@/components, @/features)
  254    3. Relative (./Button, ../utils)
  255    4. Type imports (oxirida)
  256    ```
  257
  258 9. **Hech qachon `any` ishlatmang.** `unknown` + type guard yoki to'liq    
 tip
       yozing.
  259
  260 10. **Har bir async operatsiya** — loading + error + empty state'larini    
 bos
      hqaradi. "Happy path" yetarli emas.
  261
  262 ---
  263
  264 ## 4. Backend ↔ Frontend endpoint mapping
  265
  266 | Backend route | Method | Frontend feature | Mas'ul |
  267 |---|---|---|---|
  268 | `/api/v1/auth/register` | POST | `features/auth` | Suhrob |
  269 | `/api/v1/auth/login` | POST | `features/auth` | Suhrob |
  270 | `/api/v1/auth/refresh` | POST | `lib/api/client.ts` interceptor |        
 Sunnatb
      ek |
  271 | `/api/v1/auth/logout` | POST | `features/auth` | Suhrob |
  272 | `/api/v1/auth/me` | GET | `features/auth` | Suhrob |
  273 | `/api/v1/clinics` | GET | `features/clinics` | Doniyor |
  274 | `/api/v1/clinics/:id` | GET | `features/clinics` | Doniyor |
  275 | `/api/v1/clinics/nearby` | GET | `features/clinics` (Map) | Doniyor |    
  276 | `/api/v1/clinics/:id/reviews` | GET, POST | `features/reviews` | Akbar | 
  277 | `/api/v1/reviews/:id` | PATCH, DELETE | `features/reviews` | Akbar |     
  278 | `/api/v1/admin/clinics` | POST, PATCH, DELETE | `features/admin` | Hayot 

      |
  279 | `/api/v1/admin/users` | GET, PATCH | `features/admin` | Hayot |
  280 | `/api/v1/health` | GET | DevOps monitoring | Sunnatbek |
  281
  282 **Swagger:** `http://localhost:4000/docs` — har bir endpoint to'liq        
 tasvirl
      angan.
  283
  284 ---
  285
  286 ## 5. Komanda vazifalari
  287
  288 ---
  289
  290 ### Sunnatbek (Tech Lead / Architect)
  291
  292 **Mas'uliyat sohasi:** Loyiha poydevori, infratuzilma, kod sifati, code    
 rev
      iew.
  293
  294 **Vazifalar:**
  295
  296 | # | Vazifa | Fayl/Joy |
  297 |---|---|---|
  298 | 1 | Loyihani `create-next-app --typescript` bilan boshlash | root |      
  299 | 2 | Tailwind v4 + shadcn/ui sozlash | `components.json`,
 `tailwind.config
      .ts` |
  300 | 3 | ESLint + Prettier + Husky + lint-staged | `.eslintrc.json`,
 `.husky/`
       |
  301 | 4 | Axios instance + access/refresh interceptor |
 `src/lib/api/client.ts`
       |
  302 | 5 | Backend envelope ni typed exception'ga aylantirish |
 `src/lib/api/err
      or.ts` |
  303 | 6 | Env validatsiya (Zod) | `src/config/env.ts` |
  304 | 7 | TanStack Query setup (defaultOptions, devtools) |
 `src/providers/Quer
      yProvider.tsx` |
  305 | 8 | Next middleware — `/admin`, `/profile` JWT tekshiruvi |
 `src/middlewa
      re.ts` |
  306 | 9 | Root layout — barcha provider'lar wiring | `src/app/layout.tsx` |    
  307 | 10 | Global error/404/loading sahifalar | `src/app/error.tsx`,
 `not-found
      .tsx` |
  308 | 11 | GitHub Actions CI: typecheck → lint → test → build |
 `.github/workfl
      ows/ci.yml` |
  309 | 12 | Vercel deploy + preview branch'lar | Vercel dashboard |
  310 | 13 | `README.md` va `CLAUDE.md` yozish | root |
  311 | 14 | **Code review** har bir PR'da | GitHub |
  312
  313 **Deadline:** 1-hafta (loyiha poydevori), keyin doimiy code review.        
  314
  315 **Definition of Done:** Hamma a'zolar `npm run dev` qilib, login + clinics 

      ro'yxatini ko'ra olishi.
  316
  317 ---
  318
  319 ### Yahyo (UI/UX Engineer)
  320
  321 **Mas'uliyat sohasi:** Dizayn tizimi, layout, qayta ishlatiluvchi
 komponent
      lar.
  322
  323 **Vazifalar:**
  324
  325 | # | Vazifa | Fayl/Joy |
  326 |---|---|---|
  327 | 1 | shadcn/ui komponentlar: button, input, card, dialog, dropdown-menu,  
 s
      heet, tabs, toast, select, form, skeleton, badge, avatar |
 `src/components/
      ui/` |
  328 | 2 | Light/dark tema (`next-themes`) | `src/providers/ThemeProvider.tsx`  
 |
  329 | 3 | Brend ranglari (CSS variables) | `tailwind.config.ts`, `globals.css` 

      |
  330 | 4 | `Header.tsx` — logo, navigatsiya, profil/login |
 `src/components/layo
      ut/Header.tsx` |
  331 | 5 | `Footer.tsx` — kontakt, social, copyright |
 `src/components/layout/Fo
      oter.tsx` |
  332 | 6 | `MobileNav.tsx` — hamburger + drawer |
 `src/components/layout/MobileN
      av.tsx` |
  333 | 7 | `ThemeToggle.tsx` | `src/components/layout/ThemeToggle.tsx` |        
  334 | 8 | `EmptyState.tsx` — bo'sh holat illustratsiya |
 `src/components/shared
      /EmptyState.tsx` |
  335 | 9 | `LoadingSpinner.tsx`, Skeleton variantlar | `src/components/shared/` 

      |
  336 | 10 | `ConfirmDialog.tsx` — qayta ishlatiluvchi |
 `src/components/shared/C
      onfirmDialog.tsx` |
  337 | 11 | **Bosh sahifa** — Hero, Top klinikalar, Shaharlar |
 `src/app/(main)/
      page.tsx` |
  338 | 12 | About + Contact sahifalari | `src/app/(main)/about/`, `contact/` |  
  339 | 13 | Mobile-first responsive | barcha layout |
  340 | 14 | A11y audit — keyboard, aria-label, alt | barcha komponentlar |      
  341
  342 **Deadline:** 2-hafta.
  343
  344 **Definition of Done:** Lighthouse Accessibility score ≥95.
  345
  346 ---
  347
  348 ### Suhrob (Authentication Engineer)
  349
  350 **Mas'uliyat sohasi:** Foydalanuvchi autentifikatsiyasi, session
 boshqaruvi
      , RBAC.
  351
  352 **Vazifalar:**
  353
  354 | # | Vazifa | Fayl/Joy |
  355 |---|---|---|
  356 | 1 | Zod schema'lar — login, register, password |
 `src/features/auth/schem
      as/auth.schema.ts` |
  357 | 2 | API qatlami — register, login, logout, me |
 `src/features/auth/api/au
      th.api.ts` |
  358 | 3 | Zustand store — user, accessToken, setAuth, clearAuth |
 `src/features
      /auth/store/auth.store.ts` |
  359 | 4 | Hook'lar — useLogin, useRegister, useLogout |
 `src/features/auth/hook
      s/` |
  360 | 5 | `useCurrentUser` — JWT decode yoki `/auth/me` |
 `src/features/auth/ho
      oks/useCurrentUser.ts` |
  361 | 6 | `LoginForm` — RHF + Zod, error handling |
 `src/features/auth/componen
      ts/LoginForm.tsx` |
  362 | 7 | `RegisterForm` — parol kuchi indikatori |
 `src/features/auth/componen
      ts/RegisterForm.tsx` |
  363 | 8 | `ForgotPasswordForm` (Phase 2 — backend tayyor bo'lganda) |
 `src/feat
      ures/auth/components/ForgotPasswordForm.tsx` |
  364 | 9 | Auth layout — markazlangan card | `src/app/(auth)/layout.tsx` |      
  365 | 10 | Login/Register sahifalar | `src/app/(auth)/login/`, `register/` |   
  366 | 11 | `useRequireAuth()` hook — protected route |
 `src/features/auth/hooks
      /useRequireAuth.ts` |
  367 | 12 | Backend xato kodlarini O'zbekchaga tarjima | `src/lib/api/error.ts` 

      (lookup table) |
  368 | 13 | "Logout" — barcha React Query cache tozalash |
 `src/features/auth/ho
      oks/useLogout.ts` |
  369
  370 **Deadline:** 2-hafta.
  371
  372 **Definition of Done:** Login → home redirect, refresh token avtomatik     
 yang
      ilanadi, logout to'liq cache'ni tozalaydi.
  373
  374 ---
  375
  376 ### Doniyor (Clinics & Map Engineer)
  377
  378 **Mas'uliyat sohasi:** Klinikalar listingi, tafsilot, qidiruv, xarita      
 integ
      ratsiyasi.
  379
  380 **Vazifalar:**
  381
  382 | # | Vazifa | Fayl/Joy |
  383 |---|---|---|
  384 | 1 | TypeScript tiplar (Clinic, OpeningHours) — backend schema'ga mos |   
 `s
      rc/features/clinics/types.ts` |
  385 | 2 | API qatlami — list, getById, nearby |
 `src/features/clinics/api/clini
      cs.api.ts` |
  386 | 3 | Hook'lar — useClinics, useClinic, useNearbyClinics |
 `src/features/cl
      inics/hooks/` |
  387 | 4 | `ClinicCard` — rasm, nom, manzil, reyting, "ochiq" badge |
 `src/featu
      res/clinics/components/ClinicCard.tsx` |
  388 | 5 | `ClinicList` — grid + sahifalash |
 `src/features/clinics/components/C
      linicList.tsx` |
  389 | 6 | `ClinicFilters` — shahar, ochiq, reyting |
 `src/features/clinics/comp
      onents/ClinicFilters.tsx` |
  390 | 7 | `ClinicDetail` — tabs (Ma'lumot/Sharhlar/Joylashuv) |
 `src/features/c
      linics/components/ClinicDetail.tsx` |
  391 | 8 | `OpeningHours` — backend JSON → jadval + "Hozir ochiqmi" |
 `src/featu
      res/clinics/components/OpeningHours.tsx` |
  392 | 9 | `opening-hours.ts` util — vaqt mantiqi |
 `src/lib/utils/opening-hours
      .ts` |
  393 | 10 | `ClinicMap` — Leaflet, marker, popup |
 `src/features/clinics/compone
      nts/ClinicMap.tsx` |
  394 | 11 | `ImageGallery` — lightbox |
 `src/features/clinics/components/ImageGa
      llery.tsx` |
  395 | 12 | Klinikalar ro'yxati sahifasi | `src/app/(main)/clinics/page.tsx` |  
  396 | 13 | Klinika tafsilot sahifasi (SSR + `generateMetadata`) |
 `src/app/(mai
      n)/clinics/[id]/page.tsx` |
  397 | 14 | Xarita sahifasi (full-screen + sidebar) |
 `src/app/(main)/map/page.t
      sx` |
  398 | 15 | Qidiruv (debounced) | `src/app/(main)/search/page.tsx` |
  399 | 16 | `useGeolocation` hook — yaqin klinikalar |
 `src/hooks/useGeolocation
      .ts` |
  400
  401 **Deadline:** 3-hafta.
  402
  403 **Definition of Done:** Klinika sahifasi SEO-friendly (meta tags), xarita  
 6
      0fps'da ishlaydi, geolokatsiya graceful fallback.
  404
  405 ---
  406
  407 ### Akbar (User Profile & Reviews Engineer)
  408
  409 **Mas'uliyat sohasi:** Foydalanuvchi profili, sharhlar, sevimlilar
 (kelajak
      da — pets, appointments).
  410
  411 **Vazifalar:**
  412
  413 | # | Vazifa | Fayl/Joy |
  414 |---|---|---|
  415 | 1 | Profil sahifasi — ma'lumot, parol o'zgartirish |
 `src/app/(main)/prof
      ile/page.tsx` |
  416 | 2 | Sevimlilar sahifasi (MVP: localStorage, Phase 2: backend) |
 `src/app/
      (main)/profile/favorites/page.tsx` |
  417 | 3 | API qatlami — create, update, delete, listByClinic |
 `src/features/re
      views/api/reviews.api.ts` |
  418 | 4 | Zod schema — rating 1–5, comment max 500 |
 `src/features/reviews/sche
      mas/review.schema.ts` |
  419 | 5 | `ReviewForm` — RHF + Zod, optimistic submit |
 `src/features/reviews/c
      omponents/ReviewForm.tsx` |
  420 | 6 | `ReviewCard` — yulduzlar, ism, sana, edit/delete (o'ziniki bo'lsa) | 

      `src/features/reviews/components/ReviewCard.tsx` |
  421 | 7 | `ReviewList` — sahifalash + sort (yangi/eski/reyting) |
 `src/features
      /reviews/components/ReviewList.tsx` |
  422 | 8 | `RatingStars` — interaktiv (input) + statik (display) |
 `src/features
      /reviews/components/RatingStars.tsx` |
  423 | 9 | Hook'lar — useReviews, useCreateReview, useUpdateReview,
 useDeleteRev
      iew | `src/features/reviews/hooks/` |
  424 | 10 | **Optimistic update** — sharh qo'shilganda darhol UI'da ko'rinishi  
 |
       `useCreateReview` |
  425 | 11 | Klinika sahifasi "Sharhlar" tab'iga integratsiya (Doniyor bilan) |  
 `
      ClinicDetail.tsx` |
  426 | 12 | **Phase 2:** `features/pets/` — Pet CRUD (nom, tur, sana, rasm) |   
 ya
      ngi feature |
  427 | 13 | **Phase 2:** `features/appointments/` — uchrashuv yaratish | yangi  
 f
      eature |
  428
  429 **Deadline:** 3-hafta.
  430
  431 **Definition of Done:** Sharh yuborish < 500ms (optimistic), o'z sharhini  
 t
      ahrirlash/o'chirish ishlaydi, boshqaning sharhini o'zgartira olmaydi.      
  432
  433 ---
  434
  435 ### Hayot (Admin Panel Engineer)
  436
  437 **Mas'uliyat sohasi:** Admin panel — RBAC, CRUD, dashboard, moderatsiya.   
  438
  439 **Vazifalar:**
  440
  441 | # | Vazifa | Fayl/Joy |
  442 |---|---|---|
  443 | 1 | Admin layout — Sidebar + RBAC guard (`role !== 'ADMIN'` → 403) |     
 `src
      /app/admin/layout.tsx` |
  444 | 2 | `AdminSidebar` — Dashboard / Klinikalar / Foydalanuvchilar /
 Sharhlar
       | `src/features/admin/components/AdminSidebar.tsx` |
  445 | 3 | **Dashboard** — `StatsCards` (jami klinikalar, foydalanuvchilar,     
 shar
      hlar 7 kun, top-5 reyting) | `src/app/admin/page.tsx` |
  446 | 4 | Klinikalar ro'yxati — DataTable (search, sort, filter, pagination) | 

      `src/app/admin/clinics/page.tsx` |
  447 | 5 | Klinika yaratish formasi | `src/app/admin/clinics/new/page.tsx` |    
  448 | 6 | Klinika tahrirlash | `src/app/admin/clinics/[id]/edit/page.tsx` |    
  449 | 7 | `ClinicForm` — Zod (backend `clinicCreateSchema` bilan bir xil) |    
 `sr
      c/features/admin/components/ClinicForm.tsx` |
  450 | 8 | `OpeningHoursEditor` — 7 kun + soatlar |
 `src/features/admin/componen
      ts/OpeningHoursEditor.tsx` |
  451 | 9 | Xarita orqali koordinata tanlash (Doniyor'ning Map'idan) |
 `ClinicFor
      m.tsx` |
  452 | 10 | Foydalanuvchilar — ro'yxat, role o'zgartirish, bloklash |
 `src/app/a
      dmin/users/page.tsx` |
  453 | 11 | Sharhlar moderatsiyasi — o'chirish, spam |
 `src/app/admin/reviews/pa
      ge.tsx` |
  454 | 12 | `ConfirmDialog` har bir destruktiv amalda | barcha admin sahifalar  
 |
  455 | 13 | CSV eksport tugmasi (klinikalar, foydalanuvchilar) |
 `src/features/a
      dmin/components/ExportButton.tsx` |
  456 | 14 | Toast bildirishnomalar (`sonner`) — har bir muvaffaqiyat/xato |     
 barc
      ha amallar |
  457
  458 **Deadline:** 4-hafta.
  459
  460 **Definition of Done:** Non-admin foydalanuvchi `/admin` ga kira olmaydi,  
 b
      archa CRUD ishlaydi, har bir o'chirish tasdiq so'raydi.
  461
  462 ---
  463
  464 ## 6. Git workflow
  465
  466 ### Branch nomlash
  467
  468 | Tur | Format | Misol |
  469 |---|---|---|
  470 | Production | `main` | `main` (himoyalangan) |
  471 | Staging | `develop` | `develop` |
  472 | Feature | `feature/<ism>-<tavsif>` | `feature/suhrob-login-form` |       
  473 | Bug fix | `fix/<tavsif>` | `fix/clinic-detail-404` |
  474 | Chore | `chore/<tavsif>` | `chore/update-deps` |
  475 | Hotfix | `hotfix/<tavsif>` | `hotfix/auth-refresh-loop` |
  476
  477 ### Commit qoidalari (Conventional Commits)
  478
  479 ```
  480 feat(auth): add login form with Zod validation
  481 fix(clinics): handle empty openingHours response
  482 chore: bump next to 15.2
  483 docs: update README setup steps
  484 refactor(api): extract envelope parser to lib
  485 test(reviews): add ReviewForm submit test
  486 style: format with prettier
  487 ```
  488
  489 **Tip:** `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`,      
 `perf
      `, `ci`.
  490
  491 ### PR qoidalari
  492
  493 1. Har bir feature **alohida branch'da**.
  494 2. PR'da **rasm/screenshot/GIF** (UI o'zgarishi bo'lsa).
  495 3. **Kamida 1 reviewer** — Sunnatbek + bitta jamoa a'zosi.
  496 4. **CI yashil bo'lishi shart** — typecheck + lint + build.
  497 5. Merge strategiyasi: **Squash and merge**.
  498 6. Branch ochildi → 3 kun ichida merge yoki yopilishi kerak (uzoq
 branch'la
      r = merge conflict).
  499
  500 ### PR description shabloni
  501
  502 ```markdown
  503 ## Nima qilindi
  504 - ...
  505
  506 ## Qanday tekshirish kerak
  507 1. `npm run dev`
  508 2. ...
  509
  510 ## Screenshot / GIF
  511 (rasm)
  512
  513 ## Backend o'zgarishi kerakmi?
  514 - [ ] Yo'q
  515 - [ ] Ha — qanday: ...
  516
  517 ## Checklist
  518 - [ ] TypeScript xato yo'q
  519 - [ ] ESLint warning yo'q
  520 - [ ] Mobile + desktop'da test qilindi
  521 - [ ] Loading/error/empty state'lar ishlanadi
  522 ```
  523
  524 ### Daily standup
  525
  526 Telegram guruhida har kuni **09:00** — 3 ta savol:
  527 1. Kecha nima qildim?
  528 2. Bugun nima qilaman?
  529 3. Blocker bormi?
  530
  531 ---
  532
  533 ## 7. Setup va ishga tushirish
  534
  535 ```bash
  536 # 1. Loyihani klonlash
  537 git clone <repo-url>
  538 cd vet-clinic-frontend
  539
  540 # 2. Dependencies
  541 npm install
  542
  543 # 3. Env fayl
  544 cp .env.example .env.local
  545 # .env.local'ni to'ldirish:
  546 # NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
  547
  548 # 4. Backend ishga tushirilganligini tekshirish (port 4000)
  549 curl http://localhost:4000/api/v1/health
  550
  551 # 5. Dev server
  552 npm run dev          # http://localhost:3000
  553
  554 # 6. Build va sifat tekshiruvi
  555 npm run build
  556 npm run typecheck
  557 npm run lint
  558 npm run format
  559
  560 # 7. Test
  561 npm run test         # Vitest (unit + integration)
  562 npm run test:e2e     # Playwright (E2E)
  563
  564 # 8. shadcn/ui komponent qo'shish
  565 npx shadcn@latest add button
  566 npx shadcn@latest add dialog
  567 ```
  568
  569 ### `.env.example`
  570
  571 ```env
  572 NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
  573 NEXT_PUBLIC_SITE_URL=http://localhost:3000
  574 NEXT_PUBLIC_MAP_TILE_URL=https://tile.openstreetmap.org/{z}/{x}/{y}.png    
  575 ```
  576
  577 ---
  578
  579 ## 8. Sprint roadmap
  580
  581 ### Sprint 1 (1-hafta) — Poydevor
  582 - **Sunnatbek:** loyiha setup, CI/CD, API client, middleware, providers    
  583 - **Yahyo:** shadcn setup, Header, Footer, tema
  584 - **Boshqalar:** repo'ni o'rganish, backend Swagger'ni o'qish
  585
  586 **Demo:** `npm run dev` ishlaydi, login sahifa mock data bilan ochiladi.   
  587
  588 ---
  589
  590 ### Sprint 2 (2-hafta) — Auth + UI library
  591 - **Suhrob:** to'liq auth flow (login, register, logout, refresh)
  592 - **Yahyo:** bosh sahifa, shared komponentlar, mobile nav
  593 - **Doniyor:** ClinicCard, ClinicList (mock data)
  594 - **Akbar:** profil sahifasi skeleton
  595 - **Hayot:** admin layout + RBAC guard
  596
  597 **Demo:** Foydalanuvchi register → login → bosh sahifa ko'rishi.
  598
  599 ---
  600
  601 ### Sprint 3 (3-hafta) — Asosiy biznes
  602 - **Doniyor:** klinika tafsilot + xarita + qidiruv
  603 - **Akbar:** sharhlar tizimi (CRUD + optimistic)
  604 - **Hayot:** admin Klinikalar CRUD
  605 - **Yahyo:** About, Contact, polish
  606
  607 **Demo:** To'liq foydalanuvchi flow'i — ro'yxat → tafsilot → sharh
 qoldiris
      h.
  608
  609 ---
  610
  611 ### Sprint 4 (4-hafta) — Admin + polish
  612 - **Hayot:** Dashboard, Foydalanuvchilar, Sharhlar moderatsiya
  613 - **Hammasi:** bug fix, accessibility, performance audit
  614 - **Sunnatbek:** Lighthouse audit, bundle size optimizatsiya
  615
  616 **Demo:** Admin to'liq klinika qo'shadi, foydalanuvchini bloklaydi.        
  617
  618 ---
  619
  620 ### Sprint 5 (5-hafta) — QA + Deploy
  621 - **Hammasi:** E2E testlar (Playwright) — auth, clinic flow, admin
  622 - **Sunnatbek:** Vercel production deploy + custom domain
  623 - **Hayot + Akbar:** smoke test backend bilan
  624 - **Yahyo:** final UI polish
  625
  626 **Demo:** Production URL'da to'liq ishlaydigan MVP.
  627
  628 ---
  629
  630 ## 9. Definition of Done
  631
  632 Har bir feature production'ga chiqishi uchun quyidagilarga javob berishi   
 ke
      rak:
  633
  634 - [ ] TypeScript xatolari yo'q (`npm run typecheck`)
  635 - [ ] ESLint warning'lari yo'q (`npm run lint`)
  636 - [ ] Prettier formatlangan (`npm run format`)
  637 - [ ] Mobile (375px) + tablet (768px) + desktop (1280px)'da test qilingan  
  638 - [ ] Loading state ishlanadi
  639 - [ ] Error state ishlanadi (network xato, 4xx, 5xx)
  640 - [ ] Empty state ishlanadi (bo'sh ro'yxat, qidiruv natija yo'q)
  641 - [ ] Backend bilan **haqiqiy integratsiya** tekshirilgan (mock emas)      
  642 - [ ] Accessibility — keyboard navigation, alt text, aria-label
  643 - [ ] Lighthouse Performance ≥85, Accessibility ≥95
  644 - [ ] PR review'dan o'tgan
  645 - [ ] Conventional commit message
  646 - [ ] Documentation yangilangan (kerak bo'lsa)
  647
  648 ---
  649
  650 ## 10. Resurslar
  651
  652 ### Rasmiy hujjatlar
  653 - [Next.js 15 docs](https://nextjs.org/docs)
  654 - [shadcn/ui](https://ui.shadcn.com)
  655 - [TanStack Query v5](https://tanstack.com/query/latest)
  656 - [Zod](https://zod.dev)
  657 - [React Hook Form](https://react-hook-form.com)
  658 - [Tailwind CSS v4](https://tailwindcss.com)
  659 - [Leaflet](https://leafletjs.com) +
 [react-leaflet](https://react-leaflet.
      js.org)
  660 - [Zustand](https://zustand-demo.pmnd.rs)
  661
  662 ### Loyiha resurslari
  663 - **Backend Swagger:** `http://localhost:4000/docs`
  664 - **Backend repo:** (link)
  665 - **Figma dizayn:** (link — Yahyo joylaydi)
  666 - **Telegram guruh:** (link)
  667
  668 ### Yordam
  669 - **Texnik savollar:** Sunnatbek (Tech Lead)
  670 - **Dizayn savollar:** Yahyo
  671
---

## 11. Har bir o'quvchi uchun professional starter struktura

Quyidagi strukturalar **starter** sifatida beriladi. Har bir o'quvchi o'z bo'limida kodni bosqichma-bosqich to'ldiradi.

### Sunnatbek (Tech Lead / Core Architecture)

```bash
src/
├── lib/
│   ├── api/
│   │   ├── client.ts          # Axios instance, request/response interceptor, refresh flow
│   │   ├── error.ts           # Backend error envelope -> typed AppError mapping
│   │   └── endpoints.ts       # Barcha endpoint constant'lari (single source of truth)
│   └── auth/
│       ├── token.ts           # Access token memory'da saqlash helperlari
│       └── jwt.ts             # JWT decode, exp tekshirish, role parse
├── config/
│   └── env.ts                 # Zod bilan env validatsiya
├── providers/
│   └── QueryProvider.tsx      # React Query global config (retry, staleTime, devtools)
├── app/
│   ├── layout.tsx             # Root provider wiring
│   ├── error.tsx              # Global error boundary UI
│   ├── not-found.tsx          # 404 fallback
│   └── loading.tsx            # Global loading fallback
└── middleware.ts              # /admin va /profile route guard
```

### Yahyo (UI/UX Engineer)

```bash
src/
├── components/
│   ├── ui/                    # shadcn primitive'lar (button, input, dialog, ...)
│   ├── layout/
│   │   ├── Header.tsx         # Main navigation + auth actionlar
│   │   ├── Footer.tsx         # Kontakt, linklar, copyright
│   │   ├── MobileNav.tsx      # Mobile drawer navigation
│   │   └── ThemeToggle.tsx    # Light/dark mode toggle
│   └── shared/
│       ├── EmptyState.tsx     # Bo'sh holat reusable komponenti
│       ├── LoadingSpinner.tsx # Loading indikatorlari
│       └── ConfirmDialog.tsx  # Delete/critical action confirm modal
├── providers/
│   └── ThemeProvider.tsx      # next-themes setup
└── app/(main)/
    ├── page.tsx               # Home page (hero + sections)
    ├── about/page.tsx         # About sahifasi
    └── contact/page.tsx       # Contact sahifasi
```

### Suhrob (Authentication Engineer)

```bash
src/features/auth/
├── api/
│   └── auth.api.ts            # register/login/logout/me requestlari
├── schemas/
│   └── auth.schema.ts         # login/register form schema (Zod)
├── store/
│   └── auth.store.ts          # auth state: user, token, set/clear actionlar
├── hooks/
│   ├── useLogin.ts            # Login mutation + redirect
│   ├── useRegister.ts         # Register mutation + success flow
│   ├── useLogout.ts           # Logout + cache clear
│   ├── useCurrentUser.ts      # Session user olish
│   └── useRequireAuth.ts      # Protected page guard
├── components/
│   ├── LoginForm.tsx          # RHF + Zod login forma
│   ├── RegisterForm.tsx       # RHF + Zod register forma
│   └── ForgotPasswordForm.tsx # Phase 2 reset flow forma
└── types.ts                   # Auth domain type'lari

src/app/(auth)/
├── layout.tsx                 # Auth sahifalar uchun markaziy layout
├── login/page.tsx             # Login route
└── register/page.tsx          # Register route
```

### Doniyor (Clinics & Map Engineer)

```bash
src/features/clinics/
├── api/
│   └── clinics.api.ts         # list/getById/nearby endpoint chaqiriqlari
├── hooks/
│   ├── useClinics.ts          # Klinikalar list query
│   ├── useClinic.ts           # Bitta klinika query
│   └── useNearbyClinics.ts    # Geolocation asosida yaqin klinikalar
├── components/
│   ├── ClinicCard.tsx         # Card UI (nom, manzil, reyting, badge)
│   ├── ClinicList.tsx         # Grid/list rendering + pagination
│   ├── ClinicFilters.tsx      # Filter panel (shahar, rating, open now)
│   ├── ClinicDetail.tsx       # Tafsilot + tabs
│   ├── OpeningHours.tsx       # Ish vaqti jadvali + hozir ochiqmi
│   ├── ClinicMap.tsx          # Leaflet map + marker + popup
│   └── ImageGallery.tsx       # Klinikaga oid rasmlar ko'rsatish
├── schemas/
│   └── clinic.schema.ts       # Filter/form schema
└── types.ts                   # Clinic domain type'lari

src/app/(main)/
├── clinics/page.tsx           # Clinics list page
├── clinics/[id]/page.tsx      # Clinic detail page (SSR metadata bilan)
├── map/page.tsx               # Full map page
└── search/page.tsx            # Debounced qidiruv natijalari
```

### Akbar (Profile & Reviews Engineer)

```bash
src/features/reviews/
├── api/
│   └── reviews.api.ts         # create/update/delete/list review endpointlari
├── hooks/
│   ├── useReviews.ts          # Clinic bo'yicha review list query
│   ├── useCreateReview.ts     # Create review + optimistic update
│   ├── useUpdateReview.ts     # User o'z review'ini tahrirlashi
│   └── useDeleteReview.ts     # User o'z review'ini o'chirishi
├── schemas/
│   └── review.schema.ts       # rating/comment validatsiya
├── components/
│   ├── ReviewForm.tsx         # Sharh yuborish formasi
│   ├── ReviewCard.tsx         # Bitta sharh kartasi
│   ├── ReviewList.tsx         # Sharhlar ro'yxati + sort/pagination
│   └── RatingStars.tsx        # Interaktiv va statik yulduz komponenti
└── types.ts                   # Review type'lari

src/app/(main)/profile/
├── page.tsx                   # User profile page
└── favorites/page.tsx         # Sevimli klinikalar sahifasi (MVP localStorage)
```

### Hayot (Admin Panel Engineer)

```bash
src/features/admin/
├── api/
│   └── admin.api.ts           # Admin CRUD endpointlari
├── hooks/
│   ├── useAdminStats.ts       # Dashboard statistikalar query
│   ├── useAdminClinics.ts     # Klinikalar admin query/mutation
│   ├── useAdminUsers.ts       # User boshqaruvi hooklari
│   └── useAdminReviews.ts     # Moderatsiya hooklari
├── components/
│   ├── AdminSidebar.tsx       # Admin menu navigatsiya
│   ├── StatsCards.tsx         # Dashboard KPI kartalari
│   ├── ClinicForm.tsx         # Create/edit klinika formasi
│   ├── OpeningHoursEditor.tsx # 7 kunlik ish vaqti editori
│   ├── UserTable.tsx          # User list + role/block actionlar
│   └── ExportButton.tsx       # CSV export action
└── types.ts                   # Admin panel uchun type'lar

src/app/admin/
├── layout.tsx                 # RBAC guard + sidebar layout
├── page.tsx                   # Dashboard
├── clinics/page.tsx           # Clinics list (admin)
├── clinics/new/page.tsx       # Yangi klinika qo'shish
├── clinics/[id]/edit/page.tsx # Klinikani tahrirlash
├── users/page.tsx             # Foydalanuvchilar boshqaruvi
└── reviews/page.tsx           # Sharhlar moderatsiyasi
```

### O'quvchilar uchun ish boshlash checklist'i

- Har bir o'quvchi avval o'z papkasida `types.ts` va `schemas/*.schema.ts` ni yozib olsin.
- Keyin `api/*.api.ts` ni backend Swagger asosida tayyorlasin.
- So'ng `hooks/` qatlamini yozib, React Query mutation/query'larni ulasin.
- Oxirida `components/` va `app/.../page.tsx` ni ulab, loading/error/empty state'larni qo'shsin.
- Har bir task tugagach `npm run typecheck && npm run lint` bilan tekshirilsin.