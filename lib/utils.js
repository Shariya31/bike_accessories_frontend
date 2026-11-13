import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// utils.js
export const SIZE_VALUES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
export const sizes = SIZE_VALUES.map((s) => ({ label: s, value: s }))