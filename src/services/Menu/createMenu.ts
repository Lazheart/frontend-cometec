import Api from "@/services/api";
import type { MenuRequestDto } from "@/interfaces/Menu/MenuRequestDto";
import type { MenuResponseDto } from "@/interfaces/Menu/MenuResponseDto";

export async function createMenu(data: MenuRequestDto): Promise<MenuResponseDto> {
  const response = await Api.post<MenuResponseDto>("/menus", data);
  return response.data;
}