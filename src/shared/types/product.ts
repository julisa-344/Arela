export type ProductCategory = "skincare" | "maquillaje" | "accesorios" | "sets";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  tags: string[];
  price: number;
  compareAtPrice?: number;
  image: string;
  gallery?: string[];
  shortDescription: string;
  description: string;
  size?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
