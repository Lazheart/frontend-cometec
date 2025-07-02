import Api from "@/services/api";
import type { DishResponseDto } from "@/interfaces/Dish/DishResponseDto";

export async function updateDish(id: number, data: FormData): Promise<DishResponseDto> {
  const response = await Api.patch<DishResponseDto>(`/dishes/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
}