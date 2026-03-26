import { Skeleton } from "@/client/components/ui/skeleton";
import { FeaturedSkeleton } from "@/client/components/top/FeaturedSkeleton";
import { GridSkeleton } from "@/client/components/top/GridSkeleton";

export default function ArtistsLoading() {
  return (
    <div className="pt-8 lg:pt-16 px-6 lg:px-12 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 lg:mb-16">
        <div>
          <Skeleton className="h-10 lg:h-14 w-64" />
          <Skeleton className="h-3 w-32 mt-4" />
        </div>
        <Skeleton className="h-10 w-72" />
      </div>
      <div className="space-y-16 lg:space-y-20">
        <FeaturedSkeleton type="artists" />
        <GridSkeleton type="artists" />
      </div>
    </div>
  );
}
