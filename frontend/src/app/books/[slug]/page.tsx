import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLinks } from "@/components/custom-ui/external-links";
import { FavoriteButton } from "@/components/custom-ui/favorite-button";
import { ReadingStatusPicker } from "@/components/custom-ui/reading-status";
import { BookComments } from "@/components/custom-ui/book-comments";
import { BookCover } from "@/components/custom-ui/book-cover";
import { Badge } from "@/components/ui/badge";
import { getBook, getBookComments, getBookSlugs } from "@/lib/content";

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * The whole catalogue is enumerable at build time, so every book page is
 * prerendered and anything outside that set is a genuine 404 — which Next only
 * returns with the right status code when dynamic params are disabled.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getBookSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBook(slug);

  if (!book) return { title: "Book not found" };

  return {
    title: book.title,
    description: book.description,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const [book, comments] = await Promise.all([getBook(slug), getBookComments(slug)]);

  if (!book) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <div className="flex flex-col md:flex-row">
          <div className="flex justify-center p-6 md:w-1/3">
            <div className="aspect-[2/3] w-full max-w-[260px] overflow-hidden rounded-md shadow-lg">
              <BookCover
                slug={book.slug}
                title={book.title}
                author={book.author}
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h1 className="text-3xl font-bold text-primary">{book.title}</h1>
                <p className="mt-1 text-xl text-muted-foreground">
                  {book.author}
                  {book.year ? ` · ${book.year}` : ""}
                </p>
              </div>
              <FavoriteButton slug={book.slug} />
            </div>

            {book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {book.tags.map((tag) => (
                  <Link key={tag} href={`/books?tag=${encodeURIComponent(tag)}`}>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer font-normal capitalize hover:bg-primary hover:text-primary-foreground"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

            <p className="text-lg text-card-foreground">{book.description}</p>

            <ReadingStatusPicker slug={book.slug} />

            {book.links.length > 0 && (
              <div className="mt-auto border-t border-border pt-4">
                <ExternalLinks links={book.links} />
              </div>
            )}
          </div>
        </div>
      </div>

      <BookComments slug={book.slug} seeded={comments} />
    </div>
  );
}
