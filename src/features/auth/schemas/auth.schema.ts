/**
 * Auth validatsiya schema — native JS bilan (zod yo'q).
 * Backend: password 8..128 belgi (openapi.yaml ga mos).
 */

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Login ────────────────────────────────────────────────────────────────────
export function validateLogin(values: LoginFormValues): FormErrors<LoginFormValues> {
  const errors: FormErrors<LoginFormValues> = {};

  if (!values.email.trim()) {
    errors.email = "Email kiritilishi shart";
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = "Email noto'g'ri formatda";
  }

  if (!values.password) {
    errors.password = "Parol kiritilishi shart";
  } else if (values.password.length < 8) {
    errors.password = "Parol kamida 8 ta belgidan iborat bo'lishi kerak";
  }

  return errors;
}

// ─── Register ─────────────────────────────────────────────────────────────────
export function validateRegister(values: RegisterFormValues): FormErrors<RegisterFormValues> {
  const errors: FormErrors<RegisterFormValues> = {};

  if (!values.name.trim()) {
    errors.name = "Ism kiritilishi shart";
  }

  if (!values.email.trim()) {
    errors.email = "Email kiritilishi shart";
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = "Email noto'g'ri formatda";
  }

  if (!values.password) {
    errors.password = "Parol kiritilishi shart";
  } else if (values.password.length < 8) {
    errors.password = "Parol kamida 8 ta belgidan iborat bo'lishi kerak";
  } else if (values.password.length > 128) {
    errors.password = "Parol 128 belgidan oshmasligi kerak";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Parolni tasdiqlang";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Parollar mos kelmadi";
  }

  return errors;
}
