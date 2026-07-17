"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";

interface BrandOption {
  id: string;
  name: string;
}

export function BrandFilter({ brands, selected }: { brands: BrandOption[]; selected?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (brands.length === 0) return null;

  const options = [
    { value: "", label: "Todas las marcas" },
    ...brands.map((brand) => ({ value: brand.id, label: brand.name })),
  ];

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
    <Select value={selected ?? ""} onChange={handleChange} options={options} className="w-56" />
  );
}
