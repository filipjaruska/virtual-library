import Link from "next/link";
import { MdSearchOff } from "react-icons/md";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <MdSearchOff className="h-20 w-20 text-primary" />
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-muted-foreground">
        That page is not on any of our shelves.
      </p>
      <div className="mt-2 flex gap-3">
        <Button asChild>
          <Link href="/books">Browse the collection</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
