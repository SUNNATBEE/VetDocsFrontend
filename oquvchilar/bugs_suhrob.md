# 🐛 Suhrob — buglar (Auth audit)

**Status:** Login/Register UI'lari chiroyli ishlangan, Profile sahifa
zo'r. Lekin **core auth oqimida 2 ta CRITICAL va 5 ta HIGH bug bor** —
hozircha foydalanuvchi sessiyasi backend bilan to'g'ri ishlamaydi.

> Tartibi: S1 → S2 → S3 → S4 → S5 → S6 → S7 → keyin MEDIUMlar.

---

## 🚨 S1 — CRITICAL — Refresh token oqimi UMUMAN ULANMAGAN

**Muammo:** Spec'ning 4-bandi:

> 4. Refresh oqimi ishlashini ta'minlang (`apiClient` Sunnatbek tomonidan tayyorlangan).

Sen `authApi.refresh` funksiyasini aniqlagansan, lekin **hech qayerdan
chaqirilmaydi**:

```bash
$ rg "authApi.refresh" src/
# 0 results
```

**Oqibat:**
- Access token expire bo'lganda (odatda 15 daqiqa) — user yashirin sinadi.
- UI'da hali "logged in" deb ko'rsatadi, lekin har bir API call 401 qaytaradi.
- Foydalanuvchi nima sodir bo'layotganini tushunmaydi.

**Fix — 2 qadam:**

### 1-qadam: `apiClient` ga 401 interceptor qo'sh

**Fayl:** `src/lib/api/client.ts`

```ts
import { getSession, setSession, clearSession } from "@/src/features/auth/store/auth.store";
import { authApi } from "@/src/features/auth/api/auth.api";

// Concurrent 401'larda bitta refresh chaqirish uchun:
let refreshPromise: Promise<string | null> | null = null;

async function tryRefresh(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  const { refreshToken } = getSession();
  if (!refreshToken) return null;

  refreshPromise = (async () => {
    try {
      const result = await authApi.refresh(refreshToken);
      setSession(result.accessToken, result.refreshToken, result.user);
      return result.accessToken;
    } catch {
      clearSession();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  // ... (mavjud kod)

  // Birinchi marta token bilan urinish
  const accessToken = options.token ?? getSession().accessToken ?? undefined;
  let response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  // 401 bo'lsa — bitta marta refresh urinib ko'r
  if (response.status === 401 && accessToken) {
    const newToken = await tryRefresh();
    if (newToken) {
      response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: "no-store",
      });
    }
  }

  // ... (qolgan kod o'zgarmaydi)
}
```

### 2-qadam: hooklarda `getSession().accessToken` ni o'qish kerak emas

Yuqoridagi fix avtomatik ravishda har bir chaqiruvga token qo'shadi.
Hooklarda o'zgarish shart emas.

---

## 🚨 S2 — CRITICAL — `Authorization` token avtomatik qo'shilmaydi

**Muammo:** Hozirgi `apiClient`'da har bir method `token` parametrini
**qo'lda** kutadi:

```ts
get: <T>(path: string, token?: string) => request<T>(path, { method: "GET", token }),
```

Sen `authApi`'da hech qaerda `getSession().accessToken`'ni uzatmagansan:

```ts
logout: async (refreshToken?: string) => {
  return apiClient.post<{ ok: true }>(endpoints.auth.logout, refreshToken ? { refreshToken } : undefined);
  //                                                                                                  ^^^ token YO'Q
},
```

Backend `/auth/logout`'ga Bearer auth talab qilsa — **422/401 qaytaradi**.

**Fix:** S1'dagi fix bu bilan birga hal qilinadi —
`getSession().accessToken` `apiClient` ichida avtomatik qo'shiladi.

Agar S1 ni qilmagan bo'lsang, qisqa muddatli yamoq:

```ts
// auth.api.ts
import { getSession } from "@/src/features/auth/store/auth.store";

logout: async (refreshToken?: string) => {
  const { accessToken } = getSession();
  return apiClient.post<{ ok: true }>(
    endpoints.auth.logout,
    refreshToken ? { refreshToken } : undefined,
    accessToken ?? undefined,
  );
},
```

Lekin **rasmiy yechim — S1'dagi interceptor**.

---

## 🔴 S3 — HIGH — `useRequireAuth` hydration race condition

**Fayl:** `src/features/auth/hooks/useRequireAuth.ts`

**Muammo:** App birinchi yuklanganda:

1. `_state` modul ichida `{user: null, refreshToken: null, accessToken: null}` deb boshlanadi.
2. `AuthProvider.useEffect` → `hydrateSession()` — `localStorage`'dan o'qib `notify()` qiladi.
3. `useRequireAuth.useEffect` — `user || !accessToken` bo'lsa `/login` ga redirect.

**Race:** Agar `useRequireAuth.useEffect` `hydrate`'dan **oldin** chaqirilsa —
foydalanuvchi `/profile`'ga to'g'ridan-to'g'ri kirsa, `/login`'ga
**noto'g'ri redirect** bo'ladi (garchi localStorage'da sessiya bor bo'lsa ham).

**Test qilish uchun:**

1. Login bo'l.
2. `/profile` sahifani tab'da to'g'ridan-to'g'ri och.
3. Brauzer'da Network throttling → "Slow 3G".
4. Sahifa refresh qil → ko'pincha `/login`'ga otib yuboradi.

**Fix — `auth.store.ts` da eager hydration:**

```ts
function readInitialState(): AuthState {
  if (typeof window === "undefined") {
    return { accessToken: null, refreshToken: null, user: null };
  }
  try {
    const accessToken = localStorage.getItem(ACCESS_KEY);
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    const raw = localStorage.getItem("authUser");
    if (accessToken && refreshToken && raw) {
      return { accessToken, refreshToken, user: JSON.parse(raw) };
    }
  } catch {}
  return { accessToken: null, refreshToken: null, user: null };
}

let _state: AuthState = readInitialState();
```

Endi `useAuthStore` birinchi render'dayoq to'g'ri state bilan keladi.
`AuthProvider.hydrateSession()`'ni butunlay o'chirishing mumkin.

**Diqqat — SSR bilan ishlash:**
- `useAuthStore.getSession` server'da `{user: null}` qaytaradi (chunki
  `window === undefined`).
- Client'da esa darhol `localStorage`'dan o'qiladi.
- Hydration mismatch'ning oldini olish uchun `useRequireAuth` ichida
  qo'shimcha `isHydrated` flag ishlat:

```ts
const [isHydrated, setIsHydrated] = useState(false);
useEffect(() => {
  queueMicrotask(() => setIsHydrated(true));
}, []);

useEffect(() => {
  if (!isHydrated) return; // birinchi client render'da redirect qilmaymiz
  if (!user || !accessToken) {
    router.replace(redirectTo);
  }
}, [isHydrated, user, accessToken, redirectTo, router]);
```

---

## 🔴 S4 — HIGH — Login muvaffaqiyatdan keyin `?from` parametri ignored

**Fayl:** `src/features/auth/components/LoginForm.tsx`

**Hozir:**

```tsx
const ok = await login(values);
if (ok) router.push("/");
```

**Muammo:** `proxy.ts`'da sen aqlli ish qilgansan:

```ts
loginUrl.searchParams.set("from", request.nextUrl.pathname);
```

Foydalanuvchi `/profile`'ga kirsa, login bo'lib bo'lgach **`/profile`'ga
qaytishi kerak**, lekin sen `router.push("/")` qilasan → user yo'lini yo'qotadi.

**Fix:**

```tsx
"use client";
import { useSearchParams, useRouter } from "next/navigation";
// ...

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // ...

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateLogin(values);
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }
    const ok = await login(values);
    if (ok) {
      const from = searchParams.get("from");
      const safeRedirect = from && from.startsWith("/") && !from.startsWith("//")
        ? from
        : "/";
      router.push(safeRedirect);
    }
  }
```

`safeRedirect` — open redirect zaifligi'ning oldini olish uchun
(`//evil.com` kabi tashqi URL'larga otib yuborilishini bloklaydi).

---

## 🔴 S5 — HIGH — Proxy route hardcoded backend URL

**Fayl:** `src/app/api/proxy/[...path]/route.ts`

**Hozir:**

```ts
const BACKEND = "https://vetclinicbackend.up.railway.app/api/v1";
```

**Muammo:**
- Lokal dev'da boshqa backend'ga ulanib bo'lmaydi.
- Staging va production'da bir xil URL'ga ketadi.
- `.env` orqali boshqarib bo'lmaydi.

**Fix:**

```ts
const BACKEND =
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://vetclinicbackend.up.railway.app/api/v1";
```

`.env.local` da:

```
BACKEND_URL=http://localhost:8080/api/v1
```

Server-side env (`BACKEND_URL`) ishlatish xavfsizroq — browser bundle'ga
chiqmaydi.

---

## 🔴 S6 — HIGH — Cookie xavfsizligi

**Fayl:** `src/features/auth/store/auth.store.ts`

**Hozir:**

```ts
document.cookie = `accessToken=${accessToken}; path=/; SameSite=Strict`;
```

**Muammolar:**
1. `Secure` flag yo'q → HTTP orqali ham yuboriladi. Production'da MITM xavfi.
2. `HttpOnly` yo'q (JS orqali set qilingani uchun mumkin emas) → **XSS hujumida token o'g'irlanadi**.
3. `SameSite=Strict` — boshqa saytdan kelganda cookie tashlanmaydi (login redirect'da muammo bo'lishi mumkin).

**Fix:**

```ts
const isProd = typeof window !== "undefined" && window.location.protocol === "https:";
document.cookie = `accessToken=${accessToken}; path=/; SameSite=Lax${isProd ? "; Secure" : ""}`;
```

**Uzoq muddatli yechim — backend HttpOnly cookie set qilishi:**
Login response'da `Set-Cookie: accessToken=...; HttpOnly; Secure; SameSite=Lax`
qo'shsin. Frontend localStorage ishlatmasin. Sunnatbek bilan kelishib ol.

---

## 🔴 S7 — HIGH — `(auth)/login` sahifa allaqachon login user'ni qaytarmaydi

**Fayllar:** `src/app/(auth)/login/page.tsx`, `src/app/(auth)/register/page.tsx`

**Muammo:** Login bo'lgan foydalanuvchi `/login` URL'ga kirsa, login formani
ko'radi. Bu chalg'ituvchi — odatda u `/profile` yoki `/`'ga otiladi.

**Fix — `LoginForm.tsx` boshida:**

```tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/src/features/auth/hooks/useCurrentUser";

export function LoginForm() {
  const router = useRouter();
  const { isLoggedIn } = useCurrentUser();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);
  // ...
}
```

`RegisterForm.tsx`'da ham xuddi shu.

---

## 🟡 S8 — MEDIUM — `GET /auth/me` ulanmagan

**Muammo:** Spec'da:

> `GET /auth/me` (mavjud bo'lsa) — joriy userni olish uchun

Sen faqat `localStorage`'dan o'qiysan. Refresh'dan keyin server bilan
**tasdiqlanmaydi**. Backend'da user o'chirilgan/bloklangan bo'lsa ham,
UI hali ham "logged in" deb ko'rsatadi.

**Fix:** `AuthProvider.tsx`'da hydration'dan keyin `/auth/me` chaqir:

```tsx
"use client";
import { useEffect } from "react";
import { hydrateSession, getSession, setSession, clearSession } from "@/src/features/auth/store/auth.store";
import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    hydrateSession();

    // Hydrate'dan keyin server bilan tasdiqla
    const { accessToken, refreshToken } = getSession();
    if (!accessToken) return;

    apiClient
      .get<{ user: { id: string; email: string; name?: string; role: "USER" | "ADMIN" } }>("/auth/me")
      .then((data) => {
        setSession(accessToken, refreshToken ?? "", {
          id: data.user.id,
          fullName: data.user.name ?? "",
          email: data.user.email,
          role: data.user.role,
        });
      })
      .catch((err) => {
        if (err?.status === 401) clearSession();
      });
  }, []);

  return <>{children}</>;
}
```

`endpoints.auth.me = "/auth/me"` ni Sunnatbek qo'shsin yoki o'zing
`endpoints.ts`'da qo'shib qo'y.

---

## 🟡 S9 — MEDIUM — `client.ts` `204 No Content`'da crash

**Fayl:** `src/lib/api/client.ts`

**Muammo:** Backend `204 No Content` qaytarsa (logout uchun standart),
`payload === null` bo'ladi va:

```ts
if (!payload || typeof payload !== "object" || !("success" in payload)) {
  throw { code: "INVALID_RESPONSE", ... };
}
```

Bu **xato throw qiladi**, garchi javob aslida muvaffaqiyatli (`response.ok` true).

**Fix:** `!response.ok` tekshiruvidan keyin, agar status 204 yoki
`Content-Length: 0` bo'lsa, `undefined as T` qaytarish:

```ts
if (response.status === 204 || response.headers.get("content-length") === "0") {
  return undefined as T;
}
```

Bu Sunnatbek'ning ishi, lekin sen `authApi.logout`'da uchratasan — undan
so'rab fix qildir.

---

## 🟡 S10 — MEDIUM — `getApiErrorMessage` ishlatish

**Fayllar:** `useLogin.ts`, `useRegister.ts`

**Hozir:**

```ts
const msg = (err as { message?: string })?.message ?? "Login amalga oshmadi";
setError(
  msg === "Failed to fetch"
    ? "Server bilan bog'lanib bo'lmadi. Internet aloqasini tekshiring."
    : msg
);
```

**Muammo:** `(err as {...}).message` cast bilan ishlatish loyihada standart
emas. Sunnatbek `src/lib/api/error.ts`'da `getApiErrorMessage(err, fallback)`
yozgan.

**Fix:**

```ts
import { getApiErrorMessage } from "@/src/lib/api/error";
// ...
} catch (err) {
  const msg = getApiErrorMessage(err, "Login amalga oshmadi");
  setError(
    msg === "Failed to fetch"
      ? "Server bilan bog'lanib bo'lmadi. Internet aloqasini tekshiring."
      : msg
  );
  return false;
}
```

---

## 🟡 S11 — MEDIUM — `localStorage` quota exception

**Fayl:** `src/features/auth/store/auth.store.ts` (setSession ichida)

**Muammo:** iOS Safari'da private mode'da `localStorage.setItem` xatolik
beradi (quota exceeded). Hozir try/catch yo'q → app crash.

**Fix:**

```ts
export function setSession(accessToken: string, refreshToken: string, user: AuthUser) {
  _state = { accessToken, refreshToken, user };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(ACCESS_KEY, accessToken);
      localStorage.setItem(REFRESH_KEY, refreshToken);
      localStorage.setItem("authUser", JSON.stringify(user));
    } catch (err) {
      console.warn("localStorage write failed:", err);
      // Foydalanuvchi sessiyasi faqat memory'da qoladi — refresh'da yo'qoladi
    }
    document.cookie = `accessToken=${accessToken}; path=/; SameSite=Lax`;
  }
  notify();
}
```

---

## 🟢 S12 — LOW — Social login tugmalari `alert()`

**Fayl:** `src/features/auth/components/LoginForm.tsx`

**Muammo:** Google/Telegram tugmalari `alert("Tez orada qo'shiladi")`
chaqiradi. UX yomon.

**Fix:** Tugmalarni `disabled` qilib qo'y va kichik badge qo'sh:

```tsx
<button
  type="button"
  disabled
  className="flex items-center justify-center gap-2 py-3 px-4 border border-[#bcc9c6] rounded-lg
    bg-[#f0f5f2] cursor-not-allowed opacity-60 relative"
>
  {/* SVG */}
  Google
  <span className="absolute -top-2 right-2 text-[10px] bg-[#fd7369] text-white px-1.5 py-0.5 rounded-full">
    tez orada
  </span>
</button>
```

---

## 🟢 S13 — LOW — Profile "A'zo bo'lgan: 2026 yil" hardcoded

**Fayl:** `src/app/(main)/profile/page.tsx`

**Fix:** Backend'dan `user.createdAt` kelsa, uni AuthUser tipiga qo'sh va
`mapUser`'da map qil:

```ts
// types.ts
export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt?: string;
};

// profile/page.tsx
<span className="flex items-center gap-1.5">
  <IconCalendar className="w-4 h-4" />
  A&apos;zo bo&apos;lgan: {user.createdAt ? new Date(user.createdAt).getFullYear() : "—"}
</span>
```

---

## 🟢 S14 — LOW — RegisterForm'da `terms` checkbox tekshirilmaydi

**Fayl:** `src/features/auth/components/RegisterForm.tsx`

**Hozir:** Foydalanuvchi "Foydalanish shartlari"ni belgilamasdan ham forma
yuborilaveradi.

**Fix:** State'ga `agreedToTerms` qo'sh va submit'da tekshir:

```tsx
const [agreedToTerms, setAgreedToTerms] = useState(false);
const [termsError, setTermsError] = useState(false);

// submit ichida:
if (!agreedToTerms) {
  setTermsError(true);
  return;
}

// checkbox:
<input
  type="checkbox"
  id="rf-terms"
  checked={agreedToTerms}
  onChange={(e) => {
    setAgreedToTerms(e.target.checked);
    setTermsError(false);
  }}
/>
{termsError && (
  <p className="text-xs text-[#ba1a1a] mt-1">Shartlarga rozilik bering</p>
)}
```

---

## ✅ Done checklist (qo'shimcha)

### Critical (avval bularni qil)
- [ ] S1 — Refresh interceptor `apiClient`'ga ulandi
- [ ] S2 — Token avtomatik `Authorization` header'ga qo'shildi

### High
- [ ] S3 — Hydration race fix (eager init)
- [ ] S4 — `from` param login'dan keyin ishlatildi
- [ ] S5 — Proxy backend URL `env` orqali
- [ ] S6 — Cookie `Secure`/`SameSite=Lax`
- [ ] S7 — `/login` allaqachon login user'ni redirect qiladi

### Medium
- [ ] S8 — `/auth/me` AuthProvider'ga ulandi
- [ ] S9 — `204 No Content` qabul qilinadi (Sunnatbek bilan)
- [ ] S10 — `getApiErrorMessage` ishlatildi
- [ ] S11 — `localStorage` try/catch

### Low (vaqt bo'lsa)
- [ ] S12 — Social login tugmalari disabled
- [ ] S13 — `createdAt` real ma'lumotdan
- [ ] S14 — Terms checkbox required

### Sifat
- [ ] `npm run lint` yashil
- [ ] `npm run build` yashil
- [ ] Test scenarios:
  - Register → Login → Refresh sahifa → sessiya saqlanib turdi
  - Token expire bo'lganda → silently refresh ishladi
  - `/profile`'ga to'g'ridan-to'g'ri kirib → /login redirect (logout holatda)
  - Login → `/profile`'ga qaytarildi (`from` param ishladi)

Push qilganda branch nomi: `suhrob`. Test qilib bo'lganingdan keyin xabar ber.
