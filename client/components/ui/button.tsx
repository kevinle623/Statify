import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/client/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-label text-xs font-bold uppercase tracking-widest transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:opacity-90 active:scale-95",
        secondary: "ghost-border bg-white/5 text-on-surface hover:bg-white/10",
        ghost: "text-on-surface-variant hover:bg-white/5 hover:text-on-surface",
        outline:
          "border border-primary/40 text-primary hover:bg-primary/5 hover:border-primary",
      },
      size: {
        default: "h-11 px-8 py-3",
        sm: "h-9 px-4 py-2 text-[10px]",
        lg: "h-12 px-10 py-4",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
