# Admin Dashboard — To'q rejim (Dark Mode)

> **Mas'ul:** Hayot (Admin Panel Engineer)
> **Sprint:** 4-hafta
> **Prioritet:** ⭐⭐⭐ (admin panel uy sahifasi)

---

## 1. Sahifa haqida

Admin'ning birinchi ko'radigan sahifasi. KPI metrikalari, grafiklar, so'nggi faollik. URL: `/admin`.

**RBAC:** Faqat `role: 'ADMIN'` bo'lgan foydalanuvchilar kira oladi. Boshqalarda 403 sahifa.

**Default theme:** Dark mode. Foydalanuvchi `next-themes` orqali yorug'ga o'tkaza oladi.

## 2. Anatomiya (`screen.png`'dan — DARK)

```
LEFT SIDEBAR (240px, dark):
- Logo: "VetClinic UZ" + "Admin" badge
- Search: "Qidiruv... ⌘K"
- Menu groups:
  - ASOSIY:
    - 📊 Dashboard (active, teal left border)
    - 🏥 Klinikalar
    - 👥 Foydalanuvchilar
    - ⭐ Sharhlar
    - 📅 Uchrashuvlar (Phase 2 — muted, "Tez orada" pill)
  - SOZLAMALAR:
    - ⚙ Sozlamalar
    - 📋 Audit jurnali
- Bottom: admin profile mini card (Sunnatbek + Tech Lead + chevron)

TOP BAR:
- Breadcrumb: "Admin / Dashboard"
- Right: theme toggle + 🔔 (red dot) + "Saytni ko'rish" outline

MAIN:
- H1: "Boshqaruv paneli" + "Xush kelibsiz, Sunnatbek 👋"
- Right: date range picker "Bugun · Hafta · Oy" + "30 kun · 24 hr"

KPI cards (4 ta, equal width):
- "Jami klinikalar 247" + "+12%" green ↑ + sparkline (teal)
- "Foydalanuvchilar 5,234" + "+8%" green ↑ + sparkline
- "Yangi sharhlar 184" + "-3%" red ↓ + sparkline (coral)
- "O'rtacha reyting 4.6" + "+0.2" green ↑ + sparkline

Charts row:
- LEFT (60%) "Foydalanuvchilar o'sishi":
  - Area chart (teal gradient fill, smooth line)
- RIGHT (40%) "Shahar bo'yicha klinikalar":
  - Horizontal bar chart (teal bars)
  - Toshkent (87), Samarqand (34), Buxoro (28), Andijon (22), Farg'ona (18), Boshqalar (58)

Bottom row:
- LEFT (60%) "So'nggi faollik" + "Hammasini ko'rish":
  - Avatar + action + timestamp:
    - "Aziz Karimov yangi sharh qoldirdi · 5 daqiqa oldin"
    - "Yangi klinika qo'shildi 'Pets Care Buxoro' · 23 daqiqa oldin"
    - "Foydalanuvchi bloklandi - spam akkaunt · 1 soat oldin"

- RIGHT (40%) "Tezkor amallar":
  - "+ Yangi klinika qo'shish" coral button
  - "📤 CSV Eksport" outline
  - "📊 Hisobot" outline
  - "🔔 Xabar yuborish" outline

  - "Tasdiqlash kutilmoqda" badge "5":
    - PetCare klinika ✓ ✗
    - Avant Sa'dam ✓ ✗
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/app/admin/layout.tsx` | Sidebar + RBAC guard |
| `src/app/admin/page.tsx` | Dashboard sahifa |
| `src/features/admin/components/AdminSidebar.tsx` | Navigation |
| `src/features/admin/components/AdminTopBar.tsx` | Breadcrumb + actions |
| `src/features/admin/components/StatsCards.tsx` | 4 KPI |
| `src/features/admin/components/UserGrowthChart.tsx` | Recharts area |
| `src/features/admin/components/ClinicsByCityChart.tsx` | Recharts bar |
| `src/features/admin/components/ActivityFeed.tsx` | So'nggi faollik |
| `src/features/admin/components/QuickActions.tsx` | Tezkor amallar |
| `src/features/admin/components/PendingApprovals.tsx` | Tasdiqlash kutilmoqda |
| `src/features/admin/api/admin.api.ts` | Stats, activity API'lar |
| `src/middleware.ts` | RBAC guard (Sunnatbek bilan) |

## 4. shadcn

```bash
npx shadcn@latest add card button avatar badge separator dropdown-menu
```

## 5. Charts

```bash
npm install recharts
```

```tsx
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={userGrowth}>
    <defs>
      <linearGradient id="teal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#00685f" stopOpacity={0.4} />
        <stop offset="95%" stopColor="#00685f" stopOpacity={0} />
      </linearGradient>
    </defs>
    <Area dataKey="users" stroke="#00685f" fill="url(#teal)" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
  </AreaChart>
</ResponsiveContainer>
```

## 6. API endpointlar

```
GET /api/v1/admin/stats?range=30d
Response: {
  totalClinics: 247,
  totalUsers: 5234,
  newReviews: 184,
  averageRating: 4.6,
  trends: { clinics: +12, users: +8, reviews: -3, rating: +0.2 }
}

GET /api/v1/admin/activity?limit=10
GET /api/v1/admin/clinics/pending
GET /api/v1/admin/charts/user-growth?range=30d
GET /api/v1/admin/charts/clinics-by-city
```

## 7. RBAC guard

```tsx
// src/middleware.ts
export function middleware(req: NextRequest) {
  const token = req.cookies.get('refresh_token')?.value
  const role = decodeJWT(token)?.role

  if (req.nextUrl.pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/403', req.url))
  }
}
```

## 8. States

- ✅ **Default:** dashboard yuklangan
- ✅ **Loading:** stats card skeleton (pulse)
- ✅ **Error:** "Statistikalarni yuklashda xato"
- ✅ **403:** non-admin → block
- ✅ **Theme switching:** dark ↔ light o'zgaradi

## 9. Done checklist

- [ ] Middleware RBAC guard ishlaydi
- [ ] Dark mode default (admin layout'da)
- [ ] Sidebar navigation active state to'g'ri
- [ ] KPI cards trend rangi to'g'ri (yashil/qizil)
- [ ] Sparkline charts smooth
- [ ] Date range picker filter qiladi
- [ ] Activity feed real-time yangilanadi (polling 30s)
- [ ] Pending approvals quick approve/reject
- [ ] "Saytni ko'rish" → `/` (yangi tab)
- [ ] Mobile responsive (sidebar drawer)
- [ ] `screen.png` ga vizual mos
