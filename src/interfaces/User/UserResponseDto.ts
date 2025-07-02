import type { Role } from "@/interfaces/User/Role";
import type { ReviewResponseDto } from "@/interfaces/Review/ReviewResponseDto";
import type { RestaurantSummaryDto } from "@/interfaces/Restaurant/RestaurantSummaryDto";

export interface UserResponseDto {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    profileImageUrl?: string;
    role: Role;
    createdAt: Date;
    reviews: ReviewResponseDto[];
    favouriteRestaurants: RestaurantSummaryDto[];
}