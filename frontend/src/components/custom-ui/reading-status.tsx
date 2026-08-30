"use client";

import { Button } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import {
  READING_STATUSES,
  useLibraryStore,
  type ReadingStatus,
} from "@/stores/library-store";

export function ReadingStatusPicker({ slug }: { slug: string }) {
  const hydrated = useHydrated();
  const current = useLibraryStore((state) => state.status[slug]);
  const setStatus = useLibraryStore((state) => state.setStatus);

  const active = hydrated ? current : undefined;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Reading status:</span>
      <div className="flex gap-1.5">
        {READING_STATUSES.map(({ value, label }) => (
          <Button
            key={value}
            size="sm"
            variant={active === value ? "default" : "outline"}
            aria-pressed={active === value}
            onClick={() => setStatus(slug, active === value ? null : (value as ReadingStatus))}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
