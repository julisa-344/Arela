import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/constants";
import { categoriesService, brandsService } from "@/lib/firebase/services/catalog.service";
import type { Product as FirestoreProduct } from "@/shared/types/firebase";
import type { Product, ProductVariantOption } from "@/shared/types/product";

const PLACEHOLDER_IMAGE = "/products/placeholder-2.svg";

function toDisplayProduct(fp: FirestoreProduct): Product {
  const variants: ProductVariantOption[] = fp.hasVariants
    ? fp.variants.map((v) => ({
        id: v.id,
        name: v.name,
        price: v.price,
        compareAtPrice: v.compareAtPrice,
        stock: v.stock,
        image: v.images?.[0],
      }))
    : [];

  const cheapestVariant = variants.length
    ? variants.reduce((min, v) => (v.price < min.price ? v : min), variants[0])
    : null;

  const price = cheapestVariant ? cheapestVariant.price : fp.basePrice ?? 0;
  const compareAtPrice = cheapestVariant ? cheapestVariant.compareAtPrice : fp.compareAtPrice;
  const image = cheapestVariant?.image || fp.thumbnail || fp.images?.[0] || PLACEHOLDER_IMAGE;
  const gallery = fp.images?.length ? fp.images : [image];
  const inStock = fp.hasVariants
    ? variants.some((v) => v.stock > 0)
    : (fp.baseStock ?? 0) > 0;

  return {
    id: fp.id,
    slug: fp.slug,
    name: fp.name,
    brandId: fp.brandId,
    brandName: fp.brandName,
    categoryId: fp.categoryId,
    categoryName: fp.categoryName,
    tags: fp.tags ?? [],
    price,
    compareAtPrice,
    image,
    gallery,
    shortDescription: fp.shortDescription || fp.description.slice(0, 140),
    description: fp.description,
    size: cheapestVariant?.name,
    benefits: fp.benefits ?? [],
    ingredients: fp.ingredients,
    howToUse: fp.howToUse,
    isFeatured: fp.isFeatured,
    isNew: fp.isNew,
    inStock,
    hasVariants: fp.hasVariants,
    variants,
  };
}

export type SortOrder = "relevancia" | "precio-asc" | "precio-desc";

interface GetProductsOptions {
  categoryId?: string;
  brandId?: string;
  sort?: SortOrder;
}

export async function getAllProducts(options: GetProductsOptions = {}): Promise<Product[]> {
  const constraints = [where("isActive", "==", true)];

  if (options.categoryId) constraints.push(where("categoryId", "==", options.categoryId));
  if (options.brandId) constraints.push(where("brandId", "==", options.brandId));

  const q = query(collection(db, COLLECTIONS.PRODUCTS), ...constraints);
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map((doc) =>
    toDisplayProduct({ id: doc.id, ...doc.data() } as FirestoreProduct)
  );

  switch (options.sort) {
    case "precio-asc":
      return products.sort((a, b) => a.price - b.price);
    case "precio-desc":
      return products.sort((a, b) => b.price - a.price);
    default:
      return products.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return getAllProducts({ categoryId });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(
    collection(db, COLLECTIONS.PRODUCTS),
    where("slug", "==", slug),
    where("isActive", "==", true),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return toDisplayProduct({ id: doc.id, ...doc.data() } as FirestoreProduct);
}

export async function getAllCategories() {
  return categoriesService.getAll();
}

export async function getAllBrands() {
  return brandsService.getAll();
}
