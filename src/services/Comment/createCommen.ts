import Api from "@/services/api";
import type { CommentRequestDto } from "@/interfaces/Comment/CommentRequestDto";
import type { CommentResponseDto } from "@/interfaces/Comment/CommentResponseDto";
export async function createComment(data: CommentRequestDto): Promise<CommentResponseDto> {
  const response = await Api.post<CommentResponseDto>("/comments", data);
  return response.data;
}