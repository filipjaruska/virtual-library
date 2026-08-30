import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBooksPage() {
  return (
    <div>
      <header className="flex flex-col gap-3 border-b border-border bg-secondary px-3 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="flex flex-1 items-center gap-3 lg:justify-end">
          <Skeleton className="h-10 flex-1 lg:max-w-md" />
          <Skeleton className="h-10 w-[170px] shrink-0" />
        </div>
      </header>

      <div className="px-4 py-3">
        <Skeleton className="h-5 w-32" />
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-lg border">
            <Skeleton className="aspect-[2/3] w-full rounded-none" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
