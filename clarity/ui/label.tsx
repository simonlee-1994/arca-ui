"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

// Clarity: Refined minimalism with precision typography

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        // Base: Clarity's precision typography
        "flex items-center gap-2 text-sm font-medium leading-none select-none",
        "text-foreground tracking-tight",
        // Transition for smooth state changes
        "transition-colors duration-200",
        // Disabled states
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
