import Api from "@/services/api";
import type { LocationDto } from "@/interfaces/Location/LocationDto";

export async function getLocationByRestaurant(restaurantId: number): Promise<LocationDto> {
  const response = await Api.get<LocationDto>(`/locations/restaurants/${restaurantId}`);
  return response.data;
}