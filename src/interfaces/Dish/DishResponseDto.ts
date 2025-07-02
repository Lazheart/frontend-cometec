import type { DishCategory } from './DishCategory';

export interface DishResponseDto {
    id: number;
    name: string;
    description: string;
    price: number;
    category: DishCategory;
    menuId: number;
}