import qs from "qs";
import type {
  Book,
  BookComment,
  BookQuery,
  Paginated,
} from "@/lib/types/books";
import { DEFAULT_SORT } from "@/lib/types/books";
import type { GlobalData, HomePage } from "@/lib/types/site";
import type { LibraryStats, MonthlyPoint, TagCount } from "@/lib/types/stats";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";

/** How long a Strapi request may hang before the local fallback takes over. */
const REQUEST_TIMEOUT_MS = 2500;

const CACHE = {
  BOOKS: 60 * 5,
  STATS: 60 * 60,
  SITE: 60 * 60 * 24,
};

/** Strapi returns `title:asc` style sort keys, but has no `addedAt` field. */
function toStrapiSort(sort: string): string {
  return sort.startsWith("addedAt:") ? sort.replace("addedAt", "createdAt") : sort;
}

async function request(
  endpoint: string,
  params: object,
  revalidate: number
): Promise<any> {
  const url = new URL(endpoint, getStrapiURL());
  url.search = qs.stringify(params);

  const response = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
    next: { revalidate },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Strapi responded ${response.status} for ${endpoint}`);
  }

  return response.json();
}

const BOOK_FIELDS = ["title", "author", "description", "slug", "createdAt"];
const BOOK_POPULATE = { tags: { fields: ["name"] }, links: { fields: ["text", "url"] } };

function toBook(entry: any): Book {
  const flat = flattenAttributes(entry);
  return {
    id: flat.id,
    slug: flat.slug,
    title: flat.title,
    author: flat.author,
    description: flat.description ?? "",
    tags: (flat.tags ?? []).map((tag: { name: string }) => tag.name).filter(Boolean),
    links: (flat.links ?? []).map(({ text, url }: { text: string; url: string }) => ({
      text,
      url,
    })),
    addedAt: (flat.createdAt ?? "").slice(0, 10),
  };
}

export async function getBooks({
  search = "",
  tag = "",
  page = 1,
  pageSize = 24,
  sort = DEFAULT_SORT,
}: BookQuery = {}): Promise<Paginated<Book>> {
  const response = await request(
    "/api/books",
    {
      filters: {
        ...(search && {
          $or: [
            { title: { $containsi: search } },
            { author: { $containsi: search } },
            { description: { $containsi: search } },
          ],
        }),
        ...(tag && { tags: { name: { $eqi: tag } } }),
      },
      pagination: { page, pageSize },
      sort: toStrapiSort(sort),
      fields: BOOK_FIELDS,
      populate: BOOK_POPULATE,
    },
    CACHE.BOOKS
  );

  const pagination = response.meta?.pagination ?? {};
  return {
    items: (response.data ?? []).map(toBook),
    page: pagination.page ?? page,
    pageSize: pagination.pageSize ?? pageSize,
    pageCount: pagination.pageCount ?? 1,
    total: pagination.total ?? 0,
  };
}

export async function getBook(slug: string): Promise<Book | null> {
  const response = await request(
    "/api/books",
    {
      filters: { slug: { $eq: slug } },
      fields: BOOK_FIELDS,
      populate: BOOK_POPULATE,
    },
    CACHE.BOOKS
  );

  const entry = response.data?.[0];
  return entry ? toBook(entry) : null;
}

export async function getBookSlugs(): Promise<string[]> {
  const response = await request(
    "/api/books",
    { fields: ["slug"], pagination: { pageSize: 200 } },
    CACHE.SITE
  );

  return (response.data ?? []).map((entry: any) => flattenAttributes(entry).slug);
}

export async function getTags(): Promise<string[]> {
  const response = await request(
    "/api/books",
    { fields: ["id"], populate: { tags: { fields: ["name"] } }, pagination: { pageSize: 200 } },
    CACHE.STATS
  );

  const counts = new Map<string, number>();
  for (const entry of response.data ?? []) {
    for (const tag of flattenAttributes(entry).tags ?? []) {
      if (tag?.name) counts.set(tag.name, (counts.get(tag.name) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

export async function getBookComments(slug: string): Promise<BookComment[]> {
  const response = await request(
    "/api/books",
    {
      filters: { slug: { $eq: slug } },
      fields: ["id"],
      populate: {
        comments: {
          fields: ["content", "createdAt"],
          populate: { user: { fields: ["username"] } },
        },
      },
    },
    CACHE.BOOKS
  );

  const entry = response.data?.[0];
  if (!entry) return [];

  return (flattenAttributes(entry).comments ?? []).map((comment: any) => ({
    id: String(comment.id),
    author: comment.user?.username ?? "Anonymous",
    content: comment.content,
    createdAt: (comment.createdAt ?? "").slice(0, 10),
  }));
}

function monthKey(isoDate: string): string {
  return isoDate.slice(0, 7);
}

function monthLabel(key: string): string {
  const [year, month] = key.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleString("en", {
    month: "short",
    year: "numeric",
  });
}

function monthlyActivity(
  bookDates: string[],
  commentDates: string[],
  count: number
): MonthlyPoint[] {
  const tally = (dates: string[]) => {
    const counts = new Map<string, number>();
    for (const date of dates) {
      if (date) counts.set(monthKey(date), (counts.get(monthKey(date)) ?? 0) + 1);
    }
    return counts;
  };

  const books = tally(bookDates);
  const comments = tally(commentDates);
  const months = [...books.keys()].sort().slice(-count);

  return months.map((key) => ({
    month: monthLabel(key),
    books: books.get(key) ?? 0,
    comments: comments.get(key) ?? 0,
  }));
}

export async function getLibraryStats(): Promise<LibraryStats> {
  const [booksResponse, commentsResponse] = await Promise.all([
    request(
      "/api/books",
      {
        fields: ["author", "createdAt"],
        populate: { tags: { fields: ["name"] } },
        pagination: { pageSize: 200 },
      },
      CACHE.STATS
    ),
    request(
      "/api/comments",
      { fields: ["createdAt"], pagination: { pageSize: 200 } },
      CACHE.STATS
    ),
  ]);

  const books = (booksResponse.data ?? []).map(flattenAttributes);
  const comments = (commentsResponse.data ?? []).map(flattenAttributes);

  const tagCounts = new Map<string, number>();
  for (const book of books) {
    for (const tag of book.tags ?? []) {
      if (tag?.name) tagCounts.set(tag.name, (tagCounts.get(tag.name) ?? 0) + 1);
    }
  }

  const tagDistribution: TagCount[] = [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, 8);

  return {
    totalBooks: booksResponse.meta?.pagination?.total ?? books.length,
    totalComments: commentsResponse.meta?.pagination?.total ?? comments.length,
    uniqueAuthors: new Set(books.map((book: any) => book.author).filter(Boolean)).size,
    uniqueTags: tagCounts.size,
    yearRange: { from: 0, to: 0 },
    tagDistribution,
    monthly: monthlyActivity(
      books.map((book: any) => book.createdAt ?? ""),
      comments.map((comment: any) => comment.createdAt ?? ""),
      8
    ),
  };
}

export async function getHomePage(): Promise<HomePage> {
  const response = await request(
    "/api/home-page",
    {
      populate: {
        blocks: {
          populate: {
            link: { populate: true },
            feature: { populate: true },
            qnas: { populate: true },
          },
        },
      },
    },
    CACHE.SITE
  );

  const flat = flattenAttributes(response);
  if (!flat?.blocks?.length) {
    throw new Error("Strapi home-page returned no blocks");
  }
  return { blocks: flat.blocks };
}

export async function getGlobal(): Promise<GlobalData> {
  const response = await request(
    "/api/global",
    {
      populate: [
        "header.logoText",
        "header.ctaButton",
        "footer.logoText",
        "footer.socialLink",
      ],
    },
    CACHE.SITE
  );

  const flat = flattenAttributes(response);
  if (!flat?.header) {
    throw new Error("Strapi global returned no header");
  }
  return flat as GlobalData;
}
