"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/shared/constants/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const lines = [
      `Nombre: ${formData.get("nombre")}`,
      `Correo: ${formData.get("correo")}`,
      `Telefono: ${formData.get("telefono")}`,
      "",
      "Mensaje:",
      `${formData.get("mensaje")}`,
    ];

    const subject = encodeURIComponent(`Consulta desde la web - ${SITE.name}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input name="nombre" label="Nombre completo" required />
        <Input name="correo" label="Correo electronico" type="email" required />
      </div>

      <Input name="telefono" label="Telefono (opcional)" type="tel" />

      <label className="flex flex-col gap-1.5">
        <span className="text-xs text-arela-ink/45">Mensaje</span>
        <textarea
          name="mensaje"
          required
          rows={5}
          className="border-b border-arela-ink/15 bg-transparent px-0 py-2 text-sm text-arela-ink placeholder:text-arela-ink/30 outline-none transition-colors focus:border-arela-rust"
        />
      </label>

      <Button type="submit" className="w-fit">
        Enviar mensaje
      </Button>

      {sent && (
        <p className="text-sm text-arela-ink/60">
          Se abrio tu cliente de correo con el mensaje pre-cargado. Si no se abrio
          automaticamente, escribenos directamente a {SITE.email}.
        </p>
      )}
    </form>
  );
}
