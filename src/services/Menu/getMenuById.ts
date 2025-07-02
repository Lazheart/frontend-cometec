import Api from "@/services/api";
import type { MenuResponseDto } from "@/interfaces/Menu/MenuResponseDto";

export async function getMenuById(id: number): Promise<MenuResponseDto> {
  const response = await Api.get<MenuResponseDto>(`/menus/${id}`);
  return response.data;
}