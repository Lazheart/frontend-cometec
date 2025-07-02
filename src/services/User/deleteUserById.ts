import Api from "@/services/api";

// ROLE: ADMIN

export async function deleteUserById(id: number): Promise<void> {
  await Api.delete(`/user/${id}`);
}