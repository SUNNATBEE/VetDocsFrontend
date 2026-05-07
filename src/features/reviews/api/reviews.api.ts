import { apiClient } from "@/src/lib/api/client";
import { endpoints } from "@/src/lib/api/endpoints";
import type { Review } from "@/src/features/reviews/types";

type CreateReviewInput = {
  clinicId: string;
  rating: number;
  comment?: string;
  accessToken: string;
};

type ReviewDto = {
  id: string;
  rating: number;
  comment?: string | null;
};

export const reviewsApi = {
  create: async ({ clinicId, rating, comment, accessToken }: CreateReviewInput): Promise<Review> => {
    const data = await apiClient.post<ReviewDto>(
      endpoints.clinics.reviews(clinicId),
      { rating, comment },
      accessToken,
    );

    return {
      id: data.id,
      clinicId,
      rating: data.rating,
      comment: data.comment ?? "",
    };
  },
};
