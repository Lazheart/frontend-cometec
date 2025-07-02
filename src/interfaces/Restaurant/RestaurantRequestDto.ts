import type { LocationCreateDTO } from "../Location/LocationCreateDto";
import type { RestaurantCategory } from "./RestaurantCategory";
export interface RestaurantRequestDto{
    name: string;
    category: RestaurantCategory;
    locationCreateDto: LocationCreateDTO;
    image?: File;
}