import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Card Variants (4 Levels):
 * - elevated: Strong shadow (Landing, Hero, Featured)
 * - default:  Medium shadow (General containers)
 * - outlined: Border only, no shadow (Dense layouts)
 * - flat:     No shadow (Nested inside containers)
 *
 * Lift:
 * - Disabled by default to reduce motion/noise in layouts.
 * - Pass `lift` to opt in.
 */
const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col gap-6 rounded-[24px] py-6 transition-all duration-paper ease-paper",
  {
    variants: {
      variant: {
        elevated:
          "border border-paper-edge shadow-paper-md",
        default:
          "border border-paper-edge shadow-paper-sm",
        outlined:
          "border border-paper-edge shadow-none",
        flat:
          "border border-paper-edge shadow-none bg-secondary/30",
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
      {
        variant: "flat",
        lift: "on",
        className:
          "hover:-translate-x-[var(--paper-lift-sm)] hover:-translate-y-[var(--paper-lift-sm)] hover:shadow-paper-sm hover:z-10 focus-within:-translate-x-[var(--paper-lift-sm)] focus-within:-translate-y-[var(--paper-lift-sm)] focus-within:shadow-paper-sm focus-within:z-10",
      },
    ],
    defaultVariants: {
      variant: "elevated",
      lift: "off",
    },
  }
)

function Card({
  className,
  variant,
  lift,
  ...props
}: React.ComponentProps<"div"> &
  Omit<VariantProps<typeof cardVariants>, "lift"> & { lift?: boolean }) {
  const resolvedVariant = variant ?? "elevated"
  const resolvedLift = lift ?? false

  return (
    <div
      data-slot="card"
      data-variant={resolvedVariant}
      data-lift={resolvedLift ? "on" : "off"}
      className={cn(
        cardVariants({ variant: resolvedVariant, lift: resolvedLift ? "on" : "off" }),
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [&.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [&.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
