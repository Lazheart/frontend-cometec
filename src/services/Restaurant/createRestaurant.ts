import Api from "@/services/api";
import type { RestaurantRequestDto } from "@/interfaces/Restaurant/RestaurantRequestDto";
import type { RestaurantResponseDto } from "@/interfaces/Restaurant/RestaurantResponseDto";

export async function createRestaurant(data: RestaurantRequestDto): Promise<RestaurantResponseDto> {
  const response = await Api.post<RestaurantResponseDto>("/restaurants", data);
  return response.data;
}