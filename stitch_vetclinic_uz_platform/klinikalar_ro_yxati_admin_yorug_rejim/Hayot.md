# Admin — Klinikalar ro'yxati (Light Mode + Delete Confirmation)

> **Mas'ul:** Hayot (Admin Panel Engineer)
> **Sprint:** 4-hafta
> **Prioritet:** ⭐⭐⭐

---

## 1. Sahifa haqida

`klinikalar_ro_yxati_admin_to_q_rejim` ning **yorug' rejim varianti + delete confirmation modal**ni ko'rsatadi.

`screen.png` da asosan **ConfirmDialog** ko'rsatilgan — bu reusable komponent, har bir destruktiv amalda ishlatiladi.

## 2. Anatomiya (`screen.png`'dan)

```
Background: light mode klinikalar table (jonli — biroz blurred)

Modal (centered):
- ⚠ Red triangle ikon (top)
- H3: "Klinikani o'chirishni tasdiqlaysizmi?"
- Body matn: "Ushbu amalni qaytarib bo'lmaydi. Klinikaga tegishli barcha ma'lumotlar va shifokorlar ro'yxati o'chib ketadi."
- Buttons (vertical stack):
  - Coral filled "Ha, o'chirish"
  - Outline "Bekor qilish"
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/components/shared/ConfirmDialog.tsx` | Reusable dialog (Yahyo bilan birga) |
| `src/features/admin/hooks/useDeleteClinic.ts` | Mutation + onSuccess invalidate cache |

## 4. shadcn

```bash
npx shadcn@latest add alert-dialog
```

## 5. ConfirmDialog props

```tsx
type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string                          // "Klinikani o'chirishni tasdiqlaysizmi?"
  description?: string                   // "Ushbu amalni qaytarib bo'lmaydi..."
  confirmLabel?: string                  // "Ha, o'chirish"
  cancelLabel?: string                   // "Bekor qilish"
  variant?: 'default' | 'destructive'    // destructive = red CTA
  icon?: ReactNode                       // ⚠ default
  onConfirm: () => void | Promise<void>
  loading?: boolean
}
```

## 6. Qayerda ishlatiladi

- Klinikani o'chirish (admin)
- Foydalanuvchini bloklash
- Sharhni o'chirish
- Hisobni o'chirish (foydalanuvchi)
- Saqlanmagan o'zgarishlar bilan modal yopish

## 7. Misol

```tsx
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { useDeleteClinic } from '@/features/admin/hooks/useDeleteClinic'

const [confirmOpen, setConfirmOpen] = useState(false)
const [clinicToDelete, setClinicToDelete] = useState<Clinic | null>(null)
const deleteMutation = useDeleteClinic()

const handleDelete = async () => {
  if (!clinicToDelete) return
  await deleteMutation.mutateAsync(clinicToDelete.id)
  toast.success(`"${clinicToDelete.name}" o'chirildi`)
  setConfirmOpen(false)
}

<ConfirmDialog
  open={confirmOpen}
  onOpenChange={setConfirmOpen}
  title="Klinikani o'chirishni tasdiqlaysizmi?"
  description={`"${clinicToDelete?.name}" klinikasi va uning ${clinicToDelete?.reviewCount} ta sharhi o'chiriladi. Bu amalni qaytarib bo'lmaydi.`}
  confirmLabel="Ha, o'chirish"
  variant="destructive"
  loading={deleteMutation.isPending}
  onConfirm={handleDelete}
/>
```

## 8. UX qoidalar

- **Backdrop click → bekor qilish** (faqat non-destructive uchun)
- **Esc → bekor qilish**
- **Destructive CTA = coral/red filled**
- **Loading state:** button disabled + spinner
- **Focus trap:** Tab fokus dialog ichida qoladi (a11y)
- **Auto focus:** "Bekor qilish" tugma default focused (xavfsiz default)

## 9. Done checklist

- [ ] ConfirmDialog komponenti reusable
- [ ] Destructive variant red CTA
- [ ] Loading state'da double-click protection
- [ ] Esc + backdrop click ishlaydi
- [ ] Focus trap (Tab fokus dialogdan tashqariga chiqmaydi)
- [ ] Mobile'da modal full-width (margin'lar bilan)
- [ ] Toast onSuccess
- [ ] Cache invalidate onSuccess (`queryClient.invalidateQueries`)
- [ ] `screen.png` ga vizual mos
