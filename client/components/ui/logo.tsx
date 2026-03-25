import { cn } from "@/client/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-xl font-black tracking-tight text-on-surface font-headline">
        STATIFY
      </span>
      <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant border border-on-surface/15 px-1.5 py-0.5">
        v2.0
      </span>
    </div>
  );
}
