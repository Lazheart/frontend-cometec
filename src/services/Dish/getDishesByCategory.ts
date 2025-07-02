import Api from "@/services/api";
import type { PaginatedResponse } from "@/interfaces/Page/PaginatedResponse";
import type { DishSummaryDto } from "@/interfaces/Dish/DishSummaryDto";

export async function getDishesByCategory(
  category: string,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<DishSummaryDto>> {
  const response = await Api.get<PaginatedResponse<DishSummaryDto>>(
    `/dishes/category/${category}`,
    { params: { page, size } }
  );
  return response.data;
}