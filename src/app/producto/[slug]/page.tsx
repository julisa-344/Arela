import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProductDetail } from "@/components/product/ProductDetail";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";

export const revalidate = 300;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <Container>
      <ProductDetail product={product} />
      <RelatedProducts products={related} />
    </Container>
  );
}
