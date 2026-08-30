export interface BookLink {
  text: string;
  url: string;
}

export interface Book {
  id: number;
  slug: string;
  title: string;
  author: string;
  /** Absent for Strapi-sourced books — the CMS schema has no year field. */
  year?: number;
  description: string;
  tags: string[];
  links: BookLink[];
  /** When the title entered the collection. Drives the "monthly additions" chart. */
  addedAt: string;
}

export interface BookComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export type BookSort =
  | "title:asc"
  | "title:desc"
  | "author:asc"
  | "author:desc"
  | "year:asc"
  | "year:desc"
  | "addedAt:desc";

export const BOOK_SORTS: { value: BookSort; label: string }[] = [
  { value: "title:asc", label: "Title (A–Z)" },
  { value: "title:desc", label: "Title (Z–A)" },
  { value: "author:asc", label: "Author (A–Z)" },
  { value: "author:desc", label: "Author (Z–A)" },
  { value: "year:asc", label: "Oldest first" },
  { value: "year:desc", label: "Newest first" },
  { value: "addedAt:desc", label: "Recently added" },
];

export const DEFAULT_SORT: BookSort = "title:asc";

export function isBookSort(value: string): value is BookSort {
  return BOOK_SORTS.some((sort) => sort.value === value);
}

export interface BookQuery {
  search?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
  sort?: BookSort;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
