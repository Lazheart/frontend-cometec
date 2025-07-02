import Api from "@/services/api";
import type { MenuResponseDto } from "@/interfaces/Menu/MenuResponseDto";

export async function getRestaurantMenu(id: number): Promise<MenuResponseDto> {
  const response = await Api.get<MenuResponseDto>(`/restaurants/${id}/menu`);
  return response.data;
}