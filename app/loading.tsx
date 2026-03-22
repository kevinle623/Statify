import { Skeleton } from "@/client/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-16">
      <div className="w-full max-w-5xl space-y-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-20 w-3/4" />
        <Skeleton className="h-6 w-full max-w-xl" />
        <div className="pt-8">
          <Skeleton className="h-12 w-48" />
        </div>
      </div>
    </main>
  );
}
