import { Skeleton } from "@/client/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-20 pt-5 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-[32px] p-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="mt-6 h-16 w-full max-w-2xl" />
        <Skeleton className="mt-4 h-6 w-full max-w-xl" />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-[320px] w-full rounded-[28px]" />
          <Skeleton className="h-[320px] w-full rounded-[28px]" />
        </div>
      </div>
    </main>
  );
}
