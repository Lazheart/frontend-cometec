import Api from "@/services/api";
import type { CommentResponseDto } from "@/interfaces/Comment/CommentResponseDto";

export async function getCommentById(id: number): Promise<CommentResponseDto> {
  const response = await Api.get<CommentResponseDto>(`/comments/${id}`);
  return response.data;
}