"use client";
import React, { useEffect, useState } from "react";
import BookGrid from "@/components/section/bookgrid-section";
import { BooksNavigationMenu } from "@/components/ui/books-navigation-menu";
import { FaSearch } from "react-icons/fa";
import { getBooksPageData } from "@/lib/loaders";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const [books, setBooks] = useState([]);
    const router = useRouter();
    //TODO REFACTOR
    useEffect(() => {
        async function fetchBooks() {
            try {
                const data = await getBooksPageData();
                setBooks(data?.data || []);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        }
        fetchBooks();
    }, []);

    const handleSearchChange = (e: any) => {
        const newQuery = e.target.value;
        const newUrl = newQuery
            ? `?search=${newQuery}`
            : window.location.pathname;

        router.push(newUrl, {scroll: false});
    };

    return (
        <>
            <header className="flex items-center justify-between bg-secondary px-2 py-2 border-b border-primary">
                <BooksNavigationMenu />
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 rounded-full border border-primary bg-border min-w-fit lg:min-w-96 ml-2"
                        onChange={handleSearchChange}
                    />
                    <FaSearch
                        className="absolute right-3 top-2/4 transform -translate-y-2/4 text-primary-foreground"
                    />
                </div>
            </header>
            <BookGrid books={books} />
        </>
    );
}
