import Api from "@/services/api";
import type { DishResponseDto } from "@/interfaces/Dish/DishResponseDto";

export async function createDish(data: FormData): Promise<DishResponseDto> {
  const response = await Api.post<DishResponseDto>("/dishes", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
}