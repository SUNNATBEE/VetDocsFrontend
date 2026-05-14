# 🐛 Doniyor — qoldiq buglar (v2 audit)

**Status:** v1 audit'dan keyin sen barcha kritik buglarni tuzatib push qilding.
Pastdagilar **mayda polish ishlari** — production'ga to'sqinlik qilmaydi,
lekin spec'ni 100% yopish uchun bajarish kerak.

> Prioritet: hammasi LOW. Boshqa critical ishlardan keyin qil.

---

## 🟡 D1 — `useClinic.ts` da bo'sh `id` xato matni texnik

**Fayl:** `src/features/clinics/hooks/useClinic.ts`

**Hozir:**

```ts
if (!id.trim()) {
  queueMicrotask(() => {
    if (!isStillActive()) return;
    setError({
      code: "INVALID_ID",
      message: "Klinika ID ko'rsatilmagan",
    });
    setIsLoading(false);
  });
  return;
}
```

**Muammo:** "Klinika ID ko'rsatilmagan" — bu **dasturchi tili**.
Foydalanuvchi `/clinics/` URL'iga kirsa "bizning sahifamiz singan" deb o'ylaydi.

**Tavsiya — 2 ta variant:**

### Variant A — yumshoq xato matni

```ts
setError({
  code: "NOT_FOUND",
  message: "Klinika topilmadi",
});
```

### Variant B — Next.js `notFound()` ishlatish (yaxshiroq)

Hook'da error qaytarish o'rniga, `ClinicDetail.tsx` ichida:

```tsx
import { notFound } from "next/navigation";

if (error?.code === "NOT_FOUND" || (!isLoading && !clinic)) {
  notFound();
}
```

Bu Next.js'ning `not-found.tsx` sahifasini chiqaradi (rasmiy 404).

---

## 🟡 D2 — `ClinicMap.markerStyle` performance

**Fayl:** `src/features/clinics/components/ClinicMap.tsx`

**Hozir:** Har bir marker uchun `clinics.filter(hasCoordinates)` qayta-qayta
chaqiriladi. 50+ klinikada sezilarli sekinlashish.

**Fix:** Filter'ni `useMemo` ichiga ol va min/max'ni undan hisoblat:

```tsx
const validClinics = useMemo(
  () => clinics.filter(hasCoordinates),
  [clinics]
);

const bounds = useMemo(() => {
  if (validClinics.length === 0) return null;
  const lats = validClinics.map((c) => c.latitude);
  const lngs = validClinics.map((c) => c.longitude);
  return {
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
  };
}, [validClinics]);
```

Marker'larni `validClinics.map(...)` orqali render qil, har bir markerda
`bounds`'dan foydalan.

---

## 🟡 D3 — Map'da koordinatasiz klinikalar ro'yxati ko'rinmaydi

**Fayl:** `src/features/clinics/components/ClinicMap.tsx`

**Hozir:** Faqat son ko'rinadi: `"3 ta klinika xaritada ko'rsatilmadi"`.
Foydalanuvchi qaysi klinikalar ekanini bilmaydi.

**Fix — kichik expandable section:**

```tsx
{skippedCount > 0 && (
  <details className="mt-3 text-sm">
    <summary className="cursor-pointer text-[var(--on-surface-variant)]">
      {skippedCount} ta klinikada koordinata yo'q — ko'rish
    </summary>
    <ul className="mt-2 space-y-1 pl-4">
      {skipped.map((c) => (
        <li key={c.id}>
          <Link href={`/clinics/${c.id}`} className="text-[var(--primary)] hover:underline">
            {c.name}
          </Link>
        </li>
      ))}
    </ul>
  </details>
)}
```

---

## ✅ Done checklist (qo'shimcha)

- [ ] D1 — `useClinic` xato matni yumshatildi yoki `notFound()` ulandi
- [ ] D2 — `ClinicMap` filter `useMemo` ga olindi
- [ ] D3 — skipped klinikalar ro'yxati ko'rsatildi
- [ ] `npm run lint` yashil
- [ ] `npm run build` yashil

Push qilganda branch nomi: `doni`. Test qilib bo'lganingdan keyin xabar ber.
