import { PageLoader, Skeleton } from "@hogoshi/ui";

export function RouteFallback() {
  return <PageLoader className="min-h-[24rem]" />;
}

export function StoryFallback() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <Skeleton className="h-[28rem] w-full rounded-[var(--radius-lg)]" />
    </div>
  );
}

export function TokensFallback() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>
      <Skeleton className="h-10 w-80 max-w-full rounded-[var(--radius-md)]" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-24" />
        ))}
      </div>
    </div>
  );
}
