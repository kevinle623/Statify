import { Skeleton } from "@/client/components/ui/skeleton";
import type { SpotifyTopItemType } from "@/types/spotify";

export function GridSkeleton({ type }: { type: SpotifyTopItemType }) {
  if (type === "tracks") {
    return (
      <div className="space-y-2">
        {/* Table header */}
        <div className="hidden lg:grid grid-cols-12 px-6 py-4 border-b border-divider">
          <Skeleton className="col-span-1 h-3 w-8" />
          <Skeleton className="col-span-6 h-3 w-20" />
          <Skeleton className="col-span-3 h-3 w-12" />
          <div className="col-span-2 flex justify-end">
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
        {/* Table rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-12 items-center px-4 lg:px-6 py-4"
          >
            <div className="col-span-2 lg:col-span-1">
              <Skeleton className="h-4 w-6" />
            </div>
            <div className="col-span-10 lg:col-span-6 flex items-center gap-4 lg:gap-6">
              <Skeleton className="w-12 h-12 flex-shrink-0" />
              <div className="space-y-2 flex-grow">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="hidden lg:block col-span-3">
              <Skeleton className="h-3 w-28" />
            </div>
            <div className="hidden lg:flex col-span-2 justify-end">
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

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
