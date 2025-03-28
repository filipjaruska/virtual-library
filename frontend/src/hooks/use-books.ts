"use client";

import { useQuery } from "@tanstack/react-query";
import { getBooksPageData } from "@/lib/loaders";

interface UseBooksOptions {
  searchQuery?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  initialData?: any;
}

export function useBooks({
  searchQuery = "",
  tag = "",
  page = 1,
  pageSize = 24,
  sort = "title:asc",
  initialData,
}: UseBooksOptions) {
  return useQuery({
    queryKey: ["books", { searchQuery, tag, page, pageSize, sort }],
    queryFn: async () => {
      return await getBooksPageData(searchQuery, tag, page, pageSize, sort);
    },
    initialData,
  });
}
