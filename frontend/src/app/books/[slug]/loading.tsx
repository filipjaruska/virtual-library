import { Skeleton } from "@/components/ui/skeleton";

export default function BookLoadingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <div className="flex flex-col md:flex-row">
          <div className="flex justify-center p-6 md:w-1/3">
            <Skeleton className="aspect-[2/3] w-full max-w-[260px] rounded-md" />
          </div>

          <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
            <div className="flex justify-between gap-4">
              <div className="w-3/4 space-y-2">
                <Skeleton className="h-9 w-4/5" />
                <Skeleton className="h-6 w-2/3" />
              </div>
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>

            <div className="flex gap-1.5">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/6" />
            </div>

            <Skeleton className="h-9 w-72" />

            <div className="mt-auto flex gap-3 border-t border-border pt-4">
              <Skeleton className="h-8 w-40 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-48 w-full rounded-lg" />
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
