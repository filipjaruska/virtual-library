"use client";
import { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";

export default function Error({ error }: { error: Error & { digest?: string } }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background dark:bg-background">
            <div className="space-y-4">
                <MdErrorOutline className="h-24 w-24 text-primary dark:text-primary" />
                <h1 className="text-4xl font-bold text-foreground dark:text-foreground">
                    Oops! Something went wrong.
                </h1>
                <p className="text-lg text-secondary-foreground">
                    This is an error page. Please try again later.
                </p>
                <p className="text-destructive italic">{error.message}</p>
            </div>
        </div>
    );
}
