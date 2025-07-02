import type { DishCategory } from './DishCategory';

export interface DishSummaryDto {
    id: number;
    name: string;
    description: string;
    price: number;
    category: DishCategory;
}