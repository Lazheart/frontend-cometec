import Api from "@/services/api";

export async function updateRestaurant(id: number, data: FormData): Promise<void> {
  await Api.patch(`/restaurants/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
}