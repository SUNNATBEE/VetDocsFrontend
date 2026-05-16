import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";
import type { ApiError } from "@/src/lib/api/error";
import type {
  Clinic,
  DistrictCatalogItem,
  NearbyClinicsParams,
} from "@/src/features/clinics/types";

type NearbyClinicDto = {
  id: string;
  name: string;
  phone?: string;
  address: string;
  city?: string;
  district?: string | null;
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
  searchCenter?: {
    lat?: number;
    lng?: number;
    query?: string;
    district?: string | null;
  };
};

type ClinicDetailPayload = NearbyClinicDto & {
  id: string;
  name: string;
  phone?: string;
  address: string;
  city?: string;
  district?: string | null;
  latitude?: number;
  longitude?: number;
  openingHours?: Clinic["openingHours"];
  todayHours?: Clinic["todayHours"];
  isOpenNow?: boolean;
  reviews?: Clinic["reviews"];
};

type DistrictsPayload = {
  districts: DistrictCatalogItem[];
};

function mapClinic(dto: NearbyClinicDto | ClinicDetailPayload): Clinic {
  return {
    id: dto.id,
    name: dto.name,
    phone: dto.phone ?? "",
    address: dto.address,
    city: dto.city ?? "",
    district: dto.district ?? null,
    latitude: typeof dto.latitude === "number" ? dto.latitude : null,
    longitude: typeof dto.longitude === "number" ? dto.longitude : null,
    distanceKm: dto.distanceKm,
    isOpenNow: dto.isOpenNow,
    todayHours: dto.todayHours,
    openingHours: "openingHours" in dto ? dto.openingHours : undefined,
    averageRating: dto.averageRating,
    reviewCount: dto.reviewCount ?? 0,
    reviews: "reviews" in dto ? dto.reviews : undefined,
  };
}

function assertNearbyPayload(data: unknown): asserts data is NearbyPayload {
  if (
    !data ||
    typeof data !== "object" ||
    !("clinics" in data) ||
    !Array.isArray((data as NearbyPayload).clinics)
  ) {
    throw {
      code: "INVALID_RESPONSE",
      message: "Serverdan klinikalar ro'yxati noto'g'ri keldi",
    } satisfies ApiError;
  }
}

function assertDistrictsPayload(data: unknown): asserts data is DistrictsPayload {
  if (
    !data ||
    typeof data !== "object" ||
    !("districts" in data) ||
    !Array.isArray((data as DistrictsPayload).districts)
  ) {
    throw {
      code: "INVALID_RESPONSE",
      message: "Serverdan tumanlar ro'yxati noto'g'ri keldi",
    } satisfies ApiError;
  }
}

export const clinicsApi = {
  getNearby: async ({
    lat,
    lng,
    radiusKm = 10,
    district,
  }: NearbyClinicsParams): Promise<Clinic[]> => {
    const query = new URLSearchParams();
    if (typeof lat === "number") query.set("lat", String(lat));
    if (typeof lng === "number") query.set("lng", String(lng));
    query.set("radiusKm", String(radiusKm));
    if (district) query.set("district", district);

    const data = await apiClient.get<unknown>(`${endpoints.clinics.nearby}?${query.toString()}`);
    assertNearbyPayload(data);
    return data.clinics.map(mapClinic);
  },
  getById: async (id: string): Promise<Clinic> => {
    const data = await apiClient.get<ClinicDetailPayload>(endpoints.clinics.byId(id));
    return mapClinic(data);
  },
  getDistricts: async (): Promise<DistrictCatalogItem[]> => {
    const data = await apiClient.get<unknown>(endpoints.clinics.districts);
    assertDistrictsPayload(data);
    return data.districts;
  },
};
