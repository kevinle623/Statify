import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/client/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,rgba(29,185,84,0.9),rgba(69,104,220,0.85))] text-white shadow-[0_20px_60px_rgba(29,185,84,0.24)] hover:scale-[1.01]",
        secondary:
          "border bg-[color:var(--button-secondary-bg)] text-[color:var(--button-secondary-text)] [border-color:var(--button-secondary-border)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-[color:var(--button-secondary-hover-bg)]",
        ghost:
          "border bg-[color:var(--button-ghost-bg)] text-[color:var(--button-ghost-text)] [border-color:var(--button-ghost-border)] hover:bg-[color:var(--button-ghost-hover-bg)]",
        outline:
          "border bg-[color:var(--button-outline-bg)] text-[color:var(--button-outline-text)] [border-color:var(--button-outline-border)] hover:bg-[color:var(--button-outline-hover-bg)]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "size-10 rounded-full",
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

export { Button, buttonVariants };
