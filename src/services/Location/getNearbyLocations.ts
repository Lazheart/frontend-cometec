import Api from "@/services/api";
import type { LocationDto } from "@/interfaces/Location/LocationDto";

export async function getNearbyLocations(
  latitud: number,
  longitud: number,
  radioKm: number
): Promise<LocationDto[]> {
  const response = await Api.get<LocationDto[]>("/locations/nearby", {
    params: { latitud, longitud, radioKm }
  });
  return response.data;
}