import { Skeleton } from "@/client/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="grid gap-5">
      <div className="glass-panel rounded-[32px] p-7">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="mt-5 h-14 w-full max-w-xl" />
        <Skeleton className="mt-4 h-5 w-full max-w-2xl" />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Skeleton className="h-[320px] w-full rounded-[30px]" />
        <Skeleton className="h-[320px] w-full rounded-[30px]" />
      </div>
    </section>
  );
}
