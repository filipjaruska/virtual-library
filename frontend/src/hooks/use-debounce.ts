"use client";

import { useEffect, useState } from "react";

/**
 * Debounces a changing value. Clearing a string is applied immediately — a user
 * emptying the search box expects the full list back at once, not after a wait.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    if (value === "") {
      setDebounced(value);
      return;
    }

    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
