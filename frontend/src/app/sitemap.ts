import { MetadataRoute } from "next";
import { getStrapiURL } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://virtual-library-rho.vercel.app/";

  const routes = ["", "/books", "/signin", "/signup"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  try {
    const booksResponse = await fetch(
      `${getStrapiURL()}/api/books?fields[0]=slug&pagination[pageSize]=100`
    );
    const booksData = await booksResponse.json();

    const bookRoutes = booksData.data.map((book: any) => ({
      url: `${baseUrl}/books/${book.attributes.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...routes, ...bookRoutes];
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
    return routes;
  }
}
