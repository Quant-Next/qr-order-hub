export interface AllergenResponse {
  id: string;
  code: string;
  name: string;
  description: string;
  iconUrl: string;
  active: boolean;
}

export interface ProductResponse {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  vatRate: number;
  sku: string;
  imageUrl: string;
  allergens: AllergenResponse[];
  tags: string[];
  calories: number | null;
  preparationTime: number | null;
  available: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface CategoryWithProductsResponse {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  products: ProductResponse[];
}

export interface PublicMenuResponse {
  restaurantId: string;
  restaurantName: string;
  restaurantLogo: string;
  currency: string;
  categories: CategoryWithProductsResponse[];
}

export interface CartItem {
  product: ProductResponse;
  quantity: number;
}
