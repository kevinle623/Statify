import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/client/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase",
  {
    variants: {
      variant: {
        default:
          "border bg-[color:var(--badge-default-bg)] text-[color:var(--badge-default-text)] [border-color:var(--badge-default-border)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        accent:
          "border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        success:
          "border-emerald-300/25 bg-emerald-300/10 text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
