import { Skeleton } from "@/client/components/ui/skeleton";

export function StatsSkeleton() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-surface-container-low ghost-border p-8 space-y-6"
        >
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
      ))}
    </section>
  );
}
