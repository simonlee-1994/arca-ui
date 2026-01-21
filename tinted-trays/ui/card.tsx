import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  [
    "flex flex-col gap-6 py-6",
    "text-card-foreground",
    "transition-shadow duration-200",
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
          "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_3px_12px_rgba(15,23,42,0.09)]",
        ],
        default: [
          "rounded-2xl border border-border/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(15,23,42,0.04)]",
          "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_3px_10px_rgba(15,23,42,0.07)]",
        ],
        subtle: [
          "rounded-2xl border border-border/60",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_1px_4px_rgba(15,23,42,0.03)]",
          "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_2px_8px_rgba(15,23,42,0.06)]",
        ],
      },
    },
    defaultVariants: {
      surface: "tray",
      rim: "default",
    },
  }
)

type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants>

function Card({
  className,
  surface,
  rim,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({ surface, rim }),
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
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "[.border-b]:pb-6",
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
      className={cn(
        "leading-none font-semibold text-foreground",
        className
      )}
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
      className={cn(
        "flex items-center px-6 gap-3",
        "[.border-t]:pt-6",
        className
      )}
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
