import React from "react";
import BookCard from "@/components/custom-ui/book-card";
import {Books} from "@/lib/types/books";


function BookGrid({ books }: Books) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 p-4">
            {books.map((book) => (
                <BookCard 
                    id={book.id}
                    key={book.id}
                    title={truncateTitle(book.title)}
                    author={book.author}
                    tags={book.tags}
                    image={book.image}
                    description={truncateDescription(book.description)}
                />
            ))}
        </div>
    );
}

function truncateTitle(title: string) {
    const maxLength = 25
    if (title.length > maxLength) {
        return title.substring(0, maxLength) + '...';
    }
    return title;
}
function truncateDescription(description: string) {
    const maxLength = 155
    if (description.length > maxLength) {
        return description.substring(0, maxLength) + '...';
    }
    return description;
}

export default BookGrid;
