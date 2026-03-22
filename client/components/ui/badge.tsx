import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/client/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-label text-[10px] font-medium uppercase tracking-[0.1em]",
  {
    variants: {
      variant: {
        default: "border border-white/10 px-1.5 py-0.5 text-on-surface-variant",
        accent: "text-primary",
        label: "text-on-surface-variant",
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
