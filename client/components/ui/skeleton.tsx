import { cn } from "@/client/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-surface-container-high", className)} />
  );
}
