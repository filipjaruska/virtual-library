import { env } from "@/env";

/**
 * Strapi is the primary source whenever `NEXT_PUBLIC_STRAPI_URL` is set; the
 * bundled collection is the fallback. The deployed site sets no URL at all, so
 * it resolves locally without ever opening a socket.
 *
 * When a URL *is* configured but the CMS is down, a naive try/catch would pay a
 * failed round-trip on every loader on every render. Instead the first failure
 * trips a breaker for a short window and subsequent calls go straight to the
 * bundled data — one timeout per window, not one per query.
 */
const BREAKER_WINDOW_MS = 60_000;

let trippedAt: number | null = null;
let warned = false;

export function strapiUrl(): string | undefined {
  const url = env.NEXT_PUBLIC_STRAPI_URL;
  if (!url) return undefined;
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function breakerOpen(): boolean {
  if (trippedAt === null) return false;
  if (Date.now() - trippedAt < BREAKER_WINDOW_MS) return true;
  // Window elapsed: let the next call probe Strapi again.
  trippedAt = null;
  return false;
}

function trip(error: unknown) {
  trippedAt = Date.now();
  if (!warned) {
    warned = true;
    console.warn(
      `[content] Strapi at ${strapiUrl()} is unreachable, serving the bundled collection instead.`,
      error instanceof Error ? error.message : error
    );
  }
}

/**
 * Resolve a value from Strapi, falling back to the bundled data if Strapi is
 * unconfigured, tripped, or fails on this particular resource.
 */
export async function fromStrapi<T>(
  viaStrapi: () => Promise<T>,
  viaLocal: () => T
): Promise<T> {
  if (!strapiUrl() || breakerOpen()) return viaLocal();

  try {
    return await viaStrapi();
  } catch (error) {
    trip(error);
    return viaLocal();
  }
}
