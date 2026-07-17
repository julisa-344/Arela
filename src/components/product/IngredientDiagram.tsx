import Image from "next/image";
import type { ProductIngredient } from "@/shared/types/product";

function IngredientRow({
  ingredient,
  align,
}: {
  ingredient: ProductIngredient;
  align: "left" | "right";
}) {
  const text = (
    <div className={align === "left" ? "text-right" : "text-left"}>
      <p className="text-xs font-medium uppercase tracking-widest text-arela-ink">
        {ingredient.name}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-arela-ink/55">{ingredient.description}</p>
    </div>
  );
  const line = <span className="hidden h-px flex-1 bg-arela-ink/20 md:block" />;
  const dot = <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-arela-rust md:block" />;

  return (
    <div className="flex max-w-[220px] items-center gap-3">
      {align === "left" ? (
        <>
          {text}
          {line}
          {dot}
        </>
      ) : (
        <>
          {dot}
          {line}
          {text}
        </>
      )}
    </div>
  );
}

export function IngredientDiagram({
  image,
  alt,
  ingredients,
}: {
  image: string;
  alt: string;
  ingredients: ProductIngredient[];
}) {
  if (ingredients.length === 0) return null;

  const left = ingredients.filter((_, i) => i % 2 === 0);
  const right = ingredients.filter((_, i) => i % 2 === 1);

  return (
    <div className="grid gap-8 py-4 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
      <div className="flex flex-col justify-around gap-8 md:gap-16">
        {left.map((ingredient) => (
          <IngredientRow key={ingredient.name} ingredient={ingredient} align="left" />
        ))}
      </div>

      <div className="relative mx-auto aspect-square w-56 shrink-0 overflow-hidden rounded-full bg-arela-honey/20 md:w-64">
        <Image src={image} alt={alt} fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-around gap-8 md:gap-16">
        {right.map((ingredient) => (
          <IngredientRow key={ingredient.name} ingredient={ingredient} align="right" />
        ))}
      </div>
    </div>
  );
}
