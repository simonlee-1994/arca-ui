"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Accordion Variants (4 Levels):
 * - elevated: Strong shadow + strong lift (Landing Page, Hero)
 * - default:  Medium shadow + medium lift (General containers)
 * - outlined: Border at rest, subtle lift on interaction (Sidebars, settings)
 * - flat:     No border, no shadow (Nested inside containers)
 *
 * Lift:
 * - Defaults to enabled for elevated/default/outlined, disabled for flat.
 * - Pass `lift={false}` to opt out per usage.
 */
type AccordionVariant = "elevated" | "default" | "outlined" | "flat"
type AccordionLift = boolean

const accordionVariants = cva("flex flex-col", {
  variants: {
    variant: {
      elevated: "gap-3",
      default: "gap-2",
      outlined: "gap-2",
      flat: "gap-0 divide-y divide-paper-edge",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const accordionItemVariants = cva(
  "relative",
  {
    variants: {
      variant: {
        elevated:
          "bg-card border border-paper-edge rounded-[24px] shadow-paper-md transition-all duration-paper ease-paper",
        default:
          "bg-card border border-paper-edge rounded-[24px] shadow-paper-sm transition-all duration-paper ease-paper",
        outlined:
          "bg-card border border-paper-edge rounded-[24px] shadow-none transition-all duration-paper ease-paper",
        flat:
          "rounded-none border-0 bg-transparent shadow-none transition-none",
      },
      lift: {
        on: "",
        off: "",
      },
    },
    compoundVariants: [
      {
        variant: "elevated",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-lg)] hover:-translate-y-[var(--paper-lift-lg)] hover:shadow-paper-lg hover:z-10 focus-within:-translate-x-[var(--paper-lift-lg)] focus-within:-translate-y-[var(--paper-lift-lg)] focus-within:shadow-paper-lg focus-within:z-10 data-[state=open]:-translate-x-[var(--paper-lift-lg)] data-[state=open]:-translate-y-[var(--paper-lift-lg)] data-[state=open]:shadow-paper-lg data-[state=open]:z-10",
      },
      {
        variant: "default",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-md)] hover:-translate-y-[var(--paper-lift-md)] hover:shadow-paper-md hover:z-10 focus-within:-translate-x-[var(--paper-lift-md)] focus-within:-translate-y-[var(--paper-lift-md)] focus-within:shadow-paper-md focus-within:z-10 data-[state=open]:-translate-x-[var(--paper-lift-md)] data-[state=open]:-translate-y-[var(--paper-lift-md)] data-[state=open]:shadow-paper-md data-[state=open]:z-10",
      },
      {
        variant: "outlined",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:shadow-paper-sm hover:z-10 focus-within:-translate-x-[var(--paper-lift-sm)] focus-within:-translate-y-[var(--paper-lift-sm)] focus-within:shadow-paper-sm focus-within:z-10 data-[state=open]:-translate-x-[var(--paper-lift-sm)] data-[state=open]:-translate-y-[var(--paper-lift-sm)] data-[state=open]:shadow-paper-sm data-[state=open]:z-10",
      },
    ],
    defaultVariants: {
      variant: "default",
      lift: "on",
    },
  }
)

const accordionTriggerVariants = cva(
  "group flex flex-1 items-center justify-between gap-4 text-left font-semibold outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        elevated: "px-6 py-4 rounded-[24px]",
        default: "px-5 py-3.5 rounded-[24px]",
        outlined: "px-5 py-3.5 rounded-[24px]",
        flat:
          "py-3 px-4 rounded-[16px] hover:bg-accent/40 transition-colors duration-paper ease-paper",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const accordionContentInnerVariants = cva("pt-0", {
  variants: {
    variant: {
      elevated: "px-6 pb-5",
      default: "px-5 pb-4",
      outlined: "px-5 pb-4",
      flat: "px-4 pb-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type AccordionStyleContextValue = {
  variant: AccordionVariant
  lift: AccordionLift
}

const AccordionStyleContext = React.createContext<AccordionStyleContextValue>({
  variant: "default",
  lift: true,
})

function Accordion({
  className,
  variant,
  lift,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> &
  VariantProps<typeof accordionVariants> & { lift?: AccordionLift }) {
  const resolvedVariant = variant ?? "default"
  const resolvedLift = lift ?? resolvedVariant !== "flat"
  return (
    <AccordionStyleContext.Provider
      value={{ variant: resolvedVariant, lift: resolvedLift }}
    >
      <AccordionPrimitive.Root
        data-slot="accordion"
        data-variant={resolvedVariant}
        data-lift={resolvedLift ? "on" : "off"}
        className={cn(accordionVariants({ variant: resolvedVariant }), className)}
        {...props}
      />
    </AccordionStyleContext.Provider>
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const { variant, lift } = React.useContext(AccordionStyleContext)

  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      data-variant={variant}
      data-lift={lift ? "on" : "off"}
      className={cn(
        accordionItemVariants({ variant, lift: lift ? "on" : "off" }),
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
  const { variant } = React.useContext(AccordionStyleContext)

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          accordionTriggerVariants({ variant }),
          className
        )}
        {...props}
      >
        {children}
        <div className="flex items-center justify-center size-8 rounded-full bg-secondary/60 border border-paper-edge transition-transform duration-paper ease-paper group-data-[state=open]:rotate-180">
          <ChevronDownIcon className="text-muted-foreground size-4 shrink-0" />
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
  const { variant } = React.useContext(AccordionStyleContext)

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm text-muted-foreground"
      {...props}
    >
      <div
        className={cn(accordionContentInnerVariants({ variant }), className)}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
