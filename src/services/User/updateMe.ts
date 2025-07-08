import Api from "@/services/api";

export interface UpdateMePayload {
  name: string;
  lastname: string;
  phone: string;
}

export async function updateMe(data: UpdateMePayload) {
  const res = await Api.put("/user/update/me", data);
  return res.data;
}

