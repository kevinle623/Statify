import { Skeleton } from "@/client/components/ui/skeleton";

export default function HistoryLoading() {
  return (
    <div className="pt-8 lg:pt-16 px-6 lg:px-12 pb-12">
      <div className="mb-12 lg:mb-16">
        <Skeleton className="h-10 lg:h-14 w-64" />
        <Skeleton className="h-3 w-40 mt-4" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-8 w-20" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-6 py-4">
            <Skeleton className="w-12 h-12 flex-shrink-0" />
            <div className="flex-grow space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
