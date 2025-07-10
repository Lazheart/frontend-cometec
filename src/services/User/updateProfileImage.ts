import Api from "@/services/api";
import type { UserResponseDto } from "@/interfaces/User/UserResponseDto";

export async function updateProfileImage(data: FormData): Promise<UserResponseDto> {
  const response = await Api.patch<UserResponseDto>(
    "/user/profile-image",
    data,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
}