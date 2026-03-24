import { Skeleton } from "@/client/components/ui/skeleton";

export function NowPlayingSkeleton() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
      <div className="lg:col-span-5">
        <Skeleton className="aspect-square w-full" />
      </div>
      <div className="lg:col-span-7 space-y-6 pb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-16 w-3/4" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-1 w-full" />
      </div>
    </section>
  );
}
