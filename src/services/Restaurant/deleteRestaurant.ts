import Api from "@/services/api";

export async function deleteRestaurant(id: number): Promise<void> {
  await Api.delete(`/restaurants/${id}`);
}