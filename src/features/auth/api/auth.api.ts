import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";
import type { AuthUser } from "@/src/features/auth/types";

type AuthPayload = {
  user: {
    id: string;
    email: string;
    name?: string;
    role: "USER" | "ADMIN";
  };
  accessToken: string;
  refreshToken: string;
};

type RegisterInput = {
  email: string;
  password: string;
  name?: string;
};

type LoginInput = {
  email: string;
  password: string;
};

function mapUser(user: AuthPayload["user"]): AuthUser {
  return {
    id: user.id,
    fullName: user.name ?? "",
    email: user.email,
    role: user.role,
  };
}

export const authApi = {
  register: async (input: RegisterInput) => {
    const data = await apiClient.post<AuthPayload>(endpoints.auth.register, input);
    return { user: mapUser(data.user), accessToken: data.accessToken, refreshToken: data.refreshToken };
  },
  login: async (input: LoginInput) => {
    const data = await apiClient.post<AuthPayload>(endpoints.auth.login, input);
    return { user: mapUser(data.user), accessToken: data.accessToken, refreshToken: data.refreshToken };
  },
  refresh: async (refreshToken: string) => {
    const data = await apiClient.post<AuthPayload>(endpoints.auth.refresh, { refreshToken });
    return { user: mapUser(data.user), accessToken: data.accessToken, refreshToken: data.refreshToken };
  },
  logout: async (refreshToken?: string) => {
    return apiClient.post<{ ok: true }>(endpoints.auth.logout, refreshToken ? { refreshToken } : undefined);
  },
};
