import { PublicMenuResponse } from "@/types/api";

const API_BASE = "https://api.e-dish.com/menu";

export async function fetchPublicMenu(restaurantId: string): Promise<PublicMenuResponse> {
  const res = await fetch(`${API_BASE}/api/v1/public/menu/${restaurantId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch menu: ${res.status}`);
  }
  return res.json();
}
