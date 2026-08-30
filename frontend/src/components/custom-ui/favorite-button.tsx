"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { useLibraryStore } from "@/stores/library-store";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  slug: string;
  withLabel?: boolean;
}

export function FavoriteButton({ slug, withLabel = false }: FavoriteButtonProps) {
  const hydrated = useHydrated();
  const isFavourite = useLibraryStore((state) => state.favourites.includes(slug));
  const toggleFavourite = useLibraryStore((state) => state.toggleFavourite);

  // Before rehydration the server and client disagree about what is saved, so
  // the button renders in its neutral state.
  const active = hydrated && isFavourite;

  return (
    <Button
      onClick={() => toggleFavourite(slug)}
      variant={active ? "default" : "outline"}
      size={withLabel ? "default" : "icon"}
      aria-pressed={active}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
      className="gap-2"
    >
      <motion.span
        key={active ? "on" : "off"}
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="flex items-center"
      >
        <Heart className={cn("h-5 w-5", active && "fill-current")} />
      </motion.span>
      {withLabel && (active ? "Favourited" : "Add to favourites")}
    </Button>
  );
}
