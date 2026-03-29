import { PublicMenuResponse } from "@/types/api";
import { MOCK_MENU } from "@/lib/mockData";

const API_BASE = "https://api.e-dish.com/menu";
const USE_MOCK = true; // Cambiar a false para usar la API real

export async function fetchPublicMenu(restaurantId: string): Promise<PublicMenuResponse> {
  if (USE_MOCK) {
    // Simula un pequeño delay de red
    await new Promise((r) => setTimeout(r, 500));
    return { ...MOCK_MENU, restaurantId };
  }

  const res = await fetch(`${API_BASE}/api/v1/public/menu/${restaurantId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch menu: ${res.status}`);
  }
  return res.json();
}
