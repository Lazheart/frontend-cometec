import Api from "@/services/api";
import type { ReviewUpdateContentDto } from "@/interfaces/Review/ReviewUpdateContentDto";
import type { ReviewResponseDto } from "@/interfaces/Review/ReviewResponseDto";

export async function updateReview(
  id: number,
  data: ReviewUpdateContentDto
): Promise<ReviewResponseDto> {
  const response = await Api.patch<ReviewResponseDto>(`/reviews/content/${id}`, data);
  return response.data;
}