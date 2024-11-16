"use client";
import React, { useEffect, useState } from "react";
import BookGrid from "@/components/section/bookgrid-section";
import { BooksNavigationMenu } from "@/components/custom-ui/books-navigation-menu";
import { FaSearch } from "react-icons/fa";
import { getBooksPageData } from "@/lib/loaders";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/custom-ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdKeyboardCommandKey } from "react-icons/md";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [tag, setTag] = useState(searchParams.get("tag") || "");
    const [page, setPage] = useState(parseInt(searchParams.get("page") || "1", 24));
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState(searchParams.get("sort") || "title:asc");  // Default sort by title

    useEffect(() => {
        setSearchQuery(searchParams.get("search") || "");
        setTag(searchParams.get("tag") || "");
        setPage(parseInt(searchParams.get("page") || "1", 24));
        setSort(searchParams.get("sort") || "title:asc");
    }, [searchParams]);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const data = await getBooksPageData(searchQuery, tag, page, 24, sort);
                setBooks(data?.data || []);
                setTotalPages(data?.meta?.pagination?.pageCount || 1);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        }
        fetchBooks();
    }, [searchQuery, tag, page, sort]);

    const handleSearchChange = (e: any) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('search', newQuery);
        newUrl.searchParams.set('tag', tag);
        newUrl.searchParams.set('page', '1');
        newUrl.searchParams.set('sort', sort);

        router.push(newUrl.toString(), { scroll: false });
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('search', searchQuery);
        newUrl.searchParams.set('tag', tag);
        newUrl.searchParams.set('page', newPage.toString());

        router.push(newUrl.toString(), { scroll: false });
    };

    const handleSortChange = (newSort: string) => {
        setSort(newSort);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('search', searchQuery);
        newUrl.searchParams.set('tag', tag);
        newUrl.searchParams.set('page', '1');
        newUrl.searchParams.set('sort', newSort);

        router.push(newUrl.toString(), { scroll: false });
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
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <header className="flex items-center justify-between bg-secondary px-2 py-2 border-b border-primary">
                <BooksNavigationMenu />
                <div className="relative flex items-center">
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        className="px-4 py-2 rounded-lg border border-primary bg-card min-w-fit lg:min-w-96 ml-2"
                        onChange={handleSearchChange}
                    />
                    <span className="absolute right-10 text-gray-500 flex items-center">
                        <MdKeyboardCommandKey />+F
                    </span>
                    <FaSearch
                        className="absolute right-3 top-2/4 transform -translate-y-2/4 text-card-foreground"
                    />
                </div>
                <div className="ml-4">
                    <Select value={sort} onValueChange={handleSortChange}>
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
            <BookGrid books={books} />
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}