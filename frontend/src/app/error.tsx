"use client";

import { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <MdErrorOutline className="h-20 w-20 text-primary" />
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        The page failed to render. Trying again usually clears it.
      </p>
      {error.digest && (
        <p className="font-mono text-xs text-muted-foreground">
          Reference: {error.digest}
        </p>
      )}
      <Button onClick={reset} className="mt-2">
        Try again
      </Button>
    </div>
  );
}
