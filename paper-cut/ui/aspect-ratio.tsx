"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * AspectRatio Frame Variants (4 Levels):
 * - elevated: Strong shadow + strong lift (Hero images)
 * - default:  Medium shadow + medium lift (General framed media) - DEFAULT
 * - outlined: Border at rest, subtle lift on interaction (Dense layouts, grids)
 * - flat:     No border/shadow (Nested inside elevated containers)
 */
type AspectRatioVariant = "elevated" | "default" | "outlined" | "flat"
type AspectRatioLift = boolean

const aspectRatioVariants = cva(
  "overflow-hidden rounded-[24px] border border-paper-edge bg-card transition-all duration-paper ease-paper",
  {
    variants: {
      variant: {
        elevated: "shadow-paper-md",
        default: "shadow-paper-sm",
        outlined: "shadow-none",
        flat: "border-0 bg-transparent shadow-none transition-none",
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
          "hover:-translate-x-[var(--paper-lift-lg)] hover:-translate-y-[var(--paper-lift-lg)] hover:shadow-paper-lg hover:z-10 focus-within:-translate-x-[var(--paper-lift-lg)] focus-within:-translate-y-[var(--paper-lift-lg)] focus-within:shadow-paper-lg focus-within:z-10",
      },
      {
        variant: "default",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-md)] hover:-translate-y-[var(--paper-lift-md)] hover:shadow-paper-md hover:z-10 focus-within:-translate-x-[var(--paper-lift-md)] focus-within:-translate-y-[var(--paper-lift-md)] focus-within:shadow-paper-md focus-within:z-10",
      },
      {
        variant: "outlined",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:shadow-paper-sm hover:z-10 focus-within:-translate-x-[var(--paper-lift-sm)] focus-within:-translate-y-[var(--paper-lift-sm)] focus-within:shadow-paper-sm focus-within:z-10",
      },
    ],
    defaultVariants: {
      variant: "default",
      lift: "on",
    },
  }
)

function AspectRatio({
  className,
  variant,
  lift,
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root> &
  Omit<VariantProps<typeof aspectRatioVariants>, "lift"> & { lift?: AspectRatioLift }) {
  const resolvedVariant: AspectRatioVariant = variant ?? "default"
  const resolvedLift = lift ?? resolvedVariant !== "flat"

  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio"
      data-variant={resolvedVariant}
      data-lift={resolvedLift ? "on" : "off"}
      className={cn(
        aspectRatioVariants({
          variant: resolvedVariant,
          lift: resolvedLift ? "on" : "off",
        }),
        className
      )}
      {...props}
    />
  )
}

export { AspectRatio }
