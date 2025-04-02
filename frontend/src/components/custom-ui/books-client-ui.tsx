"use client";

import { BooksNavigationMenu } from "@/components/custom-ui/books-navigation-menu";
import Pagination from "@/components/custom-ui/pagination";
import BookGrid from "@/components/section/bookgrid-section";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useBooks } from "@/hooks/use-books";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardCommandKey } from "react-icons/md";

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

    const [searchInput, setSearchInput] = useState(initialSearchQuery);
    const debouncedSearchInput = useDebounce(searchInput, 150);

    const currentSearchQuery = searchParams.get('search') || initialSearchQuery;
    const currentTag = searchParams.get('tag') || initialTag;
    const currentPage = parseInt(searchParams.get('page') || String(initialPage));
    const currentSort = searchParams.get('sort') || initialSort;

    const { data, isLoading, isError } = useBooks({
        searchQuery: currentSearchQuery,
        tag: currentTag,
        page: currentPage,
        sort: currentSort,
        initialData: {
            data: initialBooks,
            meta: { pagination: { pageCount: initialTotalPages } },
        },
    });

    useEffect(() => {
        setSearchInput(currentSearchQuery);
    }, [currentSearchQuery]);

    useEffect(() => {
        if (debouncedSearchInput !== currentSearchQuery) {
            navigate({ search: debouncedSearchInput });
        }
    }, [debouncedSearchInput]);

    const books = data?.data || [];
    const totalPages = data?.meta?.pagination?.pageCount || initialTotalPages;

    const navigate = (params: Record<string, string | number>) => {
        const url = new URL(window.location.href);

        Object.entries(params).forEach(([key, value]) => {
            if (value === '' || value === undefined) {
                url.searchParams.delete(key);
            } else {
                url.searchParams.set(key, String(value));
            }
        });

        // If changing filters, reset to page 1
        if (params.search !== undefined || params.tag !== undefined || params.sort !== undefined) {
            url.searchParams.set('page', '1');
        }

        router.push(url.toString());
    };

    // Event handlers
    const handleSearch = () => {
        navigate({ search: searchInput });
    };

    const handleTagSelect = (tag: string) => {
        navigate({ tag });
    };

    const handleSortChange = (newSort: string) => {
        navigate({ sort: newSort });
    };

    const handlePageChange = (newPage: number) => {
        navigate({ page: newPage });
    };

    const clearTagFilter = () => {
        navigate({ tag: '' });
    };

    // Keyboard shortcuts
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
                <BooksNavigationMenu onTagSelect={handleTagSelect} />
                <div className="relative flex items-center">
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search..."
                        value={searchInput}
                        className="px-4 py-2 rounded-lg border border-primary bg-card min-w-fit lg:min-w-96 ml-2"
                        onChange={(e) => setSearchInput(e.target.value)}
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
                    <Select value={currentSort} onValueChange={handleSortChange}>
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

            {currentTag && (
                <div className="flex items-center px-4 py-2 bg-muted/10 justify-end">
                    <div className="flex items-center">
                        <span className="font-medium mr-1">Tag filter:</span>
                        <div className="flex items-center bg-primary/10 text-primary rounded px-2 py-1">
                            <span>{currentTag}</span>
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
                {isLoading && (
                    <div className="absolute top-2 right-2 z-10 bg-card border border-border rounded-full px-3 py-1 text-xs shadow-md">
                        Loading...
                    </div>
                )}

                {isLoading && books.length === 0 ? (
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
                ) : books.length === 0 ? (
                    <div className="p-8 text-center">
                        <h3 className="text-lg font-medium mb-2">No books found</h3>
                        <p className="text-muted-foreground mb-4">Try changing your search or filters</p>
                    </div>
                ) : (
                    <BookGrid books={books} />
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}
