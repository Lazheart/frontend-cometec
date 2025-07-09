import Api from "@/services/api";

export async function verifyPassword(userId: number, password: string): Promise<boolean> {
  const res = await Api.post("/auth/verify-password", { userId, password });
  return res.data === true;
}

