import Api from "@/services/api";
import type { PaginatedResponse } from "@/interfaces/Page/PaginatedResponse";
import type { RestaurantResponseDto } from "@/interfaces/Restaurant/RestaurantResponseDto";

export async function getFavouriteRestaurants(
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<RestaurantResponseDto>> {
  const response = await Api.get<PaginatedResponse<RestaurantResponseDto>>(
    "/user/favourites",
    { params: { page, size } }
  );
  return response.data;
}