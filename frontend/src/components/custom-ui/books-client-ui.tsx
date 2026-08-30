"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { BooksNavigationMenu } from "@/components/custom-ui/books-navigation-menu";
import Pagination from "@/components/custom-ui/pagination";
import BookGrid from "@/components/section/bookgrid-section";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import { BOOK_SORTS, type Book, type BookSort } from "@/lib/types/books";

interface BooksClientUIProps {
  books: Book[];
  tags: string[];
  total: number;
  page: number;
  pageCount: number;
  search: string;
  tag: string;
  sort: BookSort;
}

export default function BooksClientUI({
  books,
  tags,
  total,
  page,
  pageCount,
  search,
  tag,
  sort,
}: BooksClientUIProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 250);

  /**
   * The URL is the source of truth, but the input has to stay responsive while
   * the debounce settles. This holds the last value we pushed so the two can be
   * told apart: a URL change we caused is ignored, a URL change from the back
   * button or a tag reset is pulled back into the input.
   */
  const pushedSearch = useRef(search);

  const navigate = (params: Record<string, string | number>) => {
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries(params)) {
      if (value === "" || value === undefined) url.searchParams.delete(key);
      else url.searchParams.set(key, String(value));
    }
    startTransition(() => router.push(`${url.pathname}${url.search}`));
  };

  useEffect(() => {
    if (debouncedSearch === pushedSearch.current) return;
    pushedSearch.current = debouncedSearch;
    navigate({ search: debouncedSearch, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    if (search === pushedSearch.current) return;
    pushedSearch.current = search;
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const input = document.getElementById("search-input");
      if (!(input instanceof HTMLInputElement)) return;

      if (event.ctrlKey && event.key === "f") {
        event.preventDefault();
        input.focus();
        input.select();
      } else if (event.key === "Escape" && document.activeElement === input) {
        input.blur();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="flex flex-col gap-3 border-b border-border bg-secondary px-3 py-3 lg:flex-row lg:items-center lg:justify-between">
        <BooksNavigationMenu tags={tags} activeTag={tag} onTagSelect={(next) => navigate({ tag: next, page: 1 })} />

        <div className="flex flex-1 items-center gap-3 lg:justify-end">
          <div className="relative flex-1 lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="search-input"
              type="search"
              placeholder="Search title, author or description…"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              className="w-full rounded-lg border border-input bg-card py-2 pl-9 pr-16 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Search books"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:block">
              Ctrl F
            </kbd>
          </div>

          <Select value={sort} onValueChange={(next) => navigate({ sort: next, page: 1 })}>
            <SelectTrigger className="w-[170px] shrink-0">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {BOOK_SORTS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
        <span aria-live="polite">
          {total} {total === 1 ? "book" : "books"}
          {tag ? " in" : ""}
        </span>

        {tag && (
          <button
            onClick={() => navigate({ tag: "", page: 1 })}
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-primary transition-colors hover:bg-primary/20"
          >
            {tag}
            <X className="h-3 w-3" />
            <span className="sr-only">Clear tag filter</span>
          </button>
        )}

        {search && <span>matching “{search}”</span>}
      </div>

      <div className={isPending ? "opacity-60 transition-opacity" : "transition-opacity"}>
        {books.length === 0 ? (
          <div className="px-4 py-20 text-center">
            <h2 className="text-lg font-medium">No books found</h2>
            <p className="mt-1 text-muted-foreground">
              Try a different search term or clear the tag filter.
            </p>
          </div>
        ) : (
          <BookGrid books={books} />
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={pageCount}
        onPageChange={(next) => navigate({ page: next })}
      />
    </>
  );
}
