import type { DishSummaryDto } from "../Dish/DishSummaryDto";

export interface MenuResponseDto {
    id: number;
    restaurantId: number;
    restaurantName: string;
    dishes: DishSummaryDto[];
}