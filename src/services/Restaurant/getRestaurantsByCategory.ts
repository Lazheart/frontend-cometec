import api from "../api";
import type { RestaurantCategory } from "@/interfaces/Restaurant/RestaurantCategory";
import type { RestaurantSummaryDto } from "@/interfaces/Restaurant/RestaurantSummaryDto";
import type { PaginatedResponse } from "@/interfaces/Page/PaginatedResponse";

export const getRestaurantsByCategory = async (
    category: RestaurantCategory,
    page: number = 0,
    size: number = 10
): Promise<PaginatedResponse<RestaurantSummaryDto>> => {
    const response = await api.get<PaginatedResponse<RestaurantSummaryDto>>(
        `/restaurants/category/${category}`,{params: { page, size },}
    );
    return response.data;
};
