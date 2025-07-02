import Api from "@/services/api";
import type { CommentResponseDto } from "@/interfaces/Comment/CommentResponseDto";
import type { PaginatedResponse } from "@/interfaces/Page/PaginatedResponse";

export async function getAllComments(
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<CommentResponseDto>> {
  const response = await Api.get<PaginatedResponse<CommentResponseDto>>(
    "/comments",
    { params: { page, size } }
  );
  return response.data;
}