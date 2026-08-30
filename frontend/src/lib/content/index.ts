import type { Book, BookComment, BookQuery, Paginated } from "@/lib/types/books";
import type { GlobalData, HomePage } from "@/lib/types/site";
import type { LibraryStats } from "@/lib/types/stats";
import * as local from "./local";
import * as strapi from "./strapi";
import { fromStrapi } from "./source";

export function getBooks(query: BookQuery = {}): Promise<Paginated<Book>> {
  return fromStrapi(
    () => strapi.getBooks(query),
    () => local.getBooks(query)
  );
}

export function getBook(slug: string): Promise<Book | null> {
  return fromStrapi(
    () => strapi.getBook(slug),
    () => local.getBook(slug)
  );
}

export function getBookSlugs(): Promise<string[]> {
  return fromStrapi(strapi.getBookSlugs, local.getBookSlugs);
}

export function getTags(): Promise<string[]> {
  return fromStrapi(strapi.getTags, local.getTags);
}

export function getBookComments(slug: string): Promise<BookComment[]> {
  return fromStrapi(
    () => strapi.getBookComments(slug),
    () => local.getBookComments(slug)
  );
}

export function getLibraryStats(): Promise<LibraryStats> {
  return fromStrapi(strapi.getLibraryStats, local.getLibraryStats);
}

export function getHomePage(): Promise<HomePage> {
  return fromStrapi(strapi.getHomePage, local.getHomePage);
}

export function getGlobal(): Promise<GlobalData> {
  return fromStrapi(strapi.getGlobal, local.getGlobal);
}
