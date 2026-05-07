# Profilni tahrirlash (Modal)

> **Mas'ul:** Akbar (Profile & Reviews Engineer)
> **Sprint:** 3-hafta
> **Prioritet:** ⭐⭐

---

## 1. Sahifa haqida

Profil sahifasidagi "Profilni tahrirlash" tugma bosilganda ochiladigan dialog (modal). Foydalanuvchi avatar, ism, familiya, telefon, email'ni o'zgartiradi.

## 2. Anatomiya (`screen.png`'dan)

```
Backdrop:
- Semi-transparent dark overlay

Dialog (centered, 480px):
- Header:
  - "Profilni tahrirlash" h2
  - "×" close button right

- Avatar uploader (centered):
  - 96px circle
  - "Rasmni o'zgartirish" overlay (kamera ikon)
  - Click → file input opens

- Form (2 ustun grid):
  - Ism: "Jasur"
  - Familiya: "Alimov"
  - Telefon raqam: "+998 90 123 45 67"
  - Email: "jasur.alimov@email.com"

- Footer (right-aligned):
  - "Bekor qilish" outline button
  - "Saqlash" coral button
```

## 3. Qayerga kod yoziladi

| Fayl | Tarkib |
|---|---|
| `src/features/profile/components/EditProfileDialog.tsx` | Dialog komponenti |
| `src/features/profile/components/AvatarUploader.tsx` | Drag-drop + click |
| `src/features/profile/api/profile.api.ts` | `uploadAvatar(file)` + `updateProfile(data)` |

## 4. shadcn

```bash
npx shadcn@latest add dialog form input label button avatar
```

## 5. Komponent ishlatish

```tsx
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'

export function EditProfileDialog({ open, onOpenChange, user }: Props) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName: user.firstName, lastName: user.lastName, /* ... */ }
  })
  const mutation = useUpdateProfile()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Profilni tahrirlash</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(mutation.mutate)} className="space-y-4">
            <AvatarUploader value={form.watch('avatarUrl')} onChange={...} />
            <div className="grid grid-cols-2 gap-4">
              {/* fields */}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Bekor qilish</Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saqlanmoqda...' : 'Saqlash'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
```

## 6. Avatar upload mantiq

```tsx
async function handleAvatarUpload(file: File) {
  const formData = new FormData()
  formData.append('avatar', file)

  const { data } = await api.post('/users/me/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data.avatarUrl
}
```

## 7. Zod schema

```ts
export const editProfileSchema = z.object({
  firstName: z.string().min(2, "Ism kamida 2 ta belgi"),
  lastName: z.string().min(2, "Familiya kamida 2 ta belgi"),
  phone: z.string().regex(/^\+998\d{9}$/, "Noto'g'ri format"),
  email: z.string().email("Email noto'g'ri formatda"),
  avatarUrl: z.string().optional(),
})
```

## 8. States

- ✅ **Default:** input'lar prefilled
- ✅ **Editing:** "Saqlash" button enabled
- ✅ **Saving:** disabled + spinner + "Saqlanmoqda..."
- ✅ **Avatar uploading:** circle progress overlay
- ✅ **Validation error:** red helpers
- ✅ **Success:** dialog yopiladi + toast "Profil yangilandi"

## 9. Done checklist

- [ ] Dialog backdrop click → yopiladi
- [ ] Esc tugma → yopiladi
- [ ] Saqlanmagan o'zgarishlar bilan yopilsa, confirm so'raydi
- [ ] Avatar drag-drop ishlaydi
- [ ] Image client-side validate (max 5MB, jpg/png)
- [ ] Image client-side resize (avatarni 200x200 ga)
- [ ] Backend xato → red helpers
- [ ] Mobile'da dialog full-screen sheet (responsive)
- [ ] `screen.png` ga vizual mos
