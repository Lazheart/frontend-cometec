import type { CommentResponseDto } from "../Comment/CommentResponseDto";

export interface ReviewResponseDto {
    id: number;
    content: string;
    rating: number;
    restaurantId: number;
    userId: number;
    userName: string;
    userLastname: string;
    owner: string;
    ownerId: number;
    createdAt: Date;
    likes: number;
    likedByUserIds: number[];
    comments: CommentResponseDto[];
}

