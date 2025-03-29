"use client";

import { BooksNavigationMenu } from "@/components/custom-ui/books-navigation-menu";
import Pagination from "@/components/custom-ui/pagination";
import BookGrid from "@/components/section/bookgrid-section";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useBooks } from "@/hooks/use-books";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardCommandKey } from "react-icons/md";
import { useDebounce } from "@/hooks/use-debounce";

interface BooksClientUIProps {
    initialBooks: any[];
    initialTotalPages: number;
    initialPage: number;
    initialSearchQuery: string;
    initialTag: string;
    initialSort: string;
}

export default function BooksClientUI({
    initialBooks,
    initialTotalPages,
    initialPage,
    initialSearchQuery,
    initialTag,
    initialSort
}: BooksClientUIProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialRender = useRef(true);
    const urlUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Local state for form inputs
    const [searchInput, setSearchInput] = useState(initialSearchQuery);
    const debouncedSearchQuery = useDebounce(searchInput, 200);

    // State for the current query parameters
    const [queryParams, setQueryParams] = useState({
        searchQuery: initialSearchQuery,
        tag: initialTag,
        page: initialPage,
        sort: initialSort,
    });

    const [clientFiltering, setClientFiltering] = useState(false);
    const [clientFilteredBooks, setClientFilteredBooks] = useState<any[]>([]);

    useEffect(() => {
        const urlSearchQuery = searchParams.get("search") || "";
        const urlTag = searchParams.get("tag") || "";
        const urlPage = parseInt(searchParams.get("page") || "1");
        const urlSort = searchParams.get("sort") || "title:asc";

        // Update state if URL parameters change
        if (
            urlTag !== queryParams.tag ||
            urlSearchQuery !== queryParams.searchQuery ||
            urlPage !== queryParams.page ||
            urlSort !== queryParams.sort
        ) {
            setQueryParams({
                searchQuery: urlSearchQuery,
                tag: urlTag,
                page: urlPage,
                sort: urlSort,
            });

            setClientFiltering(false);

            // Update the input field too
            if (urlSearchQuery !== searchInput) {
                setSearchInput(urlSearchQuery);
            }
        }
    }, [searchParams]);

    // Effect to handle debounced search query
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        if (debouncedSearchQuery !== queryParams.searchQuery) {
            // Do client-side filtering for immediate feedback
            const filtered = performClientSearch(debouncedSearchQuery);
            setClientFilteredBooks(filtered);
            setClientFiltering(true);

            // Then update URL with minimal delay
            updateQueryParamsDelayed(
                {
                    searchQuery: debouncedSearchQuery,
                    page: 1,
                },
                150
            );
        }
    }, [debouncedSearchQuery]);

    const { data, isLoading, isError } = useBooks({
        searchQuery: queryParams.searchQuery,
        tag: queryParams.tag,
        page: queryParams.page,
        sort: queryParams.sort,
        initialData: {
            data: initialBooks,
            meta: { pagination: { pageCount: initialTotalPages } },
        },
    });

    const dataBooks = data?.data || [];
    const totalPages = data?.meta?.pagination?.pageCount || 1;

    const performClientSearch = (query: string) => {
        if (!query) return dataBooks;

        return dataBooks.filter((book: any) =>
            book.title.toLowerCase().includes(query.toLowerCase())
        );
    };

    const handleTagSelect = (tag: string) => {
        if (!tag) {
            // Immediately clear filters without waiting
            setClientFiltering(false);
            updateQueryParams({ tag: "", page: 1 });
            return;
        }

        const filtered = dataBooks.filter(
            (book: any) =>
                book.tags && book.tags.some((t: any) => t.name === tag)
        );
        setClientFilteredBooks(filtered);
        setClientFiltering(true);

        updateQueryParamsDelayed({ tag, page: 1 }, 100);
    };

    const handleSortChange = (newSort: string) => {
        // Apply sorting logic immediately
        const [field, direction] = newSort.split(":");
        const sorted = [...(clientFiltering ? clientFilteredBooks : dataBooks)];

        if (field === "title") {
            sorted.sort((a, b) => {
                return direction === "asc"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            });
        }

        setClientFilteredBooks(sorted);
        setClientFiltering(true);

        updateQueryParamsDelayed({ sort: newSort, page: 1 }, 100);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        const filtered = performClientSearch(searchInput);
        setClientFilteredBooks(filtered);
        setClientFiltering(true);

        // Update URL with minimal delay
        updateQueryParamsDelayed(
            {
                searchQuery: searchInput,
                page: 1,
            },
            100
        );
    };

    const handlePageChange = (newPage: number) => {
        // For pagination, we need to get fresh data from server
        setClientFiltering(false);
        updateQueryParams({ page: newPage });
    };

    // Helper to update URL/Query parameters with a delay
    const updateQueryParamsDelayed = (
        updates: Partial<typeof queryParams>,
        delayMs: number
    ) => {
        if (urlUpdateTimeoutRef.current) {
            clearTimeout(urlUpdateTimeoutRef.current);
        }

        urlUpdateTimeoutRef.current = setTimeout(() => {
            updateQueryParams(updates);
        }, delayMs);
    };

    // Helper to update URL/Query parameters immediately
    const updateQueryParams = (updates: Partial<typeof queryParams>) => {
        const newParams = { ...queryParams, ...updates };
        setQueryParams(newParams);

        if (Object.keys(updates).some((key) => key !== "page")) {
            // Reset client filtering when changing filters (except pagination)
            setClientFiltering(false);
        }

        // Update URL
        const url = new URL(window.location.href);
        url.searchParams.set("search", newParams.searchQuery);
        url.searchParams.set("tag", newParams.tag);
        url.searchParams.set("page", newParams.page.toString());
        url.searchParams.set("sort", newParams.sort);

        router.push(url.toString(), { scroll: false });
    };

    const clearTagFilter = () => {
        if (queryParams.tag) {
            setClientFiltering(false);
            updateQueryParams({ tag: "", page: 1 });
        }
    };

    useEffect(() => {
        return () => {
            if (urlUpdateTimeoutRef.current) {
                clearTimeout(urlUpdateTimeoutRef.current);
            }
        };
    }, []);

    const displayBooks = clientFiltering ? clientFilteredBooks : dataBooks;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const searchInput = document.getElementById(
                "search-input"
            ) as HTMLInputElement;
            if (event.ctrlKey && event.key === "f") {
                event.preventDefault();
                if (searchInput) {
                    searchInput.focus();
                }
            } else if (
                event.key === "Escape" &&
                document.activeElement === searchInput
            ) {
                searchInput.blur();
            } else if (
                event.key === "Enter" &&
                document.activeElement === searchInput
            ) {
                handleSearch();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [searchInput]);

    return (
        <>
            <header className="flex items-center justify-between bg-secondary px-2 py-2 border-b border-primary">
                <BooksNavigationMenu onTagSelect={handleTagSelect} />
                <div className="relative flex items-center">
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search..."
                        value={searchInput}
                        className="px-4 py-2 rounded-lg border border-primary bg-card min-w-fit lg:min-w-96 ml-2"
                        onChange={handleSearchChange}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-3 top-2/4 transform -translate-y-2/4 text-card-foreground cursor-pointer"
                        aria-label="Search"
                    >
                        <FaSearch />
                    </button>
                    <span className="absolute right-10 text-gray-500 flex items-center">
                        <MdKeyboardCommandKey />+F
                    </span>
                </div>
                <div className="ml-4">
                    <Select value={queryParams.sort} onValueChange={handleSortChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="title:asc">
                                    Sort by Name (A-Z)
                                </SelectItem>
                                <SelectItem value="title:desc">
                                    Sort by Name (Z-A)
                                </SelectItem>
                                <SelectItem value="createdAt:desc">
                                    Sort by Newest
                                </SelectItem>
                                <SelectItem value="createdAt:asc">
                                    Sort by Oldest
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </header>

            {queryParams.tag && (
                <div className="flex items-center px-4 py-2 bg-muted/50">
                    <span className="font-medium mr-1">Active filter:</span>
                    <div className="flex items-center bg-primary/10 text-primary rounded px-2 py-1">
                        <span>Tag: {queryParams.tag}</span>
                        <button
                            className="ml-2 text-primary hover:text-primary/70"
                            onClick={clearTagFilter}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <div className="relative">
                {isLoading ? (
                    <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="flex flex-col">
                                    <Skeleton className="h-64 w-full rounded-md" />
                                    <Skeleton className="h-6 w-3/4 mt-2" />
                                    <Skeleton className="h-4 w-1/2 mt-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : isError ? (
                    <div className="p-4 text-center text-red-500">
                        Failed to load books. Please try again.
                    </div>
                ) : (
                    <BookGrid books={displayBooks} />
                )}
            </div>

            <Pagination
                currentPage={queryParams.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}
