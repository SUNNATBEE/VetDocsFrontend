export type Clinic = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string | null;
  latitude: number | null;
  longitude: number | null;
  distanceKm?: number;
  isOpenNow?: boolean;
  todayHours?: OpeningSlot | null;
  openingHours?: OpeningHours;
  averageRating: number | null;
  reviewCount: number;
  reviews?: ClinicReview[];
};

export type DistrictCatalogItem = {
  key: string;
  name: string;
  lat: number;
  lng: number;
  clinicCount: number;
};

export type OpeningSlot = {
  open: string;
  close: string;
} | null;

export type OpeningHours = {
  mon: OpeningSlot;
  tue: OpeningSlot;
  wed: OpeningSlot;
  thu: OpeningSlot;
  fri: OpeningSlot;
  sat: OpeningSlot;
  sun: OpeningSlot;
};

export type ClinicReview = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user?: {
    id?: string;
    name?: string | null;
    email?: string;
  };
};

export type ClinicFilters = {
  query: string;
  city: string;
  district: string;
  openNow: boolean;
  minRating: number;
};

export type NearbyClinicsParams = {
  lat?: number;
  lng?: number;
  radiusKm?: number;
  district?: string;
};
