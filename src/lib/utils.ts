import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  currency: "NPR" | "USD" | "EUR" | "BDT" = "NPR",
  notation: "compact" | "engineering" | "scientific" | "standard" = "standard",
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 0
  }).format(Number(price));
}
