"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "orbit-hover-offset-sm rounded-lg border border-foreground bg-background mb-3 last:mb-0 overflow-hidden",
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
          "group flex flex-1 items-center justify-between gap-4 px-4 py-3 text-left font-semibold tracking-tight transition-all outline-none hover:bg-secondary/40 focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>div>svg]:rotate-180 [&[data-state=open]]:bg-secondary/40",
          className
        )}
        {...props}
      >
        {children}
        <div className="flex items-center justify-center size-7 rounded-full border border-foreground bg-background shrink-0 transition-colors group-hover:bg-secondary">
          <ChevronDownIcon className="size-3.5 transition-transform duration-300" strokeWidth={2.5} />
        </div>
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
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm border-t border-foreground/20 bg-secondary/20"
      {...props}
    >
      <div className={cn("px-4 py-3 text-muted-foreground leading-relaxed", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
