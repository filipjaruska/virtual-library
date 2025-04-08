import qs from "qs";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { getAuthToken } from "./services/get-token";

const baseUrl = getStrapiURL();

const CACHE_DURATIONS = {
  SHORT: 60 * 5,
  MEDIUM: 60 * 60,
  LONG: 24 * 60 * 60,
  VERY_LONG: 72 * 60 * 60,
};

/**
 * Creates a properly formatted Strapi API URL with query parameters
 * @param endpoint API endpoint path (e.g., "/api/books")
 * @param queryParams Query parameters to stringify
 * @returns Complete URL string
 */
function buildApiUrl(endpoint: string, queryParams: object = {}): string {
  const url = new URL(endpoint, baseUrl);
  url.search = qs.stringify(queryParams);
  return url.toString();
}

/**
 * Core fetch function with option to preserve metadata
 */
async function fetchData(
  url: string,
  cacheDuration = CACHE_DURATIONS.MEDIUM,
  preserveMeta = false
) {
  const authToken = await getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
      next: { revalidate: cacheDuration },
    });
    const data = await response.json();

    // If we need to preserve meta info, return data as is
    if (preserveMeta) {
      return data;
    }

    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getBookData(slug: string) {
  const url = buildApiUrl("/api/books", {
    filters: {
      slug: { $eq: slug },
    },
    populate: {
      image: {
        fields: ["url", "alternativeText", "formats"],
      },
      tags: {
        fields: ["name"],
      },
      comments: {
        populate: {
          user: {
            fields: ["id", "username"],
          },
        },
        fields: ["content", "createdAt"],
      },
      links: {
        fields: ["text", "url"],
      },
    },
  });

  const response = await fetchData(url, CACHE_DURATIONS.SHORT);
  if (!response.data || response.data.length === 0) {
    return null;
  }
  return response.data[0];
}

export async function getBooksPageData(
  searchQuery: string = "",
  tag: string = "",
  page: number = 1,
  pageSize: number = 24,
  sort: string = "title:asc"
) {
  const url = buildApiUrl("/api/books", {
    filters: {
      ...(searchQuery && {
        title: {
          $containsi: searchQuery,
        },
      }),
      ...(tag && {
        tags: {
          name: tag,
        },
      }),
    },
    pagination: {
      page,
      pageSize,
    },
    sort,
    fields: ["title", "author", "description", "slug"],
    populate: {
      image: {
        fields: ["url", "alternativeText", "formats"],
      },
      tags: {
        fields: ["name"],
      },
    },
  });

  return await fetchData(url, CACHE_DURATIONS.SHORT);
}

export async function getHomePageData() {
  const url = buildApiUrl("/api/home-page", {
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText", "formats"],
          },
          link: {
            populate: true,
          },
          feature: {
            populate: true,
          },
          qnas: {
            populate: true,
          },
        },
      },
    },
  });

  return await fetchData(url, CACHE_DURATIONS.LONG);
}

export async function getGlobalPageData() {
  const url = buildApiUrl("/api/global", {
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });

  return await fetchData(url, CACHE_DURATIONS.LONG);
}

export async function getGlobalPageMetadata() {
  const url = buildApiUrl("/api/global", {
    fields: ["title", "description"],
  });

  return await fetchData(url, CACHE_DURATIONS.VERY_LONG);
}

/* Stats for the info page */

export async function getBooksStats() {
  const url = buildApiUrl("/api/books", {
    pagination: { limit: 3 },
    fields: ["id"],
    populate: ["comments", "tags"],
  });

  try {
    const data = await fetchData(url, CACHE_DURATIONS.MEDIUM, true);
    return {
      total: data.meta?.pagination?.total || 0,
    };
  } catch (error) {
    console.error("Failed to fetch books stats:", error);
    return { total: 0 };
  }
}

export async function getCommentsStats() {
  const url = buildApiUrl("/api/comments", {
    pagination: { limit: 3 },
  });

  try {
    const data = await fetchData(url, CACHE_DURATIONS.MEDIUM, true);
    return {
      total: data.meta?.pagination?.total || 0,
    };
  } catch (error) {
    console.error("Failed to fetch comments stats:", error);
    return { total: 0 };
  }
}

export async function getAuthorStats() {
  const url = buildApiUrl("/api/books", {
    fields: ["author"],
    pagination: { pageSize: 100 },
  });

  try {
    const data = await fetchData(url, CACHE_DURATIONS.LONG, true);

    if (!data.data || !Array.isArray(data.data)) {
      return { total: 0 };
    }

    const uniqueAuthors = new Set();
    data.data.forEach((book: any) => {
      if (book.attributes?.author) {
        uniqueAuthors.add(book.attributes.author);
      }
    });

    return {
      total: Math.max(uniqueAuthors.size, 1),
    };
  } catch (error) {
    console.error("Failed to fetch author stats:", error);
    return { total: 0 };
  }
}

export async function getTagsData() {
  const url = buildApiUrl("/api/books", {
    populate: {
      tags: { populate: "*" },
    },
  });

  try {
    const data = await fetchData(url, CACHE_DURATIONS.LONG, true);

    let allTags: any[] = [];
    if (data.data && Array.isArray(data.data)) {
      for (const book of data.data) {
        if (book.attributes?.tags) {
          let bookTags = [];
          if (Array.isArray(book.attributes.tags)) {
            bookTags = book.attributes.tags;
          } else if (
            book.attributes.tags.data &&
            Array.isArray(book.attributes.tags.data)
          ) {
            bookTags = book.attributes.tags.data.map(
              (tag: { attributes: { name: any }; name: any }) => {
                return (
                  tag.attributes?.name ||
                  (typeof tag === "object" && tag.name) ||
                  tag
                );
              }
            );
          }
          allTags = [...allTags, ...bookTags.filter(Boolean)];
        }
      }
    }

    const tagCounts: Record<string, number> = {};
    allTags.forEach((tag) => {
      const tagName = typeof tag === "object" && tag !== null ? tag.name : tag;
      if (tagName && typeof tagName === "string") {
        tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
      }
    });

    const chartData = Object.entries(tagCounts)
      .map(([name, count]) => ({ browser: name, visitors: count }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 5);

    return {
      total: Object.keys(tagCounts).length,
      tagCounts,
      chartData,
    };
  } catch (error) {
    console.error("Failed to fetch tag data:", error);
    return {
      total: 0,
      tagCounts: {},
      chartData: [],
    };
  }
}

export async function generateBooksChartData() {
  const booksUrl = buildApiUrl("/api/books", {
    sort: "createdAt:asc",
    fields: ["createdAt"],
    pagination: { pageSize: 100 },
  });

  const commentsUrl = buildApiUrl("/api/comments", {
    sort: "createdAt:asc",
    fields: ["createdAt"],
    pagination: { pageSize: 100 },
  });

  try {
    const [booksData, commentsData] = await Promise.all([
      fetchData(booksUrl, CACHE_DURATIONS.MEDIUM, true),
      fetchData(commentsUrl, CACHE_DURATIONS.MEDIUM, true),
    ]);

    const booksByMonthYear: { [key: string]: number } = {};
    booksData.data.forEach((book: any) => {
      if (book.attributes?.createdAt) {
        try {
          const date = new Date(book.attributes.createdAt);
          const monthYear = date.toLocaleString("default", {
            month: "short",
            year: "numeric",
          });
          booksByMonthYear[monthYear] = (booksByMonthYear[monthYear] || 0) + 1;
        } catch {}
      }
    });

    const commentsByMonthYear: { [key: string]: number } = {};
    if (commentsData.data?.length) {
      commentsData.data.forEach((comment: any) => {
        if (comment.attributes?.createdAt) {
          try {
            const date = new Date(comment.attributes.createdAt);
            const monthYear = date.toLocaleString("default", {
              month: "short",
              year: "numeric",
            });
            commentsByMonthYear[monthYear] =
              (commentsByMonthYear[monthYear] || 0) + 1;
          } catch {}
        }
      });
    }

    const sortedMonthYears = Object.keys(booksByMonthYear)
      .sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(-6);

    return sortedMonthYears.map((monthYear) => ({
      month: monthYear,
      books: booksByMonthYear[monthYear] || 0,
      comments: commentsByMonthYear[monthYear] || 0,
    }));
  } catch (error) {
    console.error("Failed to generate books chart data:", error);
  }
}
