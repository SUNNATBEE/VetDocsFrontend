// // Frontend route nomlari — barcha sahifalar shu yerdan olinadi.
// // Hardcoded string ishlatmang, shu konstantalardan foydalaning.

// export const routes = {
//   // Asosiy sahifalar
//   home: "/",
//   search: "/search",
//   map: "/map",

//   // Klinikalar
//   clinics: "/clinics",
//   clinic: (id: string | number) => `/clinics/${id}`,

//   // Foydalanuvchi profili
//   profile: "/profile",
//   favorites: "/profile/favorites",

//   // Auth
//   login: "/login",
//   register: "/register",

//   // Admin panel
//   admin: "/admin",
// } as const;




// Frontend route nomlari — barcha sahifalar shu yerdan olinadi.
// Hardcoded string ishlatmang, shu konstantalardan foydalaning.

export const routes = {
  // Asosiy sahifalar
  home:    "/",
  search:  "/search",
  map:     "/map",

  // Klinikalar
  clinics: "/clinics",
  clinic:  (id: string | number) => `/clinics/${id}`,

  // Doktorlar
  doctors: "/doctors",
  doctor:  (id: string | number) => `/doctors/${id}`,

  // Foydalanuvchi
  profile:   "/profile",
  favorites: "/profile/favorites",

  // Auth
  login:    "/login",
  register: "/register",

  // Admin panel
  admin:             "/admin",
  adminClinics:      "/admin/clinics",
  adminDoctors:      "/admin/doctors",
  adminAppointments: "/admin/appointments",
} as const;