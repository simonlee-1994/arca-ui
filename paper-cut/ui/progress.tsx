"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  [
    "relative w-full overflow-hidden rounded-full",
    "bg-secondary/60 border border-paper-edge shadow-none",
  ],
  {
    variants: {
      size: {
        sm: "h-2",
        default: "h-3",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Progress({
  className,
  indicatorClassName,
  value,
  indeterminate = false,
  size,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants> & {
  indeterminate?: boolean
  indicatorClassName?: string
}) {
  const max = props.max ?? 100
  const percentage =
    typeof value === "number" && typeof max === "number" && max > 0
      ? (value / max) * 100
      : 0

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-indeterminate={indeterminate || undefined}
      value={indeterminate ? null : value}
      className={cn(
        // Inset style: used as inner control, no shadow, subtle background
        progressVariants({ size }),
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full rounded-full bg-foreground/70 transition-all duration-paper ease-paper",
          indeterminate && "w-1/3 animate-[progress-indeterminate_1.5s_ease-in-out_infinite]",
          indicatorClassName
        )}
        style={indeterminate ? undefined : { width: `${percentage}%` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
