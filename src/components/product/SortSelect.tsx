"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";

const OPTIONS = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
];

export function SortSelect({ selected }: { selected: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "relevancia") {
      params.delete("orden");
    } else {
      params.set("orden", value);
    }
    const qs = params.toString();
    router.push(qs ? `/tienda?${qs}` : "/tienda");
  }

  return (
    <Select value={selected} onChange={handleChange} options={OPTIONS} className="w-56" />
  );
}
