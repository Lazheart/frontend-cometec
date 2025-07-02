import Api from "@/services/api";

export async function deleteReview(id: number): Promise<void> {
  await Api.delete(`/reviews/${id}`);
}