import type { DishCategory } from './DishCategory';

export interface DishRequestDto {
    name: string;
    description: string;
    price: number;
    category: DishCategory;
    menuId: number;
}