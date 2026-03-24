import { Skeleton } from "@/client/components/ui/skeleton";

export function FeaturedSkeleton() {
  return (
    <div className="relative w-full h-[300px] lg:h-[500px] bg-surface-container-low ghost-border overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
}
