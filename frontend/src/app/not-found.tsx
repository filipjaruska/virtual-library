import Link from 'next/link'
import { MdSearchOff } from "react-icons/md";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground dark:bg-background dark:text-foreground">
            <div className="space-y-4">
                <MdSearchOff className="h-24 w-24 text-pink-500" />
                <h1 className="text-4xl font-bold text-foreground">
                    404
                </h1>
                <p className="text-lg text-muted-foreground">
                    This page was not found.
                </p>
                <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 dark:focus-visible:ring-ring"
                >
                    Go back home
                </Link>
            </div>
        </div>
    )
}
