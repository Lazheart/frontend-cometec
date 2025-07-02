import Api from "@/services/api";
import type { RestaurantResponseDto } from "@/interfaces/Restaurant/RestaurantResponseDto";

export async function createRestaurant(data: FormData): Promise<RestaurantResponseDto> {
  const response = await Api.post<RestaurantResponseDto>("/restaurants", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
}