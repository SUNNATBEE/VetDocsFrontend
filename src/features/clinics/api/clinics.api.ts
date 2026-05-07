import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";
import type { Clinic } from "@/src/features/clinics/types";

type NearbyClinicDto = {
  id: string;
  name: string;
  address: string;
  averageRating: number | null;
};

type NearbyPayload = {
  clinics: NearbyClinicDto[];
};

type ClinicDetailPayload = {
  id: string;
  name: string;
  address: string;
  averageRating: number | null;
};

type NearbyParams = {
  lat: number;
  lng: number;
  radiusKm?: number;
};

function mapClinic(dto: NearbyClinicDto | ClinicDetailPayload): Clinic {
  return {
    id: dto.id,
    name: dto.name,
    address: dto.address,
    rating: dto.averageRating ?? 0,
  };
}

export const clinicsApi = {
  getNearby: async ({ lat, lng, radiusKm = 10 }: NearbyParams): Promise<Clinic[]> => {
    const query = new URLSearchParams({
      lat: String(lat),
      lng: String(lng),
      radiusKm: String(radiusKm),
    });
    const data = await apiClient.get<NearbyPayload>(`${endpoints.clinics.nearby}?${query.toString()}`);
    return data.clinics.map(mapClinic);
  },
  getById: async (id: string): Promise<Clinic> => {
    const data = await apiClient.get<ClinicDetailPayload>(endpoints.clinics.byId(id));
    return mapClinic(data);
  },
};
