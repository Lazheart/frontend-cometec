import Api from "@/services/api";
import type { ReviewResponseDto } from "@/interfaces/Review/ReviewResponseDto";

export async function getReviewById(id: number): Promise<ReviewResponseDto> {
  const response = await Api.get<ReviewResponseDto>(`/reviews/${id}`);
  return response.data;
}