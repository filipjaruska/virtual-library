import type { MetadataRoute } from "next";
import { getBookSlugs } from "@/lib/content";

const BASE_URL = "https://virtual-library-rho.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1, changeFrequency: "monthly", lastModified },
    { url: `${BASE_URL}/books`, priority: 0.9, changeFrequency: "weekly", lastModified },
    { url: `${BASE_URL}/stats`, priority: 0.6, changeFrequency: "weekly", lastModified },
  ];

  const slugs = await getBookSlugs();
  const bookRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/books/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified,
  }));

  return [...staticRoutes, ...bookRoutes];
}
