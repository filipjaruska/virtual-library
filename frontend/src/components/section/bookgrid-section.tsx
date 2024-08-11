import React from "react";
import BookCard from "@/components/ui/book-card";
import {useSearchParams} from "next/navigation";

interface ImageProps {
    id: number;
    url: string;
    alternativeText: string;
}

interface Book {
    id: number;
    title: string;
    author: string;
    image: ImageProps;
    description: string;
}

interface BookGridProps {
    books: Book[];
}

function BookGrid({ books }: BookGridProps) {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    const filteredBooks = Array.isArray(books)
        ? books.filter((book) =>
            book.title.toLowerCase().includes(searchQuery) ||
            book.author.toLowerCase().includes(searchQuery) ||
            book.description.toLowerCase().includes(searchQuery)
        )
        : [];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
            {filteredBooks.map((book) => (
                <BookCard
                    id={book.id}
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    image={book.image}
                    description={book.description}
                />
            ))}
        </div>
    );
}

export default BookGrid;
