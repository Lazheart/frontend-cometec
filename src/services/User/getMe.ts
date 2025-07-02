import Api from "@/services/api";
import type { UserResponseDto } from "@/interfaces/User/UserResponseDto";

export async function getMe(): Promise<UserResponseDto> {
  const response = await Api.get<UserResponseDto>("/user/me");
  return response.data;
}