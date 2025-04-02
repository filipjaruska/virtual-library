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
    const [isSearching, setIsSearching] = useState(false);

    // Local state
    const [searchInput, setSearchInput] = useState(initialSearchQuery);
    const debouncedSearchQuery = useDebounce(searchInput, 150);

    // State for server query
    const [serverQuery, setServerQuery] = useState({
        searchQuery: initialSearchQuery,
        tag: initialTag,
        page: initialPage,
        sort: initialSort,
    });

    // Always cached full book list 
    const [allBooks, setAllBooks] = useState<any[]>(initialBooks);

    // Track if in client-side filtering mode
    const [clientMode, setClientMode] = useState(false);

    // Fetch data using React Query - always use the server query state
    const { data, isLoading, isError } = useBooks({
        searchQuery: serverQuery.searchQuery,
        tag: serverQuery.tag,
        page: serverQuery.page,
        sort: serverQuery.sort,
        initialData: {
            data: initialBooks,
            meta: { pagination: { pageCount: initialTotalPages } },
        },
    });

    // Compute total pages
    const totalPages = data?.meta?.pagination?.pageCount || 1;

    // Listen for URL parameter changes
    useEffect(() => {
        const urlSearchQuery = searchParams.get("search") || "";
        const urlTag = searchParams.get("tag") || "";
        const urlPage = parseInt(searchParams.get("page") || "1");
        const urlSort = searchParams.get("sort") || "title:asc";

        // Update search input when URL changes
        if (urlSearchQuery !== searchInput) {
            setSearchInput(urlSearchQuery);
        }

        // IMPORTANT: Always update server query to match URL parameters
        // This ensures data is fetched when URL changes from any source
        setServerQuery({
            searchQuery: urlSearchQuery,
            tag: urlTag,
            page: urlPage,
            sort: urlSort,
        });

        // Exit client mode when URL changes
        setClientMode(false);
    }, [searchParams]);

    // Effect to handle debounced search query
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        if (debouncedSearchQuery !== serverQuery.searchQuery) {
            // Handle client-side searching for immediate feedback
            setClientMode(true);
            setIsSearching(true);

            // Update URL with delay
            updateQueryParamsDelayed({
                searchQuery: debouncedSearchQuery,
                page: 1, // CRITICAL: Reset to page 1 on search
            }, 500);
        }
    }, [debouncedSearchQuery]);

    // Update all books when fresh data arrives
    useEffect(() => {
        if (data?.data) {
            // Store current data for client-side filtering
            setAllBooks(data.data);
            setIsSearching(false);
        }
    }, [data]);

    // Compute filtered books based on current UI state
    const displayBooks = useMemo(() => {
        if (!clientMode) {
            return data?.data || [];
        }

        // Client-side filtering logic
        let results = [...allBooks];

        if (serverQuery.searchQuery) {
            const search = serverQuery.searchQuery.toLowerCase();
            results = results.filter(book =>
                book.title.toLowerCase().includes(search) ||
                (book.author && book.author.toLowerCase().includes(search))
            );
        }

        if (serverQuery.tag) {
            results = results.filter(book =>
                book.tags && book.tags.some((t: any) => t.name === serverQuery.tag)
            );
        }

        // Client-side sorting
        const [field, direction] = serverQuery.sort.split(':');

        if (field === 'title') {
            results.sort((a, b) => {
                return direction === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            });
        }

        return results;
    }, [allBooks, serverQuery, clientMode]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        setIsSearching(true);
    };

    const handleSearch = () => {
        setClientMode(true);
        setIsSearching(true);

        // Update URL parameters (and trigger server fetch)
        updateQueryParams({
            searchQuery: searchInput,
            page: 1, // CRITICAL: Reset to page 1 on search
        });
    };

    const handleTagSelect = (tag: string) => {
        // Update UI immediately
        setClientMode(tag !== '');

        // Reset to page 1 and update tag filter
        updateQueryParams({
            tag,
            page: 1 // CRITICAL: Reset to page 1 on tag change
        });
    };

    const handleSortChange = (newSort: string) => {
        // Update UI immediately
        setClientMode(true);

        // Reset to page 1 and update sort
        updateQueryParams({
            sort: newSort,
            page: 1 // CRITICAL: Reset to page 1 on sort change
        });
    };

    const handlePageChange = (newPage: number) => {
        // Direct server fetch for pagination (no client mode)
        setClientMode(false);
        updateQueryParams({ page: newPage });
    };

    const updateQueryParamsDelayed = (
        updates: Partial<typeof serverQuery>,
        delayMs: number
    ) => {
        if (urlUpdateTimeoutRef.current) {
            clearTimeout(urlUpdateTimeoutRef.current);
        }

        urlUpdateTimeoutRef.current = setTimeout(() => {
            updateQueryParams(updates);
        }, delayMs);
    };

    // Update URL and trigger data fetching
    const updateQueryParams = (updates: Partial<typeof serverQuery>) => {
        const newParams = { ...serverQuery, ...updates };

        // First update server query state to trigger data fetch
        setServerQuery(newParams);

        // Then update URL to match
        const url = new URL(window.location.href);
        url.searchParams.set("search", newParams.searchQuery);
        url.searchParams.set("tag", newParams.tag);
        url.searchParams.set("page", newParams.page.toString());
        url.searchParams.set("sort", newParams.sort);

        router.push(url.toString(), { scroll: false });
    };

    const clearTagFilter = () => {
        if (serverQuery.tag) {
            setClientMode(false);
            updateQueryParams({
                tag: "",
                page: 1 // Reset to page 1 on clearing tag
            });
        }
    };

    // Cleanup effect
    useEffect(() => {
        return () => {
            if (urlUpdateTimeoutRef.current) {
                clearTimeout(urlUpdateTimeoutRef.current);
            }
        };
    }, []);

    // Keyboard shortcuts
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
                    <Select value={serverQuery.sort} onValueChange={handleSortChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="title:asc">Sort by Name (A-Z)</SelectItem>
                                <SelectItem value="title:desc">Sort by Name (Z-A)</SelectItem>
                                <SelectItem value="createdAt:desc">Sort by Newest</SelectItem>
                                <SelectItem value="createdAt:asc">Sort by Oldest</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </header>

            {serverQuery.tag && (
                <div className="flex items-center px-4 py-2 bg-muted/10 justify-end">
                    <div className="flex items-center">
                        <span className="font-medium mr-1">Tag filter:</span>
                        <div className="flex items-center bg-primary/10 text-primary rounded px-2 py-1">
                            <span>{serverQuery.tag}</span>
                            <button
                                className="ml-2 text-primary hover:text-primary/70"
                                onClick={clearTagFilter}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="relative">
                {/* Loading indicator */}
                {(isLoading || isSearching) && (
                    <div className="absolute top-2 right-2 z-10 bg-card border border-border rounded-full px-3 py-1 text-xs shadow-md">
                        {isSearching ? 'Filtering...' : 'Loading...'}
                    </div>
                )}

                {/* Full loading state for initial load */}
                {isLoading && displayBooks.length === 0 ? (
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
                        <p className="mb-4">Failed to load books. Please try again.</p>
                    </div>
                ) : displayBooks.length === 0 ? (
                    <div className="p-8 text-center">
                        <h3 className="text-lg font-medium mb-2">No books found</h3>
                        <p className="text-muted-foreground mb-4">Try changing your search or filters</p>
                    </div>
                ) : (
                    <BookGrid books={displayBooks} />
                )}
            </div>

            <Pagination
                currentPage={serverQuery.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}
