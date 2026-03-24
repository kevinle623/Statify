import { Skeleton } from "@/client/components/ui/skeleton";

export function RecentSkeleton() {
  return (
    <div className="bg-surface-container-low ghost-border overflow-hidden">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between p-6 border-t border-divider first:border-t-0"
        >
          <div className="flex items-center gap-6">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-10 h-10" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}
