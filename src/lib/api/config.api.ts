import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";

export type PublicConfig = {
  googleMapsBrowserKey: string | null;
};

export const configApi = {
  getPublic: async (): Promise<PublicConfig> => {
    const data = await apiClient.get<PublicConfig>(endpoints.config.public);
    return {
      googleMapsBrowserKey: data?.googleMapsBrowserKey ?? null,
    };
  },
};
