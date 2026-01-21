"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const accordionVariants = cva("", {
  variants: {
    variant: {
      default: "",
      bordered: "radius-surface-nested border border-border bg-card",
      separated: "space-y-3",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const accordionItemVariants = cva("transition-colors duration-200", {
  variants: {
    variant: {
      default: "border-b border-border last:border-b-0",
      bordered: "border-b border-border last:border-b-0",
      separated: "radius-panel border border-border bg-card",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type AccordionVariant = "default" | "bordered" | "separated"

const AccordionContext = React.createContext<{
  variant: AccordionVariant | null | undefined
}>({ variant: "default" })

function Accordion({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> &
  VariantProps<typeof accordionVariants>) {
  return (
    <AccordionContext.Provider value={{ variant }}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        className={cn(accordionVariants({ variant }), className)}
        {...props}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const { variant } = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const { variant } = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium text-foreground",
          "transition-colors duration-200",
          "hover:text-foreground/80",
          variant === "bordered" || variant === "separated"
            ? "px-4"
            : "px-0",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          "[&[data-state=open]>svg]:rotate-180",
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
  const { variant } = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "pb-4 text-muted-foreground leading-relaxed",
          variant === "bordered" || variant === "separated" ? "px-4" : "",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
