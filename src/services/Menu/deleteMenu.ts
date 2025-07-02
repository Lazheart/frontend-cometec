import Api from "@/services/api";

export async function deleteMenu(id: number): Promise<void> {
  await Api.delete(`/menus/${id}`);
}