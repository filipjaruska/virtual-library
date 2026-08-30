"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookComment } from "@/lib/types/books";

export type ReadingStatus = "want" | "reading" | "read";

export const READING_STATUSES: { value: ReadingStatus; label: string }[] = [
  { value: "want", label: "Want to read" },
  { value: "reading", label: "Reading" },
  { value: "read", label: "Read" },
];

export const STORAGE_KEY = "virtual-library";

interface LibraryState {
  favourites: string[];
  status: Record<string, ReadingStatus>;
  comments: Record<string, BookComment[]>;
  toggleFavourite: (slug: string) => void;
  setStatus: (slug: string, status: ReadingStatus | null) => void;
  addComment: (slug: string, author: string, content: string) => void;
  removeComment: (slug: string, id: string) => void;
  reset: () => void;
}

const empty = {
  favourites: [] as string[],
  status: {} as Record<string, ReadingStatus>,
  comments: {} as Record<string, BookComment[]>,
};

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      ...empty,

      toggleFavourite: (slug) =>
        set((state) => ({
          favourites: state.favourites.includes(slug)
            ? state.favourites.filter((entry) => entry !== slug)
            : [...state.favourites, slug],
        })),

      setStatus: (slug, status) =>
        set((state) => {
          const next = { ...state.status };
          if (status === null) delete next[slug];
          else next[slug] = status;
          return { status: next };
        }),

      addComment: (slug, author, content) =>
        set((state) => {
          const comment: BookComment = {
            id: `local-${Date.now()}`,
            author: author.trim() || "You",
            content: content.trim(),
            createdAt: new Date().toISOString().slice(0, 10),
          };
          return {
            comments: {
              ...state.comments,
              [slug]: [...(state.comments[slug] ?? []), comment],
            },
          };
        }),

      removeComment: (slug, id) =>
        set((state) => ({
          comments: {
            ...state.comments,
            [slug]: (state.comments[slug] ?? []).filter(
              (comment) => comment.id !== id
            ),
          },
        })),

      reset: () => set({ ...empty }),
    }),
    {
      name: STORAGE_KEY,
      // Rehydration is triggered by useHydrated() after mount. Doing it here
      // would let the store diverge from the server-rendered HTML mid-render.
      skipHydration: true,
    }
  )
);
