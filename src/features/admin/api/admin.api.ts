import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";
import type { AdminStats } from "@/src/features/admin/types";

type DashboardPayload = {
  counts: {
    clinics: number;
    users: number;
    reviews: number;
  };
};

export const adminApi = {
  getDashboard: async (accessToken: string): Promise<AdminStats> => {
    const data = await apiClient.get<DashboardPayload>(endpoints.admin.dashboard, accessToken);
    return {
      totalClinics: data.counts.clinics,
      totalUsers: data.counts.users,
      reviewsLast7Days: data.counts.reviews,
    };
  },
};
