import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { IngredientDiagram } from "@/components/product/IngredientDiagram";
import { Button } from "@/components/ui/Button";
import { getAllProducts } from "@/lib/products";

export async function AnatomySection() {
  const products = await getAllProducts();
  const withIngredients = products.filter((p) => p.compositionIngredients?.length);

  const featured =
    withIngredients.find((p) => p.isFeatured) ?? withIngredients[0];

  if (!featured || !featured.compositionIngredients) return null;

  const otherIngredients = withIngredients
    .filter((p) => p.slug !== featured.slug)
    .slice(0, 4)
    .map((p) => ({
      product: p,
      ingredient: p.compositionIngredients![0],
    }));

  return (
    <section className="bg-arela-white py-24">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-arela-rust">
            La anatomia de la eficacia
          </span>
          <h2 className="mt-4 font-display text-3xl text-arela-ink md:text-4xl">
            {featured.name}
          </h2>
          <p className="mt-3 text-sm text-arela-ink/60">
            Cada formula esta pensada al detalle. Descubre los ingredientes clave detras de uno
            de nuestros productos mas queridos.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <IngredientDiagram
            image={featured.image}
            alt={featured.name}
            ingredients={featured.compositionIngredients}
          />
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 flex justify-center">
          <Button href={`/producto/${featured.slug}`} variant="outline">
            ver producto
          </Button>
        </FadeIn>

        {otherIngredients.length > 0 && (
          <div className="mt-24 border-t border-arela-ink/10 pt-14">
            <FadeIn className="mb-10 text-center">
              <h3 className="font-display text-2xl text-arela-ink md:text-3xl">
                Explora por ingrediente activo
              </h3>
              <p className="mt-2 text-sm text-arela-ink/60">
                Encuentra la formula indicada segun lo que tu piel necesita hoy.
              </p>
            </FadeIn>

            <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {otherIngredients.map(({ product, ingredient }) => (
                <StaggerItem key={product.slug}>
                  <Link
                    href={`/producto/${product.slug}`}
                    className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-arela-ink/10 bg-arela-cream/40 p-6 text-center transition-colors hover:border-arela-rust/30 hover:bg-arela-cream"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-arela-honey/20">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-arela-ink">
                        {ingredient.name}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-arela-ink/55">
                        {ingredient.description}
                      </p>
                    </div>
                    <span className="mt-auto text-[11px] uppercase tracking-widest text-arela-rust opacity-0 transition-opacity group-hover:opacity-100">
                      ver formula &rarr;
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        )}
      </Container>
    </section>
  );
}
