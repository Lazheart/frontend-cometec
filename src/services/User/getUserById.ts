import Api from "@/services/api";
import type { UserResponseDto } from "@/interfaces/User/UserResponseDto";

//ROLE: ADMIN

export async function getUserById(id: number): Promise<UserResponseDto> {
  const response = await Api.get<UserResponseDto>(`/user/${id}`);
  return response.data;
}