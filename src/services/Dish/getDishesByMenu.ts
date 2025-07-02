import Api from "@/services/api";
import type { PaginatedResponse } from "@/interfaces/Page/PaginatedResponse";
import type { DishResponseDto } from "@/interfaces/Dish/DishResponseDto";

export async function getDishesByMenu(
  menuId: number,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<DishResponseDto>> {
  const response = await Api.get<PaginatedResponse<DishResponseDto>>(
    `/dishes/menus/${menuId}/dishes`,
    { params: { page, size } }
  );
  return response.data;
}