import Api from "@/services/api";
import type { UserPublicUpdateDto } from "@/interfaces/User/UserPublicUpdateDto";

export async function updatePublicInfo(data: UserPublicUpdateDto): Promise<void> {
  await Api.patch("/user/update/me", data);
}