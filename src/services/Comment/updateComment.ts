import Api from "@/services/api";
import type { CommentRequestDto } from "@/interfaces/Comment/CommentRequestDto";
import type { CommentResponseDto } from "@/interfaces/Comment/CommentResponseDto";
export async function updateComment(id: number, data: CommentRequestDto): Promise<CommentResponseDto> {
  const response = await Api.patch<CommentResponseDto>(`/comments/${id}`, data);
  return response.data;
}