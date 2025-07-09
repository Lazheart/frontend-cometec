import Api from "@/services/api";
import type { UpdateMePayload } from "@/interfaces/User/UpdateMePayload";

export async function updateMe(data: UpdateMePayload) {
  const res = await Api.patch("/user/update/me", data);
  return res.data;
}
