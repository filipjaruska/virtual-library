import { Suspense } from "react";
import { getBookComments } from "@/lib/loaders";
import { CommentsList } from "./comments-list";
import { Skeleton } from "@/components/ui/skeleton";

const CommentsLoading = () => (
    <div className="space-y-4">
        {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card p-4 rounded-lg shadow-sm">
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-4 w-full" />
            </div>
        ))}
    </div>
);

const CommentsLoader = async ({ bookId }: { bookId: number }) => {
    const comments = await getBookComments(bookId);
    return <CommentsList comments={comments} />;
};

export function BookComments({ bookId }: { bookId: number }) {
    return (
        <Suspense fallback={<CommentsLoading />}>
            <CommentsLoader bookId={bookId} />
        </Suspense>
    );
}