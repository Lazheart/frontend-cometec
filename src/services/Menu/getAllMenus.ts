import Api from "@/services/api";
import type { PaginatedResponse } from "@/interfaces/Page/PaginatedResponse";
import type { MenuResponseDto } from "@/interfaces/Menu/MenuResponseDto";

export async function getAllMenus(
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<MenuResponseDto>> {
  const response = await Api.get<PaginatedResponse<MenuResponseDto>>(
    "/menus",
    { params: { page, size } }
  );
  return response.data;
}