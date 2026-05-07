export const endpoints = {
  health: "/health",
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  clinics: {
    nearby: "/clinics/nearby",
    byId: (id: string) => `/clinics/${id}`,
    reviews: (id: string) => `/clinics/${id}/reviews`,
  },
  admin: {
    dashboard: "/admin/dashboard",
    clinics: "/admin/clinics",
    clinicById: (id: string) => `/admin/clinics/${id}`,
    reviews: "/admin/reviews",
    reviewById: (id: string) => `/admin/reviews/${id}`,
    users: "/admin/users",
    userRole: (id: string) => `/admin/users/${id}/role`,
    userById: (id: string) => `/admin/users/${id}`,
  },
};
