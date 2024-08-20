import React from 'react';
import {FaSearch} from "react-icons/fa";
import {Skeleton} from "@/components/ui/skeleton";
import BookCardSkeleton from "@/components/custom-ui/skeleton-book-card";

export default function LoadingBooksPage() {
    return (
        <>
            <header className="flex items-center justify-between bg-secondary px-2 py-2 border-b border-primary">
                <Skeleton className="h-auto w-[300px]" />
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 rounded-full border border-primary bg-border min-w-fit lg:min-w-96 ml-2"
                    />
                    <FaSearch
                        className="absolute right-3 top-2/4 transform -translate-y-2/4 text-primary-foreground"
                    />
                </div>
            </header>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
                {Array.from({ length: 12 }).map((_, index) => (
                    <BookCardSkeleton key={index} />
                ))}
            </div>
        </>
    );
}