import type { Metadata } from "next";
import ShelfClient from "@/components/custom-ui/shelf-client";
import { getBooks } from "@/lib/content";

export const metadata: Metadata = {
  title: "My shelf",
  description: "Favourites and reading status, stored in your browser.",
};

export default async function ShelfPage() {
  // The shelf is a client-side selection over the catalogue, so the whole
  // catalogue is handed down and filtered against the store after hydration.
  const books = await getBooks({ pageSize: 500 });

  return <ShelfClient books={books.items} />;
}
