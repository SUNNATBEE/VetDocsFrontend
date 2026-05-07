export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN";
};
