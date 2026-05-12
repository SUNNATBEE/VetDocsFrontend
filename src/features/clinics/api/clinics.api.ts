import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";
import type { Clinic, NearbyClinicsParams } from "@/src/features/clinics/types";

type NearbyClinicDto = {
  id: string;
  name: string;
  phone?: string;
  address: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  distanceKm?: number;
  isOpenNow?: boolean;
  todayHours?: Clinic["todayHours"];
  averageRating: number | null;
  reviewCount?: number;
};

type NearbyPayload = {
  clinics: NearbyClinicDto[];
};

type ClinicDetailPayload = NearbyClinicDto & {
  id: string;
  name: string;
  phone?: string;
  address: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  openingHours?: Clinic["openingHours"];
  todayHours?: Clinic["todayHours"];
  isOpenNow?: boolean;
  reviews?: Clinic["reviews"];
};

function mapClinic(dto: NearbyClinicDto | ClinicDetailPayload): Clinic {
  return {
    id: dto.id,
    name: dto.name,
    phone: dto.phone ?? "",
    address: dto.address,
    city: dto.city ?? "",
    latitude: dto.latitude ?? 0,
    longitude: dto.longitude ?? 0,
    distanceKm: dto.distanceKm,
    isOpenNow: dto.isOpenNow,
    todayHours: dto.todayHours,
    openingHours: "openingHours" in dto ? dto.openingHours : undefined,
    averageRating: dto.averageRating,
    reviewCount: dto.reviewCount ?? 0,
    reviews: "reviews" in dto ? dto.reviews : undefined,
  };
}

export const clinicsApi = {
  getNearby: async ({ lat, lng, radiusKm = 10 }: NearbyClinicsParams): Promise<Clinic[]> => {
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
