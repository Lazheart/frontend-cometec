import Api from "@/services/api";
import type { LocationUpdateDto } from "@/interfaces/Location/LocationUpdateDto";
import type { LocationDto } from "@/interfaces/Location/LocationDto";

export async function updateLocation(
  locationId: number,
  data: LocationUpdateDto
): Promise<LocationDto> {
  const response = await Api.put<LocationDto>(`/locations/${locationId}`, data);
  return response.data;
}