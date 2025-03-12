import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatPriceToTurkishLira(price: number) {
  return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
}