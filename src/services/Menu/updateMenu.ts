import Api from "@/services/api";
import type { MenuRequestDto } from "@/interfaces/Menu/MenuRequestDto";
import type { MenuResponseDto } from "@/interfaces/Menu/MenuResponseDto";

export async function updateMenu(id: number, data: MenuRequestDto): Promise<MenuResponseDto> {
  const response = await Api.put<MenuResponseDto>(`/menus/${id}`, data);
  return response.data;
}