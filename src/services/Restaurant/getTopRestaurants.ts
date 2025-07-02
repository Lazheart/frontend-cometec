import Api from "@/services/api";
import type { RestaurantSummaryDto } from "@/interfaces/Restaurant/RestaurantSummaryDto";

export async function getTopRestaurants(): Promise<RestaurantSummaryDto[]> {
  const response = await Api.get<RestaurantSummaryDto[]>("/restaurants/top");
  return response.data;
}

