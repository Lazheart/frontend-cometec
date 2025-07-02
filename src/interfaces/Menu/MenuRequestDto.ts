import type { DishRequestDto } from "../Dish/DishRequestDto";

export interface MenuRequestDto {
    restaurantId: number;
    dishes: DishRequestDto[];
}