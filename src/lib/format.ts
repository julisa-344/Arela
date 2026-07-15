import { SITE } from "@/shared/constants/site";

export function formatPrice(amount: number) {
  return new Intl.NumberFormat(SITE.currencyLocale, {
    style: "currency",
    currency: SITE.currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
