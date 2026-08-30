import type { Metadata } from "next";
import BooksClientUI from "@/components/custom-ui/books-client-ui";
import { getBooks, getTags } from "@/lib/content";
import { DEFAULT_SORT, isBookSort } from "@/lib/types/books";

export const metadata: Metadata = {
  title: "Books",
  description: "Browse, search and filter the collection.",
};

const PAGE_SIZE = 24;

function first(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const search = first(params.search);
  const tag = first(params.tag);
  const sortParam = first(params.sort);
  const sort = isBookSort(sortParam) ? sortParam : DEFAULT_SORT;
  const page = Math.max(1, Number.parseInt(first(params.page), 10) || 1);

  const [books, tags] = await Promise.all([
    getBooks({ search, tag, page, pageSize: PAGE_SIZE, sort }),
    getTags(),
  ]);

  return (
    <BooksClientUI
      books={books.items}
      tags={tags}
      total={books.total}
      page={books.page}
      pageCount={books.pageCount}
      search={search}
      tag={tag}
      sort={sort}
    />
  );
}
