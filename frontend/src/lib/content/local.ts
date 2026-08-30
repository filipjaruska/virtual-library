import type {
  Book,
  BookComment,
  BookQuery,
  BookSort,
  Paginated,
} from "@/lib/types/books";
import { DEFAULT_SORT } from "@/lib/types/books";
import type { LibraryStats, MonthlyPoint, TagCount } from "@/lib/types/stats";
import type { GlobalData, HomePage } from "@/lib/types/site";
import { seedBooks, seedTags } from "./seed/books";
import { seedComments, seedCommentDates } from "./seed/comments";
import { seedGlobal, seedHomePage } from "./seed/site";

const comparators: Record<BookSort, (a: Book, b: Book) => number> = {
  "title:asc": (a, b) => a.title.localeCompare(b.title),
  "title:desc": (a, b) => b.title.localeCompare(a.title),
  "author:asc": (a, b) => a.author.localeCompare(b.author),
  "author:desc": (a, b) => b.author.localeCompare(a.author),
  "year:asc": (a, b) => (a.year ?? Infinity) - (b.year ?? Infinity),
  "year:desc": (a, b) => (b.year ?? -Infinity) - (a.year ?? -Infinity),
  "addedAt:desc": (a, b) => b.addedAt.localeCompare(a.addedAt),
};

function matchesSearch(book: Book, search: string): boolean {
  const needle = search.trim().toLowerCase();
  if (!needle) return true;
  return (
    book.title.toLowerCase().includes(needle) ||
    book.author.toLowerCase().includes(needle) ||
    book.description.toLowerCase().includes(needle)
  );
}

export function getBooks({
  search = "",
  tag = "",
  page = 1,
  pageSize = 24,
  sort = DEFAULT_SORT,
}: BookQuery = {}): Paginated<Book> {
  const matched = seedBooks
    .filter((book) => matchesSearch(book, search))
    .filter((book) => !tag || book.tags.includes(tag))
    .sort(comparators[sort] ?? comparators[DEFAULT_SORT]);

  const pageCount = Math.max(1, Math.ceil(matched.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const start = (currentPage - 1) * pageSize;

  return {
    items: matched.slice(start, start + pageSize),
    page: currentPage,
    pageSize,
    pageCount,
    total: matched.length,
  };
}

export function getBook(slug: string): Book | null {
  return seedBooks.find((book) => book.slug === slug) ?? null;
}

export function getBookSlugs(): string[] {
  return seedBooks.map((book) => book.slug);
}

export function getTags(): string[] {
  return seedTags;
}

export function getBookComments(slug: string): BookComment[] {
  return seedComments[slug] ?? [];
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

/** The last `count` calendar months covered by the collection, oldest first. */
function recentMonths(count: number): string[] {
  const keys = new Set(seedBooks.map((book) => monthKey(book.addedAt)));
  return [...keys].sort().slice(-count);
}

function monthlyActivity(count: number): MonthlyPoint[] {
  const booksByMonth = new Map<string, number>();
  for (const book of seedBooks) {
    const key = monthKey(book.addedAt);
    booksByMonth.set(key, (booksByMonth.get(key) ?? 0) + 1);
  }

  const commentsByMonth = new Map<string, number>();
  for (const date of seedCommentDates) {
    const key = monthKey(date);
    commentsByMonth.set(key, (commentsByMonth.get(key) ?? 0) + 1);
  }

  return recentMonths(count).map((key) => ({
    month: monthLabel(key),
    books: booksByMonth.get(key) ?? 0,
    comments: commentsByMonth.get(key) ?? 0,
  }));
}

function tagDistribution(limit: number): TagCount[] {
  const counts = new Map<string, number>();
  for (const book of seedBooks) {
    for (const tag of book.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, limit);
}

export function getLibraryStats(): LibraryStats {
  const years = seedBooks
    .map((book) => book.year)
    .filter((year): year is number => year !== undefined);

  return {
    totalBooks: seedBooks.length,
    totalComments: seedCommentDates.length,
    uniqueAuthors: new Set(seedBooks.map((book) => book.author)).size,
    uniqueTags: seedTags.length,
    yearRange: { from: Math.min(...years), to: Math.max(...years) },
    tagDistribution: tagDistribution(8),
    monthly: monthlyActivity(8),
  };
}

export function getHomePage(): HomePage {
  return seedHomePage;
}

export function getGlobal(): GlobalData {
  return seedGlobal;
}
