import Api from "@/services/api";

export async function deleteDish(id: number): Promise<void> {
  await Api.delete(`/dishes/${id}`);
}