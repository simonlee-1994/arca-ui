"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full border border-foreground bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${value || 0}%` }}
      />
    </ProgressPrimitive.Root>
  )
}

function ProgressAccent({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full border border-accent bg-accent/20",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
        style={{ width: `${value || 0}%` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress, ProgressAccent }
