import { Skeleton } from "@/client/components/ui/skeleton";

export function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 lg:gap-y-12 gap-x-8 lg:gap-x-12">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-6">
          <Skeleton className="w-24 h-24 flex-shrink-0" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
