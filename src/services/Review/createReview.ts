import Api from "@/services/api";
import type { ReviewRequestDto } from "@/interfaces/Review/ReviewRequestDto";
import type { ReviewResponseDto } from "@/interfaces/Review/ReviewResponseDto";

export async function createReview(data: ReviewRequestDto): Promise<ReviewResponseDto> {
  const response = await Api.post<ReviewResponseDto>("/reviews", data);
  return response.data;
}