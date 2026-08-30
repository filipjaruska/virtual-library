"use client";

import { AnimatePresence, motion } from "motion/react";
import { Trash2 } from "lucide-react";
import CommentForm from "@/components/form/comment-form";
import { useHydrated } from "@/hooks/use-hydrated";
import { useLibraryStore } from "@/stores/library-store";
import type { BookComment } from "@/lib/types/books";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" });
}

export function BookComments({
  slug,
  seeded,
}: {
  slug: string;
  seeded: BookComment[];
}) {
  const hydrated = useHydrated();
  const mine = useLibraryStore((state) => state.comments[slug]);
  const removeComment = useLibraryStore((state) => state.removeComment);

  const local = hydrated ? (mine ?? []) : [];
  const comments = [...seeded, ...local];

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-primary">Comments</h2>
        <span className="text-sm text-muted-foreground">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      <CommentForm slug={slug} />

      {comments.length === 0 ? (
        <p className="mt-6 text-center text-muted-foreground">
          No comments on this book yet. Yours would be the first.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          <AnimatePresence initial={false}>
            {comments.map((comment) => {
              const isMine = local.some((entry) => entry.id === comment.id);
              return (
                <motion.li
                  key={comment.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-lg border bg-card p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{comment.author}</span>
                      {isMine && (
                        <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                          you
                        </span>
                      )}
                      <span className="mx-2">·</span>
                      {formatDate(comment.createdAt)}
                    </p>

                    {isMine && (
                      <button
                        onClick={() => removeComment(slug, comment.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        aria-label="Delete your comment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-card-foreground">{comment.content}</p>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}
