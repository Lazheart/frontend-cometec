import Api from "@/services/api";
import type { PaginatedResponse } from "@/interfaces/Page/PaginatedResponse";
import type { CommentResponseDto } from "@/interfaces/Comment/CommentResponseDto";

export async function getRestaurantComments(
  id: number,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<CommentResponseDto>> {
  const response = await Api.get<PaginatedResponse<CommentResponseDto>>(
    `/restaurants/${id}/comments`,
    { params: { page, size } }
  );
  return response.data;
}