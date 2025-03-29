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

    // Local state for form inputs
    const [searchInput, setSearchInput] = useState(initialSearchQuery);
    const debouncedSearchQuery = useDebounce(searchInput, 500);

    // State for the current query parameters
    const [queryParams, setQueryParams] = useState({
        searchQuery: initialSearchQuery,
        tag: initialTag,
        page: initialPage,
        sort: initialSort,
    });

    // For client-side sorting
    const [localSortEnabled, setLocalSortEnabled] = useState(false);

    // Listen for URL parameter changes
    useEffect(() => {
        const urlSearchQuery = searchParams.get('search') || '';
        const urlTag = searchParams.get('tag') || '';
        const urlPage = parseInt(searchParams.get('page') || '1');
        const urlSort = searchParams.get('sort') || 'title:asc';

        // Update state if URL parameters change
        if (urlTag !== queryParams.tag ||
            urlSearchQuery !== queryParams.searchQuery ||
            urlPage !== queryParams.page ||
            urlSort !== queryParams.sort) {

            setQueryParams({
                searchQuery: urlSearchQuery,
                tag: urlTag,
                page: urlPage,
                sort: urlSort,
            });

            setLocalSortEnabled(false);

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
            // Set a flag to indicate searching
            updateQueryParams({
                searchQuery: debouncedSearchQuery,
                page: 1
            });
        }
    }, [debouncedSearchQuery]);

    const { data, isLoading, isError } = useBooks({
        searchQuery: queryParams.searchQuery,
        tag: queryParams.tag,
        page: queryParams.page,
        sort: queryParams.sort,
        initialData: {
            data: initialBooks,
            meta: { pagination: { pageCount: initialTotalPages } }
        }
    });

    const rawBooks = data?.data || [];
    const totalPages = data?.meta?.pagination?.pageCount || 1;

    // Client-side sorting
    const books = useMemo(() => {
        if (!localSortEnabled || !rawBooks.length) return rawBooks;

        const [field, direction] = queryParams.sort.split(':');

        return [...rawBooks].sort((a, b) => {
            if (field === 'title') {
                return direction === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
            return 0;
        });
    }, [rawBooks, queryParams.sort, localSortEnabled]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        updateQueryParams({
            searchQuery: searchInput,
            page: 1
        });
    };

    const handlePageChange = (newPage: number) => {
        updateQueryParams({ page: newPage });
    };

    const handleSortChange = (newSort: string) => {
        setLocalSortEnabled(true);
        setQueryParams(prev => ({
            ...prev,
            sort: newSort,
        }));

        setTimeout(() => {
            updateQueryParams({
                sort: newSort,
                page: 1
            });
        }, 100);
    };

    // Helper to update URL/Query parameters
    const updateQueryParams = (updates: Partial<typeof queryParams>) => {
        const newParams = { ...queryParams, ...updates };
        setQueryParams(newParams);
        setLocalSortEnabled(false);

        // Update URL to match the new parameters
        const url = new URL(window.location.href);
        url.searchParams.set('search', newParams.searchQuery);
        url.searchParams.set('tag', newParams.tag);
        url.searchParams.set('page', newParams.page.toString());
        url.searchParams.set('sort', newParams.sort);

        router.push(url.toString());
    };

    const clearTagFilter = () => {
        if (queryParams.tag) {
            updateQueryParams({ tag: '', page: 1 });
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const searchInput = document.getElementById('search-input') as HTMLInputElement;
            if (event.ctrlKey && event.key === 'f') {
                event.preventDefault();
                if (searchInput) {
                    searchInput.focus();
                }
            } else if (event.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.blur();
            } else if (event.key === 'Enter' && document.activeElement === searchInput) {
                handleSearch();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [searchInput]);

    return (
        <>
            <header className="flex items-center justify-between bg-secondary px-2 py-2 border-b border-primary">
                <BooksNavigationMenu />
                <div className="relative flex items-center">
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search..."
                        value={searchInput}
                        className="px-4 py-2 rounded-lg border border-primary bg-card min-w-fit lg:min-w-96 ml-2"
                        onChange={handleSearchChange}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
                                <SelectItem value="title:asc">Sort by Name (A-Z)</SelectItem>
                                <SelectItem value="title:desc">Sort by Name (Z-A)</SelectItem>
                                <SelectItem value="createdAt:desc">Sort by Newest</SelectItem>
                                <SelectItem value="createdAt:asc">Sort by Oldest</SelectItem>
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
                <BookGrid books={books} />
            )}

            <Pagination
                currentPage={queryParams.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}
