export interface CommentRequestDto {
    content: string;
    userId: number;
    reviewId: number;
    createdAt: Date;
}