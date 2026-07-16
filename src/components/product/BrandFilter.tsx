"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface BrandOption {
  id: string;
  name: string;
}

export function BrandFilter({ brands, selected }: { brands: BrandOption[]; selected?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (brands.length === 0) return null;

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete("marca");
    } else {
      params.set("marca", value);
    }
    const qs = params.toString();
    router.push(qs ? `/tienda?${qs}` : "/tienda");
  }

  return (
    <select
      value={selected ?? ""}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-full border border-arela-ink/20 bg-transparent px-4 py-2 text-xs uppercase tracking-widest text-arela-ink outline-none transition-colors hover:border-arela-ink/40"
    >
      <option value="">Todas las marcas</option>
      {brands.map((brand) => (
        <option key={brand.id} value={brand.id}>
          {brand.name}
        </option>
      ))}
    </select>
  );
}
