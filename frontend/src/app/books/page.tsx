import { getBooksPageData } from "@/lib/loaders";
import BooksClientUI from "@/components/books/books-client-ui";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import LoadingBooksPage from "./loading";

interface PageProps {
    searchParams: Promise<{
        search?: string | string[];
        tag?: string | string[];
        page?: string | string[];
        sort?: string | string[];
    }>;
}

export default async function Page({
    searchParams,
}: PageProps) {
    const params = await searchParams;

    const searchQuery = typeof params.search === 'string' ? params.search : '';
    const tag = typeof params.tag === 'string' ? params.tag : '';
    const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
    const pageSize = 24;
    const sort = typeof params.sort === 'string' ? params.sort : 'title:asc';

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['books', { searchQuery, tag, page, pageSize, sort }],
        queryFn: async () => await getBooksPageData(searchQuery, tag, page, pageSize, sort),
    });

    const data = await getBooksPageData(searchQuery, tag, page, pageSize, sort);
    const books = data?.data || [];
    const totalPages = data?.meta?.pagination?.pageCount || 1;

    return (
        <Suspense fallback={<LoadingBooksPage />}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <BooksClientUI
                    initialBooks={books}
                    initialTotalPages={totalPages}
                    initialPage={page}
                    initialSearchQuery={searchQuery}
                    initialTag={tag}
                    initialSort={sort}
                />
            </HydrationBoundary>
        </Suspense>
    );
}