import api from "@/services/api";

// Tipos de respuesta
export interface ReviewResponseDto {
  id: number;
  content: string;
  restaurantId: number;
  userId: number;
  userName: string;
  createdAt: string;
  // ...otros campos si existen
}

export interface RestaurantSearchResult {
  id: number;
  name: string;
  category: string;
  reviews: ReviewResponseDto[];
}

export async function searchRestaurantsByName(name: string): Promise<RestaurantSearchResult[]> {
  const { data } = await api.get<RestaurantSearchResult[]>(`/restaurants/find-by-name`, { params: { name } });
  return data;
}

export async function searchRestaurantsByCategory(category: string): Promise<RestaurantSearchResult[]> {
  const { data } = await api.get<RestaurantSearchResult[]>(`/restaurants/find-by-category`, { params: { category } });
  return data;
}

export async function searchRestaurantsByNameAndCategory(name: string, category: string): Promise<RestaurantSearchResult[]> {
  const { data } = await api.get<RestaurantSearchResult[]>(`/restaurants/find-by-name-and-category`, { params: { name, category } });
  return data;
}
