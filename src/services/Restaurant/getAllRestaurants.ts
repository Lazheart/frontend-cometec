import Api from "@/services/api";
import type { PaginatedResponse } from "@/interfaces/Page/PaginatedResponse";
import type { RestaurantSummaryDto } from "@/interfaces/Restaurant/RestaurantSummaryDto";

//ROLE: ADMIN

export async function getAllRestaurants(
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<RestaurantSummaryDto>> {
  const response = await Api.get<PaginatedResponse<RestaurantSummaryDto>>(
    "/restaurants",
    { params: { page, size } }
  );
  return response.data;
}