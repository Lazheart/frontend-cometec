import Api from "@/services/api";
import type { DishCategory } from "@/interfaces/Dish/DishCategory";

export async function getDishCategories(): Promise<DishCategory[]> {
  const response = await Api.get<DishCategory[]>("/dishes/categories");
  return response.data;
}