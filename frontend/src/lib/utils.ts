import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Strapi v4 wraps every entity as `{ id, attributes: { ... } }` and every
 * relation as `{ data: ... }`. This collapses both wrappers so the rest of the
 * app can treat responses as plain objects.
 */
export function flattenAttributes(data: any): any {
  if (data === null || typeof data !== "object" || data instanceof Date) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(flattenAttributes);
  }

  const flattened: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    const isWrapper =
      (key === "attributes" || key === "data") &&
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value);

    if (isWrapper) {
      Object.assign(flattened, flattenAttributes(value));
    } else {
      flattened[key] = flattenAttributes(value);
    }
  }

  return flattened;
}

export function getStrapiURL(): string | undefined {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!url) return undefined;
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
