import { Skeleton } from "@/client/components/ui/skeleton";
import { NowPlayingSkeleton } from "@/client/components/dashboard/NowPlayingSkeleton";
import { StatsSkeleton } from "@/client/components/dashboard/StatsSkeleton";
import { RecentSkeleton } from "@/client/components/dashboard/RecentSkeleton";

export default function DashboardLoading() {
  return (
    <div className="pt-8 lg:pt-16 px-6 lg:px-12 pb-6 lg:pb-12 space-y-12 lg:space-y-16">
      <section>
        <div className="space-y-3">
          <Skeleton className="h-10 lg:h-14 w-[36rem] max-w-full" />
          <Skeleton className="h-3 w-96 max-w-full" />
        </div>
      </section>
      <NowPlayingSkeleton />
      <StatsSkeleton />
      <section>
        <Skeleton className="h-4 w-32 mb-6" />
        <RecentSkeleton />
      </section>
    </div>
  );
}
