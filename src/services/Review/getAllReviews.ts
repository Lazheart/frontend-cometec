import Api from "@/services/api";
import type { PaginatedResponse } from "@/interfaces/Page/PaginatedResponse";
import type { ReviewResponseDto } from "@/interfaces/Review/ReviewResponseDto";

export async function getAllReviews(
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<ReviewResponseDto>> {
  const response = await Api.get<PaginatedResponse<ReviewResponseDto>>(
    "/reviews",
    { params: { page, size } }
  );
  return response.data;
}