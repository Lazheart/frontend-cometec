import Api from "@/services/api";

export async function deleteComment(id: number): Promise<void> {
  await Api.delete(`/comments/${id}`);
}