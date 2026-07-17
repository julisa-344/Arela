"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/shared/constants/site";

const CLAIM_TYPES = [
  { value: "reclamo", label: "Reclamo (disconformidad con el producto o servicio)" },
  { value: "queja", label: "Queja (disconformidad con la atencion)" },
];

export function ComplaintForm() {
  const [claimType, setClaimType] = useState<"reclamo" | "queja">("reclamo");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const lines = [
      `Tipo: ${CLAIM_TYPES.find((t) => t.value === claimType)?.label}`,
      "",
      "Datos del consumidor:",
      `Nombre: ${formData.get("nombre")}`,
      `Documento de identidad: ${formData.get("documento")}`,
      `Telefono: ${formData.get("telefono")}`,
      `Correo: ${formData.get("correo")}`,
      `Direccion: ${formData.get("direccion")}`,
      "",
      "Detalle del bien o servicio contratado:",
      `${formData.get("producto")}`,
      "",
      "Detalle del reclamo o queja:",
      `${formData.get("detalle")}`,
      "",
      "Pedido del consumidor:",
      `${formData.get("pedido")}`,
    ];

    const subject = encodeURIComponent(`Libro de reclamaciones - ${SITE.name}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-widest text-arela-ink/45">Tipo de solicitud</span>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          {CLAIM_TYPES.map((type) => (
            <label key={type.value} className="flex items-center gap-2 text-sm text-arela-ink/80">
              <input
                type="radio"
                name="tipo"
                value={type.value}
                checked={claimType === type.value}
                onChange={() => setClaimType(type.value as "reclamo" | "queja")}
                className="accent-arela-rust"
              />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input name="nombre" label="Nombre completo" required />
        <Input name="documento" label="DNI / documento de identidad" required />
        <Input name="telefono" label="Telefono" type="tel" required />
        <Input name="correo" label="Correo electronico" type="email" required />
      </div>

      <Input name="direccion" label="Direccion" required />
      <Input name="producto" label="Producto o pedido relacionado" required />

      <label className="flex flex-col gap-1.5">
        <span className="text-xs text-arela-ink/45">Detalle del reclamo o queja</span>
        <textarea
          name="detalle"
          required
          rows={4}
          className="border-b border-arela-ink/15 bg-transparent px-0 py-2 text-sm text-arela-ink placeholder:text-arela-ink/30 outline-none transition-colors focus:border-arela-rust"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs text-arela-ink/45">Pedido del consumidor</span>
        <textarea
          name="pedido"
          required
          rows={3}
          className="border-b border-arela-ink/15 bg-transparent px-0 py-2 text-sm text-arela-ink placeholder:text-arela-ink/30 outline-none transition-colors focus:border-arela-rust"
        />
      </label>

      <Button type="submit" className="w-fit">
        Enviar reclamo
      </Button>

      {sent && (
        <p className="text-sm text-arela-ink/60">
          Se abrio tu cliente de correo con el reclamo pre-cargado. Si no se abrio automaticamente,
          escribenos directamente a {SITE.email}.
        </p>
      )}
    </form>
  );
}
