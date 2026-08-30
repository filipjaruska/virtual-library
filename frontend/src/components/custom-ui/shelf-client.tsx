"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { BookMarked, BookOpen, Heart, Tag, Trash2, Users } from "lucide-react";
import BookCard from "@/components/custom-ui/book-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHydrated } from "@/hooks/use-hydrated";
import { READING_STATUSES, useLibraryStore } from "@/stores/library-store";
import type { Book } from "@/lib/types/books";

function StatTile({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  hint: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium">{label}</h3>
        <span className="text-primary">{icon}</span>
      </div>
      <p
        className={
          typeof value === "number"
            ? "text-3xl font-bold"
            : "truncate text-xl font-bold capitalize"
        }
        title={String(value)}
      >
        {value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}

function EmptyShelf({ message }: { message: string }) {
  return (
    <div className="py-14 text-center text-muted-foreground">
      <BookOpen className="mx-auto mb-4 h-12 w-12 opacity-30" />
      <p>{message}</p>
      <Button asChild variant="outline" className="mt-4">
        <Link href="/books">Browse the collection</Link>
      </Button>
    </div>
  );
}

function Grid({ books }: { books: Book[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book, index) => (
        <motion.div
          key={book.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.25 }}
        >
          <BookCard book={book} />
        </motion.div>
      ))}
    </div>
  );
}

export default function ShelfClient({ books }: { books: Book[] }) {
  const hydrated = useHydrated();
  const favourites = useLibraryStore((state) => state.favourites);
  const status = useLibraryStore((state) => state.status);
  const comments = useLibraryStore((state) => state.comments);
  const reset = useLibraryStore((state) => state.reset);

  const [confirmingReset, setConfirmingReset] = useState(false);

  const bySlug = useMemo(
    () => new Map(books.map((book) => [book.slug, book])),
    [books]
  );

  const favouriteBooks = hydrated
    ? favourites.map((slug) => bySlug.get(slug)).filter((book): book is Book => Boolean(book))
    : [];

  const statusBooks = (want: string) =>
    hydrated
      ? Object.entries(status)
          .filter(([, value]) => value === want)
          .map(([slug]) => bySlug.get(slug))
          .filter((book): book is Book => Boolean(book))
      : [];

  const authors = new Set(favouriteBooks.map((book) => book.author));
  const tagCounts = favouriteBooks
    .flatMap((book) => book.tags)
    .reduce<Record<string, number>>((counts, tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
      return counts;
    }, {});
  const topTag =
    Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  const commentCount = hydrated
    ? Object.values(comments).reduce((total, list) => total + list.length, 0)
    : 0;

  const hasAnything =
    favouriteBooks.length > 0 || Object.keys(status).length > 0 || commentCount > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">My shelf</h1>
        <p className="mt-1 text-muted-foreground">
          Everything here is stored in this browser. No account, no server.
        </p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          icon={<Heart className="h-5 w-5" />}
          label="Favourites"
          value={favouriteBooks.length}
          hint="Books you have starred"
        />
        <StatTile
          icon={<Users className="h-5 w-5" />}
          label="Authors"
          value={authors.size}
          hint="Distinct authors on the shelf"
        />
        <StatTile
          icon={<Tag className="h-5 w-5" />}
          label="Top genre"
          value={topTag}
          hint="Most frequent among favourites"
        />
        <StatTile
          icon={<BookMarked className="h-5 w-5" />}
          label="Comments"
          value={commentCount}
          hint="Notes you have left"
        />
      </div>

      <Tabs defaultValue="favourites">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="favourites">Favourites</TabsTrigger>
          {READING_STATUSES.map(({ value, label }) => (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="favourites" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Favourites</CardTitle>
              <CardDescription>
                {favouriteBooks.length} {favouriteBooks.length === 1 ? "book" : "books"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {favouriteBooks.length === 0 ? (
                <EmptyShelf message="No favourites yet. Tap the heart on any book to add one." />
              ) : (
                <Grid books={favouriteBooks} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {READING_STATUSES.map(({ value, label }) => {
          const shelf = statusBooks(value);
          return (
            <TabsContent key={value} value={value} className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>{label}</CardTitle>
                  <CardDescription>
                    {shelf.length} {shelf.length === 1 ? "book" : "books"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {shelf.length === 0 ? (
                    <EmptyShelf
                      message={`Nothing marked “${label}” yet. Set a status on any book page.`}
                    />
                  ) : (
                    <Grid books={shelf} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      {hasAnything && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-dashed p-4">
          <div>
            <p className="font-medium">Clear everything</p>
            <p className="text-sm text-muted-foreground">
              Removes favourites, reading status and your comments from this browser.
            </p>
          </div>

          {confirmingReset ? (
            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={() => {
                  reset();
                  setConfirmingReset(false);
                }}
              >
                Yes, clear it
              </Button>
              <Button variant="outline" onClick={() => setConfirmingReset(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setConfirmingReset(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Reset my data
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
