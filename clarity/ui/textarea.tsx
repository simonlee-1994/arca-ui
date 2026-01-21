import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styles - softer radius for textarea (radius-control-soft)
        "radius-control-soft flex min-h-[80px] w-full border border-border bg-background px-4 py-3 text-sm",
        // Placeholder with muted color
        "placeholder:text-muted-foreground",
        // Selection styles
        "selection:bg-primary/10 selection:text-foreground",
        // Focus ring - "ink-like" presence: soft ring with offset, not loud
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-ring",
        // Hover state - subtle border change
        "hover:border-border-hover",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border",
        // Invalid state
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        // Smooth transition
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
