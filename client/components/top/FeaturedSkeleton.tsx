import { Skeleton } from "@/client/components/ui/skeleton";
import type { SpotifyTopItemType } from "@/types/spotify";

export function FeaturedSkeleton({ type }: { type: SpotifyTopItemType }) {
  if (type === "tracks") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-5 aspect-square">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="lg:col-span-7 space-y-6">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="flex gap-8 pt-4 pb-2">
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          {/* Play button */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex-shrink-0" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] lg:h-[500px] overflow-hidden">
      <Skeleton className="w-full h-full" />
      <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-px w-12" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-10 w-64 lg:w-96" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
        {/* Top track strip */}
        <div className="flex items-center gap-3 mt-2">
          <Skeleton className="w-9 h-9 rounded flex-shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-2 w-14" />
            <Skeleton className="h-3 w-36" />
          </div>
          <Skeleton className="w-7 h-7 rounded-full flex-shrink-0 ml-1" />
        </div>
      </div>
    </div>
  );
}
