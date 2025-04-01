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
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 3,
    retryDelay: (attempt) => Math.min(attempt > 1 ? 2000 : 1000, 30 * 1000),
  });
}
