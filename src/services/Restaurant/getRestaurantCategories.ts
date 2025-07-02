import Api from "@/services/api";

export async function getRestaurantCategories(): Promise<string[]> {
  const response = await Api.get<string[]>("/restaurants/categories");
  return response.data;
}