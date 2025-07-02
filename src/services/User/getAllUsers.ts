import Api from "@/services/api";
import type { PaginatedResponse } from "@/interfaces/Page/PaginatedResponse";
import type { UserResponseDto } from "@/interfaces/User/UserResponseDto";

//ROLE: ADMIN

export async function getAllUsers(
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<UserResponseDto>> {
  const response = await Api.get<PaginatedResponse<UserResponseDto>>(
    "/user/all",
    { params: { page, size } }
  );
  return response.data;
}