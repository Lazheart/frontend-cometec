import Api from "@/services/api";
import type { UserResponseDto } from "@/interfaces/User/UserResponseDto";

export async function updateProfileImage(id: number, data: FormData): Promise<UserResponseDto> {
  const response = await Api.put<UserResponseDto>(`/user/${id}/profile-image`, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
}