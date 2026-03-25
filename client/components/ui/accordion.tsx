"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/client/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "bg-surface-container-low ghost-border p-6 hover:bg-surface-container transition-colors cursor-pointer",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 font-headline text-sm font-bold uppercase tracking-wide text-on-surface cursor-pointer",
          className,
        )}
        {...props}
      >
        {children}
        <Plus className="size-4 shrink-0 text-on-surface-variant transition-transform duration-200 group-data-[state=open]:rotate-45 group-data-[state=open]:text-primary" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=open]:animate-[accordion-down_250ms_cubic-bezier(0.33,1,0.68,1)_forwards] data-[state=closed]:animate-[accordion-up_200ms_cubic-bezier(0.33,1,0.68,1)_forwards]"
      {...props}
    >
      <div
        className={cn(
          "pt-4 mt-4 border-t border-divider text-sm leading-relaxed text-on-surface-variant",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
