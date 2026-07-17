export interface ProductVariantOption {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandId?: string;
  brandName?: string;
  categoryId: string;
  categoryName: string;
  tags: string[];
  price: number;
  compareAtPrice?: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  size?: string;
  benefits: string[];
  ingredients?: string[];
  howToUse?: string;
  isFeatured: boolean;
  isNew: boolean;
  inStock: boolean;
  stock?: number;
  hasVariants: boolean;
  variants: ProductVariantOption[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
