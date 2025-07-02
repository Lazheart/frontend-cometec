import type { LocationDto} from '../Location/LocationDto' 
import type { RestaurantCategory } from './RestaurantCategory'
export interface RestaurantResponseDto{
    id: number;
    name: string;
    category: RestaurantCategory;
    ownerId: number;
    ownerName: string;
    locationDto: LocationDto;
    totalReviews: number;
    hasMenu: boolean;
    imageUrl?: string;
}