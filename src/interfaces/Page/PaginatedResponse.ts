export interface PaginatedResponse<T> {
    content: T[];
    pageable: unknown; // Cambiado de any a unknown para evitar 'any'.
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
}