import Link from "next/link";
import Tags from "@/components/custom-ui/tags";
import { BookCover } from "@/components/custom-ui/book-cover";
import type { Book } from "@/lib/types/books";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="group h-full overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <Link href={`/books/${book.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          <BookCover
            slug={book.slug}
            title={book.title}
            author={book.author}
            compact
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <div>
            <h3 className="font-bold leading-snug line-clamp-2">{book.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {book.author}
              {book.year ? ` · ${book.year}` : ""}
            </p>
          </div>

          <p className="line-clamp-3 text-sm text-muted-foreground">
            {book.description}
          </p>

          <div className="mt-auto pt-2">
            <Tags tags={book.tags} />
          </div>
        </div>
      </Link>
    </article>
  );
}
