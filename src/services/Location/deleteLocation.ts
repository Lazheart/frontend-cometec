import Api from "@/services/api";

export async function deleteLocation(locationId: number): Promise<void> {
  await Api.delete(`/locations/${locationId}`);
}