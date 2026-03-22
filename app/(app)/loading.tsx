import { Skeleton } from "@/client/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 lg:p-12 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-5">
          <Skeleton className="aspect-square w-full" />
        </div>
        <div className="lg:col-span-7 space-y-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-1 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  );
}
