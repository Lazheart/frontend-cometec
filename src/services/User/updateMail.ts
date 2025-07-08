import Api from "@/services/api";

export interface UpdateMailPayload {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
}

export async function updateMail(data: UpdateMailPayload) {
  const res = await Api.put("/user/security/me", data);
  return res.data;
}

