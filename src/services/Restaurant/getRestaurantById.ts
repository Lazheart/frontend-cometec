import Api from "@/services/api";
import type { RestaurantResponseDto } from "@/interfaces/Restaurant/RestaurantResponseDto";

//ROLE: ADMIN

export async function getRestaurantById(id: number): Promise<RestaurantResponseDto> {
  const response = await Api.get<RestaurantResponseDto>(`/restaurants/${id}`);
  return response.data;
}