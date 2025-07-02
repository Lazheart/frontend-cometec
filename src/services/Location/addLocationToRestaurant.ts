
import Api from "@/services/api";
import type { LocationCreateDTO } from "@/interfaces/Location/LocationCreateDto";
import type { LocationDto } from "@/interfaces/Location/LocationDto";
export async function addLocationToRestaurant(
  restaurantId: number,
  data: LocationCreateDTO
): Promise<LocationDto> {
  const response = await Api.post<LocationDto>(`/locations/restaurants/${restaurantId}`, data);
  return response.data;
}