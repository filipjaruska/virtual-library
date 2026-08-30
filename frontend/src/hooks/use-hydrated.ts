"use client";

import { useEffect, useState } from "react";
import { useLibraryStore } from "@/stores/library-store";

let rehydrated = false;

/**
 * The library store persists to localStorage, which the server cannot see. Any
 * component that reads it must render a neutral state until this returns true,
 * otherwise the first client render disagrees with the server HTML and React
 * throws a hydration error.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(rehydrated);

  useEffect(() => {
    if (rehydrated) {
      setHydrated(true);
      return;
    }

    void useLibraryStore.persist.rehydrate();
    rehydrated = true;
    setHydrated(true);
  }, []);

  return hydrated;
}
