"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const accordionVariants = cva(
  [
    "overflow-hidden",
    "divide-y",
  ],
  {
    variants: {
      surface: {
        tray: "bg-tray",
        background: "bg-background",
      },
      rim: {
        strong: [
          "rounded-3xl border border-border/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_10px_rgba(15,23,42,0.06)]",
          "divide-border/40",
        ],
        default: [
          "rounded-2xl border border-border/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
          "divide-border/40",
        ],
        subtle: [
          "rounded-2xl border border-border/60",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_1px_4px_rgba(15,23,42,0.03)]",
          "divide-border/30",
        ],
      },
    },
    defaultVariants: {
      surface: "tray",
      rim: "subtle",
    },
  }
)

function Accordion({
  className,
  surface,
  rim,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> &
  VariantProps<typeof accordionVariants>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        accordionVariants({ surface, rim }),
        className
      )}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 px-5 py-3.5",
          "text-left text-sm font-semibold text-foreground",
          "outline-none transition-colors duration-200",
          "hover:bg-background/60",
          "[&[data-state=open]]:bg-background/70 [&[data-state=open]]:text-primary",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          "disabled:pointer-events-none disabled:opacity-50",
          "[&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:text-primary",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn(
        "px-5 pb-4 pt-0 text-muted-foreground leading-relaxed",
        className
      )}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
