import { SITE, SHIPPING } from "@/shared/constants/site";
import type { CartItem } from "@/shared/types/product";
import { formatPrice } from "@/lib/format";

export interface ShippingDetails {
  nombre: string;
  telefono: string;
  direccion: string;
  distrito: string;
  referencia?: string;
}

function buildWhatsappUrl(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
}

export function whatsappGeneralUrl() {
  return buildWhatsappUrl("Hola Arela! Quisiera hacer una consulta.");
}

export function whatsappProductUrl(productName: string) {
  const message = `Hola Arela! Quisiera consultar por: ${productName}`;
  return buildWhatsappUrl(message);
}

export function whatsappCartUrl(items: CartItem[], shipping?: ShippingDetails) {
  if (items.length === 0) {
    return buildWhatsappUrl("Hola Arela! Quisiera hacer un pedido.");
  }

  const lines = items.map(
    (item) =>
      `- ${item.product.name} x${item.quantity} (${formatPrice(item.product.price * item.quantity)})`
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const messageLines = ["Hola Arela! Quisiera hacer este pedido:", ...lines];

  if (shipping) {
    const total = subtotal + SHIPPING.cost;
    messageLines.push(
      `Subtotal: ${formatPrice(subtotal)}`,
      `Envio: ${formatPrice(SHIPPING.cost)}`,
      `Total: ${formatPrice(total)}`,
      "",
      "Datos de envio:",
      `Nombre: ${shipping.nombre}`,
      `Telefono: ${shipping.telefono}`,
      `Direccion: ${shipping.direccion}`,
      `Distrito/ciudad: ${shipping.distrito}`
    );
    if (shipping.referencia) {
      messageLines.push(`Referencia: ${shipping.referencia}`);
    }
  } else {
    messageLines.push(`Total: ${formatPrice(subtotal)}`);
  }

  return buildWhatsappUrl(messageLines.join("\n"));
}
