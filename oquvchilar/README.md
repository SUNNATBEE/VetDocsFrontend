# O'quvchilar uchun yo'l xarita

Bu papka har bir o'quvchining vazifasini va umumiy ish tartibini ko'rsatadi.
Maqsad: kichik, tushunarli kod yozish va bir-birining ishini buzmaslik.

## Avval nima o'qiladi?

1. `swagger-qanday-ishlatiladi.md` — backend menyusini tushunish.
2. `fayl-strukturasi.md` — loyiha papkalari qanday tartiblangan.
3. O'zingizga tegishli fayl (`sunnatbek.md`, `suhrob.md`, ...).

## Ish qoidalari

1. Faqat o'zingizga biriktirilgan fayllarda ishlang.
2. Boshqa o'quvchining faylini o'zgartirish kerak bo'lsa — avval u bilan kelishing.
3. Har bosqichdan keyin tekshirish:
   - `npm run lint`
   - `npm run build`
4. Branch nomi: `feature/<ism>-<vazifa>` (masalan: `feature/suhrob-auth`).
5. Bitta pull request — bitta vazifa. Kichik va o'qiladigan PR yaxshi PR.

## Jamoa va vazifalar

| Fayl | Rol | Asosiy domen |
| --- | --- | --- |
| `sunnatbek.md` | Tech Lead | API core, auth helpers, Admin panel (to'liq) |
| `suhrob.md` | Frontend | Auth (register / login / logout / refresh / forgot password) |
| `doniyor.md` | Frontend | Clinics ro'yxati, detail, qidiruv, xarita |
| `akbar.md` | Frontend | Reviews, Profile, Favorites |
| `yahyo.md` | Frontend | Layout (Header / Footer / Mobile menyu / Theme toggle) |
| `hayot.md` | Frontend | Home, About, Contact, FAQ — landing tajribasi |
| `numton.md` | Frontend | Reusable shared komponentlar, Toast/Notification, content constants |

## Muhim eslatma

- API base URL: `NEXT_PUBLIC_API_URL`.
- Endpointlar: Swaggerdagi `/api/v1` dan keyingi qismni olamiz.
- Bir xil fetch kodini qayta yozmang — `apiClient` orqali ishlang.
- Endpointni har joyda string sifatida yozmang — `endpoints.ts` dan oling.
- Kodni oddiy yozing: kichik funksiya, tushunarli nom, ortiqcha murakkabliksiz.
- `.env.local` ni hech qachon git ga qo'shmang.
