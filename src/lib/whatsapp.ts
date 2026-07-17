import { SITE } from "@/shared/constants/site";
import type { CartItem } from "@/shared/types/product";
import { formatPrice } from "@/lib/format";

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

export function whatsappCartUrl(items: CartItem[]) {
  if (items.length === 0) {
    return buildWhatsappUrl("Hola Arela! Quisiera hacer un pedido.");
  }

  const lines = items.map(
    (item) =>
      `- ${item.product.name} x${item.quantity} (${formatPrice(item.product.price * item.quantity)})`
  );

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const message = [
    "Hola Arela! Quisiera hacer este pedido:",
    ...lines,
    `Total: ${formatPrice(total)}`,
  ].join("\n");

  return buildWhatsappUrl(message);
}
