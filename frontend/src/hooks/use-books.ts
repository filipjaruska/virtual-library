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
    // Simple array-based key for better cache management
    queryKey: ["books", searchQuery, tag, page, sort],
    queryFn: () => getBooksPageData(searchQuery, tag, page, pageSize, sort),
    initialData,
    // Let React Query handle the caching automatically
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
